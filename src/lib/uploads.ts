export const UPLOAD_BUCKET = "service-request-files";
export const MAX_FILES_PER_REQUEST = 8;
export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20MB — matches the bucket's file_size_limit in supabase/schema.sql

export const ALLOWED_UPLOAD_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "svg",
  "pdf",
  "doc",
  "docx",
];

export function isAllowedUploadFilename(filename: string): boolean {
  const ext = filename.split(".").pop()?.toLowerCase();
  return !!ext && ALLOWED_UPLOAD_EXTENSIONS.includes(ext);
}

export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100);
}
