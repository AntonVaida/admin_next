import { useMemo, useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { SectionBanner } from "@/shared/types";
import { editLayoutConfigActions } from "@/store/EditLayoutConfig/reducer";
import { layoutConfigActions } from "@/store/LayoutConfigReducer";
import { useContainerSize } from "@/hook";
import { checkValidUrl } from "@/utils";

const EMPTY_PLACEHOLDER_SECTION_TITLE = "Lorem Ipsum";
const EMPTY_PLACEHOLDER_SECTION_SUB_TITLE = "Lorem Ipsum is simply dummy";
const EMPTY_PLACEHOLDER_SECTION_TEXT = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
const EMPTY_PLACEHOLDER_SECTION_IMG_URL = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="

export const useBannerSectionPreview = ({
  sectionData,
  previewMode,
  containerWidth
}: {
  sectionData: SectionBanner,
  previewMode: boolean,
  containerWidth?: number | null
}) => {
  const divRef = useRef(null)
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const {size} = useContainerSize({divRef})

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

  const thumbnailHrefPreview = useMemo(() => {
    return sectionData?.thumbnailHref && checkValidUrl(sectionData?.thumbnailHref) ? sectionData?.thumbnailHref : EMPTY_PLACEHOLDER_SECTION_IMG_URL
  }, [sectionData?.thumbnailHref])

  const imgWidth = useMemo(() => {
    if (size?.width) {
      return Math.round(size?.width / 3);
    }

    return containerWidth ? Math.round(containerWidth / 3) : 0;
  }, [size?.width, containerWidth])

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

  return {
    sectionTitlePreview,
    subTitlePreview,
    textPreview,
    showOutline,
    isHovered,
    mouseEnterHandler,
    mouseLeaveHandler,
    onEditHandler,
    onDelateHandler,
    divRef,
    imgWidth,
    thumbnailHrefPreview,
  }
}