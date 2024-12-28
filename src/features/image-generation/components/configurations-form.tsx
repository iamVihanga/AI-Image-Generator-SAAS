"use client";

import { useEffect, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InfoIcon, SparklesIcon } from "lucide-react";

import {
  configurationFormSchema,
  type ConfigurationFormSchemaT,
} from "../schemas/configuration-schema";
import { aspectRatios, defaultModels, outputFormats } from "../constants";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import useGenerateStore from "../store/useGenerateStore";

export function ConfigurationsForm() {
  const { generateImage, loading } = useGenerateStore();

  const form = useForm<ConfigurationFormSchemaT>({
    resolver: zodResolver(configurationFormSchema),
    defaultValues: {
      model: "black-forest-labs/flux-dev",
      prompt: "",
      guidance: 3.5,
      num_outputs: 1,
      output_format: "jpg",
      aspect_ratio: "1:1",
      output_quality: 80,
      num_inference_steps: 28,
    },
  });

  // Listing to model change effect
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "model") {
        let newSteps;

        if (value.model === "black-forest-labs/flux-schnell") {
          newSteps = 4;
        } else newSteps = 28;

        if (newSteps !== undefined) {
          form.setValue("num_inference_steps", newSteps);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  async function onSubmit(values: ConfigurationFormSchemaT) {
    await generateImage(values);
  }

  return (
    <TooltipProvider>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 h-full"
        >
          {/* h-full overflow-auto */}
          <Card className="h-full p-0 flex flex-col">
            <ScrollArea className="flex-1">
              <CardContent className="grid gap-6 p-4">
                {/* AI Image Generating Model Selector Component */}
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-x-1">
                        Model
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="size-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Select AI Image Generation Model</p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select AI Model" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {defaultModels.map((model, index) => (
                            <SelectItem key={index} value={model.slug}>
                              {model.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="aspect_ratio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Aspect Ratio</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select aspect ratio" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {aspectRatios.map((ar, index) => (
                              <SelectItem key={index} value={ar.value}>
                                {ar.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="num_outputs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Outputs</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={4}
                            placeholder="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="guidance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center justify-between">
                        <div className="flex items-center gap-x-1">
                          Guidance
                          <Tooltip>
                            <TooltipTrigger>
                              <InfoIcon className="size-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Prompt guidance for generated image</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <span>{field.value}</span>
                      </FormLabel>
                      <FormControl>
                        <Slider
                          defaultValue={[field.value]}
                          min={0}
                          max={10}
                          step={0.5}
                          onValueChange={(e) => field.onChange(e[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="num_inference_steps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center justify-between">
                        <div className="flex items-center gap-x-1">
                          Number of Inference Steps
                          <Tooltip>
                            <TooltipTrigger>
                              <InfoIcon className="size-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Number of denoising steps. Recommended range is
                                28-50 for Dev Model & 1-4 for schnell model.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <span>{field.value}</span>
                      </FormLabel>
                      <FormControl>
                        <Slider
                          defaultValue={[field.value]}
                          min={1}
                          max={
                            form.getValues("model") ===
                            "black-forest-labs/flux-schnell"
                              ? 4
                              : 50
                          }
                          step={1}
                          onValueChange={(e) => field.onChange(e[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="output_quality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center justify-between">
                        <div className="flex items-center gap-x-1">
                          Output Quality
                          <Tooltip>
                            <TooltipTrigger>
                              <InfoIcon className="size-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Quality when sabing the output image. (from 0 to
                                100)
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <span>{field.value}</span>
                      </FormLabel>
                      <FormControl>
                        <Slider
                          defaultValue={[field.value]}
                          min={50}
                          max={100}
                          step={1}
                          onValueChange={(e) => field.onChange(e[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="output_format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Output Format</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select output format" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {outputFormats.map((format, index) => (
                            <SelectItem key={index} value={format.value}>
                              {format.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center justify-between">
                        <div>Prompt</div>
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={6} />
                      </FormControl>
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
                icon={<SparklesIcon className="size-4" />}
                loading={loading}
              >
                Generate Image
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </TooltipProvider>
  );
}
