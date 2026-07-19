"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Book, MessageSquare, LogOut, Menu, User, Sparkles } from "lucide-react";
import Breadcrumb from "@/components/ui/breadcrumb";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const navigation = [
    { name: "Knowledge Base", href: "/dashboard/knowledge", icon: Book },
    { name: "Chat", href: "/dashboard/chat", icon: MessageSquare },
    { name: "API Keys", href: "/dashboard/api-keys", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.10),_transparent_28%),linear-gradient(135deg,_#f8fafc_0%,_#f1f5f9_100%)] text-slate-900">
      <div className="lg:hidden fixed left-4 top-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-2xl border border-slate-200 bg-white/90 p-2.5 shadow-sm backdrop-blur"
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200/80 bg-white/85 backdrop-blur-xl transition-transform duration-200 ease-out lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col px-4 py-5">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-3 py-3 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">KnowledgePilot</p>
              <p className="text-xs text-slate-500">Workspace</p>
            </div>
          </Link>

          <nav className="mt-6 flex-1 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-2xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-300/70"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-transform duration-200 ${
                      isActive ? "text-white" : "text-slate-500 group-hover:scale-110"
                    }`}
                  />
                  <span>{item.name}</span>
                  {isActive && <span className="ml-auto h-2.5 w-2.5 rounded-full bg-cyan-400" />}
                </Link>
              );
            })}
          </nav>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3">
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-900"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="lg:pl-72">
        <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <Breadcrumb />
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export const dashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Knowledge Base",
      href: "/dashboard/knowledge",
      icon: "database",
    },
    {
      title: "Chat",
      href: "/dashboard/chat",
      icon: "messageSquare",
    },
    {
      title: "API Keys",
      href: "/dashboard/api-keys",
      icon: "key",
    },
  ],
};
