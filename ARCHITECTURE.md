# Architecture

## ADR-001 — Framework Agnostic Engine

### Status

Accepted

### Decision

The scramble engine must not depend on React, Motion, or the DOM.

It should only receive plain data and return plain data.

### Why

This allows:

- Easy unit testing
- Reusability
- Better separation of concerns
- Future support for other frameworks

### Consequences

The React hook and component will only consume the engine.

---

## ADR-002 — Frame Generation

### Status

Accepted

### Decision

The scramble engine generates the complete animation as an array of frames instead of producing one frame at a time.

### Why

This enables:

- Replay animations
- Reverse (yoyo) animations
- Logo expansion
- Easier testing
- Deterministic output

### Consequences

The React hook is responsible for playing the frames over time.

---

## ADR-003 — Frame Generation is Time Independent

### Status

Accepted

### Decision

The frame generation engine is responsible only for producing animation frames.

It does not know about timing, intervals, requestAnimationFrame, or React.

### Why

Separating timing from generation makes the engine deterministic, easier to test, and reusable across different rendering environments.

### Consequences

The React hook is responsible for deciding when to display each generated frame.

---

## ADR-004 — Playback Controller

The React hook is responsible for scheduling and playing generated frames.

The engine never handles timing.

---

## ADR-005 — Trigger Modes

### Status

Accepted

### Decision

Triggering animations is represented by a string-based mode rather than a boolean.

Supported modes:

- mount
- hover
- click
- manual

### Why

A boolean cannot naturally represent multiple activation strategies.

Using a trigger mode allows the API to grow without introducing breaking changes.

---

## ADR-006 — `once` Property

### Status

Accepted

### Decision

The animation system supports a `once` flag that limits the animation to a single playback.

### Why

Prevents repetitive or distracting animations on interactive elements. Once the animation plays to completion once (on mount, hover, or click), all subsequent trigger events are silently ignored.

### Consequences

The hook tracks completion state via a `useRef(hasCompletedOnce)`. Each control method (`play`, `restart`, `reverse`) checks this ref before initiating playback.

---

## ADR-007 — Start Hidden

### Status

Accepted

### Decision

The component supports a `startHidden` prop that starts the text in its scrambled state.

### Why

Provides a "Hover to reveal" user experience where the content is initially hidden behind scrambled characters and only revealed when the animation triggers.

### Consequences

When `startHidden=true` and the animation hasn't started yet, the displayed text is the first scrambled frame (`frames[0]`) instead of the final target text.

---

## ADR-008 — `onAnimationComplete` Callback

### Status

Accepted

### Decision

The hook exposes an `isFinished` state, and the component calls an optional `onAnimationComplete` callback when the animation reaches its final frame.

### Why

Allows consumers to chain actions after the scramble animation completes (e.g., play a sound, navigate, show a tooltip).

### Consequences

A `useEffect` in `TextScramble` watches `isFinished` and invokes the callback. The callback is called once per completion and does not fire on re-renders.

---

## ADR-009 — Animation Flow (Normal → Scramble → Reveal)

### Status

Accepted

### Decision

The default animation flow displays the original text first, then replaces it with scrambled characters, and finally reveals the target text character by character.

### Why

This creates a visually striking "glitch-in" effect where the user sees the original text, then it corrupts, then it resolves — rather than starting from a scrambled state which can be confusing.

### Consequences

The hook uses a `hasStarted` flag that starts as `false`. While `false`, the displayed text is the final target (`options.to`). On the first animation tick, `hasStarted` flips to `true` and the frame index resets to `0`, causing the scrambled frame to appear. Subsequent ticks advance through the reveal sequence.
