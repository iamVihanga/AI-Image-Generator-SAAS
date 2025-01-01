import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { trainModelSchema } from "../schemas/train-model-schema";
import { createClient } from "@/lib/supabase/server";
import { SUPABASE_TRAINING_DATA_BUCKET_NAME } from "@/lib/constants";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { replicate } from "@/lib/replicate/client";

const app = new Hono()
  /**
   * Model Training Route
   */
  .post("/train", zValidator("json", trainModelSchema), async (c) => {
    try {
      if (!process.env.REPLICATE_API_TOKEN) {
        throw new Error("Replicate API Token is not set!");
      }

      // Authroization
      const supabase = await createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        return c.json(
          { error: "Unauthroized", success: false, data: null },
          { status: 401 }
        );
      }

      // Handle form data
      const formData = await c.req.valid("json");

      const input = {
        fileKey: formData.fileKey,
        modelName: formData.modelName,
        gender: formData.gender,
      };

      const fileName = input.fileKey.replace(
        SUPABASE_TRAINING_DATA_BUCKET_NAME,
        ""
      );

      // Get signed url for uploaded zip file
      const { data: fileUrl, error: fileUrlError } = await supabaseAdmin.storage
        .from(SUPABASE_TRAINING_DATA_BUCKET_NAME)
        .createSignedUrl(fileName, 3600);

      if (fileUrlError || !fileUrl.signedUrl) {
        throw new Error(fileUrlError?.message || "Failed to get the file URL");
      }

      // --- Training Process with Replicate ---
      // 1. Create model
      const modelId = `${user?.id}_${Date.now()}_${input.modelName
        .toLowerCase()
        .replaceAll(" ", "_")}`;

      await replicate.models.create(
        process.env.NEXT_PUBLIC_REPLICATE_USER_NAME,
        modelId,
        {
          visibility: "private",
          hardware: "gpu-a100-large",
        }
      );

      // 2. Start Training
      const training = await replicate.trainings.create(
        "ostris",
        "flux-dev-lora-trainer",
        "e440909d3512c31646ee2e0c7d6f6f4923224863a6a10c494606e79fb5844497",
        {
          // You need to create a model on Replicate that will be the destination for the trained version.
          destination: `${process.env.NEXT_PUBLIC_REPLICATE_USER_NAME}/${modelId}`,
          input: {
            steps: 1000,
            resolution: "512,768,1024",
            input_images: fileUrl.signedUrl,
            trigger_word: "ohwx",
          },
        }
      );

      console.log(training);

      return c.json(
        {
          success: true,
          data: null,
          error: null,
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("Training error", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to start the model training";

      return c.json(
        {
          success: false,
          data: null,
          error: errorMessage,
        },
        { status: 500 }
      );
    }
  });

export default app;
