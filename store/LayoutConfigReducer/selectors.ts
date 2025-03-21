import { RootState } from "@/shared/types";

export const getSections = ({ layoutConfig }: RootState) => layoutConfig.sections;

export const getLoading = ({ layoutConfig }: RootState) => layoutConfig.loading;

export const getActiveLayoutId = ({ layoutConfig }: RootState) => layoutConfig.activeLayoutId