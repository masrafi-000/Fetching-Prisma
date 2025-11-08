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
