"use client"
import { useEffect, useRef, useState } from "react";
import { SectionBanner, SectionGrid, SectionSlider, SectionText } from "@/shared/types";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { createPortal } from 'react-dom';
import { useDispatch } from "react-redux";
import { layoutConfigActions } from "@/store/LayoutConfigReducer";

enum HighlightType {
  top = "TOP",
  bottom = "BOTTOM"
}

export const DragAndDropHoc = ({
  children, 
  itemData
}: {
  children: React.ReactNode, 
  itemData: SectionBanner | SectionGrid | SectionSlider | SectionText
}) => {
  const ref = useRef(null);
  const [aboutToDrop, setAboutToDrop] = useState<HighlightType | null>(null);
  const [preview, setPreview] = useState<HTMLElement | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const element = ref?.current;

    if (!element) return;

    const draggableConfig = {
      element,
      getInitialData() {
        return itemData;
      },
      canDrag() {
        return true;
      },

      // @ts-expect-error payload
      onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            render({ container }) {
              setPreview(container);
            },
            nativeSetDragImage,
          });
      }
    }

    const dropConfig = {
      element,
      getData() {
        return itemData;
      },

      // @ts-expect-error payload
      onDragEnter(payload) {
        const { source, self } = payload;
        const target = self;
        if (source?.data?.sectionOrder > target?.data?.sectionOrder) {
          setAboutToDrop(HighlightType.top)
        } else if (source?.data?.sectionOrder === target?.data?.sectionOrder) {
          setAboutToDrop(null)
        } else {
          setAboutToDrop(HighlightType.bottom)
        }
      },
      
      onDragLeave() {
        setAboutToDrop(null)
      },

      // @ts-expect-error payload
      onDrop(payload) {
        const { source, self } = payload;
        setAboutToDrop(null)
        const target = self;
        dispatch(layoutConfigActions.dragAndDrop({draggableItem: source?.data, targetItem: target?.data}))
      },
    };

     // @ts-expect-error payload
    return combine(draggable(draggableConfig), dropTargetForElements(dropConfig));
  }, [itemData])


  return (
    <div ref={ref} className="relative">
      {aboutToDrop === HighlightType.top ? (
        <div className="h-[3px] w-full rounded-full bg-blue-500 absolute top-0 left-0 right-0 z-1000" />
      ) : null}
      <div>
        {children}
      </div>
      {aboutToDrop === HighlightType.bottom ? (
        <div className="h-[3px] w-full rounded-full bg-blue-500 absolute bottom-0 left-0 right-0 z-1000" />
      ) : null}
       {preview ? (createPortal(children, preview)) : null}
    </div>
  )
}