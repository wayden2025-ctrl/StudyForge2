import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  if (user.email === "wayden2025@gmail.com") {
    const { error } = await supabase.auth.updateUser({
      data: { subscription_tier: "max" }
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Successfully upgraded wayden2025@gmail.com to the MAX plan! Refresh your app." 
    });
  }

  return NextResponse.json({ error: "Unauthorized email" }, { status: 403 });
}
