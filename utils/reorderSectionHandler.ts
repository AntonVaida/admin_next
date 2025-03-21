import { SectionBanner, SectionGrid, SectionSlider, SectionText } from "@/shared/types"

export const reorderSectionHandler = ({
  sectionList,
  targetItem,
  draggableItem
}: {
  sectionList: (SectionBanner | SectionGrid | SectionSlider | SectionText)[],
  targetItem: SectionBanner | SectionGrid | SectionSlider | SectionText,
  draggableItem: SectionBanner | SectionGrid | SectionSlider | SectionText,
}) => {
  const targetIndex = sectionList.findIndex(section => section?.id === targetItem?.id);
  const filteredSectionList = [...sectionList].filter(section => section?.id !== draggableItem?.id);
  filteredSectionList.splice(targetIndex, 0, draggableItem);

  return filteredSectionList?.map((section, index) => ({
    ...section,
    sectionOrder: index
  }))?.sort((sectionA, sectionB) => sectionA.sectionOrder - sectionB.sectionOrder);
}