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
    .select("SchoolID, SchoolName, SchoolSlug")
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

      <h2>Member Schools</h2>

      <ul>
        {schools?.map((school) => (
          <li key={school.SchoolID}>
            <Link href={`/schools/${school.SchoolSlug}`}>
              {school.SchoolName}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}