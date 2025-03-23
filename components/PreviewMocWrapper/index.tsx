import { usePreviewMocWrapper } from "./usePreviewMocWrapper"
import { 
  SectionBanner, 
  SectionGrid, 
  SectionSlider, 
  SectionText, 
  SectionsType 
} from "@/shared/types"
import { 
  TextSectionPreview,   
  BannerSectionPreview, 
  SliderSectionPreview, 
  GridSectionPreview  
} from "../PreviewSections/index"
import { DragAndDropHoc } from "@/hoc"
import { Loader } from "../ui/loader"


const WrapperSectionItem = ({
  sectionData,
  containerWidth
} : {
  containerWidth: number | null,
  sectionData: SectionBanner | SectionGrid | SectionSlider | SectionText
}) => {

  switch(sectionData.type) {
    case (SectionsType.text): {
      return (
        <div className="mt-[8px] mb-[8px]">
          <TextSectionPreview sectionData={sectionData as SectionText} containerWidth={containerWidth} />
        </div>
      )
    }
    case (SectionsType.banner): {
      return (
        <div className="mt-[8px] mb-[8px]">
          <BannerSectionPreview sectionData={sectionData as SectionBanner} containerWidth={containerWidth} />
        </div>
      )
    }
    case (SectionsType.slider): {
      return (
        <div className="mt-[8px] mb-[8px]">
          <SliderSectionPreview sectionData={sectionData as SectionSlider} containerWidth={containerWidth} />
        </div>
      )
    }
    case (SectionsType.grid): {
      return (
        <div>
          <GridSectionPreview sectionData={sectionData as SectionGrid} containerWidth={containerWidth} />
        </div>
      )
    }
    default: {
      return null;
    }
  }
}

export const PreviewMocWrapper = () => {
  const {   
    sectionList,
    divRef,
    containerWidth,
    paddingWrapperConfig,
    isLoading
  } = usePreviewMocWrapper();

  return (
    <div
      ref={divRef}
      className="bg-white flex-grow-1 min-h-full"
      style={{
        paddingTop: sectionList?.length ? paddingWrapperConfig.vertical : 0,
        paddingBottom: sectionList?.length ? paddingWrapperConfig.vertical : 0,
        paddingLeft: sectionList?.length ? paddingWrapperConfig.horizontal : 0,
        paddingRight: sectionList?.length ? paddingWrapperConfig.horizontal : 0,
      }}
    >
      {sectionList?.length && !isLoading ? (
        <>
        {
          sectionList?.map((sectionData, index) => (
            <DragAndDropHoc itemData={sectionData} key={index}>
              <WrapperSectionItem sectionData={sectionData} containerWidth={containerWidth} />
            </DragAndDropHoc>
          ))
        }
        </>
      ) : (
        <div className="bg-white h-[70vh] flex justify-center items-center">
          {isLoading ? (
            <Loader />
          ) : (
          <div>
            <h2 className="font-helvetica text-[24px] text-gray font-bold">
              Empty Layout
            </h2>
          </div>
          )}
        </div>
      )}
    </div>
  )
}