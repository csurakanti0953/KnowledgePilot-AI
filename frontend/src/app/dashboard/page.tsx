"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import {
  Book,
  MessageSquare,
  ArrowRight,
  Plus,
  Upload,
  Brain,
  Search,
  Sparkles,
  Compass,
} from "lucide-react";
import { api, ApiError } from "@/lib/api";

interface Stats {
  knowledgeBases: number;
  chats: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ knowledgeBases: 0, chats: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [kbData, chatData] = await Promise.all([
          api.get("/api/knowledge-base"),
          api.get("/api/chat"),
        ]);

        setStats({
          knowledgeBases: kbData.length,
          chats: chatData.length,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        if (error instanceof ApiError && error.status === 401) {
          return;
        }
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-8 text-white shadow-[0_20px_60px_-24px_rgba(15,23,42,0.65)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-200">
                Workspace overview
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Knowledge Assistant
              </h1>
              <p className="mt-3 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                Welcome back. Organize your knowledge, upload documents, and turn private context into grounded conversations with a polished AI workspace.
              </p>
            </div>
            <a href="/dashboard/knowledge/new" className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100">
              <Plus className="mr-2 h-4 w-4" />
              New Knowledge Base
            </a>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Knowledge Bases</p>
                <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">{stats.knowledgeBases}</p>
              </div>
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                <Book className="h-6 w-6" />
              </div>
            </div>
            <a href="/dashboard/knowledge" className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700">
              View all knowledge bases
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Chat Sessions</p>
                <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">{stats.chats}</p>
              </div>
              <div className="rounded-2xl bg-violet-50 p-3 text-violet-600">
                <MessageSquare className="h-6 w-6" />
              </div>
            </div>
            <a href="/dashboard/chat" className="mt-6 inline-flex items-center text-sm font-semibold text-violet-600 hover:text-violet-700">
              View all chat sessions
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Quick actions</h2>
            <div className="text-sm text-slate-500">Get started in minutes</div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <a href="/dashboard/knowledge/new" className="group flex flex-col rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">Create Knowledge Base</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">Set up a new workspace for your documents and domain context.</p>
            </a>

            <a href="/dashboard/knowledge" className="group flex flex-col rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                <Upload className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">Upload Documents</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">Add PDFs, DOCX, Markdown, and text files to enrich your knowledge base.</p>
            </a>

            <a href="/dashboard/chat/new" className="group flex flex-col rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">Start Chatting</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">Begin grounded conversations with the content you have indexed.</p>
            </a>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 p-2.5 text-slate-700">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">How it works</h2>
              <p className="text-sm text-slate-500">A simple flow from intake to insight</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[22px] border border-slate-200/80 bg-slate-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">1</div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Create a knowledge base</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">Group information by domain so your AI assistant stays organized and focused.</p>
            </div>
            <div className="rounded-[22px] border border-slate-200/80 bg-slate-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 text-sm font-semibold text-white">2</div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Upload your documents</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">Bring in policy docs, product notes, manuals, and internal briefs for indexing.</p>
            </div>
            <div className="rounded-[22px] border border-slate-200/80 bg-slate-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">3</div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Start asking questions</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">Use conversational search to retrieve grounded answers directly from your indexed content.</p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
