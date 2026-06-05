"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Plus, Bot } from "lucide-react";
import { MessageBubble } from "@/components/ai-chat/MessageBubble";
import { PromptSuggestions } from "@/components/ai-chat/PromptSuggestions";
import { RegimeBadge } from "@/components/shared/RegimeBadge";
import { CONVERSATIONS } from "@/lib/mock-data/conversations";
import { useAppStore } from "@/lib/store/app-store";
import { cn } from "@/lib/utils";
import type { ChatMessage, ChatSession, Regime } from "@/lib/types";

type RegimeCtx = Regime | "ALL";

const REGIME_OPTIONS: RegimeCtx[] = ["EU", "UK", "ALL"];

export function ChatInterface() {
  const { user } = useAppStore();
  const [sessions, setSessions] = useState<ChatSession[]>(CONVERSATIONS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [regimeCtx, setRegimeCtx] = useState<RegimeCtx>("EU");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const activeSession = sessions.find((s) => s.id === activeId) ?? null;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages.length, isTyping]);

  function handleSelectSuggestion(prompt: string) {
    setInputValue(prompt);
    inputRef.current?.focus();
  }

  function handleNewSession() {
    setActiveId(null);
    setInputValue("");
  }

  function handleSend() {
    const text = inputValue.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: "user",
      content: text,
    };

    if (!activeId) {
      // Create new session from the matching mock, or a generic one
      const match = CONVERSATIONS.find((c) =>
        c.messages[0]?.content.toLowerCase().includes(text.toLowerCase().slice(0, 20))
      );

      if (match) {
        const existingSession = sessions.find((s) => s.id === match.id);
        if (!existingSession) {
          setSessions((prev) => [match, ...prev]);
        }
        setActiveId(match.id);
        setInputValue("");
        return;
      }

      // Generic demo session
      const demoReply: ChatMessage = {
        id: `a_${Date.now()}`,
        role: "assistant",
        content:
          "I can see this is a question I don't have a pre-loaded demo response for. In the live platform, this would pass through the full 13-step anti-hallucination pipeline: query understanding → hybrid retrieval on the regime-tagged corpus → confidence gate → constrained generation with mandatory citations → faithfulness check → citation integrity verification. The demo is pre-seeded with four complete example conversations — try selecting one from the sidebar.",
        confidence: "medium",
        asOfDate: new Date().toISOString().slice(0, 10),
        keyPoints: [
          "This is the demo build — pre-seeded conversations are in the sidebar.",
          "The live pipeline routes calculation questions to the deterministic engine.",
          "All claims in production are grounded in a citable regulatory corpus.",
        ],
        citations: [],
      };

      const newSession: ChatSession = {
        id: `s_${Date.now()}`,
        title: text.slice(0, 60),
        regime: regimeCtx,
        updatedAt: new Date().toISOString(),
        messages: [userMsg, demoReply],
      };
      setSessions((prev) => [newSession, ...prev]);
      setActiveId(newSession.id);
    } else {
      // Append to existing session with a "thinking" delay
      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeId
            ? { ...s, messages: [...s.messages, userMsg] }
            : s
        )
      );
      setIsTyping(true);
      setTimeout(() => {
        const reply: ChatMessage = {
          id: `a_${Date.now()}`,
          role: "assistant",
          content:
            "That follow-up is noted. In the live platform I would re-run retrieval against the corpus with your updated context and return a grounded answer. This demo session is pre-seeded — switch to one of the example conversations in the sidebar to see the full citation experience.",
          confidence: "low",
          asOfDate: new Date().toISOString().slice(0, 10),
          citations: [],
        };
        setSessions((prev) =>
          prev.map((s) =>
            s.id === activeId
              ? { ...s, messages: [...s.messages, reply] }
              : s
          )
        );
        setIsTyping(false);
      }, 1400);
    }

    setInputValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex h-full gap-3">
      {/* Session list */}
      <div className="flex w-52 shrink-0 flex-col rounded-xl border border-border bg-surface/60 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-border px-3 py-3">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Conversations
          </span>
          <button
            onClick={handleNewSession}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-2 scrollbar-thin">
          <AnimatePresence>
            {sessions.map((s) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setActiveId(s.id)}
                className={cn(
                  "mb-1 w-full rounded-lg px-3 py-2.5 text-left text-xs transition-colors",
                  s.id === activeId
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <RegimeBadge regime={s.regime === "ALL" ? "GLOBAL" : s.regime} size="sm" />
                </div>
                <p className="line-clamp-2 leading-snug">{s.title}</p>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Main chat */}
      <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-border bg-surface/60 backdrop-blur-xl">
        {/* Chat header */}
        <div className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">CarbonGate AI</p>
            <p className="text-[11px] text-muted-foreground">
              Non-hallucinating · Citation-grounded · Regime-scoped
            </p>
          </div>

          {/* Regime selector */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-white/[0.03] p-1">
            {REGIME_OPTIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRegimeCtx(r)}
                className={cn(
                  "rounded px-2.5 py-1 text-[10px] font-medium transition-colors",
                  regimeCtx === r
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="min-h-0 flex-1 overflow-y-auto p-4 scrollbar-thin">
          {!activeSession ? (
            <PromptSuggestions onSelect={handleSelectSuggestion} />
          ) : (
            <div className="space-y-5">
              <AnimatePresence>
                {activeSession.messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    userName={user.name}
                  />
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="flex items-center gap-2.5"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-2xl border border-border bg-surface/80 px-4 py-3">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-2 w-2 rounded-full bg-primary/60 animate-pulse-dot"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="shrink-0 border-t border-border p-3">
          <div className="flex items-end gap-2 rounded-xl border border-border bg-white/[0.03] px-3 py-2 focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
            <textarea
              ref={inputRef}
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about CBAM obligations, calculations, deadlines…"
              className="min-h-[36px] max-h-32 flex-1 resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60 scrollbar-thin"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all",
                inputValue.trim()
                  ? "bg-primary text-background hover:bg-primary-dark"
                  : "bg-white/5 text-muted-foreground"
              )}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1.5 px-1 text-[10px] text-muted-foreground/40">
            ↵ to send · Shift+↵ for newline · Answers grounded in citable
            corpus · Temperature 0
          </p>
        </div>
      </div>
    </div>
  );
}
