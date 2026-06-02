"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { TeamMember } from "@/lib/site-content";
import {
  boardOfDirectors,
  companyManagement,
  teamEyebrow,
  teamHeading,
  teamPageHeroImage,
  teamSubheading,
} from "@/lib/site-content";
import { fadeUp, headerStagger, staggerContainer, viewportOnce } from "@/lib/motion-variants";
import { TeamMemberTile } from "@/components/sections/team-section";

const teamGridClass =
  "mt-8 flex w-full flex-wrap justify-center gap-x-6 gap-y-11 sm:mt-10 sm:gap-x-10 sm:gap-y-14 lg:gap-x-12 lg:gap-y-16";

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
        className="text-center text-xl font-bold text-secondary sm:text-2xl lg:text-[1.65rem]"
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

function TeamPageHero() {
  return (
    <section className="relative isolate overflow-hidden bg-secondary">
      <Image src={teamPageHeroImage} alt="" fill className="object-cover object-center" sizes="100vw" priority />
      <motion.div className="absolute inset-0 bg-linear-to-r from-secondary/90 via-secondary/75 to-secondary/60" aria-hidden />
      <motion.div
        className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        variants={headerStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="mb-4 text-sm text-white/70">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-white/40">
              /
            </li>
            <li className="font-medium text-white">{teamHeading}</li>
          </ol>
        </motion.nav>
        <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.22em] text-primary sm:text-sm">
          {teamEyebrow}
        </motion.p>
        <motion.h1 variants={fadeUp} className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {teamHeading}
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
          {teamSubheading}
        </motion.p>
      </motion.div>
    </section>
  );
}

export function TeamPageContent() {
  return (
    <>
      <TeamPageHero />
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <motion.div className="mx-auto max-w-7xl space-y-16 px-4 sm:space-y-20 sm:px-6 lg:space-y-24 lg:px-8">
          <TeamGroupSection title="Board of Directors" members={boardOfDirectors} />
          <TeamGroupSection title="Company Management" members={companyManagement} />
        </motion.div>
      </section>
    </>
  );
}
