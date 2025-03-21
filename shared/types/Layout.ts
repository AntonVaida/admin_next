import { SectionsType } from "./SectionsType";

export interface ILayout {
  title: string;
  isActive: boolean;
  sections: SectionsType | null
}