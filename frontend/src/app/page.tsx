import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#0f172a_55%,_#111827_100%)] text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-[0_30px_90px_-20px_rgba(2,132,199,0.35)] backdrop-blur-xl sm:p-10 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(125,211,252,0.16),_transparent_40%)]" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 shadow-sm shadow-cyan-950/30">
                Enterprise-ready AI knowledge workspace
              </div>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Turn document knowledge into confident, grounded AI conversations.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                  KnowledgePilot AI gives teams a polished way to upload documents, organize knowledge bases, and interact with retrieval-augmented AI experiences that stay grounded in their own content.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Get started
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-base font-semibold text-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Sign in
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a href="https://github.com/JohannLai/rag-web-ui" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/20">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
                <img alt="GitHub stars" src="https://img.shields.io/github/stars/JohannLai/rag-web-ui?style=social" className="h-6" />
                <img alt="License" src="https://img.shields.io/github/license/JohannLai/rag-web-ui" className="h-6" />
                <img alt="Python version" src="https://img.shields.io/badge/python-3.9%2B-blue" className="h-6" />
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-blue-950/20">
              <div className="rounded-[1.25rem] border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/80 p-5">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span className="font-medium text-slate-200">KnowledgePilot AI</span>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                    Live demo
                  </span>
                </div>
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    Document ingestion ready
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-800">
                    <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-slate-200">
                      Structured knowledge base workflow
                    </div>
                    <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-slate-200">
                      Source-aware conversations in a single view
                    </div>
                    <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-slate-200">
                      API-ready integration path
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/10">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/15 text-blue-300 transition group-hover:scale-105">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Grounded AI answers</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">Retrieval-first conversations stay anchored to the documents you trust.</p>
          </div>
          <div className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/10">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/15 text-blue-300 transition group-hover:scale-105">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Flexible integrations</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">Use the API layer to connect retrieval workflows into broader product experiences.</p>
          </div>
          <div className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/10">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/15 text-blue-300 transition group-hover:scale-105">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Modern product posture</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">The experience feels like a serious AI product, not just a prototype.</p>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-lg sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white">Ready to explore the experience?</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Start with a knowledge base, upload a document, and experience grounded AI assistance in minutes.
              </p>
              <div className="mt-8 flex justify-start">
                <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500">
                  Create your workspace
                </Link>
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-slate-950/60 p-6">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                Your first workspace is ready to populate
              </div>
              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">Upload a document and begin indexing</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">Create a knowledge base around the topic</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">Start asking grounded questions in chat</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
