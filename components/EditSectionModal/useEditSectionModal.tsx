import { useSelector, useDispatch } from "react-redux";
import { getEditSection, getOpenEditModal } from "@/store/EditLayoutConfig/selectors";
import { editLayoutConfigActions } from "@/store/EditLayoutConfig/reducer";


export const useEditSectionModal = () => {
  const dispatch = useDispatch();
  const editSection = useSelector(getEditSection);
  const openEditModal = useSelector(getOpenEditModal);

  const handleCloseModal = () => {
    dispatch(editLayoutConfigActions.setOpenEditModal(false));
  }

  return {
    handleCloseModal, 
    openEditModal,
    editSection
  }
}