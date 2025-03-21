import { SectionsType } from "./SectionsType"

export interface SliderItem {
  id?: string,
  title: string,
  description: string,
  thumbnailHref: string,
  redirectHref: string,
  order: number
};

export interface SectionSlider {
  id?: string,
  sectionTitle: string,
  sectionOrder: number,
  type: SectionsType,
  centralMode: boolean,
  slideItems: SliderItem[]
}