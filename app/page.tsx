import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      <div
  style={{
    textAlign: "center",
    marginBottom: "60px",
    paddingTop: "40px",
  }}
>
  <Image
  src="/celebrate-the-game-logo.png"
  alt="Celebrate The Game"
  width={800}
  height={300}
  priority
  style={{
    maxWidth: "700px",
    width: "100%",
    height: "auto",
    margin: "0 auto 24px auto",
    display: "block",
  }}
/>

  <div
    style={{
      width: "120px",
      height: "4px",
      backgroundColor: "#1B5E20",
      margin: "0 auto 24px",
      borderRadius: "999px",
    }}
  />

  <p
    style={{
      fontSize: "1.4rem",
      fontWeight: "600",
      color: "#444",
      maxWidth: "800px",
      margin: "0 auto",
      lineHeight: "1.6",
    }}
  >
    Cheer for your team. Respect your opponent.
    Celebrate the game.
  </p>
</div>

      <div
  style={{
    backgroundColor: "#F7F8F4",
    borderLeft: "6px solid #1B5E20",
    padding: "36px",
    borderRadius: "12px",
    marginBottom: "50px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  }}
>
  <h2
    style={{
      marginTop: 0,
      color: "#1B5E20",
      fontSize: "1.75rem",
    }}
  >
    Our Mission
  </h2>

  <p
    style={{
      lineHeight: "1.9",
      fontSize: "1.1rem",
      color: "#333",
    }}
  >
    Celebrate The Game is a growing project dedicated
    to joyful, respectful fandom in college sports.
    We believe every school, team, rivalry,
    tradition, and game day experience has something
    worth celebrating. Whether you're preparing for a
    road trip, learning about a rival, introducing a
    child to college sports, or simply exploring the
    history and culture of the game, our goal is to
    help fans cheer passionately for their team while
    appreciating the people, traditions, and communities
    that make college athletics special.
  </p>
<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    marginBottom: "50px",
    flexWrap: "wrap",
  }}
><p>  </p>
  <div>
    <strong>138</strong>
    <br />
    Schools
  </div>

  <div>
    <strong>11</strong>
    <br />
    Conferences
  </div>

  <div>
    <strong>20+</strong>
    <br />
    Rivalries
  </div>
</div>
  <p
    style={{
      textAlign: "center",
      fontWeight: "700",
      fontSize: "1.2rem",
      color: "#1B5E20",
      marginTop: "30px",
    }}
  >
    Cheer for your team. Respect your opponent.
    Celebrate the game.
  </p>
  
</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "50px",
        }}
      >
        <Link
          href="/schools"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
  border: "1px solid #d7d7d7",
  borderRadius: "14px",
  padding: "32px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  height: "100%",
  transition: "all 0.2s ease",
  backgroundColor: "#FFFFFF",
}}
          >
            <h2
  style={{
    color: "#1B5E20",
    marginBottom: "16px",
  }}
>
  Schools Directory
</h2>

            <p>
              Explore schools across college football.
              Learn about traditions, rivalries, campus
              landmarks, histories, colors, and visitor
              information.
            </p>
          </div>
        </Link>

        <Link
          href="/conferences"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "24px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.1)",
              height: "100%",
            }}
          >
            <h2
  style={{
    color: "#1B5E20",
    marginBottom: "16px",
  }}
>
  Conferences Directory
</h2>

            <p>
              Browse conferences, discover member schools,
              and learn about the unique identities and
              traditions of each league.
            </p>
          </div>
        </Link>
      </div>

      <div
  style={{
    marginTop: "60px",
    textAlign: "center",
  }}
>
  <h2
    style={{
      color: "#1B5E20",
      marginBottom: "30px",
    }}
  >
    Explore College Sports
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
    }}
  >
    <div>School Histories</div>
    <div>Rivalries</div>
    <div>Traditions</div>
    <div>Campus Landmarks</div>
    <div>Visitor Information</div>
    <div>Conference Memberships</div>
  </div>
</div>
    </main>
  );
}