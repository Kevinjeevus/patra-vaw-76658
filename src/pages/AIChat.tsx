import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Send, Sparkles, Plus, MoreVertical, Copy, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quickActions] = useState<string[]>([
    "How can I contact you?",
    "Tell me about your work",
    "What's your background?",
    "Share your expertise"
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfileData();
  }, [username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const fetchProfileData = async () => {
    const { data } = await supabase
      .from('digital_cards')
      .select(`
        content_json,
        owner_user_id,
        profiles!digital_cards_owner_user_id_fkey(display_name, avatar_url)
      `)
      .eq('vanity_url', username)
      .single();
    
    if (data) {
      const content = data.content_json as any;
      const profile = data.profiles as any;
      setProfileName(content?.fullName || profile?.display_name || username || '');
      setProfileImage(content?.avatarUrl || profile?.avatar_url || '');
    }
  };

  const streamChat = async ({
    messages,
    onDelta,
    onDone,
  }: {
    messages: Message[];
    onDelta: (deltaText: string) => void;
    onDone: () => void;
  }) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
    
    const resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ username, messages }),
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error('Stream error:', resp.status, errorText);
      
      if (resp.status === 429) {
        toast({
          title: 'Rate Limit Exceeded',
          description: 'Please try again later.',
          variant: 'destructive',
        });
      } else if (resp.status === 402) {
        toast({
          title: 'Service Unavailable',
          description: 'AI service requires payment.',
          variant: 'destructive',
        });
      } else if (resp.status === 404) {
        toast({
          title: 'Profile Not Found',
          description: 'This AI profile is not available.',
          variant: 'destructive',
        });
      }
      throw new Error(`Failed to start stream: ${resp.status}`);
    }

    if (!resp.body) throw new Error('No response body');

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = '';
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith('\r')) line = line.slice(0, -1);
        if (line.startsWith(':') || line.trim() === '') continue;
        if (!line.startsWith('data: ')) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === '[DONE]') {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + '\n' + textBuffer;
          break;
        }
      }
    }

    if (textBuffer.trim()) {
      for (let raw of textBuffer.split('\n')) {
        if (!raw) continue;
        if (raw.endsWith('\r')) raw = raw.slice(0, -1);
        if (raw.startsWith(':') || raw.trim() === '') continue;
        if (!raw.startsWith('data: ')) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === '[DONE]') continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch { /* ignore partial leftovers */ }
      }
    }

    onDone();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    let assistantSoFar = '';
    const upsertAssistant = (nextChunk: string) => {
      assistantSoFar += nextChunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: 'assistant', content: assistantSoFar, timestamp: new Date() }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => {
          setIsLoading(false);
          setIsTyping(false);
        },
      });
    } catch (e) {
      console.error('Chat error:', e);
      setIsLoading(false);
      setIsTyping(false);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    inputRef.current?.focus();
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard",
    });
  };

  const clearChat = () => {
    setMessages([]);
    toast({
      title: "Chat cleared",
      description: "Conversation history has been reset",
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden">
      {/* Micro-dotted background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      {/* Gradient orbs */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/${username}`)}
                className="hover:bg-slate-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                  <h1 className="text-xl font-bold text-slate-900">Talk to me</h1>
                </div>
              </div>
            </div>
            <Button
              onClick={() => navigate('/editor')}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Profile
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-6 pb-32">
        <div className="space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)] space-y-8 animate-fade-in">
              {/* Profile Avatar */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
                <Avatar className="relative w-32 h-32 ring-4 ring-white shadow-2xl">
                  <AvatarImage src={profileImage} alt={profileName} />
                  <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-violet-100 to-purple-100 text-violet-700">
                    {profileName?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Welcome Text */}
              <div className="text-center space-y-3">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Hi, I'm {profileName}
                </h2>
                <p className="text-lg text-slate-600">Ask me anything about my work and experience</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-600">Powered by Patra AI</span>
                </div>
              </div>

              {/* View Profile Button */}
              <Button 
                variant="outline"
                onClick={() => navigate(`/${username}`)}
                className="border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              >
                View my Profile
              </Button>
              
              {/* Quick Actions */}
              <div className="overflow-x-auto w-full scrollbar-thin">
  <div className="flex gap-3 pb-3 px-1">
    {quickActions.map((action, idx) => (
      <button
        key={idx}
        onClick={() => handleQuickAction(action)}
        className="group px-5 py-3 bg-white border-2 border-slate-200 rounded-xl hover:border-violet-300 hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap flex-shrink-0"
      >
        <span className="text-sm font-medium text-slate-700 group-hover:text-violet-600 transition-colors">
          {action}
        </span>
      </button>
    ))}
  </div>
</div>

              
            </div>
          ) : (
            <>
              {/* Clear Chat Button */}
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear Chat
                </Button>
              </div>

              {/* Messages */}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 animate-slide-up ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {msg.role === 'assistant' && (
                    <Avatar className="w-10 h-10 shrink-0 mt-1 ring-2 ring-violet-100">
                      <AvatarImage src={profileImage} alt={profileName} />
                      <AvatarFallback className="bg-gradient-to-br from-violet-100 to-purple-100 text-violet-700 font-bold">
                        {profileName?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[75%]`}>
                    <Card className={`group relative ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white border-0 shadow-lg' 
                        : 'bg-white border-slate-200 shadow-md hover:shadow-lg transition-shadow'
                    }`}>
                      <CardContent className="p-4">
                        <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                          msg.role === 'user' ? 'text-white' : 'text-slate-700'
                        }`}>
                          {msg.content}
                        </p>
                      </CardContent>
                      
                      {/* Copy button for assistant messages */}
                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => copyMessage(msg.content)}
                          className="absolute top-2 right-2 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-600" />
                        </button>
                      )}
                    </Card>
                    
                    {/* Timestamp */}
                    <span className="text-xs text-slate-400 px-2">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>

                  {msg.role === 'user' && (
                    <Avatar className="w-10 h-10 shrink-0 mt-1 ring-2 ring-slate-100">
                      <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 font-bold">
                        You
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-4 animate-slide-up">
                  <Avatar className="w-10 h-10 shrink-0 mt-1 ring-2 ring-violet-100">
                    <AvatarImage src={profileImage} alt={profileName} />
                    <AvatarFallback className="bg-gradient-to-br from-violet-100 to-purple-100 text-violet-700 font-bold">
                      {profileName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Card className="bg-white border-slate-200 shadow-md">
                    <CardContent className="p-4">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 z-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="h-12 bg-white border-slate-200 focus:border-violet-500 focus:ring-violet-500 pr-12 shadow-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                {input.length > 0 && `${input.length}/500`}
              </div>
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="h-12 w-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-center text-slate-400 mt-3">
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AIChat;
