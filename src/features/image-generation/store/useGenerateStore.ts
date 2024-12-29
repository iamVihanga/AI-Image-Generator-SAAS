import { create } from "zustand";
import { z } from "zod";

import { type ConfigurationFormSchemaT } from "../schemas/configuration-schema";
import { generateImageAction } from "../actions/generate-image-action";
import { toast } from "sonner";
import { storeImageAction } from "../actions/store-images-action";

interface GenerateStore {
  loading: boolean;
  images: Array<{ url: string; blurUrl?: string }>;
  error: string | null;

  generateImage: (config: ConfigurationFormSchemaT) => Promise<void>;
}

const useGenerateStore = create<GenerateStore>((set) => ({
  loading: false,
  images: [],
  error: null,

  generateImage: async (config: ConfigurationFormSchemaT) => {
    try {
      set({ loading: true, error: null });

      // Loading toast
      const toastId = toast.loading(
        `${
          config.num_outputs > 1
            ? `${config.num_outputs} Images are being generated`
            : "Image is generating"
        }...`
      );

      const { data, error, success } = await generateImageAction(config);

      if (!success) {
        set({ error: error, loading: false });
        return;
      }

      const urlSet = await Promise.all(
        data.map(async (url: string) => {
          // Convert the image URL to a blur URL
          const blurData = await fetch("/api/remote-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageUrl: url }),
          }).then((res) => res.json());

          return {
            url: url,
            blurUrl: blurData?.base64,
            ...config,
          };
        })
      );

      // Update state
      set({
        images: urlSet,
        loading: false,
      });

      // Success toast
      toast.success(
        `${
          config.num_outputs > 1 ? `${config.num_outputs} Images` : "Image"
        } generated successfully...!`,
        { id: toastId }
      );

      // Store images in the supabase -> Action call
      await storeImageAction(urlSet);

      // Success toast
      toast.success(
        `${
          config.num_outputs > 1 ? `Images are` : "Image"
        } saved to library..!`,
        { id: toastId }
      );
    } catch (error) {
      console.log(error);

      toast.error(
        (error as Error).message ||
          "Failed to generate image. Please try again."
      );

      set({
        error:
          (error as Error).message ||
          "Failed to generate image. Please try again.",
        loading: false,
      });
    }
  },
}));

export default useGenerateStore;
