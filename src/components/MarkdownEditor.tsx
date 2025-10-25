import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Code } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your content in markdown...',
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const renderMarkdown = (text: string) => {
    // Basic markdown rendering
    let html = text;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold">$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>');
    
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Code blocks
    html = html.replace(/```(.*?)```/gs, '<pre class="bg-muted p-4 rounded-lg my-4 overflow-x-auto"><code>$1</code></pre>');
    
    // Inline code
    html = html.replace(/`(.*?)`/gim, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>');
    
    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>');
    html = html.replace(/(<li.*<\/li>)/s, '<ul class="list-disc my-4">$1</ul>');
    
    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p class="mb-4">');
    html = '<p class="mb-4">' + html + '</p>';
    
    return html;
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <div className="border-b border-border bg-muted/50 px-4 py-2">
          <TabsList className="h-9">
            <TabsTrigger value="edit" className="gap-2">
              <Code className="w-4 h-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="edit" className="m-0 p-4">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[400px] font-mono text-sm border-0 focus-visible:ring-0 resize-none"
          />
        </TabsContent>
        
        <TabsContent value="preview" className="m-0 p-4">
          <div 
            className="prose prose-sm max-w-none min-h-[400px]"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
