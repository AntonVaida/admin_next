import { useMemo, useState, useCallback } from "react"
import { SectionText } from "@/shared/types"
import { useDispatch } from "react-redux";
import { editLayoutConfigActions } from "@/store/EditLayoutConfig/reducer";
import { layoutConfigActions } from "@/store/LayoutConfigReducer";

const EMPTY_PLACEHOLDER_SECTION_TITLE = "Lorem Ipsum";
const EMPTY_PLACEHOLDER_SECTION_SUB_TITLE = "Lorem Ipsum is simply dummy";
const EMPTY_PLACEHOLDER_SECTION_TEXT = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

export const useTextSectionPreview = ({
  sectionData,
  previewMode
}: {
  sectionData: SectionText,
  previewMode: boolean
}) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const sectionTitlePreview = useMemo(() => {
    return sectionData?.sectionTitle ? sectionData?.sectionTitle : EMPTY_PLACEHOLDER_SECTION_TITLE;
  }, [sectionData?.sectionTitle])

  const subTitlePreview = useMemo(() => {
    return sectionData?.subTitle ? sectionData?.subTitle : EMPTY_PLACEHOLDER_SECTION_SUB_TITLE;
  }, [sectionData?.subTitle])

  const textPreview = useMemo(() => {
    return sectionData?.text ? sectionData.text : EMPTY_PLACEHOLDER_SECTION_TEXT;
  }, [sectionData?.text])

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
  }, [sectionData])

  const onDelateHandler = useCallback(() => {
    if (sectionData.id) {
      dispatch(layoutConfigActions?.delateSection(sectionData.id))
    }
  }, [sectionData?.id])

  return {
    sectionTitlePreview,
    subTitlePreview,
    textPreview,
    showOutline,
    isHovered,
    mouseEnterHandler,
    mouseLeaveHandler,
    onEditHandler,
    onDelateHandler
  }
}