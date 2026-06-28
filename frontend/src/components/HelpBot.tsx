import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Bot, Send, X, Wrench } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { apiUrl } from "@/lib/api";

const SUGGESTIONS = [
  "Washing machine won't drain",
  "Geyser not heating water",
  "How do I book a service?",
  "What is your warranty?",
];

const WELCOME: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Hi! I'm **MistryBot** — your Mistry service assistant.\n\nTell me your appliance and issue (e.g. *geyser not heating*), and I'll suggest quick checks or help you book a technician.\n\n**Call:** +91 95995 66502",
    },
  ],
};

function BotAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { wrap: "size-8", icon: "size-4" },
    md: { wrap: "size-11", icon: "size-6" },
    lg: { wrap: "size-14", icon: "size-7" },
  };
  const s = sizes[size];
  return (
    <div
      className={`${s.wrap} shrink-0 rounded-full bg-[var(--color-mint)] ring-2 ring-white/90 shadow-md grid place-items-center`}
    >
      <Bot className={`${s.icon} text-primary`} strokeWidth={2.5} />
    </div>
  );
}

export function HelpBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: apiUrl("/api/chat") }),
    messages: [WELCOME],
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, isLoading]);

  const send = async (text: string) => {
    const value = text.trim();
    if (!value || isLoading) return;
    setInput("");
    await sendMessage({ text: value });
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close help chat" : "Open MistryBot help chat"}
        className="fixed bottom-5 right-5 z-50 group flex items-center gap-2.5 rounded-full bg-[var(--gradient-hero)] text-primary-foreground pl-2 pr-4 py-2.5 shadow-[var(--shadow-glow)] ring-2 ring-[var(--color-mint)]/60 hover:scale-105 hover:ring-[var(--color-mint)] transition"
      >
        {open ? (
          <span className="size-11 rounded-full bg-[var(--color-mint)] grid place-items-center ring-2 ring-white/80">
            <X className="size-5 text-primary" strokeWidth={2.5} />
          </span>
        ) : (
          <BotAvatar size="md" />
        )}
        <span className="text-sm font-semibold hidden sm:inline">
          {open ? "Close" : "Ask MistryBot"}
        </span>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[min(92vw,380px)] h-[min(70vh,560px)] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-[var(--gradient-hero)] text-primary-foreground">
            <BotAvatar size="md" />
            <div className="flex-1">
              <div className="font-bold leading-tight">MistryBot</div>
              <div className="text-xs opacity-90 flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-[var(--color-mint)] animate-pulse" />
                Online · precise appliance help
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="p-1 hover:bg-white/10 rounded">
              <X className="size-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
            {messages.map((m) => {
              const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}>
                  {!isUser && <BotAvatar size="sm" />}
                  <div
                    className={
                      isUser
                        ? "max-w-[80%] rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-3 py-2 text-sm"
                        : "max-w-[85%] text-sm text-foreground prose prose-sm prose-neutral dark:prose-invert prose-p:my-1 prose-ul:my-1"
                    }
                  >
                    {isUser ? text : <ReactMarkdown>{text}</ReactMarkdown>}
                  </div>
                </div>
              );
            })}
            {status === "submitted" && (
              <div className="flex gap-2.5">
                <BotAvatar size="sm" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground italic">
                  <Wrench className="size-4 animate-pulse" />
                  Checking your issue…
                </div>
              </div>
            )}
          </div>

          {/* Suggestions (only on welcome state) */}
          {messages.length <= 1 && (
            <div className="px-3 pt-2 pb-1 flex flex-wrap gap-1.5 border-t border-border bg-card">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-2.5 py-1 rounded-full border border-border bg-background hover:bg-accent hover:text-accent-foreground transition"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 p-3 border-t border-border bg-card"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your appliance issue…"
              disabled={isLoading}
              className="flex-1 h-10 rounded-full border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="size-10 shrink-0 rounded-full bg-primary text-primary-foreground grid place-items-center hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
