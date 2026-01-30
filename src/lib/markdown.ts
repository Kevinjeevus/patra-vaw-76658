
/**
 * Robust Markdown Parser that supports raw HTML and Tailwind classes.
 * Handles: Headers, Lists, Links, Images, Code Blocks, Quotes, Tables, etc.
 */
export const parseMarkdown = (text: string) => {
    if (!text) return '';

    let html = text;

    // Protect Code Blocks first to prevent other regex from messing them up
    const codeBlocks: string[] = [];
    html = html.replace(/```(\w*)([\s\S]*?)```/g, (match, lang, code) => {
        codeBlocks.push(`<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-4"><code class="language-${lang}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`);
        return `__CODEBLOCK_${codeBlocks.length - 1}__`;
    });

    // Protect Inline Code
    const inlineCode: string[] = [];
    html = html.replace(/`([^`]+)`/g, (match, code) => {
        inlineCode.push(`<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`);
        return `__INLINECODE_${inlineCode.length - 1}__`;
    });

    // Headers
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4 pb-2 border-b">$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-5 mb-2">$1</h3>');
    html = html.replace(/^#### (.*$)/gim, '<h4 class="text-lg font-semibold mt-4 mb-2">$1</h4>');

    // Blockquotes
    html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">$1</blockquote>');

    // Horizontal Rule
    html = html.replace(/^---$/gim, '<hr class="my-6 border-t" />');

    // Lists (Unordered)
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
    // Wrap consecutive li in ul
    html = html.replace(/((<li class="ml-4 list-disc">.*<\/li>\n?)+)/g, '<ul class="list-disc pl-5 my-4 space-y-1">$1</ul>');

    // Lists (Ordered)
    html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>');
    // Wrap consecutive li in ol
    html = html.replace(/((<li class="ml-4 list-decimal">.*<\/li>\n?)+)/g, '<ol class="list-decimal pl-5 my-4 space-y-1">$1</ol>');

    // Bold & Italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    html = html.replace(/__(.*?)__/gim, '<strong>$1</strong>');
    html = html.replace(/_(.*?)_/gim, '<em>$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-medium">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4 shadow-sm" />');

    // Tables (Simple support)
    html = html.replace(/^\|(.+)\|$/gim, (match, content) => {
        const cells = content.split('|').map((c: string) => `<td class="border px-4 py-2">${c.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
    });
    html = html.replace(/((<tr>.*<\/tr>\n?)+)/g, '<div class="overflow-x-auto my-4"><table class="w-full border-collapse border"><tbody>$1</tbody></table></div>');

    // Paragraphs (handle newlines)
    const blocks = html.split(/\n\n+/);
    html = blocks.map(block => {
        if (block.trim().startsWith('<')) return block; // Assume HTML block
        if (block.trim().startsWith('__CODEBLOCK')) return block;
        return `<p class="mb-4 leading-relaxed">${block.replace(/\n/g, '<br/>')}</p>`;
    }).join('\n');

    // Restore Code Blocks
    codeBlocks.forEach((code, index) => {
        html = html.replace(`__CODEBLOCK_${index}__`, code);
    });

    // Restore Inline Code
    inlineCode.forEach((code, index) => {
        html = html.replace(`__INLINECODE_${index}__`, code);
    });

    return html;
};
