"use client";

import { useState } from "react";
import {
  MAX_FILES_PER_REQUEST,
  MAX_FILE_SIZE_BYTES,
  isAllowedUploadFilename,
  UPLOAD_BUCKET,
} from "@/lib/uploads";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export type UploadItem = {
  id: string;
  file: File;
  status: "uploading" | "done" | "error";
  path?: string;
  error?: string;
};

export type UploadedFilePayload = {
  path: string;
  name: string;
  size: number;
  contentType: string;
};

export function useFileUploads() {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [error, setError] = useState("");

  const uploadFile = async (item: UploadItem) => {
    try {
      const res = await fetch("/api/portal/requests/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: item.file.name }),
      });
      if (!res.ok) throw new Error("Failed to get upload URL");
      const { path, token } = await res.json();

      const supabase = getSupabaseBrowserClient();
      const { error: uploadError } = await supabase.storage
        .from(UPLOAD_BUCKET)
        .uploadToSignedUrl(path, token, item.file);
      if (uploadError) throw uploadError;

      setUploads((prev) =>
        prev.map((u) => (u.id === item.id ? { ...u, status: "done", path } : u))
      );
    } catch {
      setUploads((prev) =>
        prev.map((u) =>
          u.id === item.id ? { ...u, status: "error", error: "Upload failed" } : u
        )
      );
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    e.target.value = "";
    setError("");

    if (uploads.length + selected.length > MAX_FILES_PER_REQUEST) {
      setError(`Max ${MAX_FILES_PER_REQUEST} files`);
      return;
    }

    for (const file of selected) {
      if (!isAllowedUploadFilename(file.name)) {
        setError(`${file.name}: file type not allowed`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`${file.name}: exceeds 20MB limit`);
        continue;
      }
      const item: UploadItem = { id: crypto.randomUUID(), file, status: "uploading" };
      setUploads((prev) => [...prev, item]);
      uploadFile(item);
    }
  };

  const removeUpload = (id: string) => {
    setUploads((prev) => prev.filter((u) => u.id !== id));
  };

  const reset = () => {
    setUploads([]);
    setError("");
  };

  const hasPendingUploads = uploads.some((u) => u.status === "uploading");

  const getUploadedFiles = (): UploadedFilePayload[] =>
    uploads
      .filter((u): u is UploadItem & { path: string } => u.status === "done" && !!u.path)
      .map((u) => ({
        path: u.path,
        name: u.file.name,
        size: u.file.size,
        contentType: u.file.type,
      }));

  return {
    uploads,
    error,
    handleFileSelect,
    removeUpload,
    reset,
    hasPendingUploads,
    getUploadedFiles,
  };
}
