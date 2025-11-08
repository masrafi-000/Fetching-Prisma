import { SpecsFormValues, SpecsWithId } from "@/schema";
import { Edit3, Trash2 } from "lucide-react";
import SpecificationDialog from "../shared/SpecsDialog";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function SpecificationCard(item: SpecsWithId) {
  const handleUpdate = (updatedData: SpecsFormValues) => {
    console.log("Updated specification:", updatedData);
    // API call: await updateSpecification(item.id, updatedData)
  };
  return (
    <Card className="border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Specification #{item.id}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(item).map(([key, value]) => {
            if (key === "id") return null;

            return (
              <div
                key={key}
                className="flex justify-between border-b py-1 text-gray-700"
              >
                <span className="font-medium capitalize">{key}: </span>
                <span>{String(value)}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-end gap-2">
          <SpecificationDialog
            mode="edit"
            initialData={{
              color: item.color,
              dimensions: item.dimensions,
              material: item.material,
              warranty: item.warranty,
              weight: item.weight,
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
