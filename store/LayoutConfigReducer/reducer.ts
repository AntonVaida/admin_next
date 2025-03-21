import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/shared/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { 
  SectionBanner, 
  SectionGrid, 
  SectionSlider, 
  SectionText,
} from "@/shared/types";
import { current } from 'immer';
import { reorderSectionHandler } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { layoutsApi } from "@/shared/api";

type State = RootState['layoutConfig'];

const initialState: State = {
  activeLayoutId: null,
  sections: [],
  loading: false
};

const getActiveLayout = createAsyncThunk(
  'layoutConfig/getActiveLayout',
  async (_, { dispatch }) => {
    try {
      dispatch(layoutConfigActions.setLoading(true));
      const data = await layoutsApi.getActiveLayout();
      
      if (data?.sections?.length) {
        const sectionsList: State['sections'] = data?.sections
        const sortedData = sectionsList?.sort((sectionA, sectionB) => sectionA.sectionOrder - sectionB.sectionOrder)
        dispatch(layoutConfigActions.setSections({sections: sortedData}))
        dispatch(layoutConfigActions.setActiveLayoutId(data?._id))
      }
      
    } catch (e) {
      console.error("ERROR", e)
    } finally {
      dispatch(layoutConfigActions.setLoading(false));
    }
  }
)

const createLayout = createAsyncThunk(
  'layoutConfig/createLayout',
  async (_, { dispatch, getState }) => {
    try {
      dispatch(layoutConfigActions.setLoading(true))
      const state = getState() as RootState;
      const layoutData = state?.layoutConfig?.sections;
      let data = null;

      if (layoutData?.length) {
        data = await layoutsApi.createLayout({ layoutData });
      }
      
      if (data?.sections?.length) {
        dispatch(layoutConfigActions.setSections({sections: data?.sections}))
        dispatch(layoutConfigActions.setActiveLayoutId(data?._id))
      }
      
    } catch (e) {
      console.error("ERROR", e)
    } finally {
      dispatch(layoutConfigActions.setLoading(false));
    }
  }
)

const updateLayout = createAsyncThunk(
  'layoutConfig/updateLayout',
  async (_, { dispatch, getState }) => {
    try {
      dispatch(layoutConfigActions.setLoading(true))
      const state = getState() as RootState;
      
      const currentActiveLayoutId = state?.layoutConfig?.activeLayoutId;
      const layoutData = state?.layoutConfig?.sections;

      let data = null
      if (currentActiveLayoutId) {
        data = await layoutsApi.updateLayout({ activeLayoutId: currentActiveLayoutId,  layoutData });
      }

      
      if (data?.sections?.length) {
        dispatch(layoutConfigActions.setSections({sections: data?.sections}))
        dispatch(layoutConfigActions.setActiveLayoutId(data?.id))
      }
      
    } catch (e) {
      console.error("ERROR", e)
    } finally {
      dispatch(layoutConfigActions.setLoading(false));
    }
  }
)

const { reducer, actions } = createSlice({
  name: "layoutConfig",
  initialState,
  reducers: {
    setActiveLayoutId: (state, { payload }: PayloadAction<string | null>) => {
      state.activeLayoutId = payload
    },
    setSections: (state, { payload }: PayloadAction<{
      sections: (SectionBanner | SectionGrid | SectionSlider | SectionText)[]
    }>) => {
      state.sections = payload.sections
    },
    delateSection: (state, { payload }: PayloadAction<string>) => {
      const filteredSectionList = state?.sections?.filter(section => section?.id !== payload);
      state.sections = filteredSectionList
    },
    editSection: (state, { payload }: PayloadAction<SectionBanner | SectionGrid | SectionSlider | SectionText>) => {
      const updatedSectionList = [...state.sections.filter(section => section?.id !== payload?.id), payload]?.sort((sectionA, sectionB) => sectionA.sectionOrder - sectionB.sectionOrder);
      state.sections = updatedSectionList;
    },
    dragAndDrop: (state, { payload }: PayloadAction<{
      draggableItem: SectionBanner | SectionGrid | SectionSlider | SectionText,
      targetItem: SectionBanner | SectionGrid | SectionSlider | SectionText
    }>) => {
      const sectionList = current(state.sections);
      const updatedSectionList = reorderSectionHandler({
        sectionList, 
        targetItem: payload?.targetItem, 
        draggableItem: payload?.draggableItem 
      })

      state.sections = updatedSectionList;
    },
    addSection: (state, { payload }: PayloadAction<SectionBanner | SectionGrid | SectionSlider | SectionText>) => {
      state.sections = [...state.sections, payload]
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    }
  }
})

export const layoutConfigReducer = reducer;
export const layoutConfigActions = {
  ...actions,
  getActiveLayout,
  createLayout,
  updateLayout
};