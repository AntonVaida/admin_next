import { SectionsType } from "./SectionsType";

export interface SectionText {
  id?: string,
  sectionTitle: string,
  sectionOrder: number,
  type: SectionsType,
  subTitle: string,
  text: string,
}