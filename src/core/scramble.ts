import { shouldPreserveCharacter } from "./characters";
import { getRandomCharacter } from "./random";

import type { GenerateFramesOptions } from "../types";

type PreserveOptions = Pick<
  GenerateFramesOptions,
  "preserveSpaces" | "preserveNumbers" | "preservePunctuation"
>;

function buildInitialFrame(
  target: string,
  characterSet: string,
  preserveOptions: PreserveOptions,
): string {
  let frame = "";

  for (let i = 0; i < target.length; i++) {
    const char = target[i];

    if (shouldPreserveCharacter(char, preserveOptions)) {
      frame += char;
    } else {
      frame += getRandomCharacter(characterSet);
    }
  }

  return frame;
}

function buildRevealFrame(
  target: string,
  revealIndex: number,
  characterSet: string,
  preserveOptions: PreserveOptions,
): string {
  let frame = "";

  for (let i = 0; i < target.length; i++) {
    const char = target[i];

    if (shouldPreserveCharacter(char, preserveOptions)) {
      frame += char;
      continue;
    }

    if (i <= revealIndex) {
      frame += char;
    } else {
      frame += getRandomCharacter(characterSet);
    }
  }

  return frame;
}

/**
 * Generates the complete sequence of frames for a scramble animation.
 *
 * @param options - Configuration used to generate the animation.
 * @returns An ordered array of animation frames.
 */
export function generateFrames({
  from,
  to,
  characterSet,
  preserveNumbers,
  preservePunctuation,
  preserveSpaces,
}: GenerateFramesOptions): string[] {
  const preserveOptions: PreserveOptions = {
    preserveSpaces,
    preserveNumbers,
    preservePunctuation,
  };

  const frames: string[] = [];

  // If `from` is provided, use it as the starting frame.
  // Otherwise scramble from the target text.
  if (from && from.length > 0) {
    frames.push(from);
  } else {
    frames.push(buildInitialFrame(to, characterSet, preserveOptions));
  }

  for (let revealIndex = 0; revealIndex < to.length; revealIndex++) {
    frames.push(
      buildRevealFrame(to, revealIndex, characterSet, preserveOptions),
    );
  }

  return frames;
}
