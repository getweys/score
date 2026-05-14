"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/lib/site-content";
import { teamHeading, teamMembers, teamSubheading } from "@/lib/site-content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion-variants";

export function TeamSection() {
  const firstRow = teamMembers.slice(0, 4);
  const secondRow = teamMembers.slice(4);

  return (
    <section className="bg-zinc-50/80 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.h3
          className="text-center text-2xl font-bold tracking-tight text-secondary sm:text-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          {teamHeading}
        </motion.h3>
        <motion.p
          className="mt-3 text-center text-base text-zinc-600 sm:text-lg"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ delay: 0.05 }}
        >
          {teamSubheading}
        </motion.p>

        <motion.div
          className="mt-12 grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {firstRow.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </motion.div>

        <motion.div
          className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {secondRow.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i + 4} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

function TeamCard({ member, index }: TeamCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      variants={fadeUp}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -4 }}
    >
      <div className="relative size-28 overflow-hidden rounded-full border-2 border-white shadow-lg ring-2 ring-zinc-100 transition hover:ring-primary/30 sm:size-32 lg:size-36">
        <Image src={member.imageSrc} alt={member.name} fill className="object-cover" sizes="144px" />
      </div>
      <h4 className="mt-4 text-sm font-bold text-secondary sm:text-base">{member.name}</h4>
      <p className="mt-1 max-w-[14rem] text-xs leading-snug text-zinc-600 sm:text-sm">{member.role}</p>
    </motion.div>
  );
}
