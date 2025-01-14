"use server";

import { createClient } from "@/lib/supabase/server";

export async function deleteModelAction(
  id: number,
  model_id: string,
  model_version: string
) {
  const supabase = await createClient();

  //   Handle deletion of model from replicate
  if (model_version) {
    try {
      const res = await fetch(
        `https://api.replicate.com/v1/models/${process.env.NEXT_PUBLIC_REPLICATE_USER_NAME}/${model_id}/versions/${model_version}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete model version from Replicate");
      }
    } catch (error) {
      console.log("Failed to delete model version from Replicate", error);

      return {
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete model version from Replicate",
        success: false,
      };
    }
  }

  if (model_id) {
    try {
      const res = await fetch(
        `https://api.replicate.com/v1/models/${process.env.NEXT_PUBLIC_REPLICATE_USER_NAME}/${model_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete model from Replicate");
      }
    } catch (error) {
      console.log("Failed to delete model from Replicate", error);

      return {
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete model from Replicate",
        success: false,
      };
    }
  }

  //   Handle deletion of model from Supabase
  const { error } = await supabase.from("models").delete().eq("id", id);

  return {
    error: error?.message || "Failed to delete model from database",
    success: !error,
  };
}
