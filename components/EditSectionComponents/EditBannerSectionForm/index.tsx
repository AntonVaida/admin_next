import { SectionBanner, ImgOrientation } from "@/shared/types"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEditBannerSectionForm } from "./useEditBannerSectionForm"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ImageIndentLeftIcon, ImageIndentRightIcon } from "@/shared"
import { BannerSectionPreview } from "@/components/PreviewSections/BannerSectionPreview"
import { FormFieldsSectionHoc } from "@/hoc"


export const EditBannerSectionForm = ({
  editSection,
}: {
  editSection: SectionBanner,
}) => {
  const {
    register,
    handleSubmit,
    errors,
    editSectionPreviewData,
    onSubmit,
    editMode,
    handleCloseModal,
    Controller,
    control
  } = useEditBannerSectionForm({editSection});

  return (
    <div className="flex flex-col md:flex-row justify-center items-center">
      <div className="w-full md:w-[30%]">
        <BannerSectionPreview sectionData={editSectionPreviewData as SectionBanner} previewMode={true} />
      </div>
      <div className="my-[16px] md:my-0 md:flex-grow-1 flex justify-center items-center h-[16px] md:h-full">
        <div className="h-[4px] md:h-[80%] bg-blue-500 w-[200px] md:w-[4px] rounded-full mx-[24px]"></div>
      </div>
      <FormFieldsSectionHoc handleCloseModal={handleCloseModal} handleSubmit={handleSubmit(onSubmit)} editMode={editMode}>
        <>
          <div className="mb-[16px]">
            <h3 className="font-helvetica text-[16px] md:text-[18px] text-blue-500 font-bold mb-[8px]">
              Section Title
            </h3>
            <Input 
              {...register("sectionTitle")}
              maxLength={20} 
              error={Boolean(errors?.sectionTitle)}
              placeholder="Section Title"
            />
          </div>
          <div className="mb-[16px]">
            <h3 className="font-helvetica text-[16px] md:text-[18px] text-blue-500 font-bold mb-[8px]">
              Sub Title
            </h3>
            <Input 
              {...register("subTitle")}
              maxLength={20} 
              error={Boolean(errors?.subTitle)}
              placeholder="Sub Title"
            />
          </div>
          <div className="mb-[16px]">
            <h3 className="font-helvetica text-[16px] md:text-[18px] text-blue-500 font-bold mb-[8px]">
              Text
            </h3>
            <Textarea 
              {...register("text")} 
              error={Boolean(errors?.text)} 
              maxLength={200} 
              className="h-[100px] py-[10px]"
              placeholder="Text"
            />
          </div>
          <div className="mb-[16px]">
            <h3 className="font-helvetica text-[16px] md:text-[18px] text-blue-500 font-bold mb-[8px]">
              Thumbnail URL
            </h3>
            <Input 
              {...register("thumbnailHref")} 
              maxLength={200} 
              error={Boolean(errors?.thumbnailHref)} 
              placeholder="thumbnailHref"
            />
          </div>
          <div className="mb-[16px]">
            <h3 className="font-helvetica text-[16px] md:text-[18px] text-blue-500 font-bold mb-[8px]">
              Img Orientation
            </h3>
            <Controller name="imgOrientation" control={control} render={({ field }) => (
              <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} >
                <ToggleGroupItem value={ImgOrientation.left} className="flex justify-center items-center">
                  <div className="w-[24px] h-[24px] flex justify-center items-center">
                    <ImageIndentLeftIcon />
                  </div>
                </ToggleGroupItem>
                <ToggleGroupItem value={ImgOrientation.right} className="flex justify-center items-center">
                  <div className="w-[24px] h-[24px] flex justify-center items-center">
                    <ImageIndentRightIcon />
                  </div>
                </ToggleGroupItem>
              </ToggleGroup>
            )} />
          </div>
        </>
      </FormFieldsSectionHoc>
    </div>
  )
}