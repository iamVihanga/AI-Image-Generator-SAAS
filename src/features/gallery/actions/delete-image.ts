"use server";

import { SUPABASE_IMAGE_BUCKET_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

export async function deleteImageAction(id: number, name: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Unauthorized",
      success: false,
      data: null,
    };
  }

  // Delete the image from the database
  const { data, error } = await supabase
    .from("generated_images")
    .delete()
    .eq("id", id);

  // Delete the image from the storage
  const { error: storageError } = await supabase.storage
    .from(SUPABASE_IMAGE_BUCKET_NAME)
    .remove([`${user.id}/${name}`]);

  if (error || storageError) {
    return {
      error: error?.message || storageError?.message,
      success: false,
      data: null,
    };
  }

  return {
    error: null,
    success: true,
    data: data,
  };
}
