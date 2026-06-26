import { shouldPreserveCharacter } from "./core/characters";

export default function App() {
  const text = "Hello, World! 2026";

  return (
    <pre>
      {text
        .split("")
        .map((char) =>
          shouldPreserveCharacter(char, {
            preserveSpaces: true,
            preserveNumbers: true,
            preservePunctuation: true,
          })
            ? `[${char}]`
            : char,
        )
        .join("")}
    </pre>
  );
}
