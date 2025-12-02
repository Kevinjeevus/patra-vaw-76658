import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Bold, Italic, Heading1, Heading2, Heading3,
  List, ListOrdered, Link as LinkIcon, Image as ImageIcon,
  Code, Quote, Minus, Eye, Columns, PanelLeft,
  Maximize2, Minimize2, Type
} from 'lucide-react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from '@/lib/utils';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your content in markdown or HTML...',
  className,
  if(!doc) return;

  const parsedContent = parseMarkdown(value);

  // Base styles for the iframe
  const styles = `
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          padding: 2rem;
          margin: 0;
          max-width: 100%;
        }
        @media (prefers-color-scheme: dark) {
          body { background-color: #020817; color: #f8fafc; }
          a { color: #3b82f6; }
          blockquote { border-color: #1e293b; color: #94a3b8; }
          code { background-color: #1e293b; color: #e2e8f0; }
          pre { background-color: #0f172a; }
          th, td { border-color: #1e293b; }
        }
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        /* Typography Resets */
        img { max-width: 100%; height: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #e2e8f0; padding: 0.5rem; text-align: left; }
        
        /* User provided CSS will override this */
      </style>
      <!-- Tailwind CDN for utility classes if user writes raw HTML with tailwind -->
      <script src="https://cdn.tailwindcss.com"></script>
    `;

  doc.open();
  doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${styles}
        </head>
        <body>
          ${parsedContent}
        </body>
      </html>
    `);
  doc.close();
}, [value]);

return (
  <div className={cn(
    "flex flex-col border border-border rounded-lg overflow-hidden bg-background",
    isFullscreen && "fixed inset-0 z-50 rounded-none",
    className
  )}>
    {/* Toolbar */}
    <div className="flex items-center justify-between border-b border-border bg-muted/30 p-2 gap-2 flex-wrap">
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={() => insertText('**', '**')} title="Bold">
          <Bold className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertText('*', '*')} title="Italic">
          <Italic className="w-4 h-4" />
        </Button>
        <div className="w-px h-4 bg-border mx-1" />
        <Button variant="ghost" size="icon" onClick={() => insertText('# ')} title="Heading 1">
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertText('## ')} title="Heading 2">
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertText('### ')} title="Heading 3">
          <Heading3 className="w-4 h-4" />
        </Button>
        <div className="w-px h-4 bg-border mx-1" />
        <Button variant="ghost" size="icon" onClick={() => insertText('- ')} title="Bullet List">
          <List className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertText('1. ')} title="Ordered List">
          <ListOrdered className="w-4 h-4" />
        </Button>
        <div className="w-px h-4 bg-border mx-1" />
        <Button variant="ghost" size="icon" onClick={() => insertText('[', '](url)')} title="Link">
          <LinkIcon className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertText('![alt text](', ')')} title="Image">
          <ImageIcon className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertText('```\n', '\n```')} title="Code Block">
          <Code className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertText('> ')} title="Quote">
          <Quote className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertText('\n---\n')} title="Horizontal Rule">
          <Minus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-1 ml-auto">
        <div className="flex bg-muted rounded-md p-0.5 border border-border">
          <Button
            variant={viewMode === 'write' ? 'secondary' : 'ghost'}
            size="sm"
            className="h-7 text-xs px-2"
            onClick={() => setViewMode('write')}
          >
            <PanelLeft className="w-3 h-3 mr-1" /> Write
          </Button>
          <Button
            variant={viewMode === 'split' ? 'secondary' : 'ghost'}
            size="sm"
            className="h-7 text-xs px-2"
            onClick={() => setViewMode('split')}
          >
            <Columns className="w-3 h-3 mr-1" /> Split
          </Button>
          <Button
            variant={viewMode === 'preview' ? 'secondary' : 'ghost'}
            size="sm"
            className="h-7 text-xs px-2"
            onClick={() => setViewMode('preview')}
          >
            <Eye className="w-3 h-3 mr-1" /> Preview
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsFullscreen(!isFullscreen)}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </Button>
      </div>
    </div>

    {/* Editor Area */}
    <div className="flex-1 overflow-hidden relative min-h-[500px]">
      {viewMode === 'split' ? (
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} minSize={20}>
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full h-full p-4 resize-none border-0 focus-visible:ring-0 font-mono text-sm rounded-none"
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50} minSize={20}>
            <iframe
              ref={iframeRef}
              className="w-full h-full border-0 bg-white dark:bg-slate-950"
              title="Preview"
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : viewMode === 'write' ? (
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full p-4 resize-none border-0 focus-visible:ring-0 font-mono text-sm rounded-none"
        />
      ) : (
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0 bg-white dark:bg-slate-950"
          title="Preview"
        />
      )}
    </div>

    {/* Footer */}
    <div className="border-t border-border bg-muted/30 p-2 text-xs text-muted-foreground flex justify-between">
      <span>Markdown & HTML supported</span>
      <span>{value.length} chars</span>
    </div>
  </div>
);
};
