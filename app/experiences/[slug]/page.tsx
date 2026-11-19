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

const { data: photos } = await supabase
  .from("experience_photos")
  .select("*")
  .eq(
    "experience_id",
    experience.experience_id
  )
  .order("sort_order");
const heroPhoto =
  photos && photos.length > 0
    ? photos[0]
    : null;

   



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
      alt={
        heroPhoto.caption ||
        experience.experience_name
      }
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
  {heroPhoto.caption && (
    <div
      style={{
        marginBottom: "4px",
      }}
    >
      {heroPhoto.caption}
    </div>
  )}

  <div>
    Photo: {heroPhoto.creator}
    {" • "}
    {heroPhoto.license}
  </div>
</div>
  </div>
)}
 <h2
  style={{
    backgroundColor: school?.PrimaryColor,
    color: school?.SecondaryColor,
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "16px",
  }}
>
  Additional Photos
</h2>
{photos && photos.length > 1 && (
  <div
    style={{
      marginBottom: "20px",
      display: "grid",
      gridTemplateColumns:
  "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "12px",
    }}
  >
    {photos.slice(1).map((photo) => (
      <div
  key={photo.photo_id}
  style={{
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
  }}
>
        <img
  src={photo.photo_url}
  alt={photo.caption}
  style={{
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "contain",
  }}
/>

        <div
          style={{
            fontSize: ".8rem",
            color: "#666",
            marginTop: "6px",
            lineHeight: "1.4",
          }}
        >
          {photo.caption && (
            <div
              style={{
                marginBottom: "4px",
              }}
            >
              {photo.caption}
            </div>
          )}

          <div>
            Photo: {photo.creator}
            {" • "}
            {photo.license}
          </div>
        </div>
      </div>
    ))}
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
          "repeat(auto-fit, minmax(400px, 1fr))",
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