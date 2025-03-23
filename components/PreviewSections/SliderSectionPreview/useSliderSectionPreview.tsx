import { useMemo, useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { SectionSlider } from "@/shared/types";
import { editLayoutConfigActions } from "@/store/EditLayoutConfig/reducer";
import { layoutConfigActions } from "@/store/LayoutConfigReducer";
import { useContainerSize } from "@/hook";
import Autoplay from "embla-carousel-autoplay"

const EMPTY_PLACEHOLDER_SECTION_TITLE = "Lorem Ipsum";

export const useSliderSectionPreview = ({
  sectionData,
  previewMode,
  containerWidth
}: {
  sectionData: SectionSlider,
  previewMode: boolean,
  containerWidth?: number | null
}) => {
  const divRef = useRef(null);
  const plugin = useRef(
    Autoplay({ delay: 2000, })
  )
  const {size} = useContainerSize({divRef})
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const sectionTitlePreview = useMemo(() => {
    return sectionData?.sectionTitle ? sectionData?.sectionTitle : EMPTY_PLACEHOLDER_SECTION_TITLE;
  }, [sectionData?.sectionTitle])


  const showOutline = useMemo(() => {
    return previewMode || isHovered
  }, [
    previewMode,
    isHovered
  ])

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = () => {
    setIsHovered(false);
  }

  const imgWidth = useMemo(() => {
    const sliderCoefficientType = sectionData?.centralMode ? 1 : 3;
    if (size?.width) {
      return Math.round(size?.width / sliderCoefficientType);
    }

    return containerWidth ? Math.round(containerWidth / sliderCoefficientType) : 0;
  }, [size?.width, containerWidth, sectionData?.centralMode])

  const imgHeight = useMemo(() => {
    if (sectionData?.centralMode) {
      return 250;
    }

    return 70;
  }, [sectionData?.centralMode])

  const onEditHandler = useCallback(() => {
    dispatch(editLayoutConfigActions.setEditSection({...sectionData}));
    dispatch(editLayoutConfigActions.setOpenEditModal(true));
  }, [sectionData, dispatch])

  const onDelateHandler = useCallback(() => {
    if (sectionData.id) {
      dispatch(layoutConfigActions?.delateSection(sectionData.id))
    }
  }, [sectionData?.id, dispatch])

  return {
    sectionTitlePreview,
    showOutline,
    isHovered,
    mouseEnterHandler,
    mouseLeaveHandler,
    onEditHandler,
    onDelateHandler,
    imgWidth,
    divRef,
    plugin,
    imgHeight
  }
}