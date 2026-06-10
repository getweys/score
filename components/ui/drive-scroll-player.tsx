"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { buildGoogleDrivePreviewUrl } from "@/lib/site-content";

const LOAD_FALLBACK_MS = 8000;

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

type DrivePlayerBaseProps = {
  fileId: string;
  title: string;
  posterSrc: string;
  className?: string;
};

type DriveScrollPlayerProps = DrivePlayerBaseProps & {
  hostWrapRef: RefObject<HTMLElement | null>;
};

export function DriveScrollPlayer({
  fileId,
  title,
  posterSrc,
  hostWrapRef,
  className = "absolute inset-0 size-full border-0",
}: DriveScrollPlayerProps) {
  const inViewRef = useRef(false);
  const [src, setSrc] = useState<string | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  useEffect(() => {
    if (!src || isLoaded) return;
    const timer = window.setTimeout(() => setIsLoaded(true), LOAD_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [src, isLoaded]);

  useEffect(() => {
    const target = hostWrapRef.current;
    if (!target) return;

    function loadPreview() {
      setSrc(buildGoogleDrivePreviewUrl(fileId, { autoplay: true }));
    }

    function unloadPreview() {
      setSrc(undefined);
      setIsLoaded(false);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry?.isIntersecting ?? false;
        if (inViewRef.current) loadPreview();
        else unloadPreview();
      },
      { threshold: 0.4 }
    );

    observer.observe(target);

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") unloadPreview();
      else if (inViewRef.current) loadPreview();
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [fileId, hostWrapRef]);

  const showPoster = !src || !isLoaded;

  return (
    <>
      {showPoster ? (
        <VideoPoster posterSrc={posterSrc} title={title} showLoader={Boolean(src && !isLoaded)} />
      ) : null}
      {src ? (
        <iframe
          src={src}
          title={title}
          className={`${className} ${isLoaded ? "z-20" : "pointer-events-none opacity-0"}`}
          allow="autoplay; encrypted-media; fullscreen"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsLoaded(true)}
        />
      ) : null}
    </>
  );
}

export function DriveEmbed({
  fileId,
  title,
  posterSrc,
  className = "absolute inset-0 size-full border-0",
  autoplay = false,
}: DrivePlayerBaseProps & { autoplay?: boolean }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const src = buildGoogleDrivePreviewUrl(fileId, { autoplay });

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  useEffect(() => {
    if (isLoaded) return;
    const timer = window.setTimeout(() => setIsLoaded(true), LOAD_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [isLoaded]);

  return (
    <>
      {!isLoaded ? (
        <VideoPoster posterSrc={posterSrc} title={title} showLoader />
      ) : null}
      <iframe
        src={src}
        title={title}
        className={`${className} ${isLoaded ? "z-20" : "pointer-events-none opacity-0"}`}
        allow="autoplay; encrypted-media; fullscreen"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
}
