import { useScramble } from "./hooks/useScramble";
import { resolveCharacterSet } from "./utils/presets";

export default function App() {
  const { text, isPlaying } = useScramble({
    from: "",
    to: "Hello World!",
    duration: 1,
    speed: 0.05,
    trigger: "mount",
    delay: 100,
    characterSet: resolveCharacterSet("letters"),
    preserveSpaces: true,
    preserveNumbers: true,
    preservePunctuation: true,
  });

  return (
    <main
      style={{
        padding: 40,
        fontFamily: "monospace",
      }}
    >
      <h1>{text}</h1>

      <p>Status: {isPlaying ? "Playing" : "Finished"}</p>
    </main>
  );
}
