import { RootState } from "@/shared/types"

export const getEditSection = ({ editLayoutConfig }: RootState) => editLayoutConfig.editSection;

export const getOpenEditModal = ({ editLayoutConfig }: RootState) => editLayoutConfig.openEditModal;