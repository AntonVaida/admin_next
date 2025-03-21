import { SectionGrid } from "@/shared/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PluseIcon, TrashIcon } from "@/shared"
import { UseFormRegister, FieldErrorsImpl, UseFieldArrayRemove } from "react-hook-form"
import { ValidationSchema } from "./settings"
import { useEditGridSectionForm } from "./useEditGridSectionForm"
import { GridSectionPreview } from "@/components/GridSectionPreview"
import { FormFieldsSectionHoc } from "@/hoc"

const GridItemForm = ({
  register, 
  index, 
  errors,
  remove,
  canRemove,
}: {
  register: UseFormRegister<ValidationSchema>, 
  index: number, 
  errors: Partial<FieldErrorsImpl<ValidationSchema>>,
  remove: UseFieldArrayRemove,
  canRemove: boolean
}) => {
  return (
    <div className="flex justify-start items-center gap-[16px]">
      <div className="p-[16px] border-blue-500 border-[1px] border-solid rounded-2xl flex-grow-1">
        <div className="mb-[16px]">
          <h3 className="font-helvetica text-[16px] md:text-[18px] text-blue-500 font-bold mb-[8px]">
            Title
          </h3>
          <Input 
            {...register(`gridItems.${index}.title`)}
            maxLength={20} 
            error={Boolean(errors?.gridItems?.[index]?.title)}
            placeholder="Section Title"
          />
        </div>
        <div className="mb-[16px]">
          <h3 className="font-helvetica text-[16px] md:text-[18px] text-blue-500 font-bold mb-[8px]">
            Thumbnail URL
          </h3>
          <Input 
            {...register(`gridItems.${index}.thumbnailHref`)} 
            maxLength={200} 
            error={Boolean(errors?.gridItems?.[index]?.thumbnailHref)} 
            placeholder="thumbnailHref"
          />
        </div>
        <div className="mb-[16px]">
          <h3 className="font-helvetica text-[16px] md:text-[18px] text-blue-500 font-bold mb-[8px]">
            Redirect Href
          </h3>
          <Input 
            {...register(`gridItems.${index}.redirectHref`)} 
            maxLength={200} 
            error={Boolean(errors?.gridItems?.[index]?.redirectHref)} 
            placeholder="redirectHref"
          />
        </div>
      </div>
      {canRemove ? (
        <div className="flex justify-center items-center">
          <Button onClick={() => remove(index)} className="bg-blue-500 w-[35px] h-[35px] rounded-lg hover:opacity-70 hover:bg-blue-500">
            <TrashIcon />
          </Button>
        </div>
      ) : null}
    </div>
  )
}


export const EditGridSectionForm = ({
  editSection,
}: {
  editSection: SectionGrid,
}) => {
  const {
    register,
    handleSubmit,
    errors,
    editSectionPreviewData,
    onSubmit,
    editMode,
    handleCloseModal,
    fields,
    appendHandler,
    remove,
  } = useEditGridSectionForm({editSection});

  return (
    <div className="flex flex-col md:flex-row justify-center items-center">
      <div className="w-full md:w-[30%]">
        <GridSectionPreview sectionData={editSectionPreviewData as SectionGrid} previewMode={true} />
      </div>
      <div className="my-[16px] md:my-0 md:flex-grow-1 flex justify-center items-center h-[16px] md:h-full">
        <div className="h-[4px] md:h-[80%] bg-blue-500 w-[200px] md:w-[4px] rounded-full mx-[24px]"></div>
      </div>
      <FormFieldsSectionHoc handleCloseModal={handleCloseModal} handleSubmit={handleSubmit(onSubmit)} editMode={editMode} containerClassNames={"h-[20vh] md:h-[calc(80vh-64px-32px-48px)] md:max-h-[calc(750px-64px-32px-48px)]"} >
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
          <div className="mb-[24px]">
            {fields?.map((field, index) => (
              <div key={index} className="py-[16px]">
                 <GridItemForm register={register} errors={errors} index={index} remove={remove} canRemove={fields?.length > 4} />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mb-[24px]">
            <Button onClick={appendHandler} className="bg-blue-500 w-[35px] h-[35px] rounded-lg hover:opacity-70 hover:bg-blue-500">
              <PluseIcon />
            </Button>
          </div>
        </>
      </FormFieldsSectionHoc>
    </div>
  )
}