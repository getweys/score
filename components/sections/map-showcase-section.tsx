"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CdnScrollPlayer, CdnVideoEmbed } from "@/components/ui/cdn-scroll-player";
import { VideoMuteToggle } from "@/components/ui/video-mute-toggle";
import {
  mapSectionImage,
  mapSectionVideoPoster,
  mapSectionVideoSrc,
  mapSectionVideoTitle,
  projectBody,
  projectHeading,
} from "@/lib/site-content";
import { clipReveal, fadeUp, fadeUpBlur, headerStagger, viewportOnce } from "@/lib/motion-variants";

function MapVideoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-secondary/5">{children}</div>
  );
}

export function MapShowcaseSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <section
      ref={sectionRef}
      id="m9-map"
      className="relative w-full scroll-mt-20 overflow-hidden border-t border-brand-green/15 bg-surface-green py-8 sm:py-12 lg:py-16"
      aria-labelledby="m9-map-heading"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-4 pb-8 sm:px-6 sm:pb-10 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pb-12">
        <motion.header
          className="min-w-0 text-left"
          variants={headerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.h2
            id="m9-map-heading"
            className="text-xl font-bold tracking-tight text-secondary sm:text-3xl"
            variants={fadeUpBlur}
          >
            {projectHeading}
          </motion.h2>
          <motion.p
            className="mt-3 text-justify text-xs leading-relaxed text-slate-600 sm:mt-5 sm:text-sm sm:leading-7"
            variants={fadeUp}
          >
            {projectBody}
          </motion.p>
        </motion.header>

        <motion.div
          className="relative w-full"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Image
            src={mapSectionImage}
            alt="M-9 Motorway route map linking Karachi and Hyderabad"
            width={1200}
            height={900}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full"
            priority={false}
          />
        </motion.div>
      </div>
      {reduceMotion ? (
        <MapVideoFrame>
          <CdnVideoEmbed
            videoSrc={mapSectionVideoSrc}
            title={mapSectionVideoTitle}
            posterSrc={mapSectionVideoPoster}
            isMuted={isMuted}
          />
          <VideoMuteToggle
            isMuted={isMuted}
            onToggle={() => setIsMuted((muted) => !muted)}
            label="M-9 project video"
          />
        </MapVideoFrame>
      ) : (
        <motion.div
          variants={clipReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <MapVideoFrame>
            <CdnScrollPlayer
              videoSrc={mapSectionVideoSrc}
              title={mapSectionVideoTitle}
              posterSrc={mapSectionVideoPoster}
              hostWrapRef={sectionRef}
              isMuted={isMuted}
            />
            <VideoMuteToggle
              isMuted={isMuted}
              onToggle={() => setIsMuted((muted) => !muted)}
              label="M-9 project video"
            />
          </MapVideoFrame>
        </motion.div>
      )}
    </section>
  );
}
