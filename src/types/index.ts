import type { MotionProps } from "motion/react";
import type { ElementType, ReactNode } from "react";

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

export interface TextScrambleProps extends MotionProps {
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
   * Delay before animation starts.
   * @default 0
   */
  delay?: number;

  /**
   * Animation mode.
   * @default "mount"
   */
  mode?: TextScrambleMode;

  /**
   * Start with scrambled text instead of the original.
   */
  startHidden?: boolean;

  /**
   * Reverse animation on mouse leave.
   * Only valid when mode="hover".
   */
  yoyo?: boolean;

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
   * Logo expansion mode.
   */
  collapsedText?: string;

  /**
   * Expanded logo text.
   */
  expandedText?: string;

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
   * Starting text.
   */
  from: string;

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
