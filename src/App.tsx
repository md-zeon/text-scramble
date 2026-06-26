import { TextScramble } from "./components/TextScramble";

export default function App() {
  return (
    <main
      style={{
        padding: 60,
        fontFamily: "monospace",
      }}
    >
      <TextScramble as="h1" trigger="click" duration={1} speed={0.05}>
        Click Me
      </TextScramble>
    </main>
  );
}
