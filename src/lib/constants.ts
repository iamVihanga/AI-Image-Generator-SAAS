import {
  CreditCard,
  Frame,
  Image,
  Images,
  Layers,
  Settings2,
  SquareTerminal,
} from "lucide-react";

export const nav_items_data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Generate Images",
      url: "/image-generation",
      icon: Image,
    },
    {
      title: "My Models",
      url: "/models",
      icon: Frame,
    },
    {
      title: "Train Model",
      url: "/model-training",
      icon: Layers,
    },
    {
      title: "My Images",
      url: "/gallery",
      icon: Images,
    },
  ],
  navSettings: [
    {
      title: "General",
      url: "/account-settings",
      icon: Settings2,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: CreditCard,
    },
  ],
};

export const SUPABASE_IMAGE_BUCKET_NAME = "generated_images";
export const SUPABASE_TRAINING_DATA_BUCKET_NAME = "training_data";
