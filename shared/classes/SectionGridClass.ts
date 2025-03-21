import { v4 as uuidv4 } from 'uuid';
import { SectionsType, GridItem } from '../types';

export const getGridItem = (order: number) => ({
  id: uuidv4(), 
  title: "", 
  thumbnailHref: "",
  redirectHref: "",
  order
})

export class SectionGridClass {
  id?: string;
  sectionTitle: string;
  sectionOrder: number;
  gridItems: GridItem[];

  type = SectionsType.grid
  constructor({
  id = uuidv4(),
  sectionTitle = "",
  sectionOrder,
  gridItems = [
    getGridItem(0),
    getGridItem(1),
    getGridItem(2),
    getGridItem(3),
  ]
  }: {
    id?: string,
    sectionTitle?: string,
    sectionOrder: number,
    gridItems?: GridItem[],
    redirectHref?: string | null
  }) {
    this.id = id;
    this.sectionTitle = sectionTitle;
    this.sectionOrder = sectionOrder;
    this.gridItems = gridItems;
  }
}