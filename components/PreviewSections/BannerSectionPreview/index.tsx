import Image from "next/image"
import { SectionBanner, ImgOrientation } from "@/shared/types"
import { useBannerSectionPreview } from "./useBannerSectionPreview"
import { PreviewCardHoc } from "@/hoc"

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
    <PreviewCardHoc
      mouseEnterHandler={mouseEnterHandler}
      mouseLeaveHandler={mouseLeaveHandler}
      onEditHandler={onEditHandler}
      onDelateHandler={onDelateHandler}
      isHovered={isHovered}
      previewMode={previewMode}
    >
      <div 
        className={`min-h-[150px] px-[16px] py-[8px] bg-white rounded-2xl ${showOutline ? "border-blue-500" : "border-transparent"} relative border-[1px] border-solid`}
        style={{
          width: containerWidth ? containerWidth : "100%"
        }}
        ref={divRef}
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
              <div 
                className="flex justify-center items-center shrink-0  bg-black"
                style={{
                  width: imgWidth,
                  height: 70,
                  overflow: 'hidden',
                  borderRadius: '12px'
                }}
              >
                  <Image 
                    className="object-cover w-full h-full"
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
            ) : null }
            <div>
              <h4 className="font-helvetica text-[8px] text-gray font-semibold line-clamp-6">
                {textPreview}
              </h4>
            </div>
            {sectionData?.imgOrientation === ImgOrientation.right ? (
              <div 
                className="flex justify-center items-center shrink-0 bg-black"
                style={{
                  width: imgWidth,
                  height: 70,
                  overflow: 'hidden',
                  borderRadius: '12px'
                }}
              >
                <Image 
                  className="object-cover w-full h-full"
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
            ) : null }
          </div>
        </div>
      </div>
    </PreviewCardHoc>
  )
}