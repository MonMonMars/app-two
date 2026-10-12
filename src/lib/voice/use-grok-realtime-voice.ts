"use client";

import {
  base64Pcm16ToFloat32,
  float32ToBase64Pcm16,
  resampleFloat32,
} from "@/lib/voice/audio-pcm";
import { GROK_VOICE_SAMPLE_RATE } from "@/lib/voice/constants";
import { buildWebSocketSubprotocol } from "@/lib/voice/ephemeral-token";
import { buildGrokVoiceSessionUpdate } from "@/lib/voice/session-config";
import { useCallback, useEffect, useRef, useState } from "react";

export type VoiceConnectionStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "disconnecting"
  | "error";

export type UseGrokRealtimeVoiceOptions = {
  matchName: string;
  onError?: (message: string) => void;
};

type RealtimeEvent = {
  type?: string;
  delta?: string;
  error?: { message?: string };
};

export function useGrokRealtimeVoice({
  matchName,
  onError,
}: UseGrokRealtimeVoiceOptions) {
  const [status, setStatus] = useState<VoiceConnectionStatus>("idle");
  const [muted, setMuted] = useState(false);
  const [configMissing, setConfigMissing] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const playbackTimeRef = useRef(0);
  const mutedRef = useRef(muted);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const reportError = useCallback(
    (message: string) => {
      setLastError(message);
      setStatus("error");
      onError?.(message);
    },
    [onError],
  );

  const cleanupMedia = useCallback(() => {
    processorRef.current?.disconnect();
    processorRef.current = null;
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    micStreamRef.current = null;
    if (audioContextRef.current?.state !== "closed") {
      void audioContextRef.current?.close();
    }
    audioContextRef.current = null;
    playbackTimeRef.current = 0;
  }, []);

  const cleanupSocket = useCallback(() => {
    const ws = wsRef.current;
    wsRef.current = null;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close();
    }
  }, []);

  const stop = useCallback(() => {
    setStatus("disconnecting");
    cleanupSocket();
    cleanupMedia();
    setStatus("idle");
  }, [cleanupMedia, cleanupSocket]);

  const schedulePlayback = useCallback((float32: Float32Array) => {
    const ctx = audioContextRef.current;
    if (!ctx || float32.length === 0) {
      return;
    }
    const buffer = ctx.createBuffer(1, float32.length, GROK_VOICE_SAMPLE_RATE);
    buffer.copyToChannel(new Float32Array(float32), 0);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    const startAt = Math.max(ctx.currentTime, playbackTimeRef.current);
    source.start(startAt);
    playbackTimeRef.current = startAt + buffer.duration;
  }, []);

  const startMicPipeline = useCallback(
    (ws: WebSocket) => {
      const stream = micStreamRef.current;
      const ctx = audioContextRef.current;
      if (!stream || !ctx) {
        return;
      }

      const source = ctx.createMediaStreamSource(stream);
      const processor = ctx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (event) => {
        if (ws.readyState !== WebSocket.OPEN || mutedRef.current) {
          return;
        }
        const input = event.inputBuffer.getChannelData(0);
        const resampled = resampleFloat32(
          input,
          ctx.sampleRate,
          GROK_VOICE_SAMPLE_RATE,
        );
        const audio = float32ToBase64Pcm16(resampled);
        ws.send(
          JSON.stringify({
            type: "input_audio_buffer.append",
            audio,
          }),
        );
      };

      source.connect(processor);
      processor.connect(ctx.destination);
    },
    [],
  );

  const start = useCallback(async () => {
    if (status === "connecting" || status === "connected") {
      return;
    }
    setLastError(null);
    setConfigMissing(false);
    setStatus("connecting");

    let session: {
      token: string;
      wsUrl: string;
    };

    try {
      const res = await fetch("/api/voice/session", { method: "POST" });
      if (res.status === 503) {
        setConfigMissing(true);
        setStatus("idle");
        return;
      }
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          message?: string;
        } | null;
        reportError(body?.message ?? "Could not start voice session.");
        return;
      }
      session = (await res.json()) as { token: string; wsUrl: string };
    } catch {
      reportError("Network error while starting voice.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      audioContextRef.current = new AudioContext({
        sampleRate: GROK_VOICE_SAMPLE_RATE,
      });
      await audioContextRef.current.resume();
    } catch {
      reportError("Microphone permission is required for voice chat.");
      cleanupMedia();
      return;
    }

    const ws = new WebSocket(session.wsUrl, [
      buildWebSocketSubprotocol(session.token),
    ]);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify(buildGrokVoiceSessionUpdate({ matchName })));
      startMicPipeline(ws);
      setStatus("connected");
    };

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(String(event.data)) as RealtimeEvent;
        const type = parsed.type ?? "";
        if (
          type === "response.output_audio.delta" ||
          type === "response.audio.delta"
        ) {
          if (parsed.delta) {
            schedulePlayback(base64Pcm16ToFloat32(parsed.delta));
          }
        } else if (type === "error") {
          reportError(parsed.error?.message ?? "Voice session error.");
        }
      } catch {
        // ignore non-JSON frames
      }
    };

    ws.onerror = () => {
      reportError("Voice connection failed.");
    };

    ws.onclose = () => {
      if (wsRef.current === ws) {
        cleanupMedia();
        wsRef.current = null;
        setStatus("idle");
      }
    };
  }, [
    cleanupMedia,
    matchName,
    reportError,
    schedulePlayback,
    startMicPipeline,
    status,
  ]);

  useEffect(() => {
    return () => {
      cleanupSocket();
      cleanupMedia();
    };
  }, [cleanupMedia, cleanupSocket]);

  return {
    status,
    muted,
    setMuted,
    configMissing,
    lastError,
    start,
    stop,
    isActive: status === "connected" || status === "connecting",
  };
}
