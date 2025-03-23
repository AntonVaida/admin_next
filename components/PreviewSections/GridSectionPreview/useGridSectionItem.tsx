import { useMemo } from "react";
import { GridItem } from "@/shared/types"
import { checkValidUrl } from "@/utils";

const EMPTY_PLACEHOLDER_SECTION_SUB_TITLE = "Lorem Ipsum";
const EMPTY_PLACEHOLDER_SECTION_IMG_URL = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="

export const useGridSectionItem = ({itemData}: {itemData: GridItem}) => {
  const thumbnailHrefPreview = useMemo(() => {
    return itemData?.thumbnailHref && checkValidUrl(itemData?.thumbnailHref) ? itemData?.thumbnailHref : EMPTY_PLACEHOLDER_SECTION_IMG_URL
  }, [itemData?.thumbnailHref])

  const textPreview = useMemo(() => {
    return itemData?.title ? itemData?.title : EMPTY_PLACEHOLDER_SECTION_SUB_TITLE;
  }, [itemData?.title])

  return {
    thumbnailHrefPreview,
    textPreview
  }
}