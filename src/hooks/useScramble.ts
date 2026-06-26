import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { generateFrames } from "../core/scramble";
import type { UseScrambleOptions, UseScrambleReturn } from "../types";

type PlaybackDirection = "forward" | "backward";

export function useScramble({
  trigger = "mount",
  delay = 0,
  speed = 0.04,
  startHidden = false,
  once = false,
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
  const [direction, setDirection] = useState<PlaybackDirection>("forward");
  const [isFinished, setIsFinished] = useState(false);

  // `true` once the animation has actually started displaying frames.
  // When false, the component shows the final target text instead of
  // scrambled text, giving a "normal text → scramble → reveal" effect.
  const [hasStarted, setHasStarted] = useState(false);

  // Track whether the animation has ever completed (for `once`).
  const hasCompletedOnce = useRef(false);

  const timeoutRef = useRef<number | null>(null);

  // Decide what text to display:
  // - If `startHidden` and animation hasn't started yet → show scrambled frames[0]
  // - If animation hasn't started at all → show the final text (options.to)
  // - Otherwise → show the current animation frame
  const text =
    !hasStarted && startHidden
      ? (frames[0] ?? options.to)
      : !hasStarted
        ? options.to
        : (frames[frameIndex] ?? options.to);

  const clear = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    clear();

    if (!isPlaying) return;

    // Always schedule the next timeout when effect runs.
    // The timeout callback checks if this was the last frame.
    timeoutRef.current = window.setTimeout(
      () => {
        const nextIndex =
          direction === "forward" ? frameIndex + 1 : frameIndex - 1;
        const reachedEnd =
          direction === "forward"
            ? nextIndex >= frames.length
            : nextIndex < 0;

        if (reachedEnd) {
          setIsPlaying(false);
          setIsFinished(true);
          hasCompletedOnce.current = true;
        } else if (!hasStarted && nextIndex === 1 && direction === "forward") {
          // First tick: switch from showing the final text to showing
          // the initial scrambled frame so the user sees "scramble on top".
          setHasStarted(true);
          setFrameIndex(0);
        } else {
          setFrameIndex(nextIndex);
        }
      },
      frameIndex === 0 ? delay : speed * 1000,
    );

    return clear;
  }, [delay, frameIndex, frames.length, direction, isPlaying, speed, clear]);

  useEffect(() => {
    return clear;
  }, [clear]);

  const play = useCallback(() => {
    if (isPlaying) return;
    if (once && hasCompletedOnce.current) return;

    setHasStarted(true);
    setIsFinished(false);
    setDirection("forward");
    setFrameIndex(0);
    setIsPlaying(true);
  }, [isPlaying, once]);

  const pause = useCallback(() => {
    clear();
    setIsPlaying(false);
  }, [clear]);

  const stop = useCallback(() => {
    clear();
    setIsPlaying(false);
    setFrameIndex(0);
  }, [clear]);

  const restart = useCallback(() => {
    if (once && hasCompletedOnce.current) return;

    clear();

    setHasStarted(true);
    setIsFinished(false);
    setDirection("forward");
    setFrameIndex(0);
    setIsPlaying(true);
  }, [once, clear]);

  const reverse = useCallback(() => {
    if (once && hasCompletedOnce.current) return;

    clear();

    setHasStarted(true);
    setIsFinished(false);
    setDirection("backward");
    setFrameIndex(frames.length - 1);
    setIsPlaying(true);
  }, [frames.length, once, clear]);

  return {
    text,
    isPlaying,
    isFinished,
    play,
    pause,
    stop,
    restart,
    reverse,
  };
}
