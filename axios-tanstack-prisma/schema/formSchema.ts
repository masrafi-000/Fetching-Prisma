import { z } from "zod";

export const descriptionSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
});

export type DescriptionFormValues = z.infer<typeof descriptionSchema>;

export const reviewSchema = z.object({
  id: z.string(),
  user: z.string(),
  rating: z.string(),
  comment: z.string(),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

export const specsShema = z.object({
  id: z.string(),
  weight: z.string(),
  dimensions: z.string(),
  color: z.string(),
  warranty: z.string(),
  material: z.string(),
});

export type SpecsFormValues = z.infer<typeof specsShema>;
