"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

export default function LoadingPage({}: Props) {
  return (
    <section className="h-full container mx-auto grid gap-4 grid-cols-3 overflow-hidden">
      {/* Form */}
      <div className="h-full overflow-auto">
        <Card className="h-full p-0 flex flex-col">
          <ScrollArea className="flex-1">
            <CardContent className="grid gap-6 p-4">
              <div className="space-y-2">
                <Skeleton className="w-36 h-4"></Skeleton>
                <Skeleton className="w-full h-8"></Skeleton>
              </div>

              <div className="w-full flex gap-4 items-center">
                <div className="space-y-2 w-full">
                  <Skeleton className="w-24 h-4"></Skeleton>
                  <Skeleton className="w-full h-8"></Skeleton>
                </div>
                <div className="space-y-2 w-full">
                  <Skeleton className="w-24 h-4"></Skeleton>
                  <Skeleton className="w-full h-8"></Skeleton>
                </div>
              </div>

              <div className="space-y-2 w-full">
                <Skeleton className="w-36 h-4"></Skeleton>
                <Skeleton className="w-full h-3"></Skeleton>
              </div>
              <div className="space-y-2 w-full">
                <Skeleton className="w-36 h-4"></Skeleton>
                <Skeleton className="w-full h-3"></Skeleton>
              </div>
              <div className="space-y-2 w-full">
                <Skeleton className="w-36 h-4"></Skeleton>
                <Skeleton className="w-full h-3"></Skeleton>
              </div>

              <div className="space-y-2">
                <Skeleton className="w-36 h-4"></Skeleton>
                <Skeleton className="w-full h-8"></Skeleton>
              </div>
            </CardContent>
          </ScrollArea>

          <CardContent className="p-4">
            <Skeleton className="w-full h-10"></Skeleton>
          </CardContent>
        </Card>
      </div>

      {/* Output Image */}
      <div className="col-span-2 rounded-lg h-full">
        <Skeleton className="w-full h-full"></Skeleton>
      </div>
    </section>
  );
}
