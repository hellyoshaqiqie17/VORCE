"use client";

import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  onSignUpClick: () => void;
  content?: any;
}

export default function Footer({ onSignUpClick, content }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer__card bg-white d-md-flex align-items-center justify-content-between">
              <div className="footer__card__content">
                <h1 className="footer__card__title">{content?.title || "One site to replace them all."}</h1>
                <p className="footer__card__text">{content?.description || "All of your work in one place: Tasks, Docs, Chat, Goals, & more."}</p>
              </div>
              <div className="footer__card__btn-wrapper">
                <button 
                  className="primary-btn primary-btn--primary dark-hover"
                  onClick={onSignUpClick}
                >
                  {content?.buttonText || "Free Forever"}
                </button>
              </div>
            </div>
            
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6">
                <div className="footer__icon-card text-center d-sm-flex align-items-center">
                  <div className="footer__icon-card__image-wrapper">
                    <Image src="/assets/images/footer/footer-icon-1.svg" alt="footer-icon" width={50} height={50} className="footer__icon-card__image" />
                  </div>
                  <div className="footer__icon-card__content">
                    <a href="#!" className="footer__icon-card__link">Free training</a>
                    <span>&</span>
                    <a href="#!" className="footer__icon-card__link">24-hour support</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="footer__icon-card text-center d-sm-flex align-items-center">
                  <div className="footer__icon-card__image-wrapper">
                    <Image src="/assets/images/footer/footer-icon-2.svg" alt="footer-icon" width={50} height={50} className="footer__icon-card__image" />
                  </div>
                  <div className="footer__icon-card__content">
                    <span>Serious about</span>
                    <a href="#!" className="footer__icon-card__link">security & privacy</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="footer__icon-card text-center d-sm-flex align-items-center">
                  <div className="footer__icon-card__image-wrapper">
                    <Image src="/assets/images/footer/footer-icon-3.svg" alt="footer-icon" width={50} height={50} className="footer__icon-card__image" />
                  </div>
                  <div className="footer__icon-card__content">
                    <a href="#!" className="footer__icon-card__link">Highest levels of uptime</a>
                    <span>the last 12 months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-12">
            <div className="footer__main">
              <div className="row justify-content-between">
                {["ClickUp", "Resources", "Features", "Compare", "Block"].map((title, idx) => (
                  <div key={idx} className="col-xl-auto col-md-3 col-6">
                    <div className="footer__block">
                      <h4 className="footer__block__title text-uppercase">{title}</h4>
                      <ul className="footer__block__list">
                        <li className="footer__block__list__item">
                          <a href="#!" className="footer__block__list__link">Download</a>
                        </li>
                        <li className="footer__block__list__item">
                          <a href="#!" className="footer__block__list__link">Careers</a>
                        </li>
                        <li className="footer__block__list__item">
                          <a href="#!" className="footer__block__list__link">About Us</a>
                        </li>
                      </ul>
                      {title === "Block" && (
                        <ul className="footer__block__list">
                          <li className="footer__block__list__item">
                            <a href="#!" className="footer__block__list__app-btn d-inline-block">
                              <Image src="/assets/images/app/app-store-badge-white.png" alt="app-store" width={120} height={40} />
                            </a>
                          </li>
                          <li className="footer__block__list__item">
                            <a href="#!" className="footer__block__list__app-btn d-inline-block">
                              <Image src="/assets/images/app/google-play-badge-white.png" alt="google-play" width={120} height={40} />
                            </a>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="footer__bottom">
              <div className="row align-items-center">
                <div className="col-md-6 text-center text-md-left">
                  <Link href="/" className="footer-brand d-inline-flex align-items-center">
                    <Image src="/assets/images/logo/logo-mark.svg" alt="logo-mark" width={30} height={30} className="footer-brand__logo" />
                    <span className="footer-brand__text d-inline-block">ClickDown</span>
                  </Link>
                  <p className="footer__copyright mb-0 mt-2">
                    {content?.copyright || "© 2022 ClickUp"}
                    <a href="#!" className="footer__copyright__link d-inline-block position-relative">Security</a>
                    <a href="#!" className="footer__copyright__link d-inline-block position-relative">Your Privacy</a>
                    <a href="#!" className="footer__copyright__link d-inline-block position-relative">Terms</a>
                  </p>
                </div>
                <div className="col-md-6 mt-4 mt-md-0">
                  <ul className="footer__social-list nav justify-content-center justify-content-md-end">
                    {["linkedin", "fb", "instagram", "twitter"].map((social) => (
                      <li key={social} className="footer__social-list__item nav-item">
                        <a href="#!" className="footer__social-list__link d-inline-block">
                          <Image src={`/assets/images/social/${social}.svg`} alt={social} width={24} height={24} className="footer__social-list__link__image" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
