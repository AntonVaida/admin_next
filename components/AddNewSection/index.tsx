import { useAddNewSection } from "./useAddNewSection"
import { Button } from "../ui/button";

export const AddNewSection = ({
  wrapperContainerStyle,
  titleStyle,
  gridContainerStyle,
  gridItemStyle,
  handleModalClose
}: {
  wrapperContainerStyle?: string,
  titleStyle?: string,
  gridContainerStyle?: string,
  gridItemStyle?: string,
  handleModalClose?: () => void,
}) => {
  const { 
    buttonListConfig, 
    saveLayoutHandler, 
    isLoading 
  } = useAddNewSection({handleModalClose});

  return (
    <div className={`w-[350px] rounded-3xl shadow-2xl p-[32px] flex justify-center items-center flex-col ${wrapperContainerStyle}`}>
      <div className="flex justify-center items-center h-[32px] mb-[24px]">
        <h2 className={`font-helvetica text-[24px] text-blue-500 font-bold ${titleStyle}`}>
          Add section
        </h2>
      </div>
      <div className={`grid grid-cols-2 gap-6 w-[220px] ${gridContainerStyle}`}>
        {buttonListConfig?.map(({ButtonIcon, onClick, title}, index) => (
          <div key={index} className={`flex justify-center items-center flex-col ${gridItemStyle}`}>
            <Button  
              onClick={onClick}
              className="w-[64px] h-[64px] p-0 block bg-blue-500 rounded-2xl hover:opacity-70 hover:bg-blue-500 transition duration-500"
            >
              <div className="w-full h-full p-[18px]">
                <ButtonIcon  />
              </div>
            </Button>
            <div className="mt-[8px]">
              <h3 className="font-helvetica text-[16px] font-semibold text-gray">
                {title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[24px] w-[220px]">
        <Button disabled={isLoading} onClick={saveLayoutHandler} className="w-full h-[64px] p-0 bg-blue-500 rounded-2xl hover:opacity-70 hover:bg-blue-500 transition duration-500 flex justify-center items-center">
          <h2 className="font-helvetica text-[24px] text-white font-bold">SAVE</h2>
        </Button>
      </div>
    </div>
  )
}