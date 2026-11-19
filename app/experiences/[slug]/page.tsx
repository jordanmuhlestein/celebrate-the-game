import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: experience } = await supabase
    .from("experiences")
    .select(`
      *,
      schools (
        SchoolID,
        SchoolName,
        SchoolSlug,
        PrimaryColor,
        SecondaryColor
      )
    `)
    .eq("experience_slug", slug)
    .single();

  if (!experience) {
    return <div>Experience not found.</div>;
  }

const school = experience.schools;

const { data: heroPhoto } = await supabase
  .from("experience_photos")
  .select("*")
  .eq(
    "experience_id",
    experience.experience_id
  )
  .eq("featured_flag", true)
  .single();

  console.log(
  "Experience ID:",
  experience.experience_id
);

console.log(
  "Hero Photo:",
  heroPhoto
);

const { data: relatedExperiences } = await supabase
  .from("experiences")
  .select("*")
  .eq("school_id", experience.school_id)
  .neq(
    "experience_id",
    experience.experience_id
  )
  .order("display_order");
  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <p>
        <Link
          href={`/schools/${school?.SchoolSlug}`}
        >
          ← Back to {school?.SchoolName}
        </Link>
      </p>

      <div
        style={{
          backgroundColor:
            school?.PrimaryColor || "#333333",
          color:
            school?.SecondaryColor || "#FFFFFF",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            marginBottom: "10px",
          }}
        >
          {experience.icon_emoji}
        </div>

        <h1
          style={{
            margin: 0,
          }}
        >
          {experience.experience_name}
        </h1>

        <div
          style={{
            marginTop: "10px",
            fontSize: "1.1rem",
          }}
        >
          {"⭐".repeat(
            experience.ctg_rating || 1
          )}
        </div>

        <div
          style={{
            marginTop: "10px",
          }}
        >
          {experience.experience_type}
        </div>
      </div>

  
      {heroPhoto && (
  <div
    style={{
      marginBottom: "20px",
    }}
  >
    <img
  src={heroPhoto.photo_url}
  alt={heroPhoto.caption || experience.experience_name}
  style={{
    width: "100%",
    height: "auto",
    borderRadius: "12px",
    display: "block",
  }}
/>

    <div
      style={{
        fontSize: ".85rem",
        color: "#666",
        marginTop: "8px",
      }}
    >
      Photo:
      {" "}
      {heroPhoto.creator}
      {" • "}
      {heroPhoto.license}
    </div>
  </div>
)}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "20px",
            boxShadow:
              "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              backgroundColor:
                school?.PrimaryColor,
              color:
                school?.SecondaryColor,
              margin:
                "-20px -20px 20px -20px",
              padding: "12px",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              fontSize: "1rem",
            }}
          >
            Experience Overview
          </h2>

          <p>
            {experience.full_description ||
              experience.short_description}
          </p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "20px",
            boxShadow:
              "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              backgroundColor:
                school?.PrimaryColor,
              color:
                school?.SecondaryColor,
              margin:
                "-20px -20px 20px -20px",
              padding: "12px",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              fontSize: "1rem",
            }}
          >
            Why It Matters
          </h2>

          <p>
            {experience.why_it_matters}
          </p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "20px",
            boxShadow:
              "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              backgroundColor:
                school?.PrimaryColor,
              color:
                school?.SecondaryColor,
              margin:
                "-20px -20px 20px -20px",
              padding: "12px",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              fontSize: "1rem",
            }}
          >
            Visitor Tip
          </h2>

          <p>
            {experience.visitor_tip}
          </p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "20px",
            boxShadow:
              "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              backgroundColor:
                school?.PrimaryColor,
              color:
                school?.SecondaryColor,
              margin:
                "-20px -20px 20px -20px",
              padding: "12px",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              fontSize: "1rem",
            }}
          >
            Planning Information
          </h2>

          <p>
            <strong>Best Time:</strong>{" "}
            {experience.best_time_to_experience}
          </p>

          <p>
            <strong>Audience:</strong>{" "}
            {experience.audience_type}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {experience.experience_type}
          </p>

          <p>
            <strong>Scope:</strong>{" "}
            {experience.sport_scope}
          </p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "20px",
            boxShadow:
              "0 2px 6px rgba(0,0,0,0.1)",
            gridColumn: "1 / -1",
          }}
        >
          <h2
            style={{
              backgroundColor:
                school?.PrimaryColor,
              color:
                school?.SecondaryColor,
              margin:
                "-20px -20px 20px -20px",
              padding: "12px",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              fontSize: "1rem",
            }}
          >
            Related School
          </h2>

          <p>
            This experience is part of the
            traditions and culture that make{" "}
            <Link
              href={`/schools/${school?.SchoolSlug}`}
            >
              {school?.SchoolName}
            </Link>{" "}
            unique.
          </p>
        </div>
      </div>

      <div
  style={{
    marginTop: "30px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "20px",
    boxShadow:
      "0 2px 6px rgba(0,0,0,0.1)",
  }}
>
  <h2
    style={{
      backgroundColor:
        school?.PrimaryColor,
      color:
        school?.SecondaryColor,
      margin:
        "-20px -20px 20px -20px",
      padding: "12px",
      borderTopLeftRadius: "12px",
      borderTopRightRadius: "12px",
      fontSize: "1rem",
    }}
  >
    More Experiences at {school?.SchoolName}
  </h2>

  {relatedExperiences &&
  relatedExperiences.length > 0 ? (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "16px",
      }}
    >
      {relatedExperiences.map(
        (related) => (
          <Link
            key={related.experience_id}
            href={`/experiences/${related.experience_slug}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                border:
                  "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                backgroundColor:
                  "#fafafa",
                height: "100%",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom:
                    "8px",
                }}
              >
                {related.icon_emoji}{" "}
                {related.experience_name}
              </div>

              <div
                style={{
                  fontSize: ".85rem",
                  color: "#666",
                  marginBottom:
                    "8px",
                }}
              >
                {related.experience_type}
              </div>

              <div
                style={{
                  fontSize: ".9rem",
                }}
              >
                {
                  related.short_description
                }
              </div>
            </div>
          </Link>
        )
      )}
    </div>
  ) : (
    <p>
      No related experiences
      available.
    </p>
  )}
</div>

      <div
        style={{
          marginTop: "30px",
        }}
      >
        <Link
          href={`/feedback?page=${encodeURIComponent(
            `/experiences/${slug}`
          )}`}
        >
          Suggest a correction or improvement
        </Link>
      </div>
    </main>
  );
}