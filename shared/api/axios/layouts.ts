import { api } from "./instance";
import { SectionBanner, SectionGrid, SectionSlider, SectionText } from "@/shared/types";

export const layoutsApi = {
  async getActiveLayout() {
    try {
      const LAYOUT_URL = `${process.env.NEXT_PUBLIC_BASE_API}/layouts/active`
      const res = await api.get(LAYOUT_URL);
      return res?.data;
    } catch (error) {
      console.log("AXIOS ERROR -", error)
    }
  },

  async createLayout({layoutData}: {layoutData: (SectionBanner | SectionGrid | SectionSlider | SectionText)[]}) {
    try {
      const LAYOUT_URL = `${process.env.NEXT_PUBLIC_BASE_API}/layouts`
      const res = await api.post(LAYOUT_URL, {sections: layoutData, isActive: true});
      return res?.data;
    } catch (error) {
      console.log("AXIOS ERROR -", error)
    }
  },

  async updateLayout({
    activeLayoutId, 
    layoutData
  }: {
    activeLayoutId: string, 
    layoutData: (SectionBanner | SectionGrid | SectionSlider | SectionText)[]
  }) {
    try {
      const LAYOUT_URL = `${process.env.NEXT_PUBLIC_BASE_API}/layouts/${activeLayoutId}`
      const res = await api.put(LAYOUT_URL, {sections: layoutData, isActive: true});
      return res?.data;
    } catch (error) {
      console.log("AXIOS ERROR -", error)
    }
  }
}