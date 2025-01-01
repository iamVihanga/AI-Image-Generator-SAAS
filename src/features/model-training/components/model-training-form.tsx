"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  trainModelFormSchema,
  type TrainModelFormSchemaT,
} from "../schemas/train-model-schema";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

interface ModelTrainingFormProps {
  className?: string;
}

export default function ModelTrainingForm({
  className,
}: ModelTrainingFormProps) {
  const form = useForm<TrainModelFormSchemaT>({
    resolver: zodResolver(trainModelFormSchema),
    defaultValues: {
      modelName: "",
      zipFile: undefined,
      gender: "men",
    },
  });

  const fileRef = form.register("zipFile");

  const onSubmit = async (data: TrainModelFormSchemaT) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
        <Card className={cn("h-full p-0 flex flex-col", className)}>
          <ScrollArea className="flex-1">
            <CardContent className="grid gap-6 p-4">
              <FormField
                control={form.control}
                name="modelName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter model name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be the name of your trained model
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Please select the gender of the images
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="men" />
                          </FormControl>
                          <FormLabel className="font-normal">Men</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="women" />
                          </FormControl>
                          <FormLabel className="font-normal">Women</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Training Data (Zip File) |{" "}
                      <span className="text-destructive">
                        Read the requirements below
                      </span>
                    </FormLabel>

                    <div className="mb-4 rounded-lg shadow-sm pb-4 text-card-foreground">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Provide 10, 12 or 15 images in total </li>
                        <li>• Ideal breakdown for 12 images: </li>
                        <ul className="ml-4 mt-1 space-y-1">
                          <li>- 6 face closeups </li>
                          <li>- 3/4 half body closeups (till stomach) </li>
                          <li>- 2/3 full body shots </li>
                        </ul>
                        <li>• No accessories on face/head ideally </li>
                        <li>• No other people in images </li>
                        <li>
                          • Different expressions, clothing, backgrounds with
                          good lighting{" "}
                        </li>
                        <li>
                          • Images to be in 1:1 resolution (1048x1048 or higher){" "}
                        </li>
                        <li>
                          • Use images of similar age group (ideally within past
                          few months){" "}
                        </li>
                        <li>• Provide only zip file (under 45MB size)</li>
                      </ul>
                    </div>

                    <FormControl>
                      <Input type="file" accept=".zip" {...fileRef} />
                    </FormControl>
                    <FormDescription>
                      {`Upload a zip file containing your training images (max 45MB)`}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </ScrollArea>

          <CardContent className="p-4">
            <Button
              type="submit"
              className="font-medium w-full shadow-lg"
              icon={<Brain className="size-4" />}
              // loading={loading}
            >
              Train Model
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
