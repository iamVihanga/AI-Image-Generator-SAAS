import { z } from "zod";
import { defaultModels } from "../constants";

/*
    {
        prompt: "black forest gateau cake spelling out the words \"FLUX DEV\", tasty, food photography, dynamic shot",
        go_fast: true,
        guidance: 3.5,
        megapixels: "1",
        num_outputs: 1,
        aspect_ratio: "1:1",
        output_format: "webp",
        output_quality: 80,
        prompt_strength: 0.8,
        num_inference_steps: 28
    }
*/

export const configurationFormSchema = z.union([
  // Schema for flux-dev model
  z.object({
    model: z.literal("black-forest-labs/flux-dev", {
      required_error: "Model is required!",
    }),
    prompt: z.string({
      required_error: "Prompt is required!",
    }),
    guidance: z
      .number({
        required_error: "Guidance scale is required!",
      })
      .min(0, { message: "Guidance scale must be at least 0" })
      .max(10, { message: "Guidance scale must be less than 10" }),
    num_outputs: z
      .number()
      .min(1, { message: "Number of outputs must be at least 1" })
      .max(4, { message: "Number of outputs must be less than 4" }),
    aspect_ratio: z.enum(
      [
        "1:1",
        "16:9",
        "21:9",
        "3:2",
        "2:3",
        "4:5",
        "5:4",
        "3:4",
        "4:3",
        "9:16",
        "9:21",
      ],
      { required_error: "Aspect ratio is required!" }
    ),
    output_format: z.string({
      required_error: "Output format is required!",
    }),
    output_quality: z
      .number({
        required_error: "Output quality is required!",
      })
      .min(1, { message: "Output quality must be at least 1" })
      .max(100, { message: "Output quality must be at most 100" }),
    num_inference_steps: z
      .number()
      .min(1, { message: "Number of inference steps must be at least 1" })
      .max(50, { message: "Number of inference steps must be at most 50" }),
  }),

  // Schema for flux-schnell model
  z.object({
    model: z.literal("black-forest-labs/flux-schnell", {
      required_error: "Model is required!",
    }),
    prompt: z.string({
      required_error: "Prompt is required!",
    }),
    guidance: z
      .number({
        required_error: "Guidance scale is required!",
      })
      .min(0, { message: "Guidance scale must be at least 0" })
      .max(10, { message: "Guidance scale must be less than 10" }),
    num_outputs: z
      .number()
      .min(1, { message: "Number of outputs must be at least 1" })
      .max(4, { message: "Number of outputs must be less than 4" }),
    aspect_ratio: z.enum(
      [
        "1:1",
        "16:9",
        "21:9",
        "3:2",
        "2:3",
        "4:5",
        "5:4",
        "3:4",
        "4:3",
        "9:16",
        "9:21",
      ],
      { required_error: "Aspect ratio is required!" }
    ),
    output_format: z.string({
      required_error: "Output format is required!",
    }),
    output_quality: z
      .number({
        required_error: "Output quality is required!",
      })
      .min(1, { message: "Output quality must be at least 1" })
      .max(100, { message: "Output quality must be at most 100" }),
    num_inference_steps: z
      .number()
      .min(1, { message: "Number of inference steps must be at least 1" })
      .max(4, { message: "Number of inference steps must be at most 4" }),
  }),

  // Schema for custom model
  z.object({
    model: z.string({ required_error: "Model is required!" }),
    prompt: z.string({
      required_error: "Prompt is required!",
    }),
    guidance: z
      .number({
        required_error: "Guidance scale is required!",
      })
      .min(0, { message: "Guidance scale must be at least 0" })
      .max(10, { message: "Guidance scale must be less than 10" }),
    num_outputs: z
      .number()
      .min(1, { message: "Number of outputs must be at least 1" })
      .max(4, { message: "Number of outputs must be less than 4" }),
    aspect_ratio: z.enum(
      [
        "1:1",
        "16:9",
        "21:9",
        "3:2",
        "2:3",
        "4:5",
        "5:4",
        "3:4",
        "4:3",
        "9:16",
        "9:21",
      ],
      { required_error: "Aspect ratio is required!" }
    ),
    output_format: z.string({
      required_error: "Output format is required!",
    }),
    output_quality: z
      .number({
        required_error: "Output quality is required!",
      })
      .min(1, { message: "Output quality must be at least 1" })
      .max(100, { message: "Output quality must be at most 100" }),
    num_inference_steps: z
      .number()
      .min(1, { message: "Number of inference steps must be at least 1" })
      .max(50, { message: "Number of inference steps must be at most 50" }),
  }),
]);

export type ConfigurationFormSchemaT = z.infer<typeof configurationFormSchema>;
