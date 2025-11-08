"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import DescriptionForm from "./shared/Descriptionform";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const tabs = ["description", "review", "specs"];

// === Fetch hook using React Query ===
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

// === Production-ready ProductTabs Component ===
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
        {/* === Tab Buttons === */}
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

        {/* === Content Section === */}
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
          {selected === ""}
          {data && (
            <div className="border rounded p-4 bg-gray-50 overflow-auto">
              <Card>
                <CardHeader>

                <CardTitle className="uppercase">{selected} Data</CardTitle>
                <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4
                  ">
                    <h1 className="text-xl font-medium leading-1.5">{data.title}</h1>
                    <p className="text-base text-gray-600 ">{data.description}</p>

                  </div>
                </CardContent>
              </Card>
             <pre className="text-center">{JSON.stringify(data)}</pre>
            </div>
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
