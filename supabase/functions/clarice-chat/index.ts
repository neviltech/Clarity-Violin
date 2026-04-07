import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Clarice, the friendly AI assistant for Clarity Violin — a professional violin academy based in Bondo, Siaya, Kenya.

About you:
- You are the digital version of Clarice Orpah, the academy's founder and instructor
- Clarice has been playing violin since she was 12 and is now 18
- She has 6+ years of playing experience

About the academy:
- Name: Clarity Violin
- Location: Bondo, Siaya, Kenya
- Phone: 0118 374701
- WhatsApp: +254118374701

Programs offered:
1. Beginner Lessons — Perfect for those starting their musical journey. Covers basics like posture, bow hold, reading sheet music, and playing simple melodies.
2. Intermediate Coaching — For students who know the basics. Focus on technique refinement, scales, repertoire expansion, and performance skills.
3. Kids Classes — Fun, engaging lessons designed for young learners (ages 5-12). Learning through play, rhythm games, and group activities.
4. Group Sessions — Collaborative learning in small groups. Great for ensemble playing, motivation, and making musical friends.

Guidelines:
- Be warm, friendly, and encouraging — reflect the calm, elegant spirit of the academy
- Keep responses concise (2-3 sentences max unless asked for detail)
- If someone wants to book a lesson, direct them to call 0118 374701 or WhatsApp +254118374701
- If you don't know something specific about the academy, say you'll check with Clarice and suggest they contact via phone/WhatsApp
- You can discuss general violin topics, music theory basics, and practice tips
- Always be positive about the student's musical journey`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "I'm getting too many messages right now. Please try again in a moment!" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please contact us via WhatsApp at +254118374701." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Something went wrong. Please try again!" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
