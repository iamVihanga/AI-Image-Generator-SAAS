import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { trainModelFormSchema } from "../schemas/train-model-schema";

const app = new Hono()
  /**
   * Model Training Route
   */
  .get("/train", zValidator("json", trainModelFormSchema), (c) => {
    return c.json({ res: "Model Training API Response" });
  });

export default app;
