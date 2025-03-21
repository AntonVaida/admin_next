"use client"
import React, {RefObject} from "react"
import { IphoneFrontImage, DynemicIslandImage } from "@/shared"
import { useIphoneMocHoc } from "./useIphoneMocHoc"

export const IphoneMocHoc = ({
  children, 
  divRefContainer
}: {
  children: React.ReactNode, 
  divRefContainer?: RefObject<HTMLDivElement | null>
}) => {
  const { 
    mocSize,
    divRef
  } = useIphoneMocHoc({divRefContainer})
  
  return (
    <div 
      ref={divRef} 
      className="flex justify-center items-center"
      style={{
        height: divRefContainer ? 'auto' : '100%'
      }}
    >
      {mocSize ? (
        <div 
          className="relative shadow-gray-700 shadow-2xl" 
          style={{
            height: mocSize?.mocContainer?.height,
            width: mocSize?.mocContainer?.width,
            borderRadius: mocSize?.mocContainer?.borderRadius
          }}
        >
          <div className="transform -translate-x-[2px]">
            <IphoneFrontImage height={mocSize?.mocContainer?.height} />
          </div>
          <div 
            className="absolute top-[1.5%] left-[3.4%] overflow-hidden overflow-y-scroll custom-scroll"         
            style={mocSize?.childContainer}
          >
            {children}
          </div>
          <div 
            className="absolute left-[50%] transform -translate-x-1/2"
            style={{
              top: mocSize?.dynemicIsland?.top
            }}
          >
            <DynemicIslandImage height={mocSize?.dynemicIsland?.height} />
        </div>
        </div>
      ) : null}
    </div>
  )
}