import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { question, answer } = await req.json();

    const tier = user.user_metadata?.subscription_tier || "free";
    const limit = (tier === "pro" || tier === "max") ? 100 : 10;

    // Get first day of current month
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();

    // Check count of flashcards saved this month
    const { count, error: countError } = await supabase
      .from('saved_flashcards')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', firstDay);

    if (countError) throw countError;

    if (count !== null && count >= limit) {
      return NextResponse.json(
        { error: `Monthly limit reached. Your plan allows saving ${limit} flashcards per month.` },
        { status: 403 }
      );
    }

    // Insert flashcard
    const { error: insertError } = await supabase
      .from('saved_flashcards')
      .insert({
        user_id: user.id,
        question,
        answer
      });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Technical difficulties: We are currently unable to save new flashcards. Please try again later." },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    const err = error as { message?: string };
    console.error("API Error:", err);
    return NextResponse.json({ error: "Technical difficulties: We are currently unable to save new flashcards." }, { status: 500 });
  }
}
