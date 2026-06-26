import { useMemo, useState } from "react";

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

  const [frameIndex] = useState(0);

  const text = frames[frameIndex] ?? options.to;

  return {
    text,

    isPlaying: false,

    play() {},

    pause() {},

    stop() {},

    restart() {},
  };
}
