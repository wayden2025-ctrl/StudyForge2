import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "You must be logged in to share." }, { status: 401 });
    }

    const tier = user.user_metadata?.subscription_tier || "free";
    if (tier !== "pro" && tier !== "max") {
      return NextResponse.json({ error: "Sharing is a Pro-exclusive feature. Please upgrade!" }, { status: 403 });
    }

    const body = await req.json();
    const { title, summary, key_concepts, detailed_notes, mnemonics } = body;

    if (!title || !summary) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Insert the note as shared
    const { data: note, error } = await supabase
      .from("saved_notes")
      .insert({
        user_id: user.id,
        title,
        summary,
        key_concepts,
        detailed_notes,
        mnemonics,
        is_shared: true,
      })
      .select("share_token")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to create shared note. Make sure you've run the sharing SQL migration." }, { status: 500 });
    }

    return NextResponse.json({ share_token: note.share_token });
  } catch (err: any) {
    console.error("Share note error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
