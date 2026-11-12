import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function SchoolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

const { data } = await supabase
  .from("schools")
  .select(`
    *,
    conferences (
  ConferenceID,
  ConferenceName,
  ConferenceSlug,
  ConferenceAbbreviation,
  ConferencePrimaryColor,
  ConferenceSecondaryColor
)
  `)
  .eq("SchoolSlug", slug)
  .single();

  if (!data) {
    return <div>School not found.</div>;
  }
const { data: rivalries } = await supabase
  .from("rivalries")
  .select("*")
  .eq("SchoolID", data.SchoolID);






  return (
    <main style={{ padding: "20px" }}>
      <p>
        <Link href="/schools">
          ← Back to Schools Directory
        </Link>
      </p>

      <div
  style={{
    backgroundColor: data.PrimaryColor || "#333333",
    color: data.SecondaryColor || "#FFFFFF",
    padding: "24px",
    borderRadius: "12px",
    textAlign: "center",
    marginBottom: "20px",
  }}
>
  <div
  style={{
    fontSize: "2.25rem",
    fontWeight: "bold",
  }}
>
  {data.SchoolName}
</div>

{data.Nickname && (
  <div
    style={{
      fontSize: "1.4rem",
      marginTop: "10px",
      fontWeight: "500",
    }}
  >
    {data.Nickname}
  </div>
)}


</div>

      <div
  style={{
    marginBottom: "20px",
    textAlign: "center",
  }}
>
  <div
    style={{
      fontSize: "1.1rem",
      fontWeight: "bold",
    }}
  >
    {data.City}, {data.State}
  </div>
</div>

      <div
  style={{
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  }}
>
  {data.conferences && (
    <Link
      href={`/conferences/${data.conferences.ConferenceSlug}`}
      style={{
        backgroundColor:
          data.conferences.ConferencePrimaryColor,
        color:
          data.conferences.ConferenceSecondaryColor,
        padding: "8px 16px",
        borderRadius: "999px",
        textDecoration: "none",
        fontWeight: "bold",
      }}
    >
      {data.conferences.ConferenceAbbreviation}
    </Link>
  )}
</div>

     <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "20px",
  }}
>
  <div
    style={{
      border: "1px solid #ccc",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    }}
  >
    <h2
  style={{
    backgroundColor: data.PrimaryColor,
    color: data.SecondaryColor,
    margin: "-20px -20px 20px -20px",
    padding: "12px",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    fontSize: "1rem",
  }}
>
  <b>School Snapshot</b>
</h2>

    <p>
      <strong>Founded:</strong> {data.FoundingYear}
    </p>

    <p>
      <strong>Enrollment:</strong> {data.Enrollment}
    </p>

    <p>
      <strong>Type:</strong> {data.UniversityType}
    </p>

    <p>
      <strong>Motto:</strong> {data.Motto}
    </p>
  </div>

  <div
    style={{
      border: "1px solid #ccc",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    }}
  >
    <h2><b>School Colors</b></h2>

    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "6px",
          backgroundColor: data.PrimaryColor,
          border: "1px solid #ccc",
        }}
      />

      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "6px",
          backgroundColor: data.SecondaryColor,
          border: "1px solid #ccc",
        }}
      />
    </div>

    <p>{data.SchoolColors}</p>
  </div>

  <div
    style={{
      border: "1px solid #ccc",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    }}
  >
<h2
  style={{
    backgroundColor: data.PrimaryColor,
    color: data.SecondaryColor,
    margin: "-20px -20px 20px -20px",
    padding: "12px",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    fontSize: "1rem",
  }}
>
  <b>Campus Highlights</b>
</h2>
    <p>{data.CampusLandmarks}</p>
  </div>

  <div
    style={{
      border: "1px solid #ccc",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    }}
  >
    <h2
  style={{
    backgroundColor: data.PrimaryColor,
    color: data.SecondaryColor,
    margin: "-20px -20px 20px -20px",
    padding: "12px",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    fontSize: "1rem",
  }}
>
  <b>Nearby Landmarks</b>
</h2>

    <p>{data.OffCampusLandmarks}</p>
  </div>

  <div
    style={{
      border: "1px solid #ccc",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    }}
  >
    <h2
  style={{
    backgroundColor: data.PrimaryColor,
    color: data.SecondaryColor,
    margin: "-20px -20px 20px -20px",
    padding: "12px",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    fontSize: "1rem",
  }}
>
  <b>Traditions</b>
</h2>

    <p>{data.SchoolWideTraditions}</p>
  </div>

  <div
    style={{
      border: "1px solid #ccc",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    }}
  >
    <h2
  style={{
    backgroundColor: data.PrimaryColor,
    color: data.SecondaryColor,
    margin: "-20px -20px 20px -20px",
    padding: "12px",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    fontSize: "1rem",
  }}
>
  <b>History</b>
</h2>

    <p>{data.SchoolHistory}</p>
  </div>
<div
  style={{
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  }}
>
  <h2
    style={{
      backgroundColor: data.PrimaryColor,
      color: data.SecondaryColor,
      margin: "-20px -20px 20px -20px",
      padding: "12px",
      borderTopLeftRadius: "12px",
      borderTopRightRadius: "12px",
      fontSize: "1rem",
    }}
  >
    Rivalries
  </h2>

 {rivalries && rivalries.length > 0 ? (
  rivalries.map((rivalry) => (
    <div
      key={rivalry.RivalryID}
      style={{
        marginBottom: "16px",
      }}
    >
    <strong>{rivalry.RivalryName}</strong>

{rivalry.OpponentName && (
  <div
    style={{
      marginTop: "6px",
      marginBottom: "6px",
      fontWeight: "bold",
    }}
  >
    vs {rivalry.OpponentName}
  </div>
)}

{rivalry.TrophyName && (
  <div>
    Trophy: {rivalry.TrophyName}
  </div>
)}

<div>{rivalry.Description}</div>
    </div>
  ))
) : (
  <p>No rivalry information available.</p>
)}
</div>

  <div
    style={{
      border: "1px solid #ccc",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      gridColumn: "1 / -1",
    }}
  >
    <h2
  style={{
    backgroundColor: data.PrimaryColor,
    color: data.SecondaryColor,
    margin: "-20px -20px 20px -20px",
    padding: "12px",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    fontSize: "1rem",
  }}
>
  
  <b>Visitor Information</b>
</h2>

    <p>{data.NotesForVisitingFans}</p>
  </div>
</div>
<Link
  href={`/feedback?page=${encodeURIComponent(
    `/schools/${slug}`
  )}`}
>
  Suggest a correction or improvement
</Link>
    </main>
  );
}