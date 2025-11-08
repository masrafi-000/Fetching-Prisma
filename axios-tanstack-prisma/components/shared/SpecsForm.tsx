import { SpecsFormValues, specsShema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
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

export default function SpecificationDialog() {
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

  const onSubmit = (data: SpecsFormValues) => {
    console.log("Submitted Data: ", data);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 cursor-pointer">Create Specification</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Description</DialogTitle>
          <DialogDescription>Description for a product</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="pink">Pink</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
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
            <Button type="submit">Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
