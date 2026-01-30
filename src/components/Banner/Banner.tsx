"use client";

import { useState } from "react";
import Image from "next/image";

interface BannerProps {
  onSignUpClick: () => void;
  content?: any;
}

export default function Banner({ onSignUpClick, content }: BannerProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.checkValidity()) {
      // Handle form submission
      console.log("Email:", email);
    }
    setIsSubmitted(true);
  };

  return (
    <section className="banner">
      <div className="container">
        <div className="row flex-lg-row-reverse">
          <div className="col-lg-7">
            <div className="banner__image-wrapper">
              <Image 
                src={content?.image || "/assets/images/banner/banner-image.png"}
                alt="banner-image" 
                width={700}
                height={500}
                className="banner__image w-100"
                priority
              />
            </div>
          </div>
          <div className="col-lg-5">
            <h1 className="banner__title">
              {content?.title || (
                <>
                  <span className="d-lg-block">One site to</span>
                  replace them all.
                </>
              )}
            </h1>
            <p className="banner__text">{content?.subtitle || "All of your work in one place: Tasks, Docs, Chat, Goals, & more."}</p>
            
            <form 
              onSubmit={handleSubmit}
              className={`banner__form ${isSubmitted ? "was-validated" : "needs-validation"}`}
              noValidate
            >
              <div className="form-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="invalid-feedback text-center mt-0">
                  Please enter a valid email address 
                </div>
              </div>
            </form>
            
            <div className="banner__btn-wrapper">
              <button 
                className="primary-btn primary-btn--primary dark-hover"
                onClick={onSignUpClick}
              >
                {content?.buttonText || "Get Started"}
              </button>
            </div>
            
            <div className="banner__review-wrapper">
              <ul className="banner__review__list nav">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="banner__review__list__item nav-item">
                    <Image 
                      src="/assets/images/icons/star.svg" 
                      alt="star" 
                      width={20}
                      height={20}
                      className="banner__review__list__item__image img-fluid"
                    />
                  </li>
                ))}
                <li className="banner__review__list__item nav-item">
                  <span className="banner__review__list__item__text">Based on 10,000+ reviews on</span>
                </li>
              </ul>
              <div className="banner__review__partners d-flex flex-wrap">
                <a href="#!" target="_blank" className="banner__review__partners__link d-inline-block">
                  <Image src="/assets/images/reviews/reviews-1.png" alt="partners-logo" width={80} height={25} className="banner__review__partners__logo" />
                </a>
                <a href="#!" target="_blank" className="banner__review__partners__link d-inline-block">
                  <Image src="/assets/images/reviews/reviews-2.png" alt="partners-logo" width={80} height={25} className="banner__review__partners__logo" />
                </a>
                <a href="#!" target="_blank" className="banner__review__partners__link d-inline-block">
                  <Image src="/assets/images/reviews/reviews-3.svg" alt="partners-logo" width={80} height={25} className="banner__review__partners__logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
