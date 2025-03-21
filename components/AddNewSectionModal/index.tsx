import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog"
import { AddNewSection } from "../AddNewSection"


export const AddNewSectionModal = ({
  openModal, 
  handleClose
}: {
  openModal: boolean, 
  handleClose: () => void 
}) => {

  return (
    <Dialog
      open={openModal}
      onOpenChange={() => handleClose()}
      
    >
      <DialogTitle className="hidden">AddNewSectionModal</DialogTitle>
      <DialogContent className="p-0 rounded-3xl w-[85vw]">
        <AddNewSection wrapperContainerStyle={"shadow-none w-full"} handleModalClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}