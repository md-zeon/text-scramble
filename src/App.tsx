import { generateFrames } from "./core/scramble";
import { resolveCharacterSet } from "./utils/presets";

const frames = generateFrames({
  from: "",
  to: "Hello World!",
  duration: 1,
  speed: 0.04,
  characterSet: resolveCharacterSet("letters"),
  preserveSpaces: true,
  preserveNumbers: true,
  preservePunctuation: true,
});

export default function App() {
  return (
    <main style={{ padding: 40, fontFamily: "monospace" }}>
      {frames.map((frame, index) => (
        <div key={index}>{frame}</div>
      ))}
    </main>
  );
}
