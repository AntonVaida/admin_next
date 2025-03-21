import { z } from "zod";
import { SectionsType } from "@/shared/types";

const gridItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  thumbnailHref: z.string().url("Thumbnail must be a valid URL"),
  redirectHref: z.string().min(1, "Redirect URL is required"),
  order: z.number().optional(),
});

export const schema = z.object({
  id: z.string().optional(),
  sectionTitle: z.string().min(1, "Section title is required"),
  sectionOrder: z.number().optional(),
  type: z.nativeEnum(SectionsType).optional(),
  gridItems: z.array(gridItemSchema).min(4, "At least 4 grid items are required"),
});

export type ValidationSchema = z.infer<typeof schema>;
