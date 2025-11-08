import { SpecsFormValues, specsShema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SpecificationDialogProps {
  initialData?: SpecsFormValues;
  mode?: "create" | "edit";
  trigger?: ReactNode;
  onSubmit: (data: SpecsFormValues) => void;
}

export default function SpecificationDialog({
  initialData,
  mode = "create",
  trigger,
  onSubmit,
}: SpecificationDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SpecsFormValues>({
    resolver: zodResolver(specsShema),
    defaultValues: {
      color: "",
      dimensions: "",
      material: "",
      warranty: "",
      weight: "",
    },
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const handleFormSubmit = (data: SpecsFormValues) => {
      onSubmit?.(data)
      if(mode === "create") reset();
    };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="flex-1 cursor-pointer">
            {mode === "edit" ? "Edit Specification" : "Update Specification"}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Specification" : "Create Specification"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Update product specification details"
              : "Create specification for a product"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                {...register("weight")}
                placeholder="Give product weight."
              />
              {errors.weight && (
                <p className="text-sm text-red-500">{errors.weight.message}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="color">Color</Label>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select rating value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Red">Red</SelectItem>
                        <SelectItem value="White">White</SelectItem>
                        <SelectItem value="Black">Black</SelectItem>
                        <SelectItem value="Pink">Pink</SelectItem>
                        <SelectItem value="Orange">Orange</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.color && (
                <p className="text-sm text-red-500">{errors.color.message}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="warranty">Warranty</Label>
              <Input
                id="warranty"
                {...register("warranty")}
                placeholder="Give product warranty."
              />
              {errors.warranty && (
                <p className="text-sm text-red-500">
                  {errors.warranty.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input
                id="dimensions"
                {...register("dimensions")}
                placeholder="Give product dimensions."
              />
              {errors.dimensions && (
                <p className="text-sm text-red-500">
                  {errors.dimensions.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="material">Material</Label>
              <Input
                id="material"
                {...register("material")}
                placeholder="Give product material."
              />
              {errors.material && (
                <p className="text-sm text-red-500">
                  {errors.material.message}
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
            <Button type="submit">{mode === "edit" ? "Update" : "Post"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
