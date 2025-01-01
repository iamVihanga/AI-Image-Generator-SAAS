"use server";

import { SUPABASE_TRAINING_DATA_BUCKET_NAME } from "@/lib/constants";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function getPresignedStorageUrl(filePath: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: urlData, error } = await supabaseAdmin.storage
    .from(SUPABASE_TRAINING_DATA_BUCKET_NAME)
    .createSignedUploadUrl(`${user?.id}/${new Date().getTime()}_${filePath}`);

  return {
    signedUrl: urlData?.signedUrl || null,
    error: error?.message || null,
  };
}
