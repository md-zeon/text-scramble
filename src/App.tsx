import { useScramble } from "./hooks/useScramble";
import { resolveCharacterSet } from "./utils/presets";

export default function App() {
  const { text, isPlaying, restart, reverse } = useScramble({
    from: "Hello World!",
    to: "Hello World!",
    duration: 1,
    speed: 0.05,
    delay: 0,
    trigger: "manual",
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

      <p>Status: {isPlaying ? "Playing" : "Stopped"}</p>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 20,
        }}
      >
        <button onClick={restart}>Forward</button>

        <button onClick={reverse}>Reverse</button>
      </div>
    </main>
  );
}
