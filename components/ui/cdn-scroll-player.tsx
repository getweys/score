"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";

function VideoPoster({
  posterSrc,
  title,
  showLoader,
}: {
  posterSrc: string;
  title: string;
  showLoader: boolean;
}) {
  return (
    <div
      className="absolute inset-0 z-10 overflow-hidden bg-secondary"
      aria-hidden={showLoader ? undefined : true}
      aria-busy={showLoader}
    >
      <Image
        src={posterSrc}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
        className="object-cover"
        priority={false}
      />
      {showLoader ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/35">
          <div
            className="size-10 animate-spin rounded-full border-[3px] border-white/30 border-t-white sm:size-12"
            role="status"
            aria-label={`Loading ${title}`}
          />
        </div>
      ) : null}
    </div>
  );
}

async function startPlayback(video: HTMLVideoElement, preferMuted: boolean) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.pause();
    return false;
  }

  video.muted = true;
  const started = await video.play().then(() => true).catch(() => false);
  if (!started) return false;

  if (!preferMuted) {
    video.muted = false;
    video.volume = 1;
  }
  return true;
}

type CdnPlayerBaseProps = {
  videoSrc: string;
  title: string;
  posterSrc: string;
  isMuted?: boolean;
  className?: string;
};

type CdnScrollPlayerProps = CdnPlayerBaseProps & {
  hostWrapRef: RefObject<HTMLElement | null>;
};

export function CdnScrollPlayer({
  videoSrc,
  title,
  posterSrc,
  hostWrapRef,
  isMuted = false,
  className = "absolute inset-0 size-full object-cover",
}: CdnScrollPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inViewRef = useRef(false);
  const isMutedRef = useRef(isMuted);
  const isReadyRef = useRef(false);
  const [near, setNear] = useState(false);
  const [isReady, setIsReady] = useState(false);

  function markReady() {
    if (isReadyRef.current) return;
    isReadyRef.current = true;
    setIsReady(true);
  }

  useEffect(() => {
    isMutedRef.current = isMuted;
    const video = videoRef.current;
    if (!video || video.paused) return;
    video.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const node = videoRef.current;
    const target = hostWrapRef.current;
    if (!node || !target) return;
    const videoEl: HTMLVideoElement = node;

    function handleReady() {
      markReady();
      if (inViewRef.current) {
        void startPlayback(videoEl, isMutedRef.current);
      }
    }

    videoEl.addEventListener("loadeddata", handleReady);
    videoEl.addEventListener("canplay", handleReady);
    videoEl.addEventListener("playing", markReady);
    videoEl.addEventListener("timeupdate", markReady);

    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setNear(true);
      },
      { rootMargin: "1200px 0px", threshold: 0 }
    );

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry?.isIntersecting ?? false;
        if (inViewRef.current) {
          void startPlayback(videoEl, isMutedRef.current);
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.25 }
    );

    nearObserver.observe(target);
    playObserver.observe(target);

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") {
        videoEl.pause();
      } else if (inViewRef.current) {
        void startPlayback(videoEl, isMutedRef.current);
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      nearObserver.disconnect();
      playObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      videoEl.removeEventListener("loadeddata", handleReady);
      videoEl.removeEventListener("canplay", handleReady);
      videoEl.removeEventListener("playing", markReady);
      videoEl.removeEventListener("timeupdate", markReady);
    };
  }, [hostWrapRef, videoSrc]);

  return (
    <>
      {!isReady ? (
        <VideoPoster posterSrc={posterSrc} title={title} showLoader={near} />
      ) : null}
      <video
        ref={videoRef}
        src={near ? videoSrc : undefined}
        title={title}
        className={`${className} ${isReady ? "z-20" : "pointer-events-none opacity-0"}`}
        playsInline
        loop
        muted
        preload={near ? "auto" : "none"}
      />
    </>
  );
}

export function CdnVideoEmbed({
  videoSrc,
  title,
  posterSrc,
  isMuted = false,
  className = "absolute inset-0 size-full object-cover",
}: CdnPlayerBaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  return (
    <>
      {!isReady ? (
        <VideoPoster posterSrc={posterSrc} title={title} showLoader />
      ) : null}
      <video
        ref={videoRef}
        src={videoSrc}
        title={title}
        className={`${className} ${isReady ? "z-20" : "pointer-events-none opacity-0"}`}
        playsInline
        loop
        controls
        muted={isMuted}
        preload="auto"
        onLoadedData={() => setIsReady(true)}
        onCanPlay={() => setIsReady(true)}
        onPlaying={() => setIsReady(true)}
      />
    </>
  );
}
