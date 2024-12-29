"use client";

import React, { useState } from "react";

import { Tables } from "@/lib/supabase/database.types";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ClockIcon,
  DownloadIcon,
  SquareChevronRightIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { DeleteImage } from "./delete-image";

interface ImageDialogProps {
  image: { url: string | undefined } & Tables<"generated_images">;
  onClose: () => void;
}

export default function ImageDialog({ image, onClose }: ImageDialogProps) {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    await fetch(image.url!)
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `generated-image-${Date.now()}.${image?.output_format}`
        );

        document.body.appendChild(link);
        link.click();

        // Cleanup
        link.parentNode?.removeChild(link);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsDownloading(false));
  };

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="max-w-full sm:max-w-lg w-full p-0">
        <ScrollArea className="h-screen p-5">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-2xl w-full">Image Details</SheetTitle>
            <SheetDescription className="flex items-center gap-3">
              <span className="text-xs flex items-center">
                <Calendar className="size-4 mr-1" />{" "}
                {new Date(image.created_at).toLocaleDateString()}
              </span>

              <span className="text-xs flex items-center">
                <ClockIcon className="size-4 mr-1" />
                {new Date(image.created_at).toLocaleTimeString()}
              </span>
            </SheetDescription>
          </SheetHeader>

          <div className="relative size-fit">
            <Image
              src={image.url!}
              alt={image.prompt!}
              width={image.width!}
              height={image.height!}
              placeholder="blur"
              blurDataURL={image.blur_data!}
              className="object-cover rounded-md"
            />

            <div className="flex gap-4 absolute bottom-4 right-4">
              <Button
                className="w-fit"
                icon={<DownloadIcon className="size-4" />}
                loading={isDownloading}
                onClick={handleDownload}
              >
                Download
              </Button>

              <DeleteImage
                imageId={image.id}
                imageName={image.image_name!}
                onDelete={onClose}
              />
            </div>
          </div>

          <Separator className="my-4" />

          {/* Image Prompt */}
          <div>
            <h2 className="font-semibold flex items-center">
              <SquareChevronRightIcon className="size-4 mr-2" /> Image Prompt
            </h2>
            <p className="text-muted-foreground text-sm mt-1">{image.prompt}</p>
          </div>

          <Separator className="my-4" />

          {/* Details */}
          <div className="flex flex-wrap gap-3">
            <Badge
              variant={"secondary"}
              className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
            >
              <span className="text-primary uppercase mr-2 font-semibold">
                Model ID:{" "}
              </span>
              {image.model}
            </Badge>

            <Badge
              variant={"secondary"}
              className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
            >
              <span className="text-primary uppercase mr-2 font-semibold">
                Aspect Ratio:{" "}
              </span>
              {image.aspect_ratio}
            </Badge>

            <Badge
              variant={"secondary"}
              className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
            >
              <span className="text-primary uppercase mr-2 font-semibold">
                Dimentions:{" "}
              </span>
              {image.width} x {image.height}
            </Badge>

            <Badge
              variant={"secondary"}
              className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
            >
              <span className="text-primary uppercase mr-2 font-semibold">
                Guidance:{" "}
              </span>
              {image.guidance}
            </Badge>

            <Badge
              variant={"secondary"}
              className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
            >
              <span className="text-primary uppercase mr-2 font-semibold">
                Inference Steps:{" "}
              </span>
              {image.num_inference_steps}
            </Badge>

            <Badge
              variant={"secondary"}
              className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
            >
              <span className="text-primary uppercase mr-2 font-semibold">
                Output Format:{" "}
              </span>
              {image.output_format}
            </Badge>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
