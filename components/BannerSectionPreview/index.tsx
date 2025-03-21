import Image from "next/image"
import { EditIcon, TrashIcon } from "@/shared"
import { SectionBanner, ImgOrientation } from "@/shared/types"
import { useBannerSectionPreview } from "./useBannerSectionPreview"

export const BannerSectionPreview = ({
  sectionData,
  previewMode = false,
  containerWidth
}: {
  sectionData: SectionBanner,
  previewMode?: boolean,
  containerWidth?: number | null
}) => {
  const {
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
    thumbnailHrefPreview
  } = useBannerSectionPreview({sectionData, previewMode, containerWidth})

  return (
    <div
      ref={divRef}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      className={`min-h-[150px] px-[16px] py-[8px] bg-white rounded-2xl ${showOutline ? "border-blue-500" : "border-transparent"} relative border-[1px] border-solid`}
      style={{
        width: containerWidth ? containerWidth : "100%"
      }}
    >
      <div className="mb-[8px]">
        <h2 className="font-helvetica text-[16px] text-gray font-bold">
          {sectionTitlePreview}
        </h2>
      </div>
      <div className="overflow-hidden max-h-[100%]">
        <div className="mb-[8px]">
          <h3 className="font-helvetica text-[12px] text-gray font-bold">
            {subTitlePreview}
          </h3>
        </div>
        <div className="flex justify-between items-center gap-[16px]">
          {sectionData?.imgOrientation === ImgOrientation.left ? (
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
          ) : null }
          <div>
            <h4 className="font-helvetica text-[8px] text-gray font-semibold line-clamp-6">
              {textPreview}
            </h4>
          </div>
          {sectionData?.imgOrientation === ImgOrientation.right ? (
            <Image 
              className="rounded-xl" 
              style={{
                width: imgWidth,
                height: 70
              }} 
              src={thumbnailHrefPreview} 
              width={imgWidth} 
              height={110} 
              alt={"Wrong thumbnail URL"}
              onError={(error: unknown) => console.log("Wrong thumbnail URL", error)}
             />
          ) : null }
        </div>
      </div>
      {!previewMode && isHovered ? (
        <>
          <button 
            className="w-[20px] h-[20px] rounded-full bg-slate-300 border-0 flex justify-center items-center absolute top-[-10px] left-[20px] transform hover:scale-150 transition duration-200"
            onClick={onEditHandler}
          >
            <div className="w-[12px] h-[12px] flex justify-center items-center">
              <EditIcon />
            </div>
          </button>
          <button 
            className="w-[20px] h-[20px] rounded-full bg-slate-300 border-0 flex justify-center items-center absolute top-[-10px] right-[20px] transform hover:scale-150 transition duration-200"
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