"use client";

import { useState } from "react";

interface FeaturesPrimaryProps {
  onSignUpClick: () => void;
  content?: any;
}

export default function FeaturesPrimary({ onSignUpClick, content }: FeaturesPrimaryProps) {
  const [activeTab, setActiveTab] = useState("docs");

  const tabs = content?.tabs || [
    { id: "docs", label: "Docs" },
    { id: "whiteboards", label: "Whiteboards" },
    { id: "dashboards", label: "Dashboards" },
  ];

  const tabContent = content?.content || {
    docs: {
      title: "The world's most powerful (and fun) Docs.",
      video: "/assets/videos/features-2a.mp4",
      poster: "/assets/images/videos-poster/features-2a.png",
    },
    // ... fallback handled by logic below
  };

  const currentContent = tabContent[activeTab] || tabContent[Object.keys(tabContent)[0]];

  return (
    <section className="features features--primary">
      <div className="features__container features__container--has-btn mx-auto overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="nav nav-pills justify-content-center mb-3" role="tablist">
                {tabs.map((tab: any) => (
                  <li key={tab.id} className="nav-item" role="presentation">
                    <a
                      className={`nav-link position-relative ${activeTab === tab.id ? "active" : ""}`}
                      onClick={() => setActiveTab(tab.id)}
                      role="tab"
                      style={{ cursor: "pointer" }}
                    >
                      {tab.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12">
              <div className="tab-content">
                <div className="tab-pane fade show active">
                  <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-10 text-center mb-2">
                      <h2 className="features__title">{currentContent?.title}</h2>
                    </div>
                    <div className="col-xl-9 col-lg-11">
                      <div className="features__videos-wrapper">
                        <video
                          src={currentContent?.video}
                          poster={currentContent?.poster}
                          className="features__videos w-100 h-100"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      </div>
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
