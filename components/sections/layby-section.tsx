"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type { Variants } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";
import { VideoMuteToggle } from "@/components/ui/video-mute-toggle";
import {
  laybyBody,
  laybyEyebrow,
  laybyYoutubeEmbedUrl,
  laybyYoutubeTitle,
  laybyYoutubeVideoId,
} from "@/lib/site-content";
import { fadeUp, fadeUpBlur, headerStagger, viewportOnce } from "@/lib/motion-variants";

const easeSmooth = [0.2, 0.85, 0.38, 1] as const;

/** Cinematic "open" reveal for the video card. */
const cardReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96, clipPath: "inset(0% 34% 0% 34% round 24px)" },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 16px)",
    transition: { duration: 0.95, ease: easeSmooth },
  },
};

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
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

function LaybyVideoStage({
  hostWrapRef,
  isMuted,
}: {
  hostWrapRef: RefObject<HTMLDivElement | null>;
  isMuted: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const readyRef = useRef(false);
  const inViewRef = useRef(false);
  const isMutedRef = useRef(isMuted);

  useEffect(() => {
    isMutedRef.current = isMuted;
    const player = playerRef.current;
    if (!player || !readyRef.current) return;
    if (isMuted) player.mute();
    else {
      player.unMute();
      player.setVolume(100);
    }
  }, [isMuted]);

  function playWithPreferredAudio() {
    const player = playerRef.current;
    if (!player) return;
    if (isMutedRef.current) player.mute();
    else {
      player.unMute();
      player.setVolume(100);
    }
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
          autoplay: 1,
          mute: 1,
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
            if (inViewRef.current) playWithPreferredAudio();
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
    const target = hostWrapRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry?.isIntersecting ?? false;
        if (!readyRef.current || !playerRef.current) return;
        if (inViewRef.current) playWithPreferredAudio();
        else playerRef.current.pauseVideo();
      },
      { threshold: 0.4 }
    );

    observer.observe(target);

    function onVisibilityChange() {
      if (!playerRef.current || !readyRef.current) return;
      if (document.visibilityState === "visible" && inViewRef.current) playWithPreferredAudio();
      else playerRef.current.pauseVideo();
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [hostWrapRef]);

  return (
    <div
      ref={hostRef}
      className="absolute inset-0 size-full [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:size-full [&>iframe]:border-0"
      title={laybyYoutubeTitle}
    />
  );
}

export function LaybySection() {
  const reduceMotion = useReducedMotion();
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <section
      id="layby"
      className="relative scroll-mt-24 overflow-hidden border-t border-brand-green/15 bg-surface-green py-16 sm:py-20 lg:py-24"
      aria-labelledby="layby-heading"
    >
      {/* Faint olive dot texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.85) 0, rgba(255,255,255,0) 55%), radial-gradient(rgba(112,130,89,0.16) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 26px 26px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
          variants={headerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary sm:text-xs"
          >
            {laybyEyebrow}
          </motion.p>

          <motion.h2
            id="layby-heading"
            variants={fadeUpBlur}
            className="mt-3 text-2xl font-black tracking-tight text-secondary sm:text-3xl lg:text-4xl"
          >
            Layby - Space available for Rent
            <span className="text-primary">.</span>
          </motion.h2>

          <motion.span
            aria-hidden
            className="mt-2 block h-1 rounded-full bg-primary"
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: 0.3, ease: easeSmooth }}
          />

          <motion.p
            variants={fadeUp}
            className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base"
          >
            {laybyBody}
          </motion.p>
        </motion.div>

        <motion.div
          ref={videoWrapRef}
          className="relative mx-auto mt-4 aspect-video w-full max-w-5xl overflow-hidden bg-black shadow-[0_40px_90px_-40px_rgba(15,23,42,0.5)] ring-1 ring-black/10 sm:mt-6"
          variants={reduceMotion ? undefined : cardReveal}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
        >
          {reduceMotion ? (
            <iframe
              src={laybyYoutubeEmbedUrl(false)}
              title={laybyYoutubeTitle}
              className="absolute inset-0 size-full border-0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <LaybyVideoStage hostWrapRef={videoWrapRef} isMuted={isMuted} />
          )}

          {/* Subtle top/bottom scrims to keep it cinematic and mask edge branding */}
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/25"
            aria-hidden
          />

          <VideoMuteToggle
            isMuted={isMuted}
            onToggle={() => setIsMuted((muted) => !muted)}
            label="layby video"
          />
        </motion.div>
      </div>
    </section>
  );
}
