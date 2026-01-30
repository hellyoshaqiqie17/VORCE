"use client";

import { useState } from "react";
import Image from "next/image";

interface FeaturesGreenProps {
  onSignUpClick: () => void;
  content?: any;
}

export default function FeaturesGreen({ onSignUpClick, content }: FeaturesGreenProps) {
  const [activeTab, setActiveTab] = useState("import");

  const tabs = content?.tabs || [
    { id: "import", label: "Import", num: "01" },
    { id: "download", label: "Download", num: "02" },
    { id: "clickApps", label: "ClickApps", num: "03" },
    { id: "integrations", label: "Integrations", num: "04" },
    { id: "automations", label: "Automations", num: "05" },
  ];

  const tabContent = content?.content || {
    import: {
      title: "Import to the future of work with one click.",
      text: "Instantly import your work from other tools automatically. Create a custom import to bring work in from excel or tools that aren't supported.",
      video: "/assets/videos/features-3a.mp4",
      poster: "/assets/images/videos-poster/features-3a.png",
    },
    // ... fallback handled by logic below
  };

  const currentContent = tabContent[activeTab] || tabContent[Object.keys(tabContent)[0]];

  const integrations = [
    "integrations-1.svg", "integrations-2.png", "integrations-3.svg", "integrations-4.svg",
    "integrations-5.svg", "integrations-6.png", "integrations-7.png",
    "integrations-8.png", "integrations-9.png", "integrations-10.png", "integrations-11.svg",
    "integrations-12.png", "integrations-13.png", "integrations-14.svg",
    "integrations-15.svg", "integrations-16.png", "integrations-17.png", "integrations-18.svg",
  ];

  const PlatformIcon = () => (
    <svg width="28" height="31" viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.73 13.8844L11.73 27.1252L24.9707 27.1252L24.9707 13.8844H11.73ZM24.9707 10.8751C26.6327 10.8751 27.98 12.2224 27.98 13.8844V27.1252C27.98 28.7871 26.6327 30.1344 24.9707 30.1344H11.73C10.068 30.1344 8.7207 28.7871 8.7207 27.1252V24.2546C8.34421 24.1469 7.97526 24.0214 7.61484 23.8789C6.97387 23.6256 6.35986 23.3189 5.7783 22.9642C2.31324 20.8511 0 17.0368 0 12.6806C0 6.03273 5.38918 0.643555 12.0371 0.643555C14.7433 0.643555 17.2409 1.5366 19.2513 3.04407C21.5976 4.80345 23.2803 7.39975 23.8564 10.39C23.8874 10.5506 23.9151 10.7123 23.9396 10.8751H24.9707ZM8.7207 21.0803C7.58727 20.6324 6.56618 19.9616 5.71143 19.1219C4.47076 17.903 3.58055 16.3285 3.20601 14.5638C3.07708 13.9563 3.00927 13.3263 3.00927 12.6806C3.00927 7.6947 7.05115 3.65282 12.0371 3.65282C15.2529 3.65282 18.076 5.33423 19.6752 7.86587C20.2479 8.77262 20.6637 9.78843 20.8843 10.8751H11.73C10.068 10.8751 8.7207 12.2224 8.7207 13.8844V21.0803Z" fill="currentColor"></path>
    </svg>
  );

  return (
    <section className="features features--green">
      <div className="features__container features__container--has-btn mx-auto overflow-hidden">
        <div className="container">
          <div className="row flex-md-column-reverse">
            <div className="col-12">
              <div className="row">
                <div className="col-lg-5">
                  <ul className="nav nav-pills nav-pills--with-count mb-3" role="tablist">
                    {tabs.map((tab: any) => (
                      <li key={tab.id} className="nav-item" role="presentation">
                        <a
                          className={`nav-link d-flex align-items-center position-relative ${activeTab === tab.id ? "active" : ""}`}
                          onClick={() => setActiveTab(tab.id)}
                          role="tab"
                          style={{ cursor: "pointer" }}
                        >
                          <span className="nav-link__count d-inline-flex align-items-center justify-content-center rounded-circle">
                            {tab.num}
                          </span>
                          {tab.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="tab-content">
                <div className="tab-pane fade show active">
                  <div className="row flex-lg-row-reverse">
                    <div className="col-xl-7 offset-xl-1 col-lg-6">
                      <div className="features__videos-wrapper features__videos-wrapper--positive-margin">
                        {activeTab === "integrations" ? (
                          <div>
                            {[0, 1, 2, 3, 4].map((rowIdx) => (
                              <div key={rowIdx} className="features__integrations-wrapper">
                                {integrations.slice(rowIdx * 4, (rowIdx + 1) * 4).map((img, idx) => (
                                  <a key={idx} href="#!" className="features__integrations__card d-inline-flex align-items-center justify-content-center">
                                    <Image src={`/assets/images/integrations/${img}`} alt="integrations" width={40} height={40} className="features__integrations__card__image" />
                                  </a>
                                ))}
                              </div>
                            ))}
                            <div className="features__integrations-wrapper text-center">
                              <a href="#!" className="features__integrations__btn d-inline-block">
                                100+ more integrations. <span className="primary-text">See all</span>
                              </a>
                            </div>
                          </div>
                        ) : currentContent?.isImage ? (
                          <Image src={currentContent.poster} alt="features image" width={600} height={400} className="w-100 h-100" />
                        ) : (
                          <video
                            src={currentContent?.video}
                            poster={currentContent?.poster}
                            className="features__videos w-100 h-100"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                      <div className="features__icon-block d-inline-flex align-items-center justify-content-center">
                        <PlatformIcon />
                      </div>
                      <h3 className="features__sub-title text-uppercase">the platform</h3>
                      <h2 className="features__title">{currentContent?.title}</h2>
                      <p className="features__text">{currentContent?.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="features__btn w-100" onClick={onSignUpClick}>
          <span className="features__btn__text d-inline-flex align-items-center">
            Get Started <span className="material-icons features__btn__icon">arrow_forward</span>
          </span>
        </button>
      </div>
    </section>
  );
}
