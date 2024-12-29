"use server";

import { imageMeta } from "image-meta";
import { randomUUID } from "crypto";

import { createClient } from "@/lib/supabase/server";
import { type Database } from "@/lib/supabase/database.types";

import { IMAGE_BUCKET_NAME } from "../constants";

type StoreImageInput = {
  url: string;
  blurUrl: string;
} & Database["public"]["Tables"]["generated_images"]["Insert"];

export async function imageUrlToBlob(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  return arrayBuffer;
}

export async function storeImageAction(data: StoreImageInput[]) {
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

  const uploadResults = [];

  for (const image of data) {
    // Convert the image URL to a buffer
    const arrayBuffer = await imageUrlToBlob(image.url);
    const { width, height, type } = imageMeta(new Uint8Array(arrayBuffer));

    const fileName = `image_${randomUUID()}.${type}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: storageError } = await supabase.storage
      .from(IMAGE_BUCKET_NAME)
      .upload(filePath, arrayBuffer, {
        contentType: `image/${type}`,
        cacheControl: "3600",
        upsert: false,
      });

    if (storageError) {
      uploadResults.push({
        fileName,
        error: storageError.message,
        success: false,
        data: null,
      });
      continue;
    }

    const { error: dbError, data: dbData } = await supabase
      .from("generated_images")
      .insert([
        {
          user_id: user.id,
          model: image.model,
          prompt: image.prompt,
          aspect_ratio: image.aspect_ratio,
          guidance: image.guidance,
          num_inference_steps: image.num_inference_steps,
          output_format: image.output_format,
          image_name: fileName,
          width,
          height,
          blur_data: image.blurUrl,
        },
      ])
      .select();

    if (dbError) {
      uploadResults.push({
        fileName,
        error: dbError.message,
        success: !dbError,
        data: dbData || null,
      });
      continue;
    }
  }

  console.log({ uploadResults });

  return {
    error: null,
    success: true,
    data: {
      results: uploadResults,
    },
  };
}
