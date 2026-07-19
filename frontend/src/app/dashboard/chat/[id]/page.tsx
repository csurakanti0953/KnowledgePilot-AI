"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import { Send, User, Sparkles, MessageSquareText } from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { api, ApiError } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { Answer } from "@/components/chat/answer";

interface Message {
  id: string;
  role: "assistant" | "user" | "system" | "data";
  content: string;
  citations?: Citation[];
}

interface ChatMessage {
  id: number;
  content: string;
  role: "assistant" | "user";
  created_at: string;
}

interface Chat {
  id: number;
  title: string;
  messages: ChatMessage[];
}

interface Citation {
  id: number;
  text: string;
  metadata: Record<string, any>;
}

// Extend the default useChat message type
declare module "ai/react" {
  interface Message {
    citations?: Citation[];
  }
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const {
    messages,
    data,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    setInput,
  } = useChat({
    api: `/api/chat/${params.id}/messages`,
    headers: {
      Authorization: `Bearer ${
        typeof window !== "undefined"
          ? window.localStorage.getItem("token")
          : ""
      }`,
    },
  });

  useEffect(() => {
    if (isInitialLoad) {
      fetchChat();
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  useEffect(() => {
    if (!isInitialLoad) {
      scrollToBottom();
    }
  }, [messages, isInitialLoad]);

  const fetchChat = async () => {
    try {
      const data: Chat = await api.get(`/api/chat/${params.id}`);
      const formattedMessages = data.messages.map((msg) => {
        if (msg.role !== "assistant" || !msg.content)
          return {
            id: msg.id.toString(),
            role: msg.role,
            content: msg.content,
          };

        try {
          if (!msg.content.includes("__LLM_RESPONSE__")) {
            return {
              id: msg.id.toString(),
              role: msg.role,
              content: msg.content,
            };
          }

          const [base64Part, responseText] =
            msg.content.split("__LLM_RESPONSE__");

          const contextData = base64Part
            ? (JSON.parse(atob(base64Part.trim())) as {
                context: Array<{
                  page_content: string;
                  metadata: Record<string, any>;
                }>;
              })
            : null;

          const citations: Citation[] =
            contextData?.context.map((citation, index) => ({
              id: index + 1,
              text: citation.page_content,
              metadata: citation.metadata,
            })) || [];

          return {
            id: msg.id.toString(),
            role: msg.role,
            content: responseText || "",
            citations,
          };
        } catch (e) {
          console.error("Failed to process message:", e);
          return {
            id: msg.id.toString(),
            role: msg.role,
            content: msg.content,
          };
        }
      });
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Failed to fetch chat:", error);
      if (error instanceof ApiError) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
      router.push("/dashboard/chat");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRegenerate = () => {
    if (processedMessages.length === 0) return;

    const lastUserMessage = [...processedMessages]
      .reverse()
      .find((message) => message.role === "user");

    if (!lastUserMessage) return;

    const filteredMessages = processedMessages.filter(
      (message) => message.id !== lastUserMessage.id
    );

    setMessages(filteredMessages);
    setInput(lastUserMessage.content);

    const syntheticEvent = {
      preventDefault: () => undefined,
    } as React.FormEvent<HTMLFormElement>;

    handleSubmit(syntheticEvent);
  };

  const processMessageContent = (message: Message): Message => {
    if (message.role !== "assistant" || !message.content) return message;

    try {
      if (!message.content.includes("__LLM_RESPONSE__")) {
        return message;
      }

      const [base64Part, responseText] =
        message.content.split("__LLM_RESPONSE__");

      const contextData = base64Part
        ? (JSON.parse(atob(base64Part.trim())) as {
            context: Array<{
              page_content: string;
              metadata: Record<string, any>;
            }>;
          })
        : null;

      const citations: Citation[] =
        contextData?.context.map((citation, index) => ({
          id: index + 1,
          text: citation.page_content,
          metadata: citation.metadata,
        })) || [];

      return {
        ...message,
        content: responseText || "",
        citations,
      };
    } catch (e) {
      console.error("Failed to process message:", e);
      return message;
    }
  };

  const markdownParse = (text: string) => {
    return text
      .replace(/\[\[([cC])itation/g, "[citation")
      .replace(/[cC]itation:(\d+)]]/g, "citation:$1]")
      .replace(/\[\[([cC]itation:\d+)]](?!])/g, `[$1]`)
      .replace(/\[[cC]itation:(\d+)]/g, "[citation]($1)");
  };

  const processedMessages = useMemo(() => {
    return messages.map((message) => {
      if (message.role !== "assistant" || !message.content) return message;

      try {
        if (!message.content.includes("__LLM_RESPONSE__")) {
          return {
            ...message,
            content: markdownParse(message.content),
          };
        }

        const [base64Part, responseText] =
          message.content.split("__LLM_RESPONSE__");

        const contextData = base64Part
          ? (JSON.parse(atob(base64Part.trim())) as {
              context: Array<{
                page_content: string;
                metadata: Record<string, any>;
              }>;
            })
          : null;

        const citations: Citation[] =
          contextData?.context.map((citation, index) => ({
            id: index + 1,
            text: citation.page_content,
            metadata: citation.metadata,
          })) || [];

        return {
          ...message,
          content: markdownParse(responseText || ""),
          citations,
        };
      } catch (e) {
        console.error("Failed to process message:", e);
        return message;
      }
    });
  }, [messages]);

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-5rem)] flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-sm">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mx-auto flex max-w-4xl flex-col gap-4">
            {processedMessages.length === 0 && !isLoading ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-slate-50/70 px-8 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                  <MessageSquareText className="h-8 w-8 text-slate-700" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">Start a fresh conversation</h3>
                <p className="mt-2 max-w-md text-sm leading-7 text-slate-500">
                  Ask about your documents, policies, or knowledge base content and get grounded answers in a polished chat experience.
                </p>
              </div>
            ) : (
              <>
                {processedMessages.map((message) =>
                  message.role === "assistant" ? (
                    <div key={message.id} className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                        <img src="/logo.svg" className="h-7 w-7 rounded-full" alt="logo" />
                      </div>
                      <div className="max-w-[85%] rounded-[24px] border border-slate-200 bg-slate-50/80 px-4 py-3 shadow-sm">
                        <Answer
                          key={message.id}
                          markdown={message.content}
                          citations={message.citations}
                          onRegenerate={handleRegenerate}
                        />
                      </div>
                    </div>
                  ) : (
                    <div key={message.id} className="flex justify-end">
                      <div className="flex max-w-[85%] items-start gap-3">
                        <div className="rounded-[24px] bg-slate-900 px-4 py-3 text-sm leading-7 text-white shadow-sm">
                          {message.content}
                        </div>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
                          <User className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  )
                )}
                {isLoading && processedMessages[processedMessages.length - 1]?.role !== "assistant" ? (
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                      <Sparkles className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-slate-900 animate-bounce" />
                        <div className="h-2.5 w-2.5 rounded-full bg-slate-900 animate-bounce [animation-delay:0.15s]" />
                        <div className="h-2.5 w-2.5 rounded-full bg-slate-900 animate-bounce [animation-delay:0.3s]" />
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-4 sm:p-6">
          <div className="mx-auto flex max-w-4xl items-center gap-3 rounded-[24px] border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about your documents..."
              className="flex-1 min-w-0 border-0 bg-transparent px-2 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
