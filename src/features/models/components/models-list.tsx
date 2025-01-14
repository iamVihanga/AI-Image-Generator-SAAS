"use client";

import React, { useId, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatDistance } from "date-fns";
import {
  ArrowRight,
  CheckCircle2,
  ClockIcon,
  Loader2,
  Trash2Icon,
  User2,
  XCircle,
} from "lucide-react";

import { Database } from "@/lib/supabase/database.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteModelAction } from "../actions/delete-models-action";

type ModelType = {
  error: string | null;
  success: boolean;
  data: Database["public"]["Tables"]["models"]["Row"][] | null;
  count: number;
};

interface ModelsListProps {
  models: ModelType;
}

export function ModelsList({ models }: ModelsListProps) {
  const { data, error, success, count } = models;
  const toastId = useId();
  const [isDeleting, startDeleting] = useTransition();
  const router = useRouter();

  const handleDelete = async (
    id: number,
    model_id: string,
    model_version: string
  ) => {
    startDeleting(async () => {
      toast.loading("Deleting model...", { id: toastId });

      const { error, success } = await deleteModelAction(
        id,
        model_id,
        model_version
      );

      if (error) toast.error(error, { id: toastId });

      if (success) {
        toast.success("Model deleted successfully", { id: toastId });
        router.refresh();
      }
    });
  };

  if (data?.length === 0) {
    return (
      <Card className="flex h-[450px] flex-col items-center justify-center text-center">
        <CardHeader>
          <CardTitle>No Models Found</CardTitle>
          <CardDescription>
            You haven't trained any AI models yet, Start by creating a new model
          </CardDescription>
        </CardHeader>
        <Button className="w-fit" asChild>
          <Link href={"/model-training"}>Create Model</Link>
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3 grid-cols-1">
      {data?.map((model) => (
        <Card key={model.id} className="relative flex flex-col overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{model.model_name}</CardTitle>

              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center gap-2">
                  {model.training_status === "succeeded" ? (
                    <div className="flex items-center gap-1 text-sm text-green-500">
                      <CheckCircle2 className="size-4" />
                      <span className="capitalize">Ready</span>
                    </div>
                  ) : model.training_status === "failed" ||
                    model.training_status === "canceled" ? (
                    <div className="flex items-center gap-1 text-sm text-red-500">
                      <XCircle className="size-4" />
                      <span className="capitalize">
                        {model.training_status}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-sm text-yellow-500">
                      <Loader2 className="size-4 animate-spin" />
                      <span className="capitalize">Training</span>
                    </div>
                  )}
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant={"ghost"}
                      size="icon"
                      className="size-8 text-destructive/90 hover:text-destructive"
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your trained AI model & data
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
                          onClick={() =>
                            handleDelete(
                              model.id,
                              model.model_id || "",
                              model.version || ""
                            )
                          }
                        >
                          Continue
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <CardDescription>
              Created{" "}
              {formatDistance(new Date(model.created_at), new Date(), {
                addSuffix: true,
              })}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted px-3 py-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ClockIcon className="size-4" />
                    <span>Training Duration</span>
                  </div>

                  <p className="mt-1 font-medium">
                    {Math.round(Number(model.training_time) / 60) || NaN} Mins
                  </p>
                </div>

                <div className="rounded-lg bg-muted px-3 py-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User2 className="size-4" />
                    <span>Gender</span>
                  </div>

                  <p className="mt-1 font-medium">{model.gender}</p>
                </div>
              </div>
            </div>
          </CardContent>

          <div className="pt-4">
            <Button
              asChild
              disabled={model.training_status !== "succeeded"}
              className="w-full"
            >
              <Link
                href={
                  model.training_status === "succeeded"
                    ? `/image-generation/model_id=${model.model_id}:${model.version}`
                    : "#"
                }
              >
                Generate Images
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
