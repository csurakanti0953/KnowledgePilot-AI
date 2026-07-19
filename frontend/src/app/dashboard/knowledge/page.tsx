"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileIcon, defaultStyles } from "react-file-icon";
import { ArrowRight, Plus, Settings, Trash2, Search, FolderOpen, FileText, LoaderCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { api, ApiError } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

interface KnowledgeBase {
  id: number;
  name: string;
  description: string;
  documents: Document[];
  created_at: string;
}
interface Document {
  id: number;
  file_name: string;
  file_path: string;
  file_size: number;
  content_type: string;
  knowledge_base_id: number;
  created_at: string;
  updated_at: string;
  processing_tasks: any[];
}

export default function KnowledgeBasePage() {
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchKnowledgeBases();
  }, []);

  const fetchKnowledgeBases = async () => {
    try {
      const data = await api.get("/api/knowledge-base");
      setKnowledgeBases(data);
    } catch (error) {
      console.error("Failed to fetch knowledge bases:", error);
      if (error instanceof ApiError) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this knowledge base?"))
      return;
    try {
      await api.delete(`/api/knowledge-base/${id}`);
      setKnowledgeBases((prev) => prev.filter((kb) => kb.id !== id));
      toast({
        title: "Success",
        description: "Knowledge base deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete knowledge base:", error);
      if (error instanceof ApiError) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Knowledge Bases</h2>
            <p className="mt-1 text-sm text-slate-500">Manage your knowledge bases and documents with a more structured workspace view.</p>
          </div>
          <Link
            href="/dashboard/knowledge/new"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Knowledge Base
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {[1, 2].map((item) => (
              <div key={item} className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="h-5 w-28 animate-pulse rounded-full bg-slate-200" />
                  <div className="h-9 w-9 animate-pulse rounded-2xl bg-slate-200" />
                </div>
                <div className="mt-6 h-4 w-40 animate-pulse rounded-full bg-slate-200" />
                <div className="mt-3 h-4 w-56 animate-pulse rounded-full bg-slate-200" />
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
                  <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : knowledgeBases.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/80 p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
              <FolderOpen className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-slate-900">No knowledge bases yet</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">Create your first workspace to start organizing documents and grounding chat experiences in trusted content.</p>
            <Link href="/dashboard/knowledge/new" className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
              Create a knowledge base
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {knowledgeBases.map((kb) => (
              <div key={kb.id} className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{kb.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{kb.description || "No description provided yet."}</p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{kb.documents.length} documents</span>
                      <span>•</span>
                      <span>{new Date(kb.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/knowledge/${kb.id}`} className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100">
                      <Settings className="h-4 w-4" />
                    </Link>
                    <Link href={`/dashboard/test-retrieval/${kb.id}`} className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100">
                      <Search className="h-4 w-4" />
                    </Link>
                    <button onClick={() => handleDelete(kb.id)} className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {kb.documents.length > 0 && (
                  <div className="mt-6 rounded-[20px] border border-slate-200/80 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <FileText className="h-4 w-4" />
                      Recent documents
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {kb.documents.slice(0, 4).map((doc) => (
                        <div key={doc.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                          <div className="w-8 shrink-0">
                            {doc.content_type.toLowerCase().includes("pdf") ? (
                              <FileIcon extension="pdf" {...defaultStyles.pdf} />
                            ) : doc.content_type.toLowerCase().includes("doc") ? (
                              <FileIcon extension="doc" {...defaultStyles.docx} />
                            ) : doc.content_type.toLowerCase().includes("txt") ? (
                              <FileIcon extension="txt" {...defaultStyles.txt} />
                            ) : doc.content_type.toLowerCase().includes("md") ? (
                              <FileIcon extension="md" {...defaultStyles.md} />
                            ) : (
                              <FileIcon extension={doc.file_name.split(".").pop() || ""} color="#E2E8F0" labelColor="#94A3B8" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-800">{doc.file_name}</p>
                            <p className="mt-1 text-xs text-slate-500">{new Date(doc.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                      {kb.documents.length > 4 && (
                        <Link href={`/dashboard/knowledge/${kb.id}`} className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
                          View all {kb.documents.length} documents
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
