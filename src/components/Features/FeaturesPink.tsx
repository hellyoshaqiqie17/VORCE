"use client";

import { useState } from "react";
import Image from "next/image";

interface FeaturesPinkProps {
  onSignUpClick: () => void;
  content?: any;
}

export default function FeaturesPink({ onSignUpClick, content }: FeaturesPinkProps) {
  const [activeTab, setActiveTab] = useState("projectAndTasks");

  const tabs = content?.tabs || [
    { id: "projectAndTasks", label: "Project & Tasks" },
    { id: "chat", label: "Chat" },
    { id: "goals", label: "Goals" },
    { id: "views", label: "Views" },
  ];

  const tabContent = content?.content || {
    projectAndTasks: {
      title: "Simplify work and get more done.",
      text: "Plan, track, and manage any type of work with project management that flexes to your team's needs.",
      video: "",
      poster: "",
      replaces: ["Asana", "Monday", "Jira"],
    },
    // ... fallback content handled by || logic above if content is missing
  };

  const currentContent = tabContent[activeTab] || tabContent[Object.keys(tabContent)[0]];

  return (
    <section className="features features--pink">
      <div className="features__container mx-auto">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="nav nav-pills mb-3" role="tablist">
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
                  <div className="row flex-lg-row-reverse">
                    <div className="col-xl-7 offset-xl-1 col-lg-6">
                      <div className="features__videos-wrapper features__videos-wrapper--negative-margin">
                        {currentContent?.video ? (
                          <video
                            src={currentContent.video}
                            poster={currentContent.poster}
                            className="features__videos w-100 h-100"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        ) : (
                          <Image
                            src={currentContent?.poster || ""}
                            alt="features image"
                            width={600}
                            height={400}
                            className="features__videos w-100 h-100"
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                      <h2 className="features__title">{currentContent?.title}</h2>
                      <p className="features__text">{currentContent?.text}</p>
                      <div className="features__list-wrapper d-flex align-items-end flex-wrap">
                        <span className="features__list-head text-uppercase">Replaces:</span>
                        <ul className="features__list nav">
                          {currentContent?.replaces?.map((item: string) => (
                            <li key={item} className="features__list__item nav-item position-relative">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        className="primary-btn primary-btn--pink dark-hover"
                        onClick={onSignUpClick}
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
