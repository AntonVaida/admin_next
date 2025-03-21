import { useRef, useMemo } from "react"
import { useContainerSize } from "@/hook"
import { useSelector } from "react-redux"
import { getSections } from "@/store/LayoutConfigReducer"
import { getLoading } from "@/store/LayoutConfigReducer"

const paddingWrapperConfig = {
  horizontal: 8,
  vertical: "4vh"
}

export const usePreviewMocWrapper = () => {
  const divRef = useRef(null)
  const { size } = useContainerSize({divRef})
  const sectionList = useSelector(getSections);
  const isLoading = useSelector(getLoading);

  const containerWidth = useMemo(() => {
    if (size?.width) {
      return size?.width  
    }

    return null;
  }, [size?.width])

  return {
    sectionList,
    divRef,
    containerWidth,
    paddingWrapperConfig,
    isLoading
  }
}