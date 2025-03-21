import { ImgOrientation } from "../types";
import { SectionsType } from "../types";
import { v4 as uuidv4 } from 'uuid';

export class SectionBannerClass {
  id?: string;
  sectionTitle: string;
  sectionOrder: number;
  subTitle?: string;
  text?: string;
  thumbnailHref: string;
  imgOrientation: ImgOrientation;

  type = SectionsType.banner;
  constructor({
    id = uuidv4(),
    sectionTitle = "",
    sectionOrder,
    subTitle = "",
    text = "",
    thumbnailHref = "",
    imgOrientation = ImgOrientation.left,
  }: {
    id?: string,
    sectionTitle?: string;
    sectionOrder: number;
    sectionHeight?: number;
    subTitle?: string;
    text?: string;
    thumbnailHref?: string;
    imgOrientation?: ImgOrientation;
    onlyImgMode?: boolean;
    sectionBackgroundColor?: string;
  }
  ) {
    this.id = id;
    this.sectionTitle = sectionTitle;
    this.sectionOrder = sectionOrder;
    this.subTitle = subTitle;
    this.text = text;
    this.thumbnailHref = thumbnailHref;
    this.imgOrientation = imgOrientation;
  }
}