import { SectionBanner, SectionGrid, SectionSlider, SectionText, SectionsType} from "@/shared/types"
import { 
  EditTextSectionForm, 
  EditBannerSectionForm, 
  EditSliderSectionForm, 
  EditGridSectionForm 
} from "../EditSectionComponents"

export const EditSectionFormWrapper = ({
  editSection,
}: {
  editSection: SectionBanner | SectionGrid | SectionSlider | SectionText | null,
}) => {
  switch(editSection?.type) {
    case (SectionsType.text): {
      return (
        <EditTextSectionForm editSection={editSection as SectionText} />
      )
    }
    case (SectionsType.banner): {
        return (
          <EditBannerSectionForm editSection={editSection as SectionBanner} />
        )
      }
    case (SectionsType.slider): {
      return (
        <EditSliderSectionForm editSection={editSection as SectionSlider} />
      )
    }
    case (SectionsType.grid): {
      return (
        <EditGridSectionForm editSection={editSection as SectionGrid} />
      )
    }
    default: {
      return (
        <div>ANOTHER</div>
      )
    }
  }
}