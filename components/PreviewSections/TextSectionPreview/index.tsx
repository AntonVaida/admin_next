import { SectionText } from "@/shared/types"
import { useTextSectionPreview } from "./useTextSectionPreview"
import { PreviewCardHoc } from "@/hoc"

export const TextSectionPreview = ({
  sectionData,
  previewMode = false,
  containerWidth
}: {
  sectionData: SectionText,
  previewMode?: boolean,
  containerWidth?: number | null
}) => {
  const {
    sectionTitlePreview,
    subTitlePreview,
    textPreview,
    showOutline,
    mouseEnterHandler,
    mouseLeaveHandler,
    isHovered,
    onEditHandler,
    onDelateHandler
  } = useTextSectionPreview({sectionData, previewMode});

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
        className={`min-h-[100px] px-[16px] py-[8px] bg-white rounded-2xl ${showOutline ? "border-blue-500" : "border-transparent"} relative border-[1px] border-solid`}
        style={{
          width: containerWidth ? containerWidth : "100%"
        }}
      >
        <div className="mb-[8px]">
          <h2 className="font-helvetica text-[16px] text-gray font-bold">
            {sectionTitlePreview}
          </h2>
        </div>
        <div className="overflow-hidden max-h-[100%]px-[8px]">
          <div className="mb-[8px]">
            <h3 className="font-helvetica text-[12px] text-gray font-bold">
              {subTitlePreview}
              </h3>
          </div>
          <div>
            <h4 className="font-helvetica text-[8px] text-gray font-semibold line-clamp-6">
              {textPreview}
            </h4>
          </div>
        </div>
      </div>
    </PreviewCardHoc>
  )
}