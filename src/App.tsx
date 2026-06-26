import { useState } from "react";
import { TextScramble } from "./components/TextScramble";

export default function App() {
  const [mountCount, setMountCount] = useState(0);

  return (
    <main
      style={{
        padding: 60,
        fontFamily: "monospace",
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 40 }}>
        Text Scramble Demos
      </h1>

      {/* ---- 1. Mount Trigger (default) ---- */}
      <Section title="1. Mount Trigger (default)">
        <TextScramble>
          This text scrambles on mount automatically.
        </TextScramble>
      </Section>

      {/* ---- 2. Hover Trigger ---- */}
      <Section title="2. Hover Trigger">
        <TextScramble trigger="hover" style={{ cursor: "pointer" }}>
          Hover over me to scramble!
        </TextScramble>
      </Section>

      {/* ---- 3. Click Trigger ---- */}
      <Section title="3. Click Trigger">
        <TextScramble trigger="click" style={{ cursor: "pointer" }}>
          Click me to scramble!
        </TextScramble>
      </Section>

      {/* ---- 4. Hover + yoyo ---- */}
      <Section title="4. Hover + yoyo">
        <TextScramble trigger="hover" yoyo style={{ cursor: "pointer" }}>
          Hover me — scrambles in, reverses out
        </TextScramble>
      </Section>

      {/* ---- 5. Custom character sets ---- */}
      <Section title="5. Binary Character Set">
        <TextScramble characterSet="binary" trigger="hover" style={{ cursor: "pointer" }}>
          Binary scramble
        </TextScramble>
      </Section>

      <Section title="6. Hex Character Set">
        <TextScramble characterSet="hex" trigger="hover" style={{ cursor: "pointer" }}>
          Hex Scramble
        </TextScramble>
      </Section>

      <Section title="7. Symbols Character Set">
        <TextScramble characterSet="symbols" trigger="hover" style={{ cursor: "pointer" }}>
          Symbol Scramble
        </TextScramble>
      </Section>

      {/* ---- 8. Logo Expansion Mode ---- */}
      <Section title="8. Logo Expansion Mode (collapsedText / expandedText)">
        <TextScramble
          trigger="hover"
          collapsedText="TS"
          expandedText="TEXT SCRAMBLE"
          yoyo
          style={{ cursor: "pointer", fontWeight: "bold", fontSize: 20 }}
        />
      </Section>

      {/* ---- 9. startHidden ---- */}
      <Section title="9. startHidden (shows scrambled initially)">
        <TextScramble
          trigger="hover"
          startHidden
          style={{ cursor: "pointer" }}
        >
          Hover to reveal me!
        </TextScramble>
      </Section>

      {/* ---- 10. Click + once ---- */}
      <Section title="10. Click + once (plays once then ignores clicks)">
        <TextScramble trigger="click" once style={{ cursor: "pointer", color: "#c0392b" }}>
          Click me only works ONCE!
        </TextScramble>
      </Section>

      {/* ---- 11. Hover + once ---- */}
      <Section title="11. Hover + once (first hover only)">
        <TextScramble trigger="hover" once style={{ cursor: "pointer", color: "#27ae60" }}>
          Hover works only the first time!
        </TextScramble>
      </Section>

      {/* ---- 12. onAnimationComplete ---- */}
      <Section title="12. onAnimationComplete">
        <TextScramble
          trigger="click"
          onAnimationComplete={() => alert("Animation finished!")}
          style={{ cursor: "pointer", color: "#8e44ad" }}
        >
          Click me — alerts when done!
        </TextScramble>
      </Section>

      {/* ---- 13. Longer duration ---- */}
      <Section title="13. Slow animation (duration=3s)">
        <TextScramble
          duration={3}
          trigger="hover"
          style={{ cursor: "pointer", color: "#d35400" }}
        >
          Slow scramble on hover
        </TextScramble>
      </Section>

      {/* ---- 14. Custom element (h2) ---- */}
      <Section title="14. Custom element (as=h2)">
        <TextScramble as="h2" trigger="hover" style={{ cursor: "pointer" }}>
          I'm an H2 element
        </TextScramble>
      </Section>

      {/* ---- 15. Re-mount demo ---- */}
      <Section title="15. Re-mount (click button to re-trigger mount)">
        <button
          onClick={() => setMountCount((c) => c + 1)}
          style={{ marginBottom: 8, padding: "4px 12px", cursor: "pointer" }}
        >
          Re-mount
        </button>
        <br />
        <TextScramble key={mountCount}>
          Mount #{mountCount + 1} — this text scrambles on every re-mount!
        </TextScramble>
      </Section>

      {/* ---- 16. Numbers & punctuation preservation ---- */}
      <Section title="16. Preserve numbers & punctuation">
        <TextScramble
          trigger="hover"
          preserveNumbers
          preservePunctuation
          style={{ cursor: "pointer" }}
        >
          Pin: 1234 — Price: $99.99!
        </TextScramble>
      </Section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Section                                   */
/* -------------------------------------------------------------------------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: 16, marginBottom: 8, color: "#555" }}>{title}</h2>
      <div
        style={{
          padding: 16,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          background: "#fafafa",
        }}
      >
        {children}
      </div>
    </section>
  );
}