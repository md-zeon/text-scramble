import { useEffect, useMemo, useState } from "react";

import { generateFrames } from "../core/scramble";
import type { UseScrambleOptions, UseScrambleReturn } from "../types";

export function useScramble({
  trigger,
  delay,
  speed,
  ...options
}: UseScrambleOptions): UseScrambleReturn {
  // Reserved for future steps.
  void trigger;
  void delay;

  const frames = useMemo(
    () =>
      generateFrames({
        speed,
        ...options,
      }),
    [
      options.from,
      options.to,
      options.characterSet,
      options.duration,
      options.preserveNumbers,
      options.preservePunctuation,
      options.preserveSpaces,
      speed,
    ],
  );

  const [frameIndex, setFrameIndex] = useState(0);

  const text = frames[frameIndex] ?? options.to;

  useEffect(() => {
    // Stop once we've reached the final frame.
    if (frameIndex >= frames.length - 1) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFrameIndex((current) => current + 1);
    }, speed * 1000);

    return () => clearTimeout(timeout);
  }, [frameIndex, frames.length, speed]);

  return {
    text,

    isPlaying: frameIndex < frames.length - 1,

    play() {},

    pause() {},

    stop() {},

    restart() {},
  };
}
