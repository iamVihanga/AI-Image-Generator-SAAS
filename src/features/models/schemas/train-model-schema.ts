import { z } from "zod";

const ACCEPTED_ZIP_FILES = ["application/zip", "application/x-zip-compressed"];
const MAX_FILE_SIZE = 45 * 1024 * 1024;

// Schema for file upload validation
export const fileUploadSchema = z.object({
  modelName: z.string().min(1, { message: "Model name is required" }),
  gender: z.enum(["men", "women"]),
  zipFile: z
    .any()
    .refine((files) => files?.[0] instanceof File, "Please select a valid file")
    .refine(
      (files) =>
        files?.[0]?.type && ACCEPTED_ZIP_FILES.includes(files?.[0]?.type),
      "Only zip files are accepted"
    )
    .refine(
      (files) => files?.[0]?.size < MAX_FILE_SIZE,
      "File size should be less than 45MB"
    ),
});

// Schema for API endpoint
export const trainModelSchema = z.object({
  modelName: z.string().min(1, { message: "Model name is required" }),

  gender: z.enum(["men", "women"]),

  fileKey: z.string().min(1, { message: "File key is required" }),
});

export type FileUploadSchemaT = z.infer<typeof fileUploadSchema>;
export type TrainModelSchemaT = z.infer<typeof trainModelSchema>;
