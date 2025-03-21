import { SectionsType } from "./SectionsType"

export interface GridItem {
  id?: string, 
  title: string, 
  thumbnailHref: string, 
  order: number,
  redirectHref: string
}

export interface SectionGrid {
  id?: string,
  sectionTitle: string,
  sectionOrder: number,
  type: SectionsType,
  gridItems: GridItem[],
}