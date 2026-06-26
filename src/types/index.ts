import type { ElementType, ReactNode, HTMLAttributes } from "react";

/* -------------------------------------------------------------------------- */
/*                               Trigger Mode                                 */
/* -------------------------------------------------------------------------- */

export type TextScrambleMode = "mount" | "hover" | "click" | "manual";

/* -------------------------------------------------------------------------- */
/*                              Character Sets                                */
/* -------------------------------------------------------------------------- */

export type CharacterSetPreset =
  | "letters"
  | "numbers"
  | "binary"
  | "hex"
  | "symbols"
  | "alphanumeric"
  | "ascii";

/* -------------------------------------------------------------------------- */
/*                               Public Props                                 */
/* -------------------------------------------------------------------------- */

export interface TextScrambleProps extends HTMLAttributes<HTMLElement> {
  /**
   * Rich text support.
   */
  children?: ReactNode;

  /**
   * Render element.
   * @default "span"
   */
  as?: ElementType;

  className?: string;

  /**
   * Animation duration in seconds.
   * @default 0.8
   */
  duration?: number;

  /**
   * Time between animation updates in seconds.
   * @default 0.04
   */
  speed?: number;

  /**
   * Delay before animation starts in seconds.
   * @default 0
   */
  delay?: number;

  /**
   * Animation mode.
   * @default "mount"
   */
  trigger?: TextScrambleMode;

  /**
   * Start with scrambled text instead of the original.
   */
  startHidden?: boolean;

  /**
   * Reverse animation on mouse leave.
   * Only valid when trigger="hover".
   */
  yoyo?: boolean;

  /**
   * If true, the animation only plays once and ignores
   * subsequent trigger events (hover/click/restart).
   * @default false
   */
  once?: boolean;

  /**
   * Character preset or custom string.
   */
  characterSet?: CharacterSetPreset | string;

  /**
   * Preserve spaces.
   * @default true
   */
  preserveSpaces?: boolean;

  /**
   * Preserve punctuation.
   * @default true
   */
  preservePunctuation?: boolean;

  /**
   * Preserve numbers.
   * @default false
   */
  preserveNumbers?: boolean;

  /**
   * Text to show before animation triggers.
   * When combined with `revealText`, the component animates
   * between these two values (e.g., "TS" → "TEXT SCRAMBLE").
   */
  initialText?: string;

  /**
   * Text to reveal after animation completes.
   * Must be used together with `initialText`.
   */
  revealText?: string;

  /**
   * Called after animation completes.
   */
  onAnimationComplete?: () => void;
}

/* -------------------------------------------------------------------------- */
/*                              Frame Generation                              */
/* -------------------------------------------------------------------------- */

export type RevealStrategy = "sequential" | "random";

export interface GenerateFramesOptions {
  /**
   * Starting text. Empty string means start from a fully
   * scrambled version of `to`.
   */
  from?: string;

  /**
   * Target text.
   */
  to: string;

  /**
   * Total animation duration in seconds.
   */
  duration: number;

  /**
   * Time between frame updates in seconds.
   */
  speed: number;

  /**
   * Character set to use while scrambling.
   */
  characterSet: string;

  /**
   * Reveal order.
   */
  revealStrategy?: RevealStrategy;

  preserveSpaces: boolean;
  preserveNumbers: boolean;
  preservePunctuation: boolean;
}

/* -------------------------------------------------------------------------- */
/*                               React Layer                                  */
/* -------------------------------------------------------------------------- */

export type TriggerMode = "mount" | "hover" | "click" | "manual";

export type ScrambleFrame = string;

export type ScrambleFrames = ScrambleFrame[];

export interface UseScrambleOptions {
  /**
   * Starting text.
   * @default ""
   */
  from?: string;

  /**
   * Target text.
   */
  to: string;

  /**
   * Total animation duration in seconds.
   */
  duration: number;

  /**
   * Time between frame updates in seconds.
   */
  speed: number;

  /**
   * Character set to use while scrambling.
   */
  characterSet: string;

  /**
   * Reveal order.
   */
  revealStrategy?: RevealStrategy;

  preserveSpaces: boolean;
  preserveNumbers: boolean;
  preservePunctuation: boolean;

  /**
   * Determines how the animation starts.
   *
   * @default "mount"
   */
  trigger?: TriggerMode;

  /**
   * Delay before playback begins in seconds.
   *
   * @default 0
   */
  delay?: number;

  /**
   * If true, start with scrambled text instead of the original.
   * @default false
   */
  startHidden?: boolean;

  /**
   * If true, the animation only plays once.
   * @default false
   */
  once?: boolean;
}

export interface UseScrambleReturn {
  /**
   * Current text being displayed.
   */
  text: string;

  /**
   * Whether the animation is currently playing.
   */
  isPlaying: boolean;

  /**
   * Whether the animation has finished playing.
   */
  isFinished: boolean;

  play(): void;

  pause(): void;

  stop(): void;

  restart(): void;

  reverse(): void;
}
