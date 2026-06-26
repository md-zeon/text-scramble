import { TextScramble } from "./components/TextScramble";

export default function App() {
  return (
    <main
      style={{
        padding: 60,
        fontFamily: "monospace",
      }}
    >
      <TextScramble as="h1" trigger="hover" duration={1} speed={0.05}>
        Hover Me
      </TextScramble>
    </main>
  );
}
