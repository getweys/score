"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/lib/site-content";
import { teamEyebrow, teamHeading, teamMembers, teamSubheading } from "@/lib/site-content";
import { fadeUp, fadeUpBlur, headerStagger, riseSoft, staggerContainer, viewportOnce } from "@/lib/motion-variants";

interface TeamMemberTileProps {
  member: TeamMember;
}

export function TeamMemberTile({ member }: TeamMemberTileProps) {
  return (
    <motion.div
      className="flex w-[calc(50%-0.75rem)] max-w-44 flex-col items-center text-center sm:w-[28%] sm:max-w-50 lg:w-[22%] lg:max-w-54"
      variants={riseSoft}
    >
      <div className="group relative mx-auto aspect-square w-full max-w-37 overflow-hidden rounded-full bg-zinc-100 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.22)] ring-[3px] ring-white transition duration-500 ease-out group-hover:shadow-[0_16px_44px_-14px_rgba(92,107,72,0.3)] group-hover:ring-primary/25 sm:max-w-42 lg:max-w-44">
        <Image
          src={member.imageSrc}
          alt={member.name}
          fill
          className="object-cover object-top transition duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 148px, 176px"
        />
      </div>
      <div className="pointer-events-none mt-1 h-px w-8 rounded-full bg-primary/35 opacity-80 sm:mt-1.5 sm:w-10" aria-hidden />
      <h3 className="mt-3 text-[0.8125rem] font-semibold leading-snug text-secondary sm:text-base">{member.name}</h3>
      <p className="mt-1.5 max-w-52 text-xs leading-snug text-slate-600 sm:text-[0.8125rem] sm:leading-relaxed">
        {member.role}
      </p>
    </motion.div>
  );
}

export function TeamSection() {
  return (
    <section
      id="team"
      className="relative scroll-mt-24 overflow-hidden border-t border-brand-green/15 bg-surface-green py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={headerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm"
            variants={fadeUp}
          >
            {teamEyebrow}
          </motion.p>
          <motion.h2
            className="mt-3 text-2xl font-bold leading-tight tracking-tight text-secondary sm:mt-4 sm:text-3xl lg:text-[2rem] xl:text-4xl"
            variants={fadeUpBlur}
          >
            {teamHeading}
          </motion.h2>
          <motion.p className="mt-2 text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg" variants={fadeUp}>
            {teamSubheading}
          </motion.p>

        </motion.div>

        <motion.div
          className="mt-10 flex w-full flex-wrap justify-center gap-x-4 gap-y-10 sm:mt-12 sm:gap-x-10 sm:gap-y-14 lg:mt-16 lg:gap-x-12 lg:gap-y-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {teamMembers.map((member) => (
            <TeamMemberTile key={member.name} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
