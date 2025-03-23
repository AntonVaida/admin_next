import { useState } from "react";

export const useHomePageHoc = () => {
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);

  const handleShowAddSectionModalClose = () => {
    setShowAddSectionModal(false)
  }

  return {
    showAddSectionModal,
    setShowAddSectionModal,
    handleShowAddSectionModalClose
  }
}