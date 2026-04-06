import { marked } from "marked";
import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";

/*
function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token: any) => token.raw);
}
*/

function parseMarkdownIntoBlocks(markdown: unknown): string[] {
  const text =
    typeof markdown === "string"
      ? markdown
      : markdown == null
        ? ""
        : (markdown.find(e => typeof e !== 'undefined')).text;
        //String(markdown);
//  console.log("tokens text="+text+ " md="+JSON.stringify(markdown))
  const tokens = marked.lexer(text);
  return tokens.map((token) => token.raw);
}

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return <ReactMarkdown>{content}</ReactMarkdown>;
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false;
    return true;
  },
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

/*export const MemoizedMarkdown = memo(
  ({ content, id }: { content: string; id: string }) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

    return blocks.map((block, index) => (
      <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
    ));
  },
);
*/
export const MemoizedMarkdown = memo(
  ({ content, id }: { content: string | null | undefined; id: string }) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content ?? ""), [content]);
    return blocks.map((block, index) => (
      <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
    ));
  },
);

MemoizedMarkdown.displayName = "MemoizedMarkdown";
