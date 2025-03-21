import { useCallback, useMemo } from "react";
import { SectionGrid } from "@/shared/types";
import { useDispatch } from "react-redux";
import { editLayoutConfigActions } from "@/store/EditLayoutConfig/reducer";
import { layoutConfigActions } from "@/store/LayoutConfigReducer";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ValidationSchema, schema } from "./settings";
import { getGridItem } from "@/shared/classes";

export const useEditGridSectionForm = ({editSection} : {editSection: SectionGrid}) => {
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
    name: "gridItems",
  });

  const editSectionPreviewData = watch()

  const editMode = useMemo(() => {
    return Boolean(editSection?.sectionTitle && editSection?.gridItems?.length)
  }, [editSection?.sectionTitle, editSection?.gridItems])

  const handleCloseModal = () => {
    dispatch(editLayoutConfigActions.setOpenEditModal(false));
  }

  const appendHandler = useCallback(() => {
    const emptyGridItem = getGridItem(fields?.length);
    append(emptyGridItem);
  }, [fields?.length, append])

  const onSubmit = useCallback((data: ValidationSchema) => {
    try {
      if (editMode) {
        dispatch(layoutConfigActions.editSection(data as SectionGrid));
      } else {
        dispatch(layoutConfigActions.addSection(data as SectionGrid));
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
  }
}