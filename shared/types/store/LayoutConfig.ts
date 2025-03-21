import { SectionBanner } from "../SectionBanner"
import { SectionGrid } from "../SectionGrid"
import { SectionSlider } from "../SectionSlider"
import { SectionText } from "../SectionText"

export type LayoutConfig = {
  activeLayoutId: string | null
  sections: (SectionBanner | SectionGrid | SectionSlider | SectionText)[],
  loading: boolean,
}