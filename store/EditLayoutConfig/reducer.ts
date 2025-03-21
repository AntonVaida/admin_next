import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/shared/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { 
  SectionBanner, 
  SectionGrid, 
  SectionSlider, 
  SectionText 
} from "@/shared/types";

type State = RootState['editLayoutConfig'];

const initialState: State = {
  editSection: null,
  openEditModal: false,
};

const { reducer, actions } = createSlice({
  name: "editLayoutConfig",
  initialState,
  reducers: {
    setEditSection: (state, { payload }: PayloadAction<SectionBanner | SectionGrid | SectionSlider | SectionText | null>) => {
      state.editSection = payload;
    },
    setOpenEditModal: (state, { payload }: PayloadAction<boolean>) => {
      state.openEditModal = payload;
    }
  }
})

export const editLayoutConfigReducer = reducer;
export const editLayoutConfigActions = {
  ...actions
}