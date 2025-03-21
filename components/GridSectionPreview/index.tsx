import { SectionGrid, GridItem } from "@/shared/types"
import { EditIcon, TrashIcon } from "@/shared"
import { useGridSectionPreview } from "./useGridSectionPreview"
import { useGridSectionItem } from "./useGridSectionItem"
import Image from "next/image"


const GridSectionItem = ({itemData, imgWidth}: {itemData: GridItem, imgWidth: number}) => {
  const {
    thumbnailHrefPreview,
    textPreview
  } = useGridSectionItem({itemData});

  return (
    <div>
      <div 
        className="mb-[8px]"
        style={{
          width: imgWidth,
          height: 70
        }}
      >
        <Image 
          className="rounded-xl" 
          style={{
            width: imgWidth,
            height: 70
          }} 
          src={thumbnailHrefPreview} 
          width={imgWidth} 
          height={70} 
          alt={"Wrong thumbnail URL"}
          onError={(error: unknown) => console.log("Wrong thumbnail URL", error)}
        />
      </div>
      <div className="flex justify-center items-center">
        <h3 className="font-helvetica text-[8px] text-gray font-bold">
          {textPreview}
        </h3>
      </div>
    </div>
  )
}

export const GridSectionPreview = ({
  sectionData,
  previewMode = false,
  containerWidth
}: {
  sectionData: SectionGrid,
  previewMode?: boolean,
  containerWidth?: number | null
}) => {
  const {
    sectionTitlePreview,
    showOutline,
    mouseEnterHandler,
    mouseLeaveHandler,
    onEditHandler,
    onDelateHandler,
    isHovered,
    divRef,
    imgWidth
  } = useGridSectionPreview({  
    sectionData,
    previewMode,
    containerWidth
  });

  return (
    <div
      className="relative"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div
        className={`min-h-[150px] px-[16px] py-[8px] bg-white rounded-2xl ${showOutline ? "border-blue-500" : "border-transparent"} border-[1px] border-solid overflow-hidden`}
        style={{
          width: containerWidth ? containerWidth : "100%",
        }}
      >
        <div className="mb-[8px]">
          <h2 className="font-helvetica text-[16px] text-gray font-bold">
            {sectionTitlePreview}
          </h2>
        </div>
        <div ref={divRef} className="mb-[8px] grid grid-cols-2 gap-[8px]">
         {sectionData?.gridItems?.map((gridItem, index) => (
          <GridSectionItem key={index} itemData={gridItem} imgWidth={imgWidth} />
         ))}
        </div>
      </div>
      {!previewMode && isHovered ? (
        <>
          <button 
            className="w-[20px] h-[20px] rounded-full bg-slate-300 border-0 flex justify-center items-center absolute top-[-10px] left-[20px] transform hover:scale-150 transition duration-200 z-1000"
            onClick={onEditHandler}
          >
            <div className="w-[12px] h-[12px] flex justify-center items-center">
              <EditIcon />
            </div>
          </button>
          <button 
            className="w-[20px] h-[20px] rounded-full bg-slate-300 border-0 flex justify-center items-center absolute top-[-10px] right-[20px] transform hover:scale-150 transition duration-200 z-1000"
            onClick={onDelateHandler}
          >
            <div className="w-[12px] h-[12px] flex justify-center items-center">
              <TrashIcon />
            </div>
          </button>
        </>
      ) : null}
    </div>
  )
}