import { useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ValidationSchema, schema } from "./settings";
import { SectionText } from "@/shared/types";
import { layoutConfigActions } from "@/store/LayoutConfigReducer";
import { useDispatch } from "react-redux";
import { editLayoutConfigActions } from "@/store/EditLayoutConfig/reducer";

export const useEditTextSectionForm = ({ 
  editSection,
}: { 
  editSection: SectionText,
}) => {

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    defaultValues: editSection
  });

  const handleCloseModal = () => {
    dispatch(editLayoutConfigActions.setOpenEditModal(false));
  }

  const editSectionPreviewData = watch()

  const editMode = useMemo(() => {
    return Boolean(editSection?.text && editSection?.sectionTitle && editSection?.subTitle)
  }, [editSection?.text, editSection?.sectionTitle, editSection?.subTitle])

  const onSubmit = useCallback((data: ValidationSchema) => {
    try {
      if (editMode) {
        dispatch(layoutConfigActions.editSection(data as SectionText));
      } else {
        dispatch(layoutConfigActions.addSection(data as SectionText));
      }
      handleCloseModal();
    } catch (error: unknown) {
      console.error(error)
    }
  }, [editMode, dispatch, handleCloseModal]);

  return {
    register,
    errors,
    onSubmit,
    handleSubmit,
    editSectionPreviewData,
    handleCloseModal,
    editMode
  }
}