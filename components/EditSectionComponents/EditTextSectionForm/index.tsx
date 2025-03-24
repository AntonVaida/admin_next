import { useEditTextSectionForm } from "./useEditTextSectionForm"
import { SectionText } from "@/shared/types"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TextSectionPreview } from "@/components/PreviewSections/TextSectionPreview"
import { FormFieldsSectionHoc } from "@/hoc"


export const EditTextSectionForm = ({
  editSection,
}: {
  editSection: SectionText,
}) => {
  const {
    register,
    errors,
    onSubmit,
    handleSubmit,
    editSectionPreviewData,
    handleCloseModal,
    editMode
  } = useEditTextSectionForm({editSection})

  return (
    <div className="flex flex-col md:flex-row md:justify-center justify-start items-center">
      <div className="w-full h-[19%] md:h-[100%] md:flex justify-center items-center overflow-y-auto md:w-[30%]">
        <TextSectionPreview sectionData={editSectionPreviewData as SectionText} previewMode={true} />
      </div>
      <div className="my-[16px] md:my-0 md:flex-grow-1 flex justify-center items-center h-[16px] md:h-full">
        <div className="h-[4px] md:h-[80%] bg-blue-500 w-[200px] md:w-[4px] rounded-full mx-[24px]"></div>
      </div>
      <FormFieldsSectionHoc 
        handleCloseModal={handleCloseModal} 
        handleSubmit={handleSubmit(onSubmit)} 
        editMode={editMode}
        containerClassNames={"h-[calc(110%-64px-32px-48px)] md:h-[calc(80vh-64px-32px-48px)] md:max-h-[calc(750px-64px-32px-48px)]"}
      >
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
        </>
      </FormFieldsSectionHoc>
    </div>
  )
}