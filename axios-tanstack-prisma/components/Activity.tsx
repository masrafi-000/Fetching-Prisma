"use client";

import { Button } from "@/components/ui/button";
import {
  DescriptionFormValues,
  DescriptionWithId,
  ReviewFormValues,
  ReviewWithId,
  SpecsFormValues,
  SpecsWithId,
} from "@/schema";

import useProductData from "@/hooks/useProduct";
import { useState } from "react";
import DescriptionCard from "./cards/DescriptionCard";
import ReviewCard from "./cards/ReviewCard";
import SpecificationCard from "./cards/SpecificationCard";
import DescriptionDialog from "./shared/DescriptionDialog";
import ReviewDialog from "./shared/ReviewDialog";
import SpecificationDialog from "./shared/SpecsDialog";

const tabs = ["description", "review", "specs"];

export default function ProductTabs() {
  const [selected, setSelected] = useState<string | null>(null);
  const { data, isLoading, isFetching, isError, refetch } =
    useProductData(selected);

  const handleCreate = async (data: DescriptionFormValues) => {
    console.log("Submited data: ", data);
  };

  const handleReviewCreate = async (data: ReviewFormValues) => {
    console.log("Submited data: ", data);
  };
  const handleSpecsCreate = async (data: SpecsFormValues) => {
    console.log("Submited data: ", data);
  };

  return (
    <div className="container mx-auto p-4  space-y-4">
      <div className="relative">
        <h1 className="capitalize text-center">post data</h1>
        <hr className="mt-7 border-2 rounded-2xl -w-full" />

        <div className="mt-4 flex  gap-3 w-full">
          <DescriptionDialog mode="create" onSubmit={handleCreate} />

          <ReviewDialog mode="create" onSubmit={handleReviewCreate} />

          <SpecificationDialog mode="create" onSubmit={handleSpecsCreate} />
        </div>
      </div>

      <div className="">
        <div className="flex gap-3 mb-4">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={selected === tab ? "outline" : "default"}
              onClick={() => setSelected(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>

        <hr className="border-2 rounded-2xl mb-4" />

        <div className="min-h-[150px] flex flex-col gap-2">
          {/* Loading Skeleton */}
          {isLoading || isFetching ? (
            <div className="text-center">Loading {selected}...</div>
          ) : null}

          {/* Error Message */}
          {isError && (
            <div className="flex flex-col gap-2 text-red-600 text-center">
              <p>Failed to load {selected}.</p>
              <Button variant="destructive" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          )}

          {/* Data Display */}

          {data && (
            <>
              <div className="space-y-4">
                {selected === "description" &&
                  Array.isArray(data) &&
                  data.map((item: DescriptionWithId) => (
                    <DescriptionCard
                      key={item.id}
                      title={item.title}
                      description={item.description}
                    />
                  ))}
              </div>

              <div className="space-y-4">
                {selected === "review" &&
                  Array.isArray(data) &&
                  data.map((item: ReviewWithId) => {
                    const ratingNumber = Number(item.rating);
                    return (
                      <ReviewCard
                        key={item.id}
                        ratingNumber={ratingNumber}
                        user={item.user}
                        comment={item.comment}
                      />
                    );
                  })}
              </div>

              <div className="space-y-4">
                {selected === "specs" &&
                  Array.isArray(data) &&
                  data.map((item: SpecsWithId) => (
                    <SpecificationCard
                      key={item.id}
                      id={item.id}
                      color={item.color}
                      dimensions={item.dimensions}
                      warranty={item.warranty}
                      weight={item.weight}
                      material={item.material}
                    />
                  ))}
              </div>
            </>
          )}

          {/* Initial State */}
          {!selected && (
            <p className="text-gray-500">Select a tab to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
}
