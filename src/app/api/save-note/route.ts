import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, summary, key_concepts, detailed_notes, mnemonics } = await req.json();

    const tier = user.user_metadata?.subscription_tier || "free";
    const noteLimit = (tier === "pro" || tier === "max") ? 20 : 1;

    // Get first day of current month
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();

    // Check count of notes saved this month
    const { count, error: countError } = await supabase
      .from('saved_notes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', firstDay);

    if (countError) throw countError;

    if (count !== null && count >= noteLimit) {
      return NextResponse.json(
        { error: `Monthly limit reached. Your plan allows saving ${noteLimit} study set(s) per month.` },
        { status: 403 }
      );
    }

    // Insert note
    const { error: insertError } = await supabase
      .from('saved_notes')
      .insert({
        user_id: user.id,
        title,
        summary,
        key_concepts,
        detailed_notes,
        mnemonics
      });

    if (insertError) throw insertError;

    return NextResponse.json({ success: true });

  } catch (error) {
    const err = error as { message?: string };
    console.error("API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to save note" }, { status: 500 });
  }
}
