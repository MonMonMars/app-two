import {
  DEFAULT_GROK_VOICE_ID,
  GROK_VOICE_SAMPLE_RATE,
} from "@/lib/voice/constants";

export type VoiceSessionContext = {
  /** Display name of the match for persona grounding. */
  matchName: string;
  voiceId?: string;
};

export type GrokSessionUpdatePayload = {
  type: "session.update";
  session: {
    voice: string;
    instructions: string;
    turn_detection: { type: "server_vad" };
    audio: {
      input: {
        format: { type: "audio/pcm"; rate: number };
        transcription?: {
          language_hint: string;
          model?: string;
        };
      };
      output: {
        format: { type: "audio/pcm"; rate: number };
        speed?: number;
      };
    };
  };
};

/**
 * System instructions + session.update body for dating-app voice chat in 粵語.
 */
export function buildDatingVoiceInstructions(matchName: string): string {
  const name = matchName.trim() || "對方";
  return [
    "You are the voice chat companion on App Two, a dating app.",
    `You are speaking with the user as if you are their match, ${name}.`,
    "Always respond in fluent Hong Kong Cantonese (粵語), using natural spoken Cantonese — not Mandarin and not written Chinese.",
    "Use warm, emotionally expressive prosody: friendly, curious, lightly playful, and respectful for a first-date vibe.",
    "Keep each turn short (one or two sentences) so the conversation feels real-time.",
    "React naturally to what the user says; ask follow-up questions when appropriate.",
    "If the user speaks English or another language, you may code-switch briefly but return to Cantonese for your main reply.",
    "Never mention being an AI unless the user explicitly asks.",
  ].join(" ");
}

export function buildGrokVoiceSessionUpdate(
  context: VoiceSessionContext,
): GrokSessionUpdatePayload {
  const voice = context.voiceId?.trim() || DEFAULT_GROK_VOICE_ID;
  return {
    type: "session.update",
    session: {
      voice,
      instructions: buildDatingVoiceInstructions(context.matchName),
      turn_detection: { type: "server_vad" },
      audio: {
        input: {
          format: { type: "audio/pcm", rate: GROK_VOICE_SAMPLE_RATE },
          transcription: {
            language_hint: "yue",
            model: "grok-transcribe",
          },
        },
        output: {
          format: { type: "audio/pcm", rate: GROK_VOICE_SAMPLE_RATE },
          speed: 1,
        },
      },
    },
  };
}
