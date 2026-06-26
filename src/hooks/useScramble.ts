import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { generateFrames } from "../core/scramble";
import type { UseScrambleOptions, UseScrambleReturn } from "../types";

export function useScramble({
  trigger = "mount",
  delay = 0,
  speed = 0.04,
  ...options
}: UseScrambleOptions): UseScrambleReturn {
  const frames = useMemo(
    () =>
      generateFrames({
        speed,
        ...options,
      }),
    [
      options.from,
      options.to,
      options.duration,
      options.characterSet,
      options.preserveNumbers,
      options.preservePunctuation,
      options.preserveSpaces,
      speed,
    ],
  );

  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(trigger === "mount");

  const timeoutRef = useRef<number | null>(null);

  const text = frames[frameIndex] ?? options.to;

  const clear = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    clear();

    if (!isPlaying) return;

    if (frameIndex >= frames.length - 1) {
      setIsPlaying(false);
      return;
    }

    timeoutRef.current = window.setTimeout(
      () => {
        setFrameIndex((prev) => prev + 1);
      },
      frameIndex === 0 ? delay : speed * 1000,
    );

    return clear;
  }, [delay, frameIndex, frames.length, isPlaying, speed]);

  useEffect(() => {
    return clear;
  }, []);

  const play = useCallback(() => {
    if (isPlaying) return;

    setIsPlaying(true);
  }, [isPlaying]);

  const pause = useCallback(() => {
    clear();
    setIsPlaying(false);
  }, []);

  const stop = useCallback(() => {
    clear();
    setIsPlaying(false);
    setFrameIndex(0);
  }, []);

  const restart = useCallback(() => {
    clear();
    setFrameIndex(0);
    setIsPlaying(true);
  }, []);

  return {
    text,
    isPlaying,
    play,
    pause,
    stop,
    restart,
  };
}
