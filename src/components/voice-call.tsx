"use client";

import { useGrokRealtimeVoice } from "@/lib/voice/use-grok-realtime-voice";
import { t } from "@/i18n";

type VoiceCallProps = {
  matchName: string;
  onClose: () => void;
};

function statusLabel(
  status: ReturnType<typeof useGrokRealtimeVoice>["status"],
): string {
  const v = t().voice.status;
  switch (status) {
    case "idle":
      return v.idle;
    case "connecting":
      return v.connecting;
    case "connected":
      return v.connected;
    case "disconnecting":
      return v.disconnecting;
    case "error":
      return v.error;
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

export function VoiceCall({ matchName, onClose }: VoiceCallProps) {
  const copy = t().voice;
  const voice = useGrokRealtimeVoice({
    matchName,
    onError: () => {},
  });

  const handleClose = () => {
    voice.stop();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center"
      role="dialog"
      aria-labelledby="voice-call-title"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2
              id="voice-call-title"
              className="text-lg font-semibold text-white"
            >
              {copy.title}
            </h2>
            <p className="text-sm text-zinc-400">
              {copy.subtitle.replace("{name}", matchName)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full px-2 py-1 text-zinc-400 hover:bg-zinc-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
            aria-label={copy.close}
          >
            ✕
          </button>
        </div>

        {voice.configMissing ? (
          <div
            className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-3 text-sm text-amber-100"
            role="alert"
          >
            <p className="font-medium">{copy.unconfiguredTitle}</p>
            <p className="mt-1 text-amber-100/90">{copy.unconfiguredBody}</p>
          </div>
        ) : null}

        {voice.lastError && !voice.configMissing ? (
          <div
            className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-100"
            role="alert"
          >
            {voice.lastError}
          </div>
        ) : null}

        <div className="mb-4 flex items-center justify-between rounded-xl bg-zinc-950/80 px-4 py-3">
          <span className="text-sm text-zinc-400">{copy.connection}</span>
          <span
            className={`text-sm font-medium ${
              voice.status === "connected"
                ? "text-emerald-400"
                : voice.status === "error"
                  ? "text-rose-400"
                  : "text-zinc-200"
            }`}
          >
            {statusLabel(voice.status)}
          </span>
        </div>

        <p className="mb-4 text-xs leading-relaxed text-zinc-500">
          {copy.hint}
        </p>

        <div className="flex flex-wrap gap-2">
          {!voice.isActive ? (
            <button
              type="button"
              onClick={() => void voice.start()}
              disabled={voice.configMissing}
              className="flex-1 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
            >
              {copy.startCall}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => voice.setMuted(!voice.muted)}
                disabled={voice.status !== "connected"}
                className="rounded-full border border-zinc-600 px-4 py-2.5 text-sm text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
              >
                {voice.muted ? copy.unmute : copy.mute}
              </button>
              <button
                type="button"
                onClick={() => voice.stop()}
                className="flex-1 rounded-full bg-zinc-700 px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
              >
                {copy.endCall}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
