"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["home", "projects", "services", "team", "mission", "contact", "financial"] as const;

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
}: {
  href: string;
  activeSection: ActiveSectionId;
}): boolean {
  if (href === "/" || href === "#home") {
    return activeSection === "home" || activeSection === "projects";
  }
  if (!href.startsWith("#")) return false;
  return href.slice(1) === activeSection;
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
