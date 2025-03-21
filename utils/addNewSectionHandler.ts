import { Dispatch } from "@reduxjs/toolkit";
import { editLayoutConfigActions } from "@/store/EditLayoutConfig/reducer";
import { SectionBanner, SectionGrid, SectionSlider, SectionText  } from "@/shared/types";

export const addNewSectionHandler = ({ 
  emptyData,
  dispatch,
  handleModalClose
}: { 
  emptyData: SectionBanner | SectionGrid | SectionSlider | SectionText,
  dispatch:  Dispatch,
  handleModalClose?: () => void
}) => {

  dispatch(editLayoutConfigActions.setEditSection({...emptyData}));
  dispatch(editLayoutConfigActions.setOpenEditModal(true));

  if (handleModalClose) {
    handleModalClose();
  }
}