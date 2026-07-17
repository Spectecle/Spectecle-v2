import { supabase } from "@/lib/supabase";
import { UPLOAD_BUCKET } from "@/lib/uploads";
import type { RequestFile } from "@/components/portal/RequestDetails";

export type TicketMessage = {
  id: string;
  sender_role: "admin" | "client";
  sender_email: string;
  body: string;
  created_at: string;
  files: RequestFile[];
};

/** Fetches all messages (with signed file attachments) for the given service_requests, grouped by request_id. Server-only. */
export async function getMessagesForRequests(
  requestIds: string[]
): Promise<Record<string, TicketMessage[]>> {
  if (requestIds.length === 0) return {};

  const { data: rows } = await supabase
    .from("service_request_messages")
    .select("id, request_id, sender_role, sender_email, body, created_at")
    .in("request_id", requestIds)
    .order("created_at", { ascending: true });

  if (!rows || rows.length === 0) return {};

  const messageIds = rows.map((r) => r.id);
  const { data: fileRows } = await supabase
    .from("service_request_files")
    .select("id, message_id, file_name, storage_path")
    .in("message_id", messageIds);

  const filesByMessage: Record<string, RequestFile[]> = {};
  await Promise.all(
    (fileRows ?? []).map(async (row) => {
      if (!row.message_id) return;
      const { data: signed } = await supabase.storage
        .from(UPLOAD_BUCKET)
        .createSignedUrl(row.storage_path, 3600);
      (filesByMessage[row.message_id] ??= []).push({
        id: row.id,
        fileName: row.file_name,
        signedUrl: signed?.signedUrl ?? null,
      });
    })
  );

  const grouped: Record<string, TicketMessage[]> = {};
  for (const row of rows) {
    (grouped[row.request_id] ??= []).push({
      id: row.id,
      sender_role: row.sender_role,
      sender_email: row.sender_email,
      body: row.body,
      created_at: row.created_at,
      files: filesByMessage[row.id] ?? [],
    });
  }
  return grouped;
}
