import { NextResponse } from "next/server";
import OpenAI from "openai";

const MOCK_RESPONSE = {
  summary: "This is a generated summary of your notes. It highlights the main ideas and simplifies complex topics.",
  flashcards: [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What does HTML stand for?", answer: "HyperText Markup Language" },
  ],
  quiz: [
    {
      question: "Which of the following is a primary color?",
      options: ["Green", "Purple", "Red", "Orange"],
      correct: "Red"
    }
  ],
  key_concepts: [
    { title: "Concept 1: Definition", description: "This is a detailed explanation of the first concept based on your notes." },
    { title: "Concept 2: Application", description: "This explains how to apply the second concept." }
  ],
  mnemonics: ["ROYGBIV for rainbow colors"]
};

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY && !process.env.OPENAI_API_KEY) {
      console.warn("API keys are missing. Returning mock data.");
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json(MOCK_RESPONSE);
    }

    // Use Groq if available, otherwise fallback to OpenAI
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
        "mnemonics": ["mnemonic 1", "mnemonic 2"]
      }
      
      Text to analyze:
      ${text.substring(0, 5000)}
    `;

    const completion = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: isGroq ? "llama-3.1-8b-instant" : "gpt-4o-mini", // fast and reliable for JSON on Groq
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Failed to generate content");
    }

    const parsedData = JSON.parse(content);
    return NextResponse.json(parsedData);

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate study materials" }, { status: 500 });
  }
}
