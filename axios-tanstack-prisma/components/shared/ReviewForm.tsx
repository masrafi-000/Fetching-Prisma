import { ReviewFormValues, reviewSchema } from "@/schema";
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
import { Textarea } from "../ui/textarea";

export default function ReviewDialog() {
  const {
    control, 
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
      rating: "",
      user: "",
    },
  });

  const onSubmit = (data: ReviewFormValues) => {
    console.log("Submitted Data: ", data);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 cursor-pointer">Create Review</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Review</DialogTitle>
          <DialogDescription>Review for a product</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="user">User Name</Label>
              <Input
                id="user"
                {...register("user")}
                placeholder="Write your full name"
              />
              {errors.user && (
                <p className="text-sm text-red-500">{errors.user.message}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="rating">Rating</Label>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select rating value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.rating && (
                <p className="text-sm text-red-500">{errors.rating.message}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                {...register("comment")}
                placeholder="Write a comment"
              />
              {errors.comment && (
                <p className="text-sm text-red-500">{errors.comment.message}</p>
              )}
            </div>

            <DialogFooter className="w-full">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="destructive"
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button  type="submit" className="cursor-pointer">
                Post
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
