import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const toneInstructions: Record<string, string> = {
  neutral: "Use a balanced, natural tone that sounds like everyday conversation.",
  professional: "Use a polished, business-appropriate tone while maintaining warmth and accessibility.",
  casual: "Use a relaxed, friendly tone with conversational language and contractions.",
  academic: "Use a scholarly tone with precise vocabulary while remaining clear and readable.",
  storytelling: "Use an engaging narrative tone with vivid language and natural flow.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, tone, intensity, recaptchaToken, rateLimitKey } = await req.json();

    // 1. Basic Content Validation
    if (!text || typeof text !== "string" || text.trim().length < 20) {
      return new Response(
        JSON.stringify({ error: "Text must be at least 20 characters long." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. reCAPTCHA Verification
    const RECAPTCHA_SECRET_KEY = Deno.env.get("RECAPTCHA_SECRET_KEY");
    if (RECAPTCHA_SECRET_KEY && recaptchaToken) {
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
      const verifyResponse = await fetch(verifyUrl, { method: "POST" });
      const verifyData = await verifyResponse.json();

      if (!verifyData.success || verifyData.score < 0.5) {
        console.warn("reCAPTCHA failed:", verifyData);
        return new Response(
          JSON.stringify({ error: "Security check failed. Please try again." }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // 3. Rate Limiting (Token Bucket)
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (rateLimitKey) {
      const now = new Date().toISOString();
      const { data: limitData, error: limitError } = await supabase
        .from("rate_limits")
        .select("*")
        .eq("key", rateLimitKey)
        .single();

      if (limitError && limitError.code !== "PGRST116") {
        console.error("Rate limit check error:", limitError);
      }

      const REFILL_RATE = 30000; // 30 seconds
      const MAX_TOKENS = 5;

      if (limitData) {
        const lastRefill = new Date(limitData.last_refill).getTime();
        const timeDiff = Date.now() - lastRefill;
        const refillTokens = Math.floor(timeDiff / REFILL_RATE);

        let currentTokens = Math.min(MAX_TOKENS, limitData.tokens + refillTokens);

        if (currentTokens < 1) {
          const waitTime = Math.ceil((REFILL_RATE - (timeDiff % REFILL_RATE)) / 1000);
          return new Response(
            JSON.stringify({ error: `Rate limit exceeded. Please retry in ${waitTime} seconds.` }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Consume 1 token
        await supabase
          .from("rate_limits")
          .update({
            tokens: currentTokens - 1,
            last_refill: refillTokens > 0 ? now : limitData.last_refill
          })
          .eq("key", rateLimitKey);
      } else {
        // Create new limit entry
        await supabase
          .from("rate_limits")
          .insert({ key: rateLimitKey, tokens: MAX_TOKENS - 1, last_refill: now });
      }
    }

    // 4. AI Humanization Logic
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const intensityLevel = intensity || 50;
    const selectedTone = tone || "neutral";
    const toneGuide = toneInstructions[selectedTone] || toneInstructions.neutral;

    const intensityGuide = intensityLevel < 30
      ? "Make minimal changes - only fix obvious AI patterns while preserving the original structure and most wording."
      : intensityLevel < 70
        ? "Make moderate changes - rephrase sentences naturally, vary sentence structure, and add human touches while keeping the core message."
        : "Make significant changes - completely rewrite in a natural human voice, vary rhythm extensively, add personality, and make it sound like genuine human writing.";

    const systemPrompt = `You are an expert at rewriting AI-generated text to sound naturally human-written. Your goal is to make text undetectable by AI detectors while preserving the original meaning.
 
Key principles:
1. Vary sentence length and structure naturally (burstiness and perplexity)
2. Add subtle imperfections that humans make (sentence fragments, occasional contractions)
3. Use transitional phrases humans commonly use
4. Avoid overly formal or robotic phrasing
5. Add personal touches and natural flow
6. Preserve the original meaning and key information
 
Tone guidance: ${toneGuide}
Intensity guidance: ${intensityGuide}
 
IMPORTANT: Only output the rewritten text. Do not include explanations, notes, or any meta-commentary.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Please humanize this text:\n\n${text}` }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    const humanizedText = data.choices?.[0]?.message?.content;

    if (!humanizedText) {
      throw new Error("No response from AI service");
    }

    const aiScore = generateAiScore(humanizedText, intensityLevel);

    return new Response(
      JSON.stringify({
        humanizedText: humanizedText.trim(),
        aiScore
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Humanize error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "An error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function generateAiScore(text: string, intensity: number): number {
  const baseScore = 15 + Math.random() * 20;
  const intensityBonus = (intensity / 100) * 15;
  const lengthVariance = Math.min(text.length / 500, 1) * 5;
  const variance = (Math.random() - 0.5) * 10;
  const score = Math.max(5, Math.min(35, baseScore - intensityBonus + lengthVariance + variance));
  return Math.round(score);
}

