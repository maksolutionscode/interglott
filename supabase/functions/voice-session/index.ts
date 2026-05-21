import { corsHeaders as supabaseCorsHeaders } from "jsr:@supabase/supabase-js@2/cors";

type VoiceProvider = "openai-realtime" | "gemini-live";
type VoiceGender = "female" | "male";
type VoiceName =
  | "alloy"
  | "ash"
  | "ballad"
  | "coral"
  | "echo"
  | "sage"
  | "shimmer"
  | "verse"
  | "marin"
  | "cedar";
type VoicePersona =
  | "supportive-tutor"
  | "cheerful-coach"
  | "calm-guide"
  | "formal-examiner";

interface VoiceSessionRequest {
  provider: VoiceProvider;
  language: string;
  learningLanguage?: string;
  level: "beginner" | "intermediate" | "advanced";
  mode: "lesson" | "chat" | "story" | "tcf-tef";
  tutorInstructions: string;
  voiceGender?: VoiceGender;
  voiceName?: VoiceName;
  voicePersona?: VoicePersona;
  verbatimOnly?: boolean;
}

const corsHeaders = {
  ...supabaseCorsHeaders,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function isVoiceSessionRequest(value: unknown): value is VoiceSessionRequest {
  if (!value || typeof value !== "object") return false;
  const body = value as Partial<VoiceSessionRequest>;
  return (
    (body.provider === "openai-realtime" || body.provider === "gemini-live") &&
    typeof body.language === "string" &&
    typeof body.tutorInstructions === "string"
  );
}

function getVoiceName(voiceGender: VoiceGender | undefined, voiceName?: VoiceName) {
  if (voiceName) return voiceName;
  return voiceGender === "male" ? "cedar" : "marin";
}

function getPersonaInstructions(voicePersona: VoicePersona | undefined) {
  switch (voicePersona) {
    case "cheerful-coach":
      return "Adopt a cheerful coach persona. Sound upbeat, motivating, and energetic while staying clear and natural.";
    case "calm-guide":
      return "Adopt a calm guide persona. Sound steady, low-pressure, and reassuring with a relaxed pace.";
    case "formal-examiner":
      return "Adopt a formal examiner persona. Sound structured, precise, and professional, especially for assessment-style practice.";
    case "supportive-tutor":
    default:
      return "Adopt a supportive tutor persona. Sound warm, patient, and encouraging without being overly dramatic.";
  }
}

function buildOpenAiSessionRequest(body: VoiceSessionRequest) {
  const sessionInstructions = body.verbatimOnly
    ? body.tutorInstructions.trim()
    : `${body.tutorInstructions} ${getPersonaInstructions(body.voicePersona)}`.trim();

  return {
    session: {
      type: "realtime",
      model: "gpt-realtime",
      instructions: sessionInstructions,
      audio: {
        input: {
          noise_reduction: {
            type: "near_field",
          },
          transcription: {
            model: "gpt-4o-transcribe",
            language: body.language.slice(0, 2),
          },
          turn_detection: {
            type: "semantic_vad",
            eagerness: "low",
            create_response: true,
            interrupt_response: true,
          },
        },
        output: {
          voice: getVoiceName(body.voiceGender, body.voiceName),
        },
      },
    },
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  if (!isVoiceSessionRequest(body)) {
    return jsonResponse({ error: "Invalid voice session request." }, 400);
  }

  if (body.provider === "openai-realtime") {
    const openAiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openAiKey) {
      return jsonResponse({ error: "OpenAI Realtime is not configured." }, 503);
    }

    try {
      const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildOpenAiSessionRequest(body)),
      });

      const data = await response.json();

      if (!response.ok) {
        return jsonResponse(
          {
            error: "OpenAI Realtime session creation failed.",
            details:
              typeof data?.error?.message === "string"
                ? data.error.message
                : "The provider rejected the session request.",
          },
          502,
        );
      }

      const clientSecret =
        data?.value ??
        data?.client_secret?.value ??
        data?.session?.client_secret?.value ??
        null;
      const expiresAt =
        data?.expires_at ??
        data?.client_secret?.expires_at ??
        data?.session?.client_secret?.expires_at ??
        null;

      if (!clientSecret) {
        return jsonResponse(
          {
            error: "OpenAI Realtime session did not return a client secret.",
          },
          502,
        );
      }

      return jsonResponse({
        provider: body.provider,
        model: data?.session?.model ?? "gpt-realtime",
        clientSecret,
        expiresAt,
        session: data?.session ?? data,
        status: "ready",
      });
    } catch (error) {
      return jsonResponse(
        {
          error: "OpenAI Realtime session request failed.",
          details: error instanceof Error ? error.message : "Unknown provider error.",
        },
        502,
      );
    }

  }

  const geminiKey = Deno.env.get("GEMINI_API_KEY");
  if (!geminiKey) {
    return jsonResponse({ error: "Gemini Live is not configured." }, 503);
  }

  return jsonResponse({
    provider: body.provider,
    status: "not_implemented",
    message: "Gemini Live session creation boundary is ready for provider wiring.",
  });
});
