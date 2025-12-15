"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import styles from "./PillNav.module.css";

export default function PillNav({
  items,
  activeHref,
  ease = "power3.out",
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const circleRefs = useRef([]);
  const labelRefs = useRef([]);
  const hoverLabelRefs = useRef([]);
  const timelines = useRef([]);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Detect mobile breakpoint
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close menu when link is clicked
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen]);

  // Desktop animation setup
  useEffect(() => {
    if (isMobile) return; // Skip on mobile

    const layout = () => {
      circleRefs.current.forEach((circle, i) => {
        if (!circle || !circle.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = labelRefs.current[i];
        const hoverLabel = hoverLabelRefs.current[i];

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

        timelines.current[i]?.kill();

        const tl = gsap.timeline({ paused: true });

        const DURATION = 0.45;

        tl.to(
          circle,
          {
            scale: 1.2,
            xPercent: -50,
            duration: DURATION,
            ease,
          },
          0
        );

        tl.to(
          label,
          {
            y: -(h + 8),
            duration: DURATION,
            ease,
          },
          0
        );

        tl.to(
          hoverLabel,
          {
            y: 0,
            opacity: 1,
            duration: DURATION,
            ease,
          },
          0
        );

        timelines.current[i] = tl;
      });
    };

    layout();
    window.addEventListener("resize", layout);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    return () => window.removeEventListener("resize", layout);
  }, [items, ease, isMobile]);

  // Mobile Menu
  if (isMobile) {
    return (
      <div className={styles.mobileContainer}>
        {/* Hamburger Button */}
        <button
          ref={hamburgerRef}
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>

        {/* Mobile Menu */}
        <nav
          ref={menuRef}
          className={`${styles.mobileNav} ${menuOpen ? styles.open : ""}`}
          aria-label="Mobile navigation"
        >
          <ul className={styles.mobileList}>
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.mobileLink} ${
                    activeHref === item.href ? styles.mobileActive : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }

  // Desktop Navigation (Original)
  return (
    <div className={styles.container}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <ul className={styles.list}>
          {items.map((item, i) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.pill} ${
                  activeHref === item.href ? styles.active : ""
                }`}
                onMouseEnter={() => timelines.current[i]?.play()}
                onMouseLeave={() => timelines.current[i]?.reverse()}
              >
                <span
                  className={styles.hoverCircle}
                  ref={(el) => (circleRefs.current[i] = el)}
                  aria-hidden
                />

                <span className={styles.labelStack}>
                  <span
                    className={styles.label}
                    ref={(el) => (labelRefs.current[i] = el)}
                  >
                    {item.label}
                  </span>
                  <span
                    className={styles.labelHover}
                    ref={(el) => (hoverLabelRefs.current[i] = el)}
                    aria-hidden
                  >
                    {item.label}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}