import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ContentSections from "@/components/ContentSections";
import ContactSection from "@/components/ContactSection";
import VisitorCounter from "@/components/VisitorCounter";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="font-nunito bg-[#fdf9f5] text-gray-800 overflow-x-hidden">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollTo={scrollTo} />
      <HeroSection scrollTo={scrollTo} />
      <ContentSections />
      <ContactSection scrollTo={scrollTo} />
      <VisitorCounter />
    </div>
  );
}