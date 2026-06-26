"use client";

import { useEffect, useMemo } from "react";

import { useScramble } from "../hooks/useScramble";
import { resolveCharacterSet } from "../utils/presets";
import { extractText, replaceText, renderTree } from "../utils/rich-text";
import type { TextScrambleProps } from "../types";
import type { ScrambledNode } from "../utils/rich-text";

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

  // Determine if children contain rich elements (not just plain text)
  const isRichText = !isToggleMode && !isPlainString(children);

  // If it's rich text, extract the text and tree structure
  const richTextInfo = useMemo(() => {
    if (!isRichText) return null;
    return extractText(children);
  }, [children, isRichText]);

  // The plain text target for the scramble engine
  const scrambleTarget = isRichText
    ? (richTextInfo?.text ?? "")
    : isToggleMode
      ? (revealText ?? "")
      : typeof children === "string" || typeof children === "number"
        ? String(children)
        : "";

  const {
    text: scrambledText,
    isFinished,
    restart,
    reverse,
  } = useScramble({
    from: "",
    to: scrambleTarget,
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
      restart();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
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

  // Render the content: for rich text we rebuild the tree, otherwise plain text
  const renderedContent = useMemo(() => {
    if (isRichText && richTextInfo) {
      const clonedTree: ScrambledNode[] = JSON.parse(
        JSON.stringify(richTextInfo.tree),
      );
      replaceText(clonedTree, scrambledText);
      return renderTree(clonedTree);
    }
    return scrambledText;
  }, [isRichText, richTextInfo, scrambledText]);

  return (
    <Component
      className={className}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {renderedContent}
    </Component>
  );
}

/**
 * Returns true if a ReactNode is a plain string or number.
 */
function isPlainString(node: React.ReactNode): boolean {
  return (
    typeof node === "string" ||
    typeof node === "number" ||
    node == null ||
    typeof node === "boolean"
  );
}
