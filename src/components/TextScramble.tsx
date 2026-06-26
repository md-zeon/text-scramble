"use client";

import { useState, useEffect } from "react";

import { useScramble } from "../hooks/useScramble";
import { resolveCharacterSet } from "../utils/presets";
import type { TextScrambleProps } from "../types";

export function TextScramble({
  children,
  as: Component = "span",
  className,
  duration = 0.8,
  speed = 0.04,
  delay = 0,
  trigger = "mount",
  characterSet = "letters",
  preserveSpaces = true,
  preserveNumbers = false,
  preservePunctuation = true,
  initialText,
  revealText,
  yoyo = false,
  startHidden = false,
  once = false,
  onAnimationComplete,
  ...rest
}: TextScrambleProps) {
  // Toggle mode: if both initialText and revealText are provided,
  // the component switches between them on trigger events.
  const isToggleMode = !!(initialText && revealText);
  const baseText = isToggleMode ? initialText : children;
  const expanded = isToggleMode ? revealText : children;

  const [target, setTarget] = useState(baseText);

  const {
    text: scrambledText,
    isFinished,
    restart,
    reverse,
  } = useScramble({
    from: "",
    to: target as string,
    duration,
    speed,
    delay,
    trigger,
    characterSet: resolveCharacterSet(characterSet),
    preserveSpaces,
    preserveNumbers,
    preservePunctuation,
    startHidden,
    once,
  });

  // Fire onAnimationComplete when animation finishes
  useEffect(() => {
    if (isFinished && onAnimationComplete) {
      onAnimationComplete();
    }
  }, [isFinished, onAnimationComplete]);

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      if (isToggleMode) {
        setTarget(expanded);
      }
      restart();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      if (isToggleMode) {
        setTarget(baseText);
      }

      if (yoyo) {
        reverse();
      }
    }
  };

  const handleClick = () => {
    if (trigger === "click") {
      restart();
    }
  };

  return (
    <Component
      className={className}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {scrambledText}
    </Component>
  );
}