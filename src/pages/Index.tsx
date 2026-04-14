import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ThreeDoorsBlock from "@/components/ThreeDoorsBlock";
import ContentSections from "@/components/ContentSections";
import AfterSchoolModal from "@/components/AfterSchoolModal";
import SummerCampModal from "@/components/SummerCampModal";
import SynergyBlock from "@/components/SynergyBlock";
import GroupSpotsWidget from "@/components/GroupSpotsWidget";
import ContactSection from "@/components/ContactSection";
import VisitorCounter from "@/components/VisitorCounter";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [afterSchoolOpen, setAfterSchoolOpen] = useState(false);
  const [summerCampOpen, setSummerCampOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="font-nunito bg-[#fdf9f5] text-gray-800 overflow-x-hidden">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollTo={scrollTo} />
      <HeroSection scrollTo={scrollTo} />
      <ThreeDoorsBlock
        scrollTo={scrollTo}
        onOpenAfterSchool={() => setAfterSchoolOpen(true)}
        onOpenSummerCamp={() => setSummerCampOpen(true)}
      />
      <ContentSections />
      <SynergyBlock scrollTo={scrollTo} />
      <GroupSpotsWidget scrollTo={scrollTo} />
      <ContactSection scrollTo={scrollTo} />
      <VisitorCounter />

      <AfterSchoolModal
        open={afterSchoolOpen}
        onClose={() => setAfterSchoolOpen(false)}
        scrollTo={scrollTo}
      />
      <SummerCampModal
        open={summerCampOpen}
        onClose={() => setSummerCampOpen(false)}
        scrollTo={scrollTo}
      />
    </div>
  );
}
