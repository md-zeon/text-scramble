/**
 * Returns a random character from the provided character set.
 */
export function getRandomCharacter(characterSet: string): string {
  if (!characterSet.length) {
    return "";
  }

  const randomIndex = Math.floor(Math.random() * characterSet.length);

  return characterSet[randomIndex];
}
