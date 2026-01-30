"use client";

import { useState } from "react";
import Image from "next/image";

interface TestimonialProps {
  content?: any[];
}

export default function Testimonial({ content }: TestimonialProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = content || [
    {
      image: "/assets/images/reviews/testimonial-1.png",
      video: "https://www.youtube.com/watch?v=f_exDBcGYnM",
      text: "We selected ClickUp for its powerful, no code feature set, out-of-the-box organizational visibility, ease-of-use for non-engineers, and forward-thinking approach to project management.",
      user: "Leonard DeSouza, Webflow",
      logo: "/assets/images/reviews/webflow.svg",
    },
    // ... fallback handled by logic below
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonial = testimonials[currentSlide];

  return (
    <section className="testimonial">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="testimonial__slider position-relative">
              <div className="testimonial__slide">
                <div className="testimonial__card">
                  <div className="row">
                    <div className="col-lg-5">
                      <div className="testimonial__card__head d-flex align-items-center position-relative">
                        <Image 
                          src={testimonial.image} 
                          alt="testimonial image" 
                          width={400} 
                          height={300}
                          className="testimonial__card__head__image img-fluid"
                        />
                        <a 
                          href={testimonial.video} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="testimonial__card__play-btn rounded-circle position-absolute"
                        >
                          <Image 
                            src="/assets/images/icons/play.svg" 
                            alt="play icon" 
                            width={30} 
                            height={30}
                            className="testimonial__card__play-btn__image"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-7 d-flex align-items-center">
                      <div className="testimonial__card__body">
                        <p className="testimonial__card__text">{testimonial.text}</p>
                        <h4 className="testimonial__card__user">{testimonial.user}</h4>
                        <a href="#!" className="testimonial__card__user-logo d-inline-block">
                          <Image 
                            src={testimonial.logo} 
                            alt="company logo" 
                            width={100} 
                            height={30}
                            className="testimonial__card__user-logo__image"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Slider Navigation */}
              <button 
                className="slick__arrows slick__arrows--left rounded-circle d-inline-flex align-items-center justify-content-center position-absolute"
                onClick={prevSlide}
                disabled={currentSlide === 0}
              >
                <Image 
                  src="/assets/images/icons/arrow-left-dark.svg" 
                  alt="prev" 
                  width={15} 
                  height={15}
                  className="slick__arrows__image"
                />
              </button>
              <button 
                className="slick__arrows slick__arrows--right rounded-circle d-inline-flex align-items-center justify-content-center position-absolute"
                onClick={nextSlide}
                disabled={currentSlide === testimonials.length - 1}
              >
                <Image 
                  src="/assets/images/icons/arrow-right-dark.svg" 
                  alt="next" 
                  width={15} 
                  height={15}
                  className="slick__arrows__image"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
