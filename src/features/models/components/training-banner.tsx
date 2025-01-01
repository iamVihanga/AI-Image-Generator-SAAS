import { Card } from "@/components/ui/card";
import React from "react";

export function TrainingBanner() {
  return (
    <Card className="w-full h-full bg-muted/30 flex items-center justify-center">
      <div className="space-y-1.5 pb-6">
        <h1 className="text-3xl font-bold font-heading">Train new Model</h1>
        <p className="text-sm text-muted-foreground">
          Train a new model with your own images
        </p>
      </div>
    </Card>
  );
}
