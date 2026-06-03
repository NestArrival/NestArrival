"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveSteps from "@/components/InteractiveSteps";
import HeroSection from "./_components/HeroSection";
import VisionSection from "./_components/VisionSection";
import AboutSummarySection from "./_components/AboutSummarySection";
import ProblemSection from "./_components/ProblemSection";
import TrendingHomesSection from "./_components/TrendingHomesSection";
import FoundersMessageSection from "./_components/FoundersMessageSection";
import PartnersSection from "./_components/PartnersSection";
import EarlyAccessSection from "./_components/EarlyAccessSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdfbf7] text-[#2c2724] overflow-x-hidden font-sans">
      <Navbar />
      <HeroSection />
      <VisionSection />
      <AboutSummarySection />
      <ProblemSection />
      <InteractiveSteps />
      <TrendingHomesSection />
      <FoundersMessageSection />
      <PartnersSection />
      <EarlyAccessSection />
      <Footer />
    </div>
  );
}
