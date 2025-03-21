import { z } from "zod";
import { SectionsType } from "@/shared/types";

export const schema = z.object({
  id: z.string().optional(),
  sectionTitle: z.string().min(1, "Section title is required"),
  sectionOrder: z.number().optional(),
  sectionHeight: z.number(),
  type: z.nativeEnum(SectionsType).optional(),
  subTitle: z.string().min(1, "Subtitle is required"),
  text: z.string().min(1, "Text is required"),
  sectionBackgroundColor: z.string().optional(),
});

export type ValidationSchema = z.infer<typeof schema>;