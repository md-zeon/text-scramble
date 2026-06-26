"use client";

import type { JSX } from "react";
import { motion } from "motion/react";

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
  ...motionProps
}: TextScrambleProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements,
  );

  // Temporary: only support plain string children.
  const text = typeof children === "string" ? children : String(children ?? "");

  const { text: scrambledText, restart } = useScramble({
    from: "",
    to: text,
    duration,
    speed,
    delay,
    trigger: trigger,
    characterSet: resolveCharacterSet(characterSet),
    preserveSpaces,
    preserveNumbers,
    preservePunctuation,
  });

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      restart();
    }
  };

  return (
    <MotionComponent
      className={className}
      onMouseEnter={handleMouseEnter}
      {...motionProps}
    >
      {scrambledText}
    </MotionComponent>
  );
}
