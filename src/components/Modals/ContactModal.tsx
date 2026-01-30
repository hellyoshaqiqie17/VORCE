"use client";

import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    users: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.checkValidity()) {
      console.log("Form submitted:", formData);
      onClose();
    }
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0">
          <div className="modal-header d-flex align-items-center justify-content-center position-relative border-0">
            <h4 className="modal__title mb-0">Contact Sales</h4>
            <button 
              type="button" 
              className="modal__closer bg-transparent border-0 position-absolute" 
              onClick={onClose}
              style={{ right: "15px" }}
            >
              <span className="material-icons">close</span>
            </button>
          </div>
          <div className="modal-body">
            <form 
              onSubmit={handleSubmit}
              className={`modal__form ${isSubmitted ? "was-validated" : "needs-validation"}`}
              noValidate
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="first-name" className="form-label">First Name<sup className="form-label__required">*</sup></label>
                    <input 
                      type="text" 
                      id="first-name" 
                      className="form-control" 
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                    />
                    <div className="invalid-feedback">This field is required</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="last-name" className="form-label">Last Name<sup className="form-label__required">*</sup></label>
                    <input 
                      type="text" 
                      id="last-name" 
                      className="form-control" 
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                    />
                    <div className="invalid-feedback">This field is required</div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Work Email<sup className="form-label__required">*</sup></label>
                    <input 
                      type="email" 
                      id="email" 
                      className="form-control" 
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                    <div className="invalid-feedback">Please enter a valid email address</div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="form-control" 
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="users" className="form-label">How many users are you exploring ClickUp for?<sup className="form-label__required">*</sup></label>
                    <select 
                      id="users" 
                      className="custom-select form-control"
                      value={formData.users}
                      onChange={(e) => setFormData({...formData, users: e.target.value})}
                      required
                    >
                      <option value="" disabled>How many users</option>
                      <option value="0-10">0-10</option>
                      <option value="10-50">10-50</option>
                      <option value="51-250">51-250</option>
                      <option value="251-500">251-500</option>
                      <option value="501+">501+</option>
                    </select>
                    <div className="invalid-feedback">Required</div>
                  </div>
                </div>
                <div className="col-12">
                  <button type="submit" className="primary-btn primary-btn--primary dark-hover shadow-none font-weight-normal rounded w-100">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
