import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ConferencesPage() {
  const { data: conferences, error } = await supabase
    .from("conferences")
    .select("*")
    .order("ConferenceName");

  const { data: schools } = await supabase
    .from("schools")
    .select("ConferenceID");

  const schoolCounts =
    schools?.reduce((acc, school) => {
      acc[school.ConferenceID] =
        (acc[school.ConferenceID] || 0) + 1;

      return acc;
    }, {} as Record<number, number>) || {};

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
      <h1>Conferences Directory</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {conferences?.map((conference) => (
          <Link
            key={conference.ConferenceID}
            href={`/conferences/${conference.ConferenceSlug}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "16px",
              boxShadow:
                "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "16px",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor:
                  conference.ConferencePrimaryColor,
                color:
                  conference.ConferenceSecondaryColor,
              }}
            >
              {conference.ConferenceAbbreviation}
            </div>

            <h2>{conference.ConferenceName}</h2>

            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              {schoolCounts[
                conference.ConferenceID
              ] || 0}{" "}
              Member Schools
            </p>

            {conference.FoundedYear > 0 && (
              <p>
                <strong>Founded:</strong>{" "}
                {conference.FoundedYear}
              </p>
            )}

            <p>
              {conference.ConferenceDescription}
            </p>
          </Link>
        ))}
      </div>

      <div
        style={{
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        <Link
          href="/feedback?page=/conferences"
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