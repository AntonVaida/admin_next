import { SliderItem, SectionsType } from "../types"
import { v4 as uuidv4 } from 'uuid';

export const getEmptySliderItem = (order: number):SliderItem => ({
  id: uuidv4(),
  title: "",
  description: "",
  thumbnailHref: "",
  redirectHref: "",
  order
})

export class SectionSliderClass {
  id?: string;
  sectionTitle: string;
  sectionOrder: number;
  centralMode: boolean;
  slideItems: SliderItem[]

  type = SectionsType.slider;
  constructor({
    id = uuidv4(),
    sectionTitle = "",
    sectionOrder,
    centralMode = false,
    slideItems = [
      getEmptySliderItem(0), 
      getEmptySliderItem(1), 
      getEmptySliderItem(2),
      getEmptySliderItem(3),
      getEmptySliderItem(4),
    ]
  }: {
    id?: string,
    sectionTitle?: string,
    sectionOrder: number,
    centralMode?: boolean,
    slideItems?: SliderItem[]
  }) {
    this.id = id;
    this.sectionTitle = sectionTitle;
    this.sectionOrder = sectionOrder;
    this.centralMode = centralMode;
    this.slideItems = slideItems;
  }
}