import { Fragment, type CSSProperties } from "react";

/*
 * Text splitters for the scroll animations (see app/animations.css).
 * Screen readers get the full text once (.sr-only); the animated letters /
 * words are aria-hidden so they are never read out one by one.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** Letter by letter. Words stay unbroken so wrapping still works. */
export function SplitChars({ text, step = 0 }: { text: string; step?: number }) {
  let i = step;
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" data-split="chars">
        {words.map((word, w) => (
          <Fragment key={w}>
            <span className="anim-word">
              {Array.from(word).map((ch, c) => (
                <span key={c} className="anim-char" style={{ "--i": i++ } as Vars}>
                  {ch}
                </span>
              ))}
            </span>
            {/* the space lives outside the inline-block, or it would collapse */}
            {w < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </>
  );
}

/** Word by word. */
export function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" data-split="words">
        {words.map((word, w) => (
          <Fragment key={w}>
            <span className="anim-w" style={{ "--i": w } as Vars}>
              {word}
            </span>
            {w < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </>
  );
}

/** Stagger index helper for lists/cards: style={stagger(i)} */
export function stagger(i: number): Vars {
  return { "--d": i };
}

/** Per-item index inside a [data-stagger] list: style={idx(i)} */
export function idx(i: number): Vars {
  return { "--i": i };
}
