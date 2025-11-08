"use client";

import { DescriptionFormValues, descriptionSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface DescriptionDialogProps {
  trigger?: ReactNode;
  defaultValues?: DescriptionFormValues;
  mode?: "create" | "update";
  onSubmit: (data: DescriptionFormValues) => void;
}

export default function DescriptionDialog({
  trigger,
  defaultValues,
  mode = "create",
  onSubmit,
}: DescriptionDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DescriptionFormValues>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const handleFormSubmit = (data: DescriptionFormValues) => {
    onSubmit(data);
    if (mode === "create") reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="flex-1 cursor-pointer">
            {mode === "create" ? "Create Description" : "Edit Description"}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Description" : "Update Description"}
          </DialogTitle>
          <DialogDescription>
            {" "}
            {mode === "create"
              ? "Description for a product"
              : "Edit the existing description"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Give a proper title."
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Write a valid description"
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="destructive">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {mode === "create" ? "Post" : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
