import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Send, Sparkles, Plus, Copy, RefreshCw, Bot, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

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
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetchProfileData();
  }, [username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const adjustTextareaHeight = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

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

    // Reset height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-pink-200/30 rounded-full blur-[80px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/${username}`)}
                className="hover:bg-slate-100/50 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Avatar className="w-9 h-9 ring-2 ring-white shadow-sm">
                    <AvatarImage src={profileImage} alt={profileName} />
                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm">
                      {profileName?.charAt(0) || 'AI'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-slate-900 leading-tight">{profileName || 'AI Assistant'}</h1>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-violet-500" />
                    Patra AI
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearChat}
                  className="text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 rounded-full"
                  title="Clear Chat"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}
              <Button
                onClick={() => navigate('/editor')}
                size="sm"
                className="hidden sm:flex bg-slate-900 hover:bg-slate-800 text-white shadow-md rounded-full px-4 gap-2 transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                Create Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 relative z-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 pb-32 min-h-full flex flex-col">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex flex-col items-center justify-center space-y-8 my-auto"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <Avatar className="w-32 h-32 ring-4 ring-white shadow-2xl relative z-10">
                    <AvatarImage src={profileImage} alt={profileName} />
                    <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                      {profileName?.charAt(0) || 'AI'}
                    </AvatarFallback>
                  </Avatar>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg z-20"
                  >
                    <Sparkles className="w-6 h-6 text-violet-600 fill-violet-100" />
                  </motion.div>
                </div>

                <div className="text-center space-y-3 max-w-md">
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">{profileName}</span>
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    I'm here to answer questions about my work, experience, and background. Ask me anything!
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                  {quickActions.map((action, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      onClick={() => handleQuickAction(action)}
                      className="p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-violet-200 rounded-xl shadow-sm hover:shadow-md transition-all text-left group"
                    >
                      <span className="text-sm font-medium text-slate-700 group-hover:text-violet-700 transition-colors">
                        {action}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <Avatar className="w-8 h-8 shrink-0 mt-1 ring-2 ring-white shadow-sm">
                        <AvatarImage src={profileImage} alt={profileName} />
                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs">
                          {profileName?.charAt(0) || 'AI'}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`group relative px-5 py-3.5 shadow-sm ${msg.role === 'user'
                          ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm'
                          : 'bg-white border border-slate-100 text-slate-800 rounded-2xl rounded-tl-sm'
                        }`}>
                        <div className={`text-[15px] leading-relaxed prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : 'prose-slate'
                          }`}>
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>

                        {msg.role === 'assistant' && (
                          <button
                            onClick={() => copyMessage(msg.content)}
                            className="absolute -right-10 top-2 p-1.5 text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Copy message"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 px-1 font-medium">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>

                    {msg.role === 'user' && (
                      <Avatar className="w-8 h-8 shrink-0 mt-1 ring-2 ring-white shadow-sm">
                        <AvatarFallback className="bg-slate-200 text-slate-600 text-xs font-bold">
                          ME
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4"
                  >
                    <Avatar className="w-8 h-8 shrink-0 mt-1 ring-2 ring-white shadow-sm">
                      <AvatarImage src={profileImage} alt={profileName} />
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs">
                        {profileName?.charAt(0) || 'AI'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-white via-white/95 to-transparent pt-10 pb-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end gap-2 bg-white rounded-[26px] shadow-xl shadow-slate-200/50 border border-slate-200 p-2 focus-within:ring-2 focus-within:ring-violet-100 focus-within:border-violet-200 transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={isLoading}
              rows={1}
              className="flex-1 max-h-[200px] min-h-[44px] py-3 px-4 bg-transparent border-none focus:ring-0 resize-none text-slate-800 placeholder:text-slate-400 text-[15px] leading-relaxed scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`h-11 w-11 rounded-full shrink-0 transition-all duration-300 ${input.trim()
                  ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200 scale-100'
                  : 'bg-slate-100 text-slate-400 scale-90'
                }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Send className="w-5 h-5 ml-0.5" />
              )}
            </Button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
            Powered by Patra AI • Responses may vary
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
