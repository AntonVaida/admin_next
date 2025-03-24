import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog"
import { useEditSectionModal } from "./useEditSectionModal"
import { EditSectionFormWrapper } from "../EditSectionFormWrapper";

export const EditSectionModal = () => {
  const {
    handleCloseModal, 
    openEditModal,
    editSection
  } = useEditSectionModal();

  return (
    <Dialog
      open={openEditModal}
      onOpenChange={() => handleCloseModal()}
      
    >
      <DialogTitle className="hidden">AddNewSectionModal</DialogTitle>
      <DialogContent className="p-[12px] md:p-[32px] rounded-lg md:rounded-4xl w-[80vw] max-w-[1200px] h-[90vh] md:h-[80vh] md:max-h-[750px] bg-blue-200 border-0">
        <EditSectionFormWrapper editSection={editSection} />
      </DialogContent>
    </Dialog>
  )
}