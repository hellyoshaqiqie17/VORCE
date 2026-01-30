"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import Banner from "@/components/Banner/Banner";
import JoinCompanies from "@/components/JoinCompanies/JoinCompanies";
import FeaturesPink from "@/components/Features/FeaturesPink";
import FeaturesPrimary from "@/components/Features/FeaturesPrimary";
import FeaturesGreen from "@/components/Features/FeaturesGreen";
import FeaturesCyan from "@/components/Features/FeaturesCyan";
import FeaturesPurple from "@/components/Features/FeaturesPurple";
import Testimonial from "@/components/Testimonial/Testimonial";
import Footer from "@/components/Footer/Footer";
import ContactModal from "@/components/Modals/ContactModal";
import SignUpModal from "@/components/Modals/SignUpModal";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error("Failed to load content", err));
  }, []);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);
  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  return (
    <>
      {/* Header & Banner Wrapper Section */}
      <div className="banner-wrapper position-relative overflow-hidden">
        <Header 
          onContactClick={openContactModal} 
          onSignUpClick={openSignUpModal}
          content={content?.header}
        />
        <Banner 
          onSignUpClick={openSignUpModal} 
          content={content?.banner}
        />
        <JoinCompanies />
      </div>

      {/* Features Sections */}
      <FeaturesPink 
        onSignUpClick={openSignUpModal} 
        content={content?.features?.pink}
      />
      <FeaturesPrimary 
        onSignUpClick={openSignUpModal} 
        content={content?.features?.primary}
      />
      <FeaturesGreen 
        onSignUpClick={openSignUpModal} 
        content={content?.features?.green}
      />
      <FeaturesCyan 
        onSignUpClick={openSignUpModal} 
        content={content?.features?.cyan}
      />

      {/* Testimonial Section */}
      <Testimonial content={content?.testimonials} />

      {/* Support Section */}
      <FeaturesPurple content={content?.features?.purple} />

      {/* Footer */}
      <Footer 
        onSignUpClick={openSignUpModal} 
        content={content?.footer}
      />

      {/* Modals */}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} />

      {/* Floating Buttons */}
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
}
