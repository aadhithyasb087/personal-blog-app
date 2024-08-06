export const extractParagraphs = (markdown) => {
  markdown = markdown.replace(/!\[.*?\]\(.*?\)/g, "");
  // Remove URL links: [text](url)
  markdown = markdown.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");

  // Remove inline code: `code`
  markdown = markdown.replace(/`[^`]+`/g, "");

  // Remove code blocks: ```code```
  markdown = markdown.replace(/```[\s\S]*?```/g, "");
  markdown = markdown.replace(/````/g, "");

  // Remove headings: # Heading
  markdown = markdown.replace(/^#{1,6}\s+.+$/gm, "");

  // Remove horizontal rules: ---
  markdown = markdown.replace(/^-{3,}$/gm, "");

  // Remove blockquotes: > quote
  markdown = markdown.replace(/^>\s+.+$/gm, "");

  markdown = markdown.replace(/\*\*(.*?)\*\*/g, "$1");
  markdown = markdown.replace(/__(.*?)__/g, "$1");

  // Remove empty lines and trim
  markdown = markdown.replace(/^\s*[\r\n]/gm, "");
  markdown = markdown.replace(/~~(.*?)~~/g, "$1");

  // Remove inserted text: ++text++
  markdown = markdown.replace(/\+\+(.*?)\+\+/g, "$1");

  // Extract paragraphs
  const paragraphs = markdown
    .split(/\n\s*\n/)
    .filter((paragraph) => paragraph.trim() !== "");
  const content = paragraphs.join(" ").slice(0, 200);
  return content;
};
