import { SectionsType } from "./SectionsType";

export enum ImgOrientation {
  left = "LEFT",
  right = "RIGHT",
}

export interface SectionBanner {
  id?: string,
  sectionTitle: string,
  sectionOrder: number,
  type: SectionsType,
  subTitle?: string,
  text?: string,
  thumbnailHref: string,
  imgOrientation: ImgOrientation,
}