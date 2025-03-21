import { z } from "zod";
import { SectionsType } from "@/shared/types";

const slideItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  thumbnailHref: z.string().url("Thumbnail must be a valid URL"),
  redirectHref: z.string().min(1, "Redirect URL is required"),
  order: z.number().optional(),
});

export const schema = z.object({
  id: z.string().optional(),
  sectionTitle: z.string().min(1, "Section title is required"),
  sectionOrder: z.number().optional(),
  type: z.nativeEnum(SectionsType).optional(),
  centralMode: z.boolean(),
  slideItems: z.array(slideItemSchema).min(5, "At least 5 slide item is required"),
});

export type ValidationSchema = z.infer<typeof schema>;
