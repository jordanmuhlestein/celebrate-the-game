import Link from "next/link";
import { supabase } from "@/lib/supabase";
import SchoolsDirectory from "./SchoolsDirectory";

export default async function SchoolsPage() {
  const { data: schools, error } = await supabase
    .from("schools")
    .select(`
      SchoolID,
      SchoolName,
      Nickname,
      City,
      State,
      FoundingYear,
      SchoolSlug,
      PrimaryColor,
      SecondaryColor,
      conferences (
        ConferenceAbbreviation,
        ConferencePrimaryColor,
        ConferenceSecondaryColor
      )
    `)
    .order("SchoolName");

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1>Schools Directory</h1>

      <SchoolsDirectory schools={schools || []} />

      <div
        style={{
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        <Link
          href="/feedback?page=/schools"
          style={{
            color: "#1B5E20",
            fontWeight: "bold",
          }}
        >
          Suggest a correction or improvement
        </Link>
      </div>
    </main>
  );
}