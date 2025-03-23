import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { layoutConfigActions } from "@/store/LayoutConfigReducer";
import { AppDispatch } from "@/store";

export const useHomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const divRefContainer = useRef(null);

  useEffect(() => {
    dispatch(layoutConfigActions.getActiveLayout())
  }, [dispatch])

  return {
    divRefContainer,
  }
}