import { supabase } from "@/lib/supabase";
import { UPLOAD_BUCKET } from "@/lib/uploads";
import type { RequestFile } from "@/components/portal/RequestDetails";

/**
 * Fetches original ticket-creation attachments (message_id is null — reply
 * attachments are fetched separately by getMessagesForRequests) and signs
 * short-lived download URLs. Server-only.
 */
export async function getFilesForRequests(
  requestIds: string[]
): Promise<Record<string, RequestFile[]>> {
  if (requestIds.length === 0) return {};

  const { data: rows } = await supabase
    .from("service_request_files")
    .select("id, request_id, file_name, storage_path")
    .in("request_id", requestIds)
    .is("message_id", null);

  const grouped: Record<string, RequestFile[]> = {};
  if (!rows) return grouped;

  await Promise.all(
    rows.map(async (row) => {
      const { data: signed } = await supabase.storage
        .from(UPLOAD_BUCKET)
        .createSignedUrl(row.storage_path, 3600);

      const entry: RequestFile = {
        id: row.id,
        fileName: row.file_name,
        signedUrl: signed?.signedUrl ?? null,
      };
      (grouped[row.request_id] ??= []).push(entry);
    })
  );

  return grouped;
}
