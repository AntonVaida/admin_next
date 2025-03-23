import { EditIcon, TrashIcon, DotsGridIcon } from "@/shared"

export const PreviewCardHoc = ({
  children,
  mouseEnterHandler,
  mouseLeaveHandler,
  previewMode,
  isHovered,
  onEditHandler,
  onDelateHandler,
  containerStyles,
  buttonEditStyles,
  buttonTrashStyles,
  buttonDragAndDropStyles,
  showDragAndDropButton = false
}: {
  children: React.ReactNode,
  mouseEnterHandler: () => void,
  mouseLeaveHandler: () => void,
  previewMode: boolean,
  isHovered: boolean,
  onEditHandler: () => void,
  onDelateHandler: () => void,
  containerStyles?: string,
  buttonEditStyles?: string,
  buttonTrashStyles?: string,
  buttonDragAndDropStyles?: string
  showDragAndDropButton?: boolean
}) => {

  return (
    <div
      className={`relative ${containerStyles ? containerStyles : ""}`}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {children}
      {!previewMode && isHovered ? (
        <>
          <button 
            className={`w-[20px] h-[20px] rounded-full bg-slate-300 border-0 flex justify-center items-center absolute top-[-10px] left-[20px] transform hover:scale-150 transition duration-200 z-40 ${buttonEditStyles ? buttonEditStyles : ""}`}
            onClick={onEditHandler}
          >
            <div className="w-[12px] h-[12px] flex justify-center items-center">
              <EditIcon />
            </div>
          </button>
          {showDragAndDropButton ? (
            <button 
              className={`w-[20px] h-[20px] rounded-full bg-slate-300 border-0 flex justify-center items-center absolute top-[-10px] right-[50%] transform hover:scale-150 transition duration-200 z-40 ${buttonDragAndDropStyles ? buttonDragAndDropStyles : ""}`}
            >
              <div className="w-[12px] h-[12px] flex justify-center items-center">
                <DotsGridIcon />
              </div>
            </button>
          ) : null}
          <button 
            className={`w-[20px] h-[20px] rounded-full bg-slate-300 border-0 flex justify-center items-center absolute top-[-10px] right-[20px] transform hover:scale-150 transition duration-200 z-40 ${buttonTrashStyles ? buttonTrashStyles : ""}`}
            onClick={onDelateHandler}
          >
            <div className="w-[12px] h-[12px] flex justify-center items-center">
              <TrashIcon />
            </div>
          </button>
        </>
      ) : null}
    </div>
  )
}