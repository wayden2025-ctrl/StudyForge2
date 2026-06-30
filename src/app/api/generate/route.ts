import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // --- FREEMIUM LIMITS CHECK ---
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const now = new Date();
      let genCount = user.user_metadata?.generation_count || 0;
      let lastResetStr = user.user_metadata?.generation_last_reset;
      let lastReset = lastResetStr ? new Date(lastResetStr) : new Date(0);

      // Calculate current week's Monday at 00:00:00
      const currentMonday = new Date(now);
      const day = currentMonday.getDay();
      const diff = currentMonday.getDate() - day + (day === 0 ? -6 : 1);
      currentMonday.setDate(diff);
      currentMonday.setHours(0, 0, 0, 0);

      // Check if last reset was before this week's Monday
      if (lastReset.getTime() < currentMonday.getTime()) {
        genCount = 0; // reset
        lastResetStr = now.toISOString();
      }

      const tier = user.user_metadata?.subscription_tier || "free";
      
      let limit = 5; // Free
      if (tier === "pro" || tier === "max") limit = Infinity;

      if (genCount >= limit) {
        return NextResponse.json(
          { error: `You have reached your limit of ${limit} generations this week. Upgrade to Pro/MAX for more!` },
          { status: 403 }
        );
      }

      // Update generation count and reset date
      await supabase.auth.updateUser({
        data: { 
          generation_count: genCount + 1,
          generation_last_reset: lastResetStr || now.toISOString()
        }
      });
    }
    // Anonymous usage (up to 3) is tracked strictly on the client side in localStorage via Zustand.
    // ----------------------------

    if (!process.env.GROQ_API_KEY && !process.env.OPENAI_API_KEY) {
  // No API key configured – cannot generate real study materials.
  // Return empty results and a helpful message.
  await new Promise(resolve => setTimeout(resolve, 1500));
  return NextResponse.json({
    summary: "API keys are missing. Unable to generate study materials.",
    flashcards: [],
    quiz: [],
    key_concepts: [],
    mnemonics: []
  });
}
    const isGroq = !!process.env.GROQ_API_KEY;
    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY,
      baseURL: isGroq ? "https://api.groq.com/openai/v1" : undefined,
    });

    const prompt = `
      Analyze the following educational text/notes and generate study materials.
      IMPORTANT: Generate the MAXIMUM possible number of flashcards based on the provided text. If there is a large amount of information, extract a comprehensive set of flashcards to cover all details. If the provided text is very short, generating only 2 flashcards is acceptable. Extract as much value as possible depending on the information given.
      Return ONLY a JSON object with the exact following structure:
      {
        "summary": "A concise summary of the text",
        "flashcards": [
          {"question": "...", "answer": "..."}
        ],
        "quiz": [
          {
            "question": "...",
            "options": ["A", "B", "C", "D"],
            "correct": "Exact string of correct option"
          }
        ],
        "key_concepts": [
          {"title": "concept 1 title", "description": "detailed simplified explanation"}
        ],
        "detailed_notes": "<Generate a highly detailed, well-structured version of the notes in markdown format here. Use bullet points, clear headings, and clean formatting. Make it significantly more comprehensive than the summary or key concepts.>",
        "mnemonics": ["mnemonic 1", "mnemonic 2"]
      }
      
      Text to analyze:
      ${text.substring(0, 5000)}
    `;

    const completion = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: isGroq ? "llama-3.1-8b-instant" : "gpt-4o-mini",
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Failed to generate content");
    }

    const parsedData = JSON.parse(content as string);
    console.log("Keys returned by AI:", Object.keys(parsedData));
    if (!parsedData.detailed_notes) {
      console.warn("AI did not generate detailed_notes!");
    }
    return NextResponse.json(parsedData);

  } catch (error) {
    const err = error as { message?: string };
    console.error("API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to generate study materials" }, { status: 500 });
  }
}
