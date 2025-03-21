import { SectionsType } from "../types";
import { v4 as uuidv4 } from 'uuid';

export class SectionTextClass {
  id: string;
  sectionTitle: string;
  sectionOrder: number;
  subTitle: string;
  text: string;

  type = SectionsType.text;
  constructor ({
    id = uuidv4(),
    sectionTitle = "",
    sectionOrder,
    subTitle = "",
    text = "",
  }: {
    id?: string,
    sectionTitle?: string,
    sectionOrder: number,
    subTitle?: string,
    text?: string,
  }) {
    this.id = id;
    this.sectionTitle = sectionTitle;
    this.sectionOrder = sectionOrder;
    this.subTitle = subTitle;
    this.text = text;
  }
}