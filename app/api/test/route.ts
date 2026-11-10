import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("schools")
    .select("*")
    .limit(1);

  return Response.json({
    success: !error,
    error,
    data,
  });
}