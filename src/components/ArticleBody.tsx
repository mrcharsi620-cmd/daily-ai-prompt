import { Fragment } from "react";

// Lightweight renderer: blank lines separate paragraphs, "## " and "### " make headings,
// "- " starts a bullet list. All text is escaped by React (no raw HTML injection).
export function ArticleBody({ content }: { content: string }) {
  const blocks = content.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

  return (
    <div className="prose-custom space-y-5 text-[1.05rem] leading-8 text-slate-800">
      {blocks.map((block, i) => {
        if (block.startsWith("### ")) {
          return (
            <h3 key={i} className="pt-4 text-xl font-semibold text-slate-950">
              {block.slice(4)}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="pt-6 text-2xl font-bold text-slate-950">
              {block.slice(3)}
            </h2>
          );
        }
        const lines = block.split("\n");
        if (lines.every((l) => l.trim().startsWith("- "))) {
          return (
            <ul key={i} className="list-disc space-y-2 pl-6">
              {lines.map((l, j) => (
                <li key={j}>{l.trim().slice(2)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            {lines.map((line, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
