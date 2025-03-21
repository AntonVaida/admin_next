"use client"
import { IphoneMocHoc } from "@/hoc"
import { AddNewSection, AddNewSectionModal, EditSectionModal, PreviewMocWrapper } from "@/components/index"
import { useHomePage } from "./useHomePage"
import { Button } from "@/components/ui/button"


export const HomePage = () => {
  const {     
    divRefContainer,
    showAddSectionModal,
    handleShowAddSectionModalClose,
    setShowAddSectionModal
  } = useHomePage();

  return (
    <div className="flex justify-center items-center px-[42px] bg-gradient-to-br from-slate-200 via-slate-300 to-blue-200 relative">
      <EditSectionModal />
      <AddNewSectionModal openModal={showAddSectionModal} handleClose={handleShowAddSectionModalClose} />
      <div className="h-[100vh] flex grow-1 justify-center items-center">
        <div className="w-full h-full flex justify-center items-center flex-col" ref={divRefContainer}>
          <IphoneMocHoc divRefContainer={divRefContainer}>
            <PreviewMocWrapper />
          </IphoneMocHoc>
        </div>
        <div className="h-[90%] bg-slate-400 w-[8px] rounded-full lg:block hidden shadow-2xl"></div>
        <div className="w-full h-full justify-center items-center hidden lg:flex">
          <AddNewSection wrapperContainerStyle={"bg-white/20"} />
        </div>
        <div className="absolute bottom-0 left-0 h-[86px] md:h-[120px] w-full flex justify-center items-center lg:hidden">
          <Button
          onClick={() => {
            setShowAddSectionModal(true)
          }}
            className="bg-blue-500 hover:opacity-70 hover:bg-blue-500 font-helvetica text-[24px] md:text-[48px] text-white font-bold p-[24px] md:h-[82px] md:min-w-[400px] rounded-full">
            Add section
          </Button>
        </div>
      </div>
    </div>
  )
}