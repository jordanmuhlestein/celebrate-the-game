"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type School = {
  SchoolID: number;
  SchoolName: string;
  Nickname: string | null;
  City: string | null;
  State: string | null;
  FoundingYear: number | null;
  SchoolSlug: string;
  PrimaryColor: string | null;
  SecondaryColor: string | null;
  conferences?: {
    ConferenceAbbreviation: string;
    ConferencePrimaryColor: string;
    ConferenceSecondaryColor: string;
  };
};

export default function SchoolsDirectory({
  schools,
}: {
  schools: School[];
}) {
  const [search, setSearch] = useState("");

  const filteredSchools = useMemo(() => {
    const term = search.toLowerCase();

    return schools.filter((school) => {
      return (
        school.SchoolName?.toLowerCase().includes(term) ||
        school.Nickname?.toLowerCase().includes(term) ||
        school.City?.toLowerCase().includes(term) ||
        school.State?.toLowerCase().includes(term) ||
        school.conferences?.ConferenceAbbreviation
          ?.toLowerCase()
          .includes(term)
      );
    });
  }, [schools, search]);

  return (
    <>
      <input
        type="text"
        placeholder="Search schools, nicknames, cities, conferences..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "12px",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />

      <p>
        <strong>{filteredSchools.length}</strong> Schools Found
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {filteredSchools.map((school) => (
          <Link
            key={school.SchoolID}
            href={`/schools/${school.SchoolSlug}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "8px",
                padding: "16px",
                borderRadius: "8px",
                backgroundColor:
                  school.PrimaryColor || "#333333",
                color:
                  school.SecondaryColor || "#FFFFFF",
              }}
            >
              {school.SchoolName}
            </div>

            {school.Nickname && (
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  marginBottom: "12px",
                  fontSize: "1rem",
                }}
              >
                {school.Nickname}
              </div>
            )}

            <p>
              {school.City}, {school.State}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "8px",
              }}
            >
              <div>
                {school.FoundingYear && (
                  <>
                    <strong>Founded:</strong>{" "}
                    {school.FoundingYear}
                  </>
                )}
              </div>

              {school.conferences && (
                <div
                  style={{
                    backgroundColor:
                      school.conferences
                        .ConferencePrimaryColor,
                    color:
                      school.conferences
                        .ConferenceSecondaryColor,
                    padding: "4px 10px",
                    borderRadius: "999px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                  {
                    school.conferences
                      .ConferenceAbbreviation
                  }
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filteredSchools.length === 0 && (
        <p
          style={{
            marginTop: "20px",
            fontWeight: "bold",
          }}
        >
          No schools found.
        </p>
      )}
    </>
  );
}