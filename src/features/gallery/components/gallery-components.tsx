"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tables } from "@/lib/supabase/database.types";
import Image from "next/image";
import React, { useState } from "react";
import ImageDialog from "./image-dialog";

type ImageProps = {
  url: string | undefined;
} & Tables<"generated_images">;

type GalleryProps = {
  images: ImageProps[];
};

export function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center text-muted-foreground">
        No images found
      </div>
    );
  }

  return (
    <section className="container mx-auto py-4">
      <div className="columns-4 gap-4 space-y-4">
        {images.map((image) => (
          <div key={image.id} className="break-inside-avoid">
            <Card
              onClick={() => setSelectedImage(image)}
              className="p-0 relative group rounded-md overflow-hidden cursor-pointer transition-transform"
            >
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-70 rounded-md">
                <div className="flex items-center justify-center h-full">
                  <p className="text-primary-foreground dark:text-primary text-lg font-semibold">
                    View Details
                  </p>
                </div>
              </div>

              <CardContent className="p-0">
                <Image
                  src={image.url!}
                  alt={image.prompt!}
                  width={image.width!}
                  height={image.height!}
                  placeholder="blur"
                  blurDataURL={image.blur_data!}
                  className="object-cover rounded-md"
                />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageDialog
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
}
