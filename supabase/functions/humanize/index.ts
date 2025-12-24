import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { text, tone, intensity } = await req.json();
    
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Text is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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
1. Vary sentence length and structure naturally
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
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    const humanizedText = data.choices?.[0]?.message?.content;

    if (!humanizedText) {
      throw new Error("No response from AI service");
    }

    // Generate a simulated AI detection score (heuristic-based)
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
  // Simulated AI detection score based on heuristics
  // This is a simplified simulation - not a real AI detector
  const baseScore = 15 + Math.random() * 20;
  const intensityBonus = (intensity / 100) * 15;
  const lengthVariance = Math.min(text.length / 500, 1) * 5;
  
  // Add some randomness for realism
  const variance = (Math.random() - 0.5) * 10;
  
  const score = Math.max(5, Math.min(35, baseScore - intensityBonus + lengthVariance + variance));
  return Math.round(score);
}
