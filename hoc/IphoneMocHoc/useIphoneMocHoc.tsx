"use client"
import { useRef, useMemo, RefObject } from "react"
import { useContainerSize } from "@/hook"

const COEF_CONST = {
  MAIN_CONTAINER_HEIGHT_COEF: 0.765,
  MAIN_CONTAINER_WIDTH_COEF:  0.38,
  MAIN_CONTAINER_RADIUS_COEF: 0.065,
  CHILD_CONTAINER_HEIGHT_COEF: 0.738,
  CHILD_CONTAINER_WIDTH_COEF: 0.354,
  CHILD_CONTAINER_RADIUS_COEF: 0.0497,
  DYNAMIC_ISLAND_HEIGHT_COEF: 0.0283,
  DYNAMIC_ISLAND_TOP_COEF:  0.0191
}

export const useIphoneMocHoc = ({divRefContainer} : {divRefContainer?: RefObject<HTMLDivElement | null>}) => {
  const divRef = useRef(null)
  const { size } = useContainerSize({ divRef: divRefContainer ? divRefContainer : divRef })

  const mocSize = useMemo(() => {
    if (size?.height) {
      return {
        mocContainer: {
          width: Math.round(size?.height * COEF_CONST.MAIN_CONTAINER_WIDTH_COEF),
          height:  Math.round(size?.height * COEF_CONST.MAIN_CONTAINER_HEIGHT_COEF),
          borderRadius: Math.round(size?.height * COEF_CONST.MAIN_CONTAINER_RADIUS_COEF)
        },
        childContainer: {
          height: Math.round(size?.height * COEF_CONST.CHILD_CONTAINER_HEIGHT_COEF),
          width: Math.round(size?.height * COEF_CONST.CHILD_CONTAINER_WIDTH_COEF),
          borderRadius: Math.round(size?.height * COEF_CONST.CHILD_CONTAINER_RADIUS_COEF)
        },
        dynemicIsland: {
          height: Math.round(size?.height * COEF_CONST.DYNAMIC_ISLAND_HEIGHT_COEF),
          top: Math.round(size?.height * COEF_CONST.DYNAMIC_ISLAND_TOP_COEF),
        },
      }
    }

    return null
  }, [size?.height])


  return {
    mocSize,
    divRef
  }
}