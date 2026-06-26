import { TextScramble } from "./components/TextScramble";

export default function App() {
  return (
    <main style={{ padding: 60, fontFamily: "monospace" }}>
      <TextScramble trigger="hover" yoyo duration={1} speed={0.05}>
        Hover Me
      </TextScramble>
    </main>
  );
}
