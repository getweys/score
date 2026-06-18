"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";

function videoMimeType(src: string) {
  return /\.mov(?:$|\?)/i.test(src) ? "video/quicktime" : "video/mp4";
}

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

function playVideo(
  video: HTMLVideoElement | null,
  muted: boolean,
  fromStart = false
): Promise<boolean> {
  if (!video) return Promise.resolve(false);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.pause();
    return Promise.resolve(false);
  }
  if (fromStart) video.currentTime = 0;
  video.muted = muted;
  return video.play().then(() => true).catch(() => false);
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
  const [active, setActive] = useState(false);
  const [isReady, setIsReady] = useState(false);

  function markReady() {
    if (isReadyRef.current) return;
    isReadyRef.current = true;
    setIsReady(true);
  }

  function resetReady() {
    isReadyRef.current = false;
    setIsReady(false);
  }

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const target = hostWrapRef.current;
    if (!target) return;

    function activate() {
      setActive(true);
    }

    function deactivate() {
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.removeAttribute("src");
        while (video.firstChild) video.removeChild(video.firstChild);
        video.load();
      }
      resetReady();
      setActive(false);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry?.isIntersecting ?? false;
        if (inViewRef.current) activate();
        else deactivate();
      },
      { threshold: 0.4 }
    );

    observer.observe(target);

    function onVisibilityChange() {
      const video = videoRef.current;
      if (!video) return;
      if (document.visibilityState === "hidden") {
        video.pause();
      } else if (inViewRef.current && isReadyRef.current) {
        void playVideo(video, isMutedRef.current);
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [hostWrapRef]);

  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    if (!video) return;

    resetReady();

    function handleReady() {
      markReady();
      void playVideo(video, isMutedRef.current, true).then((ok) => {
        if (ok) markReady();
      });
    }

    video.addEventListener("canplay", handleReady);
    video.addEventListener("playing", markReady);

    const source = document.createElement("source");
    source.src = videoSrc;
    source.type = videoMimeType(videoSrc);
    video.appendChild(source);
    video.load();

    return () => {
      video.removeEventListener("canplay", handleReady);
      video.removeEventListener("playing", markReady);
    };
  }, [active, videoSrc]);

  useEffect(() => {
    if (!active || !isReady) return;
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [active, isReady, isMuted]);

  const showPoster = !active || !isReady;

  return (
    <>
      {showPoster ? (
        <VideoPoster posterSrc={posterSrc} title={title} showLoader={active && !isReady} />
      ) : null}
      <video
        ref={videoRef}
        title={title}
        className={`${className} ${isReady ? "z-20" : "pointer-events-none opacity-0"}`}
        playsInline
        loop
        preload="none"
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
        title={title}
        className={`${className} ${isReady ? "z-20" : "pointer-events-none opacity-0"}`}
        playsInline
        loop
        controls
        muted={isMuted}
        preload="metadata"
        onCanPlay={() => setIsReady(true)}
        onPlaying={() => setIsReady(true)}
      >
        <source src={videoSrc} type={videoMimeType(videoSrc)} />
      </video>
    </>
  );
}
