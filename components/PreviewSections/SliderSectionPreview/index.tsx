import { SectionSlider, SliderItem } from "@/shared/types"
import Image from "next/image"
import { useSliderSectionPreview } from "./useSliderSectionPreview"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useSliderItemCard } from "./useSliderItemCard"
import { PreviewCardHoc } from "@/hoc"

const SliderItemCard = ({
  sliderItemData,
  imgWidth,
  centralMode,
  imgHeight
}: {
  sliderItemData: SliderItem, 
  imgWidth: number,
  centralMode: boolean,
  imgHeight: number
}) => {
  const {
    thumbnailHrefPreview,
    textPreview
  } = useSliderItemCard({sliderItemData});

  return (
    <div className={`w-full flex flex-col justify-center items-center relative ${centralMode ? "rounded-2xl" : "rounded-lg"}`}>
      <div style={{
        height: imgHeight,
      }}>
        <Image 
          className={`${centralMode ? "rounded-2xl" : "rounded-lg"} overflow-hidden object-cover`} 
          style={{
            height: imgHeight,
          }} 
          src={thumbnailHrefPreview} 
          width={imgWidth} 
          height={imgHeight} 
          alt={"Wrong thumbnail URL"}
          onError={(error: unknown) => console.log("Wrong thumbnail URL", error)}
          />
      </div>
      {centralMode ? (
        <div className="mt-[8px] flex justify-center items-center absolute bottom-[12px] left-0 right-0">
          <h3 className="font-helvetica text-[18px] text-white font-bold">
            {textPreview}
          </h3>
        </div>
      ) : (
      <div className="mt-[8px] flex justify-center items-center">
        <h3 className="font-helvetica text-[8px] text-gray font-bold">
          {textPreview}
        </h3>
      </div>
      )}
    </div>
  )
}


export const SliderSectionPreview = ({
  sectionData,
  previewMode = false,
  containerWidth
}: {
  sectionData: SectionSlider,
  previewMode?: boolean,
  containerWidth?: number | null
}) => {

  const {
    sectionTitlePreview,
    showOutline,
    isHovered,
    mouseEnterHandler,
    mouseLeaveHandler,
    onEditHandler,
    onDelateHandler,
    imgWidth,
    divRef,
    plugin,
    imgHeight
  } = useSliderSectionPreview({sectionData, previewMode, containerWidth})

  return (
    <PreviewCardHoc
      mouseEnterHandler={mouseEnterHandler}
      mouseLeaveHandler={mouseLeaveHandler}
      onEditHandler={onEditHandler}
      onDelateHandler={onDelateHandler}
      isHovered={isHovered}
      previewMode={previewMode}
      showDragAndDropButton={sectionData?.centralMode}
      containerStyles={`${sectionData?.centralMode ? "py-[8px]" : ""}`}
      buttonDragAndDropStyles={`${sectionData?.centralMode ? "translate-y-[8px]" : ""} translate-x-[10px]`}
      buttonEditStyles={`${sectionData?.centralMode ? "translate-y-[8px]" : ""}`}
      buttonTrashStyles={`${sectionData?.centralMode ? "translate-y-[8px]" : ""}`}
    >
      <div
        className={`min-h-[150px] ${sectionData?.centralMode ? "p-0" : "px-[16px] py-[8px]"} bg-white rounded-2xl ${showOutline ? "border-blue-500" : "border-transparent"} border-[1px] border-solid overflow-hidden`}
        style={{
          width: containerWidth ? containerWidth : "",
          height: sectionData?.centralMode ? imgHeight : ""
        }}
      >
        {!sectionData?.centralMode ? (
          <div className="mb-[8px]">
            <h2 className="font-helvetica text-[16px] text-gray font-bold">
              {sectionTitlePreview}
            </h2>
          </div>
          ) : null
        }
        <div className="overflow-hidden max-h-[100%]" ref={divRef}>
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={sectionData?.centralMode ? [plugin.current] : []}
          >
            <CarouselContent className="">
              {sectionData?.slideItems?.map((slideItem, index) => (
                <CarouselItem key={index} className={`${sectionData?.centralMode ? "basis-1/1 rounded-2xl" : "basis-1/3"}`}>
                  <SliderItemCard sliderItemData={slideItem} imgWidth={imgWidth} centralMode={sectionData?.centralMode} imgHeight={imgHeight} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </PreviewCardHoc>
  )
}