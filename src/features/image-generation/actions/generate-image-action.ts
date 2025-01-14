"use server";

import { replicate } from "@/lib/replicate/client";

import { type ConfigurationFormSchemaT } from "../schemas/configuration-schema";

interface ImageGenerationResponse {
  error: string | null;
  success: boolean;
  data: any | null;
}

export async function generateImageAction(
  configurations: ConfigurationFormSchemaT
): Promise<ImageGenerationResponse> {
  if (!process.env.REPLICATE_API_TOKEN) {
    return {
      error: "Replicate API token is not set",
      success: false,
      data: null,
    };
  }

  const modelInput = configurations.model.startsWith(
    `${process.env.NEXT_PUBLIC_REPLICATE_USER_NAME}/`
  )
    ? {
        model: "dev",
        prompt: configurations.prompt,
        lora_scale: 1,
        guidance: configurations.guidance,
        num_outputs: configurations.num_outputs,
        aspect_ratio: configurations.aspect_ratio,
        output_format: configurations.output_format,
        output_quality: configurations.output_quality,
        prompt_strength: 0.8,
        num_inference_steps: configurations.num_inference_steps,
        extra_lora_scale: 0,
      }
    : {
        prompt: configurations.prompt,
        go_fast: true,
        guidance: configurations.guidance,
        megapixels: "1",
        num_outputs: configurations.num_outputs,
        aspect_ratio: configurations.aspect_ratio,
        output_format: configurations.output_format,
        output_quality: configurations.output_quality,
        prompt_strength: 0.8,
        num_inference_steps: configurations.num_inference_steps,
      };

  try {
    const output = await replicate.run(
      configurations.model as `${string}/${string}`,
      { input: modelInput }
    );

    return {
      error: null,
      success: true,
      data: output,
    };
  } catch (err) {
    return {
      error: (err as Error).message || "Failed to generate image",
      success: false,
      data: null,
    };
  }
}
