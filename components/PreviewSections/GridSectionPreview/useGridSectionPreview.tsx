import { useRef, useState, useMemo, useCallback } from "react";
import { SectionGrid } from "@/shared/types"
import { useContainerSize } from "@/hook";
import { layoutConfigActions } from "@/store/LayoutConfigReducer";
import { editLayoutConfigActions } from "@/store/EditLayoutConfig/reducer";
import { useDispatch } from "react-redux";

const EMPTY_PLACEHOLDER_SECTION_TITLE = "Lorem Ipsum";

export const useGridSectionPreview = ({
  sectionData,
  previewMode,
  containerWidth
}: {
  sectionData: SectionGrid,
  previewMode: boolean,
  containerWidth?: number | null
}) => {
  const divRef = useRef(null);
  const {size} = useContainerSize({divRef})
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const sectionTitlePreview = useMemo(() => {
    return sectionData?.sectionTitle ? sectionData?.sectionTitle : EMPTY_PLACEHOLDER_SECTION_TITLE;
  }, [sectionData?.sectionTitle]);

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

  const onEditHandler = useCallback(() => {
    dispatch(editLayoutConfigActions.setEditSection({...sectionData}));
    dispatch(editLayoutConfigActions.setOpenEditModal(true));
  }, [sectionData, dispatch])

  const onDelateHandler = useCallback(() => {
    if (sectionData.id) {
      dispatch(layoutConfigActions?.delateSection(sectionData.id))
    }
  }, [sectionData?.id, dispatch])

  const imgWidth = useMemo(() => {
    if (size?.width) {
      return Math.round(size?.width / 2 - 8);
    }

    return containerWidth ? Math.round(containerWidth / 2 - 32) : 0;
  }, [size?.width, containerWidth,])

  return {
    sectionTitlePreview,
    showOutline,
    mouseEnterHandler,
    mouseLeaveHandler,
    onEditHandler,
    onDelateHandler,
    isHovered,
    divRef,
    imgWidth
  }
}