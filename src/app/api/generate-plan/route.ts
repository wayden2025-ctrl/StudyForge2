import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { text, examDate } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text material is required" }, { status: 400 });
    }
    if (!examDate || typeof examDate !== "string") {
      return NextResponse.json({ error: "Exam date is required" }, { status: 400 });
    }

    // --- RATE LIMITS CHECK ---
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const now = new Date();
      let planCount = user.user_metadata?.plan_generation_count || 0;
      let lastResetStr = user.user_metadata?.plan_generation_last_reset;
      let lastReset = lastResetStr ? new Date(lastResetStr) : new Date(0);

      // Calculate current week's Monday at 00:00:00
      const currentMonday = new Date(now);
      const day = currentMonday.getDay();
      const diff = currentMonday.getDate() - day + (day === 0 ? -6 : 1);
      currentMonday.setDate(diff);
      currentMonday.setHours(0, 0, 0, 0);

      // Check if last reset was before this week's Monday
      if (lastReset.getTime() < currentMonday.getTime()) {
        planCount = 0; // reset
        lastResetStr = now.toISOString();
      }

      // Check subscription tier
      const tier = user.user_metadata?.subscription_tier || "free";
      
      let limit = 5; // Free
      if (tier === "pro") limit = 50;
      if (tier === "max") limit = Infinity;

      if (planCount >= limit) {
        return NextResponse.json(
          { error: `You have reached your limit of ${limit} plan generation(s) this week on the ${tier} tier. Upgrade for more!` },
          { status: 403 }
        );
      }

      // Update generation count and reset date
      await supabase.auth.updateUser({
        data: { 
          plan_generation_count: planCount + 1,
          plan_generation_last_reset: lastResetStr || now.toISOString()
        }
      });
    }

    if (!process.env.GROQ_API_KEY && !process.env.OPENAI_API_KEY) {
      // Simulate response if no API keys
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({
        summary: "API keys are missing. Unable to generate real study plan.",
        plan: [
          {
            day: 1,
            date: new Date().toISOString().split('T')[0],
            topics: ["Placeholder Topic 1"],
            activities: ["Review provided text", "Rest"]
          }
        ]
      });
    }

    const isGroq = !!process.env.GROQ_API_KEY;
    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY,
      baseURL: isGroq ? "https://api.groq.com/openai/v1" : undefined,
    });

    const prompt = `
      You are an expert academic planner. Analyze the following educational material/topics and create a detailed, structured, day-by-day study plan leading up to the exam date.
      
      Current Date: ${new Date().toISOString().split('T')[0]}
      Exam Date: ${examDate}
      
      Instructions:
      1. Distribute the study material logically across the available days.
      2. Include rest days or light review days if there is enough time.
      3. The final day(s) should focus on practice and review, not new material.
      4. For EVERY single day of studying, ensure the final activity is a light review in bed (e.g. "Review today's key concepts in bed before sleep").
      5. If there are extra days beyond the required time to cover the material, fill those extra days with diverse review strategies (e.g. mock exams, flashcard marathons, teaching the concept aloud).
      
      Return ONLY a JSON object with the exact following structure:
      {
        "summary": "A brief encouraging overview of this study strategy",
        "plan": [
          {
            "day": 1,
            "date": "YYYY-MM-DD",
            "topics": ["Topic 1", "Topic 2"],
            "activities": ["Read chapter X", "Create flashcards", "Practice quiz"]
          }
        ]
      }
      
      Text/Topics to analyze:
      ${text.substring(0, 5000)}
    `;

    const completion = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: isGroq ? "llama-3.1-8b-instant" : "gpt-4o-mini",
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content generated");
    }

    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);

  } catch (error: any) {
    console.error("Plan generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate study plan. Please try again." },
      { status: 500 }
    );
  }
}
