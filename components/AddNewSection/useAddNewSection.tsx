import { useCallback } from "react";
import { 
  SliderIcon, 
  ImageIndentLeftIcon, 
  GridImageIcon, 
  TextIcon  
} from "@/shared"
import { useDispatch, useSelector } from "react-redux"
import { SectionBannerClass, SectionGridClass, SectionSliderClass, SectionTextClass } from "@/shared/classes";
import { addNewSectionHandler } from "@/utils";
import { getSections, getActiveLayoutId } from "@/store/LayoutConfigReducer";
import { AppDispatch } from "@/store";
import { layoutConfigActions } from "@/store/LayoutConfigReducer";
import { getLoading } from "@/store/LayoutConfigReducer";


export const useAddNewSection = ({ handleModalClose }: { handleModalClose?: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const sectionList = useSelector(getSections);
  const activeLayoutId = useSelector(getActiveLayoutId);
  const isLoading = useSelector(getLoading);

  const buttonListConfig = [
    {
      ButtonIcon: SliderIcon, 
      title: "Slider", 
      onClick: () => { 
        const emptySectionSliderData = new SectionSliderClass({sectionOrder: sectionList?.length});
        addNewSectionHandler({emptyData: {...emptySectionSliderData}, dispatch, handleModalClose})
      }
    },
    {
      ButtonIcon: ImageIndentLeftIcon, 
      title: "Banner", 
      onClick: () => { 
        const emptySectionBannerData = new SectionBannerClass({sectionOrder: sectionList?.length});
        addNewSectionHandler({emptyData: {...emptySectionBannerData}, dispatch, handleModalClose})
      }
    },
    {
      ButtonIcon: GridImageIcon, 
      title: "Grid", 
      onClick: () => { 
        const emptySectionGridData = new SectionGridClass({sectionOrder: sectionList?.length});
        addNewSectionHandler({emptyData: {...emptySectionGridData}, dispatch, handleModalClose})
      }
    },
    {
      ButtonIcon: TextIcon, 
      title: "Text", 
      onClick: () => { 
        const emptySectionTextData = new SectionTextClass({sectionOrder: sectionList?.length});
        addNewSectionHandler({emptyData: {...emptySectionTextData}, dispatch, handleModalClose})
      }
    },
  ]

  const saveLayoutHandler = useCallback(() => {
    if (!activeLayoutId) {
      dispatch(layoutConfigActions.createLayout());

      return;
    }

    dispatch(layoutConfigActions.updateLayout());
  }, [activeLayoutId])

  return {
    buttonListConfig,
    saveLayoutHandler,
    isLoading
  }
}