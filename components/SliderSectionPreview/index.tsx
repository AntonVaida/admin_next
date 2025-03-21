import { SectionSlider, SliderItem } from "@/shared/types"
import { EditIcon, TrashIcon } from "@/shared"
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
    <div className={`w-full flex flex-col justify-center items-center relative ${centralMode ? "rounded-2xl" : "rounded-lg"} overflow-hidden`}>
      <div style={{
        height: imgHeight,
      }}>
        <Image 
          className={`${centralMode ? "rounded-2xl" : "rounded-lg"} overflow-hidden`} 
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
    <div
      className="relative"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div
        className={`min-h-[150px] ${sectionData?.centralMode ? "p-0" : "px-[16px] py-[8px]"} bg-white rounded-2xl ${showOutline ? "border-blue-500" : "border-transparent"} border-[1px] border-solid overflow-hidden`}
        style={{
          width: containerWidth ? containerWidth : "100%",
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