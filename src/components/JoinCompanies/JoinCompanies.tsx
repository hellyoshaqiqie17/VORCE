"use client";

import Image from "next/image";

export default function JoinCompanies() {
  const companies = [
    { name: "google", src: "/assets/images/join-companies/google.svg" },
    { name: "webflow", src: "/assets/images/join-companies/webflow.svg" },
    { name: "booking-com", src: "/assets/images/join-companies/booking-com.svg" },
    { name: "ibm", src: "/assets/images/join-companies/ibm.svg" },
    { name: "padres", src: "/assets/images/join-companies/padres.svg" },
  ];

  return (
    <section className="join-companies">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="join-companies__title">Join 800,000+ highly productive teams</h1>
            <ul className="join-companies__list nav align-items-center justify-content-center">
              {companies.map((company) => (
                <li key={company.name} className="join-companies__list__item nav-item">
                  <Image 
                    src={company.src} 
                    alt={company.name} 
                    width={100}
                    height={30}
                    className="join-companies__list__item__image"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
