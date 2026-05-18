import { corsHeaders as supabaseCorsHeaders } from "jsr:@supabase/supabase-js@2/cors";

type SourceLanguage = "en-US" | "fr-FR" | "es-ES" | "zh-CN" | "de-DE" | "ar-SA";

interface TranslateTranscriptRequest {
  text: string;
  sourceLanguage: SourceLanguage;
  expectedEnglish?: string;
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

function isValidBody(value: unknown): value is TranslateTranscriptRequest {
  if (!value || typeof value !== "object") return false;
  const body = value as Partial<TranslateTranscriptRequest>;
  return typeof body.text === "string" && typeof body.sourceLanguage === "string";
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

  if (!isValidBody(body)) {
    return jsonResponse({ error: "Invalid transcript translation request." }, 400);
  }

  if (body.sourceLanguage === "en-US") {
    return jsonResponse({
      translation: body.text.trim(),
      natural: true,
      feedback: null,
    });
  }

  const openAiKey = Deno.env.get("OPENAI_API_KEY");
  if (!openAiKey) {
    return jsonResponse({ error: "OpenAI translation is not configured." }, 503);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text: [
                  "Translate the provided learner text into concise natural English.",
                  "Return JSON with keys translation, natural, and feedback.",
                  "Set natural to false if the original text is not a natural or correct phrase in its source language.",
                  "If natural is false, feedback should briefly explain what is wrong in English.",
                  "If expectedEnglish is provided, compare the meaning against it and mention mismatch in feedback when needed.",
                  "Do not include markdown.",
                ].join(" "),
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: JSON.stringify({
                  text: body.text,
                  sourceLanguage: body.sourceLanguage,
                  expectedEnglish: body.expectedEnglish ?? null,
                }),
              },
            ],
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "transcript_translation",
            schema: {
              type: "object",
              additionalProperties: false,
              required: ["translation", "natural", "feedback"],
              properties: {
                translation: { type: "string" },
                natural: { type: "boolean" },
                feedback: {
                  anyOf: [{ type: "string" }, { type: "null" }],
                },
              },
            },
          },
        },
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return jsonResponse(
        {
          error: "Transcript translation failed.",
          details:
            typeof data?.error?.message === "string"
              ? data.error.message
              : "The translation provider rejected the request.",
        },
        502,
      );
    }

    const outputText =
      data?.output?.[0]?.content?.[0]?.text ??
      data?.output_text ??
      null;

    if (typeof outputText !== "string") {
      return jsonResponse({ error: "Translation response was missing JSON output." }, 502);
    }

    const parsed = JSON.parse(outputText) as {
      translation?: string;
      natural?: boolean;
      feedback?: string | null;
    };

    return jsonResponse({
      translation: parsed.translation?.trim() || body.text.trim(),
      natural: parsed.natural ?? true,
      feedback: parsed.feedback ?? null,
    });
  } catch (error) {
    return jsonResponse(
      {
        error: "Transcript translation request failed.",
        details: error instanceof Error ? error.message : "Unknown provider error.",
      },
      502,
    );
  }
});
