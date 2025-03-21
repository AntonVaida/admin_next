import { useCallback, useMemo } from "react";
import { SectionSlider } from "@/shared/types";
import { useDispatch } from "react-redux";
import { editLayoutConfigActions } from "@/store/EditLayoutConfig/reducer";
import { layoutConfigActions } from "@/store/LayoutConfigReducer";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ValidationSchema, schema } from "./settings";
import { getEmptySliderItem } from "@/shared/classes";

export const useEditSliderSectionForm = ({editSection}: {editSection: SectionSlider}) => {
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "slideItems",
  });

  const editSectionPreviewData = watch()

  const editMode = useMemo(() => {
    return Boolean(editSection?.sectionTitle && editSection?.slideItems?.length)
  }, [editSection?.sectionTitle, editSection?.slideItems])

  const handleCloseModal = () => {
    dispatch(editLayoutConfigActions.setOpenEditModal(false));
  }

  const appendHandler = useCallback(() => {
    const emptySliderItem = getEmptySliderItem(fields?.length);
    append(emptySliderItem);
  }, [fields?.length, append])

  const onSubmit = useCallback((data: ValidationSchema) => {
    try {
      if (editMode) {
        dispatch(layoutConfigActions.editSection(data as SectionSlider));
      } else {
        dispatch(layoutConfigActions.addSection(data as SectionSlider));
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
    fields,
    appendHandler,
    remove,
    Controller,
    control
  }
}