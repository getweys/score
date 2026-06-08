"use client";

import { useEffect, useRef, type RefObject } from "react";
import type { Variants } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";
import {
  laybyBody,
  laybyEyebrow,
  laybyHeading,
  laybyYoutubeEmbedUrl,
  laybyYoutubeTitle,
  laybyYoutubeVideoId,
} from "@/lib/site-content";
import { fadeUp, fadeUpBlur, headerStagger, imageReveal, viewportOnce } from "@/lib/motion-variants";

const noMotion: Variants = {
  hidden: {},
  visible: {},
};

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  destroy: () => void;
};

type YTNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      width?: string;
      height?: string;
      playerVars?: Record<string, string | number>;
      events?: { onReady?: (event: { target: YTPlayer }) => void };
    }
  ) => YTPlayer;
};

function getYT(): YTNamespace | undefined {
  return (window as Window & { YT?: YTNamespace }).YT;
}

function loadYoutubeIframeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (getYT()?.Player) return Promise.resolve();

  return new Promise((resolve) => {
    const previous = (window as Window & { onYouTubeIframeAPIReady?: () => void })
      .onYouTubeIframeAPIReady;
    (window as Window & { onYouTubeIframeAPIReady?: () => void }).onYouTubeIframeAPIReady =
      () => {
        previous?.();
        resolve();
      };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

const youtubeIframeCropClass =
  "absolute left-0 top-[-3rem] h-[calc(100%+7rem)] w-full border-0";

function LaybyYoutubeScrollPlayer({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const readyRef = useRef(false);
  const inViewRef = useRef(false);

  function playWithSound() {
    const player = playerRef.current;
    if (!player) return;

    player.unMute();
    player.setVolume(100);
    player.playVideo();
  }

  useEffect(() => {
    let destroyed = false;
    let player: YTPlayer | null = null;

    async function setup() {
      await loadYoutubeIframeApi();
      const YT = getYT();
      if (destroyed || !hostRef.current || !YT?.Player) return;

      player = new YT.Player(hostRef.current, {
        videoId: laybyYoutubeVideoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
          controls: 0,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          enablejsapi: 1,
          fs: 0,
          iv_load_policy: 3,
          disablekb: 1,
          loop: 1,
          playlist: laybyYoutubeVideoId,
        },
        events: {
          onReady: () => {
            readyRef.current = true;
            playerRef.current = player;
            if (inViewRef.current) playWithSound();
          },
        },
      });
    }

    void setup();

    return () => {
      destroyed = true;
      readyRef.current = false;
      player?.destroy();
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry?.isIntersecting ?? false;
        const player = playerRef.current;
        if (!readyRef.current || !player) return;

        if (inViewRef.current) {
          playWithSound();
        } else {
          player.pauseVideo();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    function onVisibilityChange() {
      const player = playerRef.current;
      if (!player || !readyRef.current) return;

      if (document.visibilityState === "visible" && inViewRef.current) {
        playWithSound();
      } else {
        player.pauseVideo();
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [sectionRef]);

  return (
    <div
      ref={hostRef}
      className={`${youtubeIframeCropClass} [&>iframe]:size-full [&>iframe]:border-0`}
      title={laybyYoutubeTitle}
    />
  );
}

export function LaybySection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="layby"
      className="scroll-mt-24 border-t border-brand-green/15 bg-surface-green py-14 sm:py-16 lg:py-20"
      aria-labelledby="layby-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <motion.header
            className="min-w-0 max-w-xl text-left"
            variants={headerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p
              className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm"
              variants={fadeUp}
            >
              {laybyEyebrow}
            </motion.p>
            <motion.h2
              id="layby-heading"
              className="mt-3 text-2xl font-bold tracking-tight text-secondary sm:text-3xl lg:text-[2rem]"
              variants={fadeUpBlur}
            >
              {laybyHeading}
            </motion.h2>
            <motion.p
              className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base"
              variants={fadeUp}
            >
              {laybyBody}
            </motion.p>
          </motion.header>

          <motion.div
            className="relative aspect-video w-full overflow-hidden bg-secondary/5 sm:aspect-21/9"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={reduceMotion ? noMotion : imageReveal}
          >
            {reduceMotion ? (
              <iframe
                src={laybyYoutubeEmbedUrl(false)}
                title={laybyYoutubeTitle}
                className={youtubeIframeCropClass}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <LaybyYoutubeScrollPlayer sectionRef={sectionRef} />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
