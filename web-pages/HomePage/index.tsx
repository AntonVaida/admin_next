"use client"
import { IphoneMocHoc } from "@/hoc"
import { AddNewSection, PreviewMocWrapper } from "@/components/index"
import { useHomePage } from "./useHomePage"
import { HomePageHoc } from "./HomePageHoc"


export const HomePage = () => {
  const {     
    divRefContainer,
  } = useHomePage();

  return (
    <HomePageHoc>
      <div className="h-[100vh] flex grow-1 justify-center items-center">
        <div className="w-full h-full flex justify-center items-center flex-col" ref={divRefContainer}>
          <IphoneMocHoc divRefContainer={divRefContainer}>
            <PreviewMocWrapper />
          </IphoneMocHoc>
        </div>
        <div className="h-[90%] bg-slate-400 w-[8px] rounded-full lg:block hidden shadow-2xl"></div>
        <div className="w-full h-full justify-center items-center hidden lg:flex">
          <AddNewSection wrapperContainerStyle={"bg-white/20"} />
        </div>
      </div>
    </HomePageHoc>
  )
}