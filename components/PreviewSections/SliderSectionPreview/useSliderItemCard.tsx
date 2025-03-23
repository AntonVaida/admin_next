import { useMemo } from "react"
import { SliderItem } from "@/shared/types"
import { checkValidUrl } from "@/utils";

const EMPTY_PLACEHOLDER_SECTION_SUB_TITLE = "Lorem Ipsum";
const EMPTY_PLACEHOLDER_SECTION_IMG_URL = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="

export const useSliderItemCard = ({
  sliderItemData, 
}: {
  sliderItemData: SliderItem, 
}) => {
  const thumbnailHrefPreview = useMemo(() => {
    return sliderItemData?.thumbnailHref && checkValidUrl(sliderItemData?.thumbnailHref) ? sliderItemData?.thumbnailHref : EMPTY_PLACEHOLDER_SECTION_IMG_URL
  }, [sliderItemData?.thumbnailHref])

  const textPreview = useMemo(() => {
    return sliderItemData?.title ? sliderItemData?.title : EMPTY_PLACEHOLDER_SECTION_SUB_TITLE;
  }, [sliderItemData?.title])


  return {
    thumbnailHrefPreview,
    textPreview
  }
}