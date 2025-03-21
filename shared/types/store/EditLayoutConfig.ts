import { SectionBanner } from "../SectionBanner"
import { SectionGrid } from "../SectionGrid"
import { SectionSlider } from "../SectionSlider"
import { SectionText } from "../SectionText"

export type EditLayoutConfig = {
  editSection: SectionBanner | SectionGrid | SectionSlider | SectionText | null,
  openEditModal: boolean
}