import { DescriptionFormValues } from "@/schema";
import { Edit3, Trash2 } from "lucide-react";
import DescriptionDialog from "../shared/DescriptionDialog";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface DescriptionProps {
  title: string;
  description: string;
}

export default function DescriptionCard({
  title,
  description,
}: DescriptionProps) {
  const handleUpdate = (data: DescriptionFormValues) => {
    console.log("Updated Description: ", data);
    console.log("Updated Description: ", data);
  };

  return (
    <Card className="border rounded-lg shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-end gap-2">
          <DescriptionDialog
            mode="update"
            defaultValues={{ title, description }}
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
