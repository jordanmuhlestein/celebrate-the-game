import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ConferencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
const { slug } = await params;

const { data } = await supabase
  .from("conferences")
  .select("*")
  .eq("ConferenceSlug", slug)
  .single();

if (!data) {
  return <div>Conference not found.</div>;
}
console.log(data);

  const { data: schools } = await supabase
    .from("schools")
    .select(`
  SchoolID,
  SchoolName,
  SchoolSlug,
  Nickname,
  PrimaryColor,
  SecondaryColor
`)
    .eq("ConferenceID", data.ConferenceID)
    .order("SchoolName");

  return (
    <main style={{ padding: "20px" }}>
      <p>
        <Link href="/conferences">
          ← Back to Conferences Directory
        </Link>
      </p>

      <div
  style={{
    backgroundColor: data.ConferencePrimaryColor,
    color: data.ConferenceSecondaryColor,
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    marginBottom: "20px",
  }}
>
  <div
    style={{
      fontSize: "3rem",
      fontWeight: "bold",
    }}
  >
    {data.ConferenceAbbreviation}
  </div>

  <div
    style={{
      fontSize: "1.3rem",
      marginTop: "8px",
    }}
  >
    {data.ConferenceName}
  </div>
</div>

      <p
  style={{
    fontSize: "1.25rem",
    fontWeight: "bold",
  }}
>
  {schools?.length} Member Schools
</p>

      

      <p>
        <strong>Founded:</strong>{" "}
        {data.FoundedYear}
      </p>

      <h2>About the Conference</h2>

      <p>{data.ConferenceDescription}</p>

      <p>
        <strong>Website:</strong>{" "}
        <a
          href={data.Website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.Website}
        </a>
      </p>

      <h2>
  Member Schools ({schools?.length})
</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px",
    marginTop: "20px",
  }}
>
  {schools?.map((school) => (
    <Link
      key={school.SchoolID}
      href={`/schools/${school.SchoolSlug}`}
      style={{
        textDecoration: "none",
      }}
    >
      <div
        style={{
          backgroundColor:
            school.PrimaryColor || "#333333",
          color:
            school.SecondaryColor || "#FFFFFF",
          borderRadius: "12px",
          padding: "16px",
          textAlign: "center",
          fontWeight: "bold",
          minHeight: "90px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div>{school.SchoolName}</div>

        {school.Nickname && (
          <div
            style={{
              fontSize: ".85rem",
              marginTop: "6px",
              opacity: 0.9,
            }}
          >
            {school.Nickname}
          </div>
        )}
      </div>
    </Link>
  ))}
  
</div>
<Link
  href={`/feedback?page=${encodeURIComponent(
    `/conferences/${slug}`
  )}`}
>
  Suggest a correction or improvement
</Link>
    </main>
  );
}