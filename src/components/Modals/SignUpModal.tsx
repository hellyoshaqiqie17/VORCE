"use client";

import { useState } from "react";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.checkValidity()) {
      console.log("Sign up email:", email);
      onClose();
    }
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog h-100 m-0" style={{ maxWidth: "100%" }}>
        <div className="modal-content bg-transparent h-100 border-0 rounded-0" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
          <div className="modal-body d-flex align-items-center">
            <button 
              type="button" 
              className="modal__closer d-inline-flex align-items-center justify-content-center rounded-circle bg-transparent position-absolute"
              onClick={onClose}
              style={{ top: "20px", right: "20px", width: "50px", height: "50px", border: "2px solid rgba(255,255,255,0.5)", color: "white" }}
            >
              <span className="material-icons">close</span>
            </button>
            <div className="modal-body__content d-md-flex flex-wrap align-items-center w-100 justify-content-center">
              <div className="modal-body__content__heading position-relative text-center text-md-left mb-4" style={{ maxWidth: "500px" }}>
                <h1 className="modal-body__title" style={{ color: "white", fontSize: "2.5rem", fontWeight: "800" }}>Sign up for FREE</h1>
                <h5 className="modal-body__sub-title" style={{ color: "rgba(255,255,255,0.8)", fontWeight: "400" }}>and start using ClickDown in seconds!</h5>
              </div>
              <div className="signup-form-wrapper w-100" style={{ maxWidth: "500px" }}>
                <form 
                  onSubmit={handleSubmit}
                  className={`signup-form bg-white d-sm-flex align-items-center ${isSubmitted ? "was-validated" : "needs-validation"}`}
                  noValidate
                  style={{ borderRadius: "18px", padding: "10px" }}
                >
                  <input 
                    type="email" 
                    className="form-control border-0 shadow-none bg-transparent" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ minHeight: "50px" }}
                  />
                  <div className="invalid-tooltip bg-transparent" style={{ color: "#e04f44", position: "static" }}>
                    Please enter a valid email address
                  </div>
                  <button type="submit" className="primary-btn primary-btn--primary dark-hover flex-shrink-0">
                    Get ClickDown
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
