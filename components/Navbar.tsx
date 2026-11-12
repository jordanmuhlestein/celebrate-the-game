import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#1B5E20",
        borderBottom: "3px solid #0f3d14",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "800",
            fontSize: "1.4rem",
            letterSpacing: "0.5px",
          }}
        >
          CELEBRATE THE GAME
        </Link>

        <div
          style={{
            display: "flex",
            gap: "24px",
          }}
        >
          <Link
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Home
          </Link>

          <Link
            href="/schools"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Schools
          </Link>

          <Link
            href="/conferences"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Conferences
          </Link>

          <Link
  href="/feedback"
  style={{
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
  }}
>
  Feedback
</Link>
        </div>
      </div>
    </nav>
  );
}