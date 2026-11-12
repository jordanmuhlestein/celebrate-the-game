"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FeedbackPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const sourcePage =
    searchParams.page || "/";

  const [feedbackType, setFeedbackType] =
    useState("General Feedback");

  const [feedbackText, setFeedbackText] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("feedback")
      .insert([
        {
          sourcepage: sourcePage,
          feedbacktype: feedbackType,
          feedbacktext: feedbackText,
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setSubmitted(true);
    setFeedbackText("");
  }

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      <h1>Feedback</h1>

      <p>
        Thank you for helping improve
        Celebrate The Game.
      </p>

      <p
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ddd",
        }}
      >
        <strong>Page being reviewed:</strong>{" "}
        {sourcePage}
      </p>

      {submitted && (
        <div
          style={{
            backgroundColor: "#dff0d8",
            border: "1px solid #c3e6cb",
            color: "#155724",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          Thank you! Your feedback has
          been submitted.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          <strong>Feedback Type</strong>
        </label>

        <select
          value={feedbackType}
          onChange={(e) =>
            setFeedbackType(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "6px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          <option>
            General Feedback
          </option>

          <option>
            Correction
          </option>

          <option>
            Bug Report
          </option>

          <option>
            New Feature Idea
          </option>
        </select>

        <label>
          <strong>Your Feedback</strong>
        </label>

        <textarea
          value={feedbackText}
          onChange={(e) =>
            setFeedbackText(
              e.target.value
            )
          }
          rows={8}
          required
          placeholder="Share a correction, suggestion, bug report, or idea..."
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "6px",
            border: "2px solid #cfcfcf",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            fontSize: "1rem",
            resize: "vertical",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#1B5E20",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading
            ? "Submitting..."
            : "Submit Feedback"}
        </button>
      </form>
    </main>
  );
}