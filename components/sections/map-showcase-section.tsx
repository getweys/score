"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { VideoMuteToggle } from "@/components/ui/video-mute-toggle";
import {
  mapSectionImage,
  mapSectionYoutubeEmbedUrl,
  mapSectionYoutubeTitle,
  mapSectionYoutubeVideoId,
  projectBody,
  projectHeading,
} from "@/lib/site-content"; import { clipReveal, fadeUp, fadeUpBlur, headerStagger, viewportOnce } from "@/lib/motion-variants";

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

const youtubeIframeCropClass =
  "absolute left-0 top-[-3rem] h-[calc(100%+7rem)] w-full border-0";

function MapYoutubeFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-secondary/5">{children}</div>
  );
}

function MapYoutubeEmbed({ autoplay }: { autoplay: boolean }) {
  return (
    <MapYoutubeFrame>
      <iframe
        src={mapSectionYoutubeEmbedUrl(autoplay)}
        title={mapSectionYoutubeTitle}
        className={youtubeIframeCropClass}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </MapYoutubeFrame>
  );
}

function MapYoutubeScrollPlayer({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const readyRef = useRef(false);
  const inViewRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(false);

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
        videoId: mapSectionYoutubeVideoId,
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
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry?.isIntersecting ?? false;
        const player = playerRef.current;
        if (!readyRef.current || !player) return;

        if (inViewRef.current) {
          playWithPreferredAudio();
        } else {
          player.pauseVideo();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(section);

    function onVisibilityChange() {
      const player = playerRef.current;
      if (!player || !readyRef.current) return;

      if (document.visibilityState === "visible" && inViewRef.current) {
        playWithPreferredAudio();
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
    <MapYoutubeFrame>
      <div
        ref={hostRef}
        className={`${youtubeIframeCropClass} [&>iframe]:size-full [&>iframe]:border-0`}
        title={mapSectionYoutubeTitle}
      />
      <VideoMuteToggle
        isMuted={isMuted}
        onToggle={() => setIsMuted((muted) => !muted)}
        label="M-9 project video"
      />
    </MapYoutubeFrame>
  );
}

export function MapShowcaseSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

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
        <MapYoutubeEmbed autoplay={false} />
      ) : (
        <motion.div
          variants={clipReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <MapYoutubeScrollPlayer sectionRef={sectionRef} />
        </motion.div>
      )}
    </section>
  );
}
