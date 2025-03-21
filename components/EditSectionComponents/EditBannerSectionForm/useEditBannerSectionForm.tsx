import { useCallback, useMemo } from "react";
import { SectionBanner } from "@/shared/types";
import { useDispatch } from "react-redux";
import { editLayoutConfigActions } from "@/store/EditLayoutConfig/reducer";
import { layoutConfigActions } from "@/store/LayoutConfigReducer";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ValidationSchema, schema } from "./settings";

export const useEditBannerSectionForm = ({editSection}: {editSection: SectionBanner}) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    defaultValues: editSection
  });

  const editSectionPreviewData = watch()

  const editMode = useMemo(() => {
    return Boolean(editSection?.text && editSection?.sectionTitle && editSection?.subTitle && editSection?.thumbnailHref)
  }, [editSection?.text, editSection?.sectionTitle, editSection?.subTitle, editSection?.thumbnailHref])

  const handleCloseModal = () => {
    dispatch(editLayoutConfigActions.setOpenEditModal(false));
  }

  const onSubmit = useCallback((data: ValidationSchema) => {
    try {
      if (editMode) {
        dispatch(layoutConfigActions.editSection(data as SectionBanner));
      } else {
        dispatch(layoutConfigActions.addSection(data as SectionBanner));
      }

      handleCloseModal();
    } catch (error: unknown) {
      console.error(error)
    }
  }, [editMode, dispatch, handleCloseModal]);

  return {
    register,
    handleSubmit,
    errors,
    editSectionPreviewData,
    onSubmit,
    editMode,
    handleCloseModal,
    Controller,
    control
  }
}