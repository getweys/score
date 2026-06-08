"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "home",
  "projects",
  "services",
  "team",
  "ceo-message",
  "contact",
  "financial",
  "layby",
] as const;

export type ActiveSectionId = (typeof SECTION_IDS)[number];

function getHeaderBottomScrollY(): number {
  const header = document.querySelector("header");
  if (!header) return window.scrollY + 96;
  const rect = header.getBoundingClientRect();
  return window.scrollY + rect.bottom + 6;
}

function computeActiveSection(): ActiveSectionId {
  const anchorY = getHeaderBottomScrollY();
  let active: ActiveSectionId = "home";
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= anchorY) active = id;
  }
  return active;
}

export function navHrefMatchesActiveSection({
  href,
  activeSection,
  pathname,
}: {
  href: string;
  activeSection: ActiveSectionId;
  pathname: string;
}): boolean {
  if (href === "/about") {
    return pathname === "/about";
  }
  if (href === "/team") {
    return pathname === "/team";
  }
  if (href === "/contact") {
    return pathname === "/contact";
  }
  if (href === "/financial") {
    return pathname === "/financial";
  }
  if (href === "/services") {
    return pathname === "/services";
  }
  if (href === "/" || href === "#home") {
    return pathname === "/" && (activeSection === "home" || activeSection === "projects");
  }
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return false;
  const hash = href.slice(hashIndex + 1);
  if (pathname !== "/" && hash) return false;
  return hash === activeSection;
}

export function useActiveSection(): ActiveSectionId {
  const [activeSection, setActiveSection] = useState<ActiveSectionId>("home");

  useEffect(() => {
    function update() {
      setActiveSection(computeActiveSection());
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return activeSection;
}
