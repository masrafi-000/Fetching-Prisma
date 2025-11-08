import { ReviewFormValues } from "@/schema";
import { Edit3, Star, Trash2 } from "lucide-react";
import ReviewDialog from "../shared/ReviewDialog";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ReviewCardProps {
  user: string;
  ratingNumber: number;
  comment: string;
}

export default function ReviewCard({
  user,
  ratingNumber,
  comment,
}: ReviewCardProps) {
  const handleUpdate = (data: ReviewFormValues) => {
    console.log("Updated Review:", data);
  };

  return (
    <Card className="border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            {user}
          </CardTitle>

          <span className="flex gap-1 text-yellow-500 font-medium">
            {Array.from({ length: ratingNumber }).map((_, index) => (
              <Star key={index} />
            ))}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed">{comment}</p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-end gap-2">
          <ReviewDialog
            mode="update"
            defaultValues={{
              user,
              rating: ratingNumber.toString(),
              comment,
            }}
            onSubmit={handleUpdate}
            trigger={
              <Button variant="secondary" className="cursor-pointer">
                <Edit3 /> Edit
              </Button>
            }
          />

          <Button variant="destructive" className="cursor-pointer">
            <Trash2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
