"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FeedbackButton() {
  const pathname = usePathname();

  return (
    <Link
      href={`/feedback?page=${encodeURIComponent(
        pathname
      )}`}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#1B5E20",
        color: "white",
        padding: "12px 20px",
        borderRadius: "999px",
        textDecoration: "none",
        fontWeight: "bold",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        zIndex: 1000,
      }}
    >
      Suggest an Edit
    </Link>
  );
}