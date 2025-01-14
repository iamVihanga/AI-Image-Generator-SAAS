import { Hono } from "hono";
import crypto from "crypto";
import { Resend } from "resend";

import { replicate } from "@/lib/replicate/client";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { EmailTemplate } from "@/components/email/email-template";

// resend instant
const resend = new Resend(process.env.RESEND_API_KEY);

const app = new Hono().post("/training", async (c) => {
  try {
    const body = await c.req.json();
    const url = new URL(c.req.url);

    const userId = url.searchParams.get("userId") ?? "";
    const modelName = url.searchParams.get("modelName") ?? "";
    const fileName = url.searchParams.get("fileName") ?? "";

    // 1. Validate the webhook
    const id = c.req.header("webhook-id") ?? "";
    const timestamp = c.req.header("webhook-timestamp") ?? "";
    const webhookSignature = c.req.header("webhook-signature") ?? "";

    const signedContent = `${id}.${timestamp}.${JSON.stringify(body)}`;

    const secret = await replicate.webhooks.default.secret.get();

    // Base64 decode the secret
    const secretBytes = Buffer.from(secret.key.split("_")[1], "base64");
    const signature = crypto
      .createHmac("sha256", secretBytes)
      .update(signedContent)
      .digest("base64");

    const expectedSignatures = webhookSignature
      .split(" ")
      .map((sig) => sig.split(",")[1]);

    const isValid = expectedSignatures.some(
      (expectedSignature) => expectedSignature === signature
    );

    if (!isValid) {
      return c.json({ error: "Invalid Signature" }, { status: 401 });
    }

    // 2. Get user data
    const { data: userData, error: userError } =
      await supabaseAdmin.auth.admin.getUserById(userId);

    if (userError) return c.json({ error: userError.message }, { status: 500 });

    const userEmail = userData.user.email ?? "";
    const userName = userData.user.user_metadata.full_name ?? "";

    if (body.status === "succeeded") {
      // Send a successfull status email
      await resend.emails.send({
        from: "Pictoria AI <onboarding@resend.dev>",
        to: [userEmail],
        subject: "Model Training Completed !",
        react: EmailTemplate({
          username: userName,
          message: "Your model has been trained successfully !",
        }),
      });

      // Update the supabase models table
      await supabaseAdmin
        .from("models")
        .update({
          training_status: body.status,
          training_time: body.metrics?.total_time ?? null,
          version: body.output?.version.split(":")[1] ?? null,
        })
        .eq("user_id", userId)
        .eq("model_name", modelName);
    } else {
      // Send the status email
      await resend.emails.send({
        from: "Pictoria AI <onboarding@resend.dev>",
        to: [userEmail],
        subject: `Model Training ${body.status} !`,
        react: EmailTemplate({
          username: userName,
          message: `Your model has been ${body.status} !`,
        }),
      });

      // Update the supabase models table
      await supabaseAdmin
        .from("models")
        .update({
          training_status: body.status,
        })
        .eq("user_id", userId)
        .eq("model_name", modelName);
    }

    // Delete the training data zip file from the storage
    await supabaseAdmin.storage.from("training_data").remove([`${fileName}`]);
    // %2Ff3fb3029-80d1-4008-b35a-0d7610190b17%2F1736869805192_walter_white.zip

    return c.json({ success: true }, { status: 200 });
  } catch (error) {
    let errorMessage;

    console.log("Webhook Processing Error : ", error);

    if (error instanceof Error)
      errorMessage = error.message || "Webhook Processing Error !";

    return c.json({ error: errorMessage }, { status: 500 });
  }
});

export default app;
