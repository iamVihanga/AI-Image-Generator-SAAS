"use client";

import React, { useId, useTransition } from "react";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import { Button } from "@/components/ui/button";
import { deleteImageAction } from "../actions/delete-image";
import { cn } from "@/lib/utils";

type Props = {
  imageId: number;
  imageName: string;
  onDelete?: () => void;
  className?: string;
};

export function DeleteImage({
  imageId,
  imageName,
  onDelete,
  className,
}: Props) {
  const [isDeleting, startDeleteAction] = useTransition();
  const router = useRouter();
  const toastId = useId();

  const handleDelete = async () => {
    toast.loading("Deleting image...", { id: toastId });

    startDeleteAction(async () => {
      const { error, success } = await deleteImageAction(imageId, imageName);

      if (error) {
        toast.error(error, { id: toastId });
      } else if (success) {
        toast.success("Image deleted successfully !", { id: toastId });
        onDelete?.();
        router.refresh();
      } else {
        toast.dismiss(toastId);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"icon"} variant={"destructive"} className={cn(className)}>
          <TrashIcon className="size-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the image
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
