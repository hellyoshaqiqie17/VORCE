"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div 
      className="scroll-top position-fixed" 
      style={{ 
        display: isVisible ? "block" : "none",
        bottom: "3%",
        right: "1%",
        zIndex: 7,
      }}
    >
      <button 
        className="scroll-top__btn border-0 d-inline-flex align-items-center justify-content-center"
        onClick={scrollToTop}
      >
        <span className="material-icons">keyboard_arrow_up</span>
      </button>
    </div>
  );
}
