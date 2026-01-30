"use client";

import { useState } from "react";
import Image from "next/image";

interface FeaturesCyanProps {
  onSignUpClick: () => void;
  content?: any;
}

const FeatureIcon1 = () => (
  <svg fill="none" height="22" viewBox="0 0 28 22" width="28" xmlns="http://www.w3.org/2000/svg">
    <path clipRule="evenodd" d="m3.90798 11.7969c-.17812-.3118-.32158-.5826-.43026-.7969.10868-.2143.25214-.4851.43026-.7968.47031-.82301 1.17342-1.91563 2.10469-3.0021 1.88302-2.19686 4.54643-4.20106 7.98763-4.20106 3.4413 0 6.1047 2.0042 7.9877 4.20106.9313 1.08647 1.6344 2.17909 2.1047 3.0021.1781.3117.3215.5825.4302.7968-.1087.2143-.2521.4851-.4302.7969-.4703.823-1.1734 1.9156-2.1047 3.0021-1.883 2.1968-4.5464 4.201-7.9877 4.201-3.4412 0-6.10461-2.0042-7.98763-4.201-.93127-1.0865-1.63438-2.1791-2.10469-3.0021z" fill="#2a2e34" fillRule="evenodd"></path>
  </svg>
);

const FeatureIcon2 = () => (
  <svg fill="none" height="30" viewBox="0 0 30 30" width="30" xmlns="http://www.w3.org/2000/svg">
    <path clipRule="evenodd" d="m7.50008 3c-1.03553 0-1.875.83947-1.875 1.875s.83947 1.875 1.875 1.875 1.875-.83947 1.875-1.875-.83947-1.875-1.875-1.875z" fill="#2a2e34" fillRule="evenodd"></path>
  </svg>
);

const FeatureIcon3 = () => (
  <svg fill="none" height="26" viewBox="0 0 26 26" width="26" xmlns="http://www.w3.org/2000/svg">
    <path clipRule="evenodd" d="m10.1339.866117c.4881.488153.4881 1.279613 0 1.767763l-5.00002 5c-.48815.48816-1.27961.48816-1.76776 0l-2.500003-2.5c-.488156-.48815-.488156-1.27961 0-1.76776.488153-.48816 1.279613-.48816 1.767763 0l1.61612 1.61611 4.11612-4.116113c.48815-.488156 1.27961-.488156 1.76778 0z" fill="#2a2e34" fillRule="evenodd"></path>
  </svg>
);

export default function FeaturesCyan({ onSignUpClick, content }: FeaturesCyanProps) {
  const [activeTab, setActiveTab] = useState("projectManagement");

  const tabs = content?.tabs || [
    { id: "projectManagement", label: "Project Management" },
    { id: "engineering", label: "Engineering" },
    { id: "sales", label: "Sales" },
    { id: "marketing", label: "Marketing" },
    { id: "product", label: "Product" },
    { id: "design", label: "Design" },
    { id: "finance", label: "Finance" },
    { id: "hr", label: "HR" },
    { id: "it", label: "IT" },
  ];

  const images: Record<string, string> = content?.images || {
    projectManagement: "/assets/images/features/features-4a.png",
    engineering: "/assets/images/features/features-4b.png",
    sales: "/assets/images/features/features-4c.png",
    marketing: "/assets/images/features/features-4d.png",
    product: "/assets/images/features/features-4e.png",
    design: "/assets/images/features/features-4f.png",
    finance: "/assets/images/features/features-4g.png",
    hr: "/assets/images/features/features-4h.png",
    it: "/assets/images/features/features-4i.png",
  };

  const featureItems = [
    { icon: <FeatureIcon1 />, title: "Visualize & plan", text: "Manage any project from start to finish with highly customizable views that make project planning a breeze." },
    { icon: <FeatureIcon2 />, title: "Collaborate", text: "Work with your team in real-time with Chat, assign comments for action items, and never miss a beat with notifications that bring everything in one place." },
    { icon: <FeatureIcon3 />, title: "Track progress", text: "Add visual widgets for team members, tasks, sprints, time tracking, statuses, docs, embeds, and more." },
  ];

  return (
    <section className="features features--cyen">
      <div className="features__container mx-auto">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h3 className="features__sub-title text-uppercase">{content?.subtitle || "best support in software"}</h3>
              <h1 className="features__title">{content?.title || "Built for teams from 1 to 1,000+."}</h1>
            </div>
            <div className="col-12">
              <ul className="nav nav-pills justify-content-center mb-5" role="tablist">
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
                    <div className="col-xl-7 offset-xl-1 col-lg-6 mb-5 mb-lg-0">
                      <div className="features__videos-wrapper">
                        <Image 
                          src={images[activeTab]} 
                          alt="features image" 
                          width={600} 
                          height={400} 
                          className="features__videos w-100 h-100"
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                      <ul className="features__details-list">
                        {featureItems.map((item, idx) => (
                          <li key={idx} className="features__details-list__item d-flex">
                            <div className="features__details-list__item__icon-block flex-shrink-0 d-inline-flex align-items-center justify-content-center">
                              {item.icon}
                            </div>
                            <div className="features__details-list__item__content">
                              <h4 className="features__details-list__item__content__title">{item.title}</h4>
                              <p className="features__details-list__item__content__text">{item.text}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <button className="primary-btn primary-btn--cyen dark-hover" onClick={onSignUpClick}>
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
