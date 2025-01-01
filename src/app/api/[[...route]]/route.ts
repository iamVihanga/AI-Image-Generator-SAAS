import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

// Route imports
import model from "@/features/model-training/api/model-train-api";

app.get("/test-api", (c) => {
  return c.json({ res: "Test API Response" });
});

const routes = app.route("/model", model);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
