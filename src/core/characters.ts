import type { TextScrambleProps } from "../types";

/**
 * Returns true if the character is a whitespace character.
 */
export function isSpace(char: string): boolean {
  return /\s/.test(char);
}

/**
 * Returns true if the character is a number.
 */
export function isNumber(char: string): boolean {
  return /^[0-9]$/.test(char);
}

/**
 * Returns true if the character is punctuation or a symbol.
 */
export function isPunctuation(char: string): boolean {
  return /^[^\p{L}\p{N}\s]$/u.test(char);
}

/**
 * Determines whether a character should remain unchanged.
 */
export function shouldPreserveCharacter(
  char: string,
  options: Pick<
    TextScrambleProps,
    "preserveSpaces" | "preserveNumbers" | "preservePunctuation"
  >,
): boolean {
  if (options.preserveSpaces && isSpace(char)) {
    return true;
  }

  if (options.preserveNumbers && isNumber(char)) {
    return true;
  }

  if (options.preservePunctuation && isPunctuation(char)) {
    return true;
  }

  return false;
}
