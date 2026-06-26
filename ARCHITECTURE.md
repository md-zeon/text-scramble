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
