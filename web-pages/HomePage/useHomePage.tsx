import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { layoutConfigActions } from "@/store/LayoutConfigReducer";
import { AppDispatch } from "@/store";

export const useHomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const divRefContainer = useRef(null);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);

  useEffect(() => {
    dispatch(layoutConfigActions.getActiveLayout())
  }, [])

  const handleShowAddSectionModalClose = () => {
    setShowAddSectionModal(false)
  }

  return {
    divRefContainer,
    showAddSectionModal,
    handleShowAddSectionModalClose,
    setShowAddSectionModal
  }
}