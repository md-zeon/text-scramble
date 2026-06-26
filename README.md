# Text Scramble

A lightweight React text scramble animation component with rich text support. Animates text from scrambled to revealed with customizable characters, triggers, and timing.

## Installation

```bash
npm install @md-zeon/react-text-scramble
```

## Quick Start

```tsx
import { TextScramble } from "@md-zeon/react-text-scramble";

function App() {
  return (
    <TextScramble>
      This text scrambles on mount!
    </TextScramble>
  );
}
```

## Demos

![Demo](https://via.placeholder.com/700x400?text=Text+Scramble+Demos)

Try all 20+ demos by cloning the repo and running:

```bash
npm install
npm run dev
```

## API

### `<TextScramble>` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Text or rich elements to scramble |
| `as` | `ElementType` | `"span"` | HTML element to render as (`"h1"`, `"div"`, etc.) |
| `className` | `string` | — | CSS class name |
| `trigger` | `"mount"` \| `"hover"` \| `"click"` \| `"manual"` | `"mount"` | What triggers the animation |
| `duration` | `number` | `0.8` | Animation duration in seconds |
| `speed` | `number` | `0.04` | Time between frame updates in seconds |
| `delay` | `number` | `0` | Delay before animation starts in seconds |
| `characterSet` | preset \| `string` | `"letters"` | Character set preset (`"letters"`, `"numbers"`, `"binary"`, `"hex"`, `"symbols"`, `"alphanumeric"`, `"ascii"`) or a custom string |
| `preserveSpaces` | `boolean` | `true` | Keep spaces unchanged |
| `preservePunctuation` | `boolean` | `true` | Keep punctuation unchanged |
| `preserveNumbers` | `boolean` | `false` | Keep numbers unchanged |
| `yoyo` | `boolean` | `false` | Reverse animation on mouse leave (only with `trigger="hover"`) |
| `startHidden` | `boolean` | `false` | Start text in scrambled state |
| `once` | `boolean` | `false` | Animation plays only once; subsequent triggers are ignored |
| `initialText` | `string` | — | Text to show before animation (toggle mode) |
| `revealText` | `string` | — | Text to reveal after animation (must be used with `initialText`) |
| `onAnimationComplete` | `() => void` | — | Called when animation finishes |
| `style` | `CSSProperties` | — | Inline styles |

### `useScramble()` Hook

```tsx
import { useScramble } from "@md-zeon/react-text-scramble";

function CustomComponent() {
  const { text, isPlaying, isFinished, play, pause, stop, restart, reverse } =
    useScramble({
      to: "Hello, World!",
      duration: 0.8,
      speed: 0.04,
      trigger: "manual",
      characterSet: "alphanumeric",
      preserveSpaces: true,
    });

  return <span>{text}</span>;
}
```

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `to` | `string` | — | Target text (required) |
| `from` | `string` | `""` | Starting text |
| `duration` | `number` | `0.8` | Animation duration in seconds |
| `speed` | `number` | `0.04` | Time between frame updates in seconds |
| `delay` | `number` | `0` | Delay before playback in seconds |
| `trigger` | `"mount"` \| `"hover"` \| `"click"` \| `"manual"` | `"mount"` | Trigger mode |
| `characterSet` | `string` | — | Characters to use for scrambling |
| `preserveSpaces` | `boolean` | `false` | Keep spaces unchanged |
| `preservePunctuation` | `boolean` | `false` | Keep punctuation unchanged |
| `preserveNumbers` | `boolean` | `false` | Keep numbers unchanged |
| `startHidden` | `boolean` | `false` | Start with scrambled text |
| `once` | `boolean` | `false` | Play animation only once |

#### Returns

| Value | Type | Description |
|-------|------|-------------|
| `text` | `string` | Current displayed text |
| `isPlaying` | `boolean` | Whether animation is playing |
| `isFinished` | `boolean` | Whether animation has completed |
| `play()` | `() => void` | Start/restart forward playback |
| `pause()` | `() => void` | Pause current playback |
| `stop()` | `() => void` | Stop and reset to frame 0 |
| `restart()` | `() => void` | Restart forward playback |
| `reverse()` | `() => void` | Play backward from the end |

## Trigger Modes

### `mount` (default)
Animation plays automatically when the component mounts.

```tsx
<TextScramble trigger="mount">
  Auto-scramble on mount
</TextScramble>
```

### `hover`
Animation plays on mouse enter.

```tsx
<TextScramble trigger="hover">
  Hover to scramble
</TextScramble>
```

### `click`
Animation plays on click.

```tsx
<TextScramble trigger="click">
  Click to scramble
</TextScramble>
```

### `manual`
Control the animation programmatically via the hook.

```tsx
const { text, play } = useScramble({ to: "Manual!", trigger: "manual" });
// Call play() whenever you want
```

## Rich Text Support

TextScramble preserves HTML elements, styles, and nesting during the scramble animation.

```tsx
<TextScramble trigger="hover">
  This is <strong>bold</strong> and <em>italic</em> text
</TextScramble>

<TextScramble trigger="hover">
  <span style={{ color: "#9b59b6" }}>
    Nested <strong>span with <em>emphasis</em></strong>
  </span>
</TextScramble>
```

This works with Next.js `<Link>`, shadcn components, styled elements — any React elements that render DOM nodes.

## Toggle Mode

Animate between two texts (e.g., "TS" → "TEXT SCRAMBLE").

```tsx
<TextScramble
  trigger="hover"
  initialText="TS"
  revealText="TEXT SCRAMBLE"
  yoyo
/>
```

## Character Presets

| Preset | Characters |
|--------|-----------|
| `"letters"` | `A-Z a-z` |
| `"numbers"` | `0-9` |
| `"binary"` | `01` |
| `"hex"` | `0-9 A-F` |
| `"symbols"` | `!@#$%^&*()[]{}<>?/\|+=-_~` |
| `"alphanumeric"` | Letters + numbers |
| `"ascii"` | All printable ASCII characters |

Pass any string for a custom character set:

```tsx
<TextScramble characterSet="👋🌟⭐💫✨">
  Custom emoji scramble
</TextScramble>
```

## Examples

### With delay

```tsx
<TextScramble delay={2} trigger="hover">
  Waits 2 seconds before scrambling
</TextScramble>
```

### Play once only

```tsx
<TextScramble trigger="click" once>
  Click me — works only once!
</TextScramble>
```

### With callback

```tsx
<TextScramble
  trigger="click"
  onAnimationComplete={() => console.log("Done!")}
>
  Click me
</TextScramble>
```

### Preserve numbers

```tsx
<TextScramble preserveNumbers>
  Price: $99.99 — numbers stay put
</TextScramble>
```

## Architecture

- **React layer** (`src/hooks/`, `src/components/`) — React hook and component consuming the engine
- **Rich text** (`src/utils/rich-text.tsx`) — Extracts text from React element trees, scrambles only the text, preserves element wrappers

See [ARCHITECTURE.md](./ARCHITECTURE.md) for design decisions.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## License

MIT