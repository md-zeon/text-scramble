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
