import { Hero } from "@/sections/Hero";
import { TrustSection } from "@/sections/TrustSection";
import { AboutSection } from "@/sections/AboutSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { WhyChooseUs } from "@/sections/WhyChooseUs";
import { Gallery } from "@/sections/Gallery";
import { Testimonials } from "@/sections/Testimonials";
import { FAQ } from "@/sections/FAQ";
import { FinalCTA } from "@/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
