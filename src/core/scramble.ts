import { shouldPreserveCharacter } from "./characters";
import { getRandomCharacter } from "./random";

import type { GenerateFramesOptions } from "../types";

/**
 * Generates every frame required for a scramble animation.
 */
export function generateFrames({
  from,
  to,
  characterSet,
  preserveNumbers,
  preservePunctuation,
  preserveSpaces,
}: GenerateFramesOptions): string[] {
  const target = to;
  const frames: string[] = [];

  // Initial fully scrambled frame
  let initialFrame = "";

  for (let i = 0; i < target.length; i++) {
    const char = target[i];

    if (
      shouldPreserveCharacter(char, {
        preserveSpaces,
        preserveNumbers,
        preservePunctuation,
      })
    ) {
      initialFrame += char;
    } else {
      initialFrame += getRandomCharacter(characterSet);
    }
  }

  frames.push(initialFrame);

  // Reveal one character per frame
  for (let revealIndex = 0; revealIndex < target.length; revealIndex++) {
    let frame = "";

    for (let i = 0; i < target.length; i++) {
      const char = target[i];

      if (
        shouldPreserveCharacter(char, {
          preserveSpaces,
          preserveNumbers,
          preservePunctuation,
        })
      ) {
        frame += char;
        continue;
      }

      if (i <= revealIndex) {
        frame += char;
      } else {
        frame += getRandomCharacter(characterSet);
      }
    }

    frames.push(frame);
  }

  return frames;
}
