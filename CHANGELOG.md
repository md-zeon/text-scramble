# Changelog

## v0.1.0

- Initial project
- Character presets
- Random utilities
- Character utilities

# Unreleased

### Added

- Trigger modes for the React API (`mount`, `hover`, `click`, `manual`)
- `once` property — limit animation to a single playback
- `startHidden` prop — start text in scrambled state
- `onAnimationComplete` callback — fire when animation finishes
- `isFinished` state exposed from `useScramble` hook

### Fixed

- `restart()` not setting `hasStarted=true`, causing click/hover triggers to do nothing
- `from` prop being completely ignored in frame generation
- `onAnimationComplete` never being called
- Initial value showing scrambled text immediately instead of original text first

### Changed

- Animation flow: now shows **original text → scramble → reveal** instead of starting scrambled
- Frame generator now respects the `from` parameter as the initial frame