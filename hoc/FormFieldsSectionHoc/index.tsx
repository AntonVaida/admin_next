import { Button } from "@/components/ui/button"
import { EditIcon, PluseIcon } from "@/shared"

export const FormFieldsSectionHoc = ({
  children, 
  handleCloseModal, 
  handleSubmit,
  editMode,
  containerClassNames
}: {
  children: React.ReactNode, 
  handleCloseModal: () => void, 
  handleSubmit: () => void,
  editMode: boolean,
  containerClassNames?: string
}) => {

  return (
    <div
      className="w-full flex-grow-1 md:w-[65%]"
    >
      <div className={`w-full overflow-y-auto px-[8px] md:px-[24px] ${containerClassNames ? containerClassNames : 'h-[35vh] md:h-[calc(80vh-64px-32px-48px)] md:max-h-[calc(750px-64px-32px-48px)]'}`}>
        {children}
      </div>
      
      <div className="flex justify-end items-center w-full gap-[32px] mt-[32px]">
        <Button onClick={handleCloseModal} className="w-full h-[48px] bg-red-500 hover:opacity-70 hover:bg-red-500 font-helvetica text-[16px] font-bold">
          <div className="flex justify-center items-center gap-1">
            <h3>CANCEL</h3>
          </div>
        </Button>
        <Button onClick={handleSubmit} className="w-full h-[48px] bg-blue-500 hover:opacity-70 hover:bg-blue-500 font-helvetica text-[16px] font-bold">
          <div className="flex justify-center items-center gap-1">
            <div className="w-[24px] h-[24px]">
              {editMode ? <EditIcon /> : <PluseIcon />}
            </div>
            <h3>{editMode ? "UPDATE" : "ADD"}</h3>
          </div>
        </Button>
      </div>
    </div>
  )
}