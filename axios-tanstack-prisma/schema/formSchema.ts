import { z } from "zod";

export const descriptionSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
});

export type DescriptionFormValues = z.infer<typeof descriptionSchema>;
export type DescriptionWithId = DescriptionFormValues & { id: number };

export const reviewSchema = z.object({
  user: z.string(),
  rating: z.string(),
  comment: z.string(),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
export type ReviewWithId = ReviewFormValues & { id: string };

export const specsShema = z.object({
  weight: z.string(),
  dimensions: z.string(),
  color: z.string(),
  warranty: z.string(),
  material: z.string(),
});

export type SpecsFormValues = z.infer<typeof specsShema>;
export type SpecsWithId = SpecsFormValues & { id: string };
