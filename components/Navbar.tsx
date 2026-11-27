"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/schools", label: "Schools" },
  { href: "/conferences", label: "Conferences" },
  { href: "/about", label: "About" },
  { href: "/feedback", label: "Feedback" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="site-nav__inner">
        <Link className="site-nav__brand" href="/">
          <Image
            src="/simple-celebrate-transparent-logo.png"
            alt="Celebrate The Game"
            width={220}
            height={80}
          />
        </Link>

        <button
          ref={menuButtonRef}
          className="site-nav__toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="site-nav__toggle-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          Menu
        </button>

        <div
          className="site-nav__links"
          id="primary-navigation"
          data-open={isMenuOpen}
        >
          {navigationLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
