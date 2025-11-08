"use client";

import { Button } from "@/components/ui/button";
import {
  DescriptionFormValues,
  ReviewFormValues,
  SpecsFormValues,
} from "@/schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Star } from "lucide-react";
import { useState } from "react";
import DescriptionForm from "./shared/Descriptionform";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const tabs = ["description", "review", "specs"];

function useProductData(type: string | null) {
  return useQuery({
    queryKey: ["product", type],
    queryFn: async () => {
      if (!type) return null;
      const res = await axios.get(`/api/${type}`);
      return res.data;
    },
    enabled: !!type,
    staleTime: 1000 * 60, // cache 1 minute
    retry: 2, // automatic retry
  });
}

export default function ProductTabs() {
  const [selected, setSelected] = useState<string | null>(null);
  const { data, isLoading, isFetching, isError, refetch } =
    useProductData(selected);

  return (
    <div className="container mx-auto p-4  space-y-4">
      <div className="relative">
        <h1 className="uppercase text-center">post data</h1>
        <hr className="mt-7 border-2 rounded-2xl -w-full" />

        <div className="mt-4 flex  gap-3 w-full">
          <DescriptionForm />

          <Button className="flex-1 cursor-pointer">Create Review</Button>

          <Button className="flex-1 cursor-pointer">Create Specs</Button>
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
            <div className="text-center">
              {/* <Skeleton height="4" />
            <Skeleton height="4" />
            <Skeleton height="4" width="3/4" /> */}
              Loading {selected}...
            </div>
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
                  data.map((item: DescriptionFormValues) => (
                    <Card
                      key={item.id}
                      className="border rounded-lg shadow-sm bg-white"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-800">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              <div className="space-y-4">
                {selected === "review" &&
                  Array.isArray(data) &&
                  data.map((item: ReviewFormValues) => {
                    const ratingNumber = Number(item.rating);
                    return (
                      <Card
                        key={item.id}
                        className="border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-gray-800">
                              {item.user}
                            </CardTitle>

                            <span className="flex gap-1 text-yellow-500 font-medium">
                              {Array.from({ length: ratingNumber }).map(
                                (_, index) => (
                                  <Star key={index} />
                                )
                              )}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed">
                            {item.comment}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>

              <div className="space-y-4">
                {selected === "specs" &&
                  Array.isArray(data) &&
                  data.map((item: SpecsFormValues) => (
                    <Card
                      key={item.id}
                      className="border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
                    >
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
                                <span className="font-medium capitalize">
                                  {key}:{" "}
                                </span>
                                <span>{String(value)}</span>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
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
