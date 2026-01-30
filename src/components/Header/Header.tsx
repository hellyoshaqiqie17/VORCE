"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  onContactClick: () => void;
  onSignUpClick: () => void;
  content?: any;
}

export default function Header({ onContactClick, onSignUpClick, content }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.documentElement.classList.toggle("overflow-hidden");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.documentElement.classList.remove("overflow-hidden");
  };

  return (
    <>
      <div className="header-height-fix"></div>
      <header className={`header ${isScrolled ? "header--fixed" : ""}`}>
        <nav className="navbar navbar-expand-lg py-0">
          <div className="container">
            <Link href="/" className="navbar-brand d-flex align-items-center">
              <Image
                src={content?.logo || "/assets/images/logo/logo-mark.svg"}
                alt="logo-mark"
                width={40}
                height={40}
                className="navbar-brand__logo"
              />
              <span className="navbar-brand__text d-inline-block">{content?.title || "ClickDown"}</span>
            </Link>
            
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation"
            >
              <span className="material-icons">menu</span>
            </button>

            <div className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`}>
              <ul className="navbar-nav text-center ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">Product</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">Learn</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                  <a 
                    className="nav-link" 
                    href="javascript:void(0)"
                    onClick={() => { closeMobileMenu(); onContactClick(); }}
                  >
                    Contact Sales
                  </a>
                </li>
              </ul>
              <ul className="nav navbar-btn-nav">
                {/* Admin Login - Hidden for now */}
                <li className="nav-item" style={{ display: "none" }}>
                  <a href="/admin" className="nav-btn nav-btn--admin">
                    <span className="material-icons" style={{ fontSize: "16px", verticalAlign: "middle" }}>
                      admin_panel_settings
                    </span>{" "}
                    Admin
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Off Canvas Menu Closer */}
      <div 
        className={`offCanvasMenuCloser position-fixed ${isMobileMenuOpen ? "show" : ""}`}
        onClick={closeMobileMenu}
      ></div>
    </>
  );
}
