import type { CharacterSetPreset } from "../types";

export const CHARACTER_SETS: Record<CharacterSetPreset, string> = {
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",

  numbers: "0123456789",

  binary: "01",

  hex: "0123456789ABCDEF",

  symbols: "!@#$%^&*()[]{}<>?/|+=-_~",

  alphanumeric:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  ascii: `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[^_\`abcdefghijklmnopqrstuvwxyz{|}~`,
};

/**
 * Returns the character set string.
 * Supports both presets and custom strings.
 */
export function resolveCharacterSet(
  characterSet?: CharacterSetPreset | string,
): string {
  if (!characterSet) {
    return CHARACTER_SETS.alphanumeric;
  }

  if (characterSet in CHARACTER_SETS) {
    return CHARACTER_SETS[characterSet as CharacterSetPreset];
  }

  return characterSet;
}
