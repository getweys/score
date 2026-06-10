"use client";

import { useEffect, useRef, type RefObject } from "react";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
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

type YoutubeScrollPlayerProps = {
  videoId: string;
  title: string;
  hostWrapRef: RefObject<HTMLDivElement | null>;
  isMuted: boolean;
};

export function YoutubeScrollPlayer({
  videoId,
  title,
  hostWrapRef,
  isMuted,
}: YoutubeScrollPlayerProps) {
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

  function applyPreferredAudio() {
    const player = playerRef.current;
    if (!player) return;
    if (isMutedRef.current) player.mute();
    else {
      player.unMute();
      player.setVolume(100);
    }
  }

  function playFromStart() {
    const player = playerRef.current;
    if (!player) return;
    player.seekTo(0, true);
    applyPreferredAudio();
    player.playVideo();
  }

  function resumePlayback() {
    const player = playerRef.current;
    if (!player) return;
    applyPreferredAudio();
    player.playVideo();
  }

  function pauseAndReset() {
    const player = playerRef.current;
    if (!player) return;
    player.pauseVideo();
    player.seekTo(0, true);
  }

  useEffect(() => {
    let destroyed = false;
    let player: YTPlayer | null = null;

    async function setup() {
      await loadYoutubeIframeApi();
      const YT = getYT();
      if (destroyed || !hostRef.current || !YT?.Player) return;

      player = new YT.Player(hostRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
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
          playlist: videoId,
        },
        events: {
          onReady: () => {
            readyRef.current = true;
            playerRef.current = player;
            if (inViewRef.current) playFromStart();
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
  }, [videoId]);

  useEffect(() => {
    const target = hostWrapRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry?.isIntersecting ?? false;
        if (!readyRef.current || !playerRef.current) return;
        if (inViewRef.current) playFromStart();
        else pauseAndReset();
      },
      { threshold: 0.4 }
    );

    observer.observe(target);

    function onVisibilityChange() {
      if (!playerRef.current || !readyRef.current) return;
      if (document.visibilityState === "visible" && inViewRef.current) resumePlayback();
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
      title={title}
    />
  );
}

export function buildYoutubeEmbedUrl(videoId: string, autoplay = true) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: autoplay ? "1" : "0",
    loop: "1",
    playlist: videoId,
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    controls: "0",
    fs: "0",
    iv_load_policy: "3",
    disablekb: "1",
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
