type VoiceProvider = "openai-realtime" | "gemini-live";

interface VoiceSessionRequest {
  provider: VoiceProvider;
  language: string;
  level: "beginner" | "intermediate" | "advanced";
  mode: "lesson" | "chat" | "story" | "tcf-tef";
  tutorInstructions: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

    return jsonResponse({
      provider: body.provider,
      status: "not_implemented",
      message: "OpenAI Realtime session creation boundary is ready for provider wiring.",
    });
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
