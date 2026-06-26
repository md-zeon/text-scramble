/**
 * Rich text support for TextScramble.
 *
 * Allows scrambling text content inside React element trees
 * (e.g., `<Link href="/">Click me</Link>`) while preserving
 * the element wrappers, props, and structure.
 */

import {
  createElement,
  Fragment,
  type ReactNode,
  type ReactElement,
} from "react";

/* -------------------------------------------------------------------------- */
/*                                 Interfaces                                 */
/* -------------------------------------------------------------------------- */

export interface ScrambledNode {
  type: "text" | "element";
  text?: string;
  tag?: string;
  props?: Record<string, unknown>;
  children?: ScrambledNode[];
}

/* -------------------------------------------------------------------------- */
/*                              Serialize to tree                             */
/* -------------------------------------------------------------------------- */

/**
 * Recursively flatten all text content from a ReactNode tree into a single
 * string, while building a tree descriptor (list of nodes) that maps each
 * text segment back to its location in the tree.
 *
 * Returns the concatenated plain-text and the node tree.
 */
export function extractText(children: ReactNode): {
  text: string;
  tree: ScrambledNode[];
} {
  const segments: string[] = [];
  const tree: ScrambledNode[] = [];

  walkReactNode(children, segments, tree);

  return { text: segments.join(""), tree };
}

/**
 * Walk a ReactNode and collect text + tree structure.
 */
function walkReactNode(
  node: ReactNode,
  segments: string[],
  tree: ScrambledNode[],
): void {
  // null / undefined / boolean
  if (node == null || typeof node === "boolean") {
    return;
  }

  // String / number
  if (typeof node === "string" || typeof node === "number") {
    const text = String(node);
    if (text.length === 0) return;
    segments.push(text);
    tree.push({ type: "text", text });
    return;
  }

  // React element (has a $$typeof)
  if (typeof node === "object" && "type" in node) {
    const element = node as ReactElement;
    const tag = typeof element.type === "string" ? element.type : undefined;

    // Collect children from the element's props
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const elementChildren = (element.props as any)?.children;
    const childTree: ScrambledNode[] = [];
    const localSegments: string[] = [];

    if (elementChildren !== undefined && elementChildren !== null) {
      if (Array.isArray(elementChildren)) {
        for (const child of elementChildren) {
          walkReactNode(child, localSegments, childTree);
        }
      } else {
        walkReactNode(elementChildren, localSegments, childTree);
      }
    }

    // Flatten localSegments into the global segments
    for (const s of localSegments) {
      segments.push(s);
    }

    // Copy props (skip children)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const restProps = ((element.props as any) ?? {}) as Record<string, unknown>;
    delete restProps.children;

    tree.push({
      type: "element",
      tag,
      props: restProps,
      children: childTree,
    });
    return;
  }
}

/* -------------------------------------------------------------------------- */
/*                        Reconstruct tree with new text                      */
/* -------------------------------------------------------------------------- */

/**
 * Take a previously built node tree and a new string of the same length,
 * and replace every text node's content with the corresponding slice from
 * the new string.
 */
export function replaceText(tree: ScrambledNode[], newText: string): void {
  let cursor = 0;

  function walk(nodes: ScrambledNode[]): void {
    for (const node of nodes) {
      if (node.type === "text") {
        const len = node.text!.length;
        node.text = newText.slice(cursor, cursor + len);
        cursor += len;
      } else if (node.type === "element" && node.children) {
        walk(node.children);
      }
    }
  }

  walk(tree);
}

/* -------------------------------------------------------------------------- */
/*                       Render tree back to ReactNodes                       */
/* -------------------------------------------------------------------------- */

/**
 * Convert a ScrambledNode tree (after replacement) back into renderable
 * ReactNode elements.
 */
export function renderTree(tree: ScrambledNode[]): ReactNode {
  if (tree.length === 0) return null;
  if (tree.length === 1) return renderSingleNode(tree[0]);
  return tree.map((node, i) => (
    <Fragment key={i}>{renderSingleNode(node)}</Fragment>
  ));
}

function renderSingleNode(node: ScrambledNode): ReactNode {
  if (node.type === "text") {
    return node.text;
  }

  if (node.type === "element") {
    const childNodes = node.children ? renderTree(node.children) : undefined;

    if (!node.tag) {
      // Unknown component type — render as fragment
      return <Fragment>{childNodes}</Fragment>;
    }

    return createElement(
      node.tag,
      { ...node.props, key: undefined },
      childNodes,
    );
  }

  return null;
}
