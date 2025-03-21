import { useEffect, useState, RefObject } from "react";

export const useContainerSize = ({divRef}: {divRef: RefObject<HTMLDivElement | null>}) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = divRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      const newWidth = entries[0].contentRect.width;
      const newHeight = entries[0].contentRect.height;
      setSize({ width: newWidth, height: newHeight })
    });

    if (element) {
      resizeObserver.observe(element);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return {
    size
  }
}