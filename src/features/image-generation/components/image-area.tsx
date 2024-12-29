"use client";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageIcon } from "lucide-react";
import useGenerateStore from "../store/useGenerateStore";
import { Skeleton } from "@/components/ui/skeleton";

export function ImageArea() {
  const { images, loading } = useGenerateStore();

  if (images.length === 0 && !loading) {
    return (
      <Card className="w-full h-full bg-muted/50">
        <CardContent className="h-full flex flex-col items-center justify-center p-6 text-center space-y-2">
          <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
            <ImageIcon className="h-10 w-10 text-muted-foreground/60" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">No images generated</h3>
            <p className="text-sm text-muted-foreground">
              Configure your settings and click generate to create AI images
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="w-full h-full bg-muted/50">
        <CardContent className="h-full flex flex-col items-center justify-center text-center space-y-2">
          <Skeleton className="aspect-square w-2/3 shadow-xl rounded-2xl flex items-center justify-center">
            <ImageIcon className="size-10 text-muted-foreground/60 animate-pulse" />
          </Skeleton>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full bg-muted/30 flex items-center justify-center">
      <Carousel className="w-2/3">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1 relative flex items-center justify-center rounded-lg overflow-hidden aspect-square size-full group transition-all duration-300 ease-in-out">
                <Image
                  src={image.url}
                  alt={"Generated image"}
                  placeholder="blur"
                  fill
                  blurDataURL={image.blurUrl}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Card>
  );
}
