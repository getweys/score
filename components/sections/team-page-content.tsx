"use client";

import { motion } from "framer-motion";
import type { TeamMember } from "@/lib/site-content";
import { PageHero } from "@/components/sections/page-hero";
import {
  boardOfDirectors,
  companyManagement,
  teamEyebrow,
  teamHeading,
  teamSubheading,
} from "@/lib/site-content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion-variants";
import { TeamMemberTile } from "@/components/sections/team-section";

const teamGridClass =
  "mt-8 flex w-full flex-wrap justify-center gap-x-4 gap-y-10 sm:mt-10 sm:gap-x-10 sm:gap-y-14 lg:gap-x-12 lg:gap-y-16";

interface TeamGroupSectionProps {
  title: string;
  members: TeamMember[];
}

function TeamGroupSection({ title, members }: TeamGroupSectionProps) {
  return (
    <motion.section
      className="scroll-mt-24"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.h2
        variants={fadeUp}
        className="text-center text-xl font-bold tracking-tight text-secondary sm:text-2xl lg:text-[1.65rem]"
      >
        {title}
      </motion.h2>
      <motion.div className={teamGridClass} variants={staggerContainer}>
        {members.map((member) => (
          <TeamMemberTile key={`${title}-${member.name}-${member.role}`} member={member} />
        ))}
      </motion.div>
    </motion.section>
  );
}

export function TeamPageContent() {
  return (
    <>
      <PageHero breadcrumbLabel={teamHeading} eyebrow={teamEyebrow} title={teamHeading} intro={teamSubheading} />
      <section className="border-t border-brand-green/15 bg-surface-green py-10 sm:py-16 lg:py-24">
        <motion.div className="mx-auto max-w-7xl space-y-16 px-4 sm:space-y-20 sm:px-6 lg:space-y-24 lg:px-8">
          <TeamGroupSection title="Board of Directors" members={boardOfDirectors} />
          <TeamGroupSection title="Company Management" members={companyManagement} />
        </motion.div>
      </section>
    </>
  );
}
