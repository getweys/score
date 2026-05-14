"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { promoVideoSrc } from "@/lib/site-content";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";

function tryPlay(video: HTMLVideoElement | null) {
  if (!video) return;
  void video.play().catch(() => {});
}

export function PromoVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    tryPlay(videoRef.current);

    function onVisibilityChange() {
      if (document.visibilityState === "visible") tryPlay(videoRef.current);
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return (
    <section id="promo-video" className="scroll-mt-24 bg-white py-8 sm:py-10 lg:py-12" aria-label="Video">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="w-full bg-white"
        >
          <video
            ref={videoRef}
            className="mx-auto block h-auto w-full max-h-[min(88vh,920px)] bg-white"
            autoPlay
            muted
            playsInline
            loop
            controls
            preload="auto"
            onLoadedData={() => tryPlay(videoRef.current)}
          >
            <source src={promoVideoSrc} type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
}
