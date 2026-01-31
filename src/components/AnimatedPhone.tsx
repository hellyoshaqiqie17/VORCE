import { useEffect, useRef, useState } from "react";

export default function AnimatedPhone() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // List of brands to be absorbed into Vorce
  const brands = [
    { icon: "chat", color: "#25D366", label: "WhatsApp", delay: 0, pos: { top: '10%', left: '-20%' } },
    { icon: "place", color: "#EA4335", label: "Maps", delay: 1.5, pos: { top: '30%', right: '-25%' } },
    { icon: "storefront", color: "#4285F4", label: "Business", delay: 3, pos: { bottom: '20%', left: '-25%' } },
    { icon: "send", color: "#0088cc", label: "Telegram", delay: 4.5, pos: { top: '-5%', right: '10%' } },
    { icon: "view_kanban", color: "#0079BF", label: "Trello", delay: 2, pos: { bottom: '40%', right: '-30%' } },
    { icon: "add_to_drive", color: "#0F9D58", label: "Drive", delay: 5, pos: { top: '50%', left: '-30%' } },
    { icon: "assignment_turned_in", color: "#E44332", label: "Todoist", delay: 3.5, pos: { bottom: '-5%', right: '20%' } },
    { icon: "groups", color: "#7B83EB", label: "Teams", delay: 1, pos: { top: '-10%', left: '30%' } },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (phoneRef.current) {
      observer.observe(phoneRef.current);
    }

    const handleScroll = () => {
      if (!phoneRef.current) return;
      const rect = phoneRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      // Calculate scroll progress (0 to 1)
      const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + rect.height)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={phoneRef} className={`svg-phone-container ${isVisible ? 'visible' : ''}`}>
      
      {/* Brand Icons Floating & Absorbing */}
      {brands.map((brand, i) => (
        <div 
          key={i}
          className="brand-orb"
          style={{
            '--orb-color': brand.color,
            '--orb-delay': `${brand.delay}s`,
          } as React.CSSProperties}
        >
          <div className="orb-inner-container">
            <div className="orb-icon">
              <span className="material-icons">{brand.icon}</span>
            </div>
            <div className="orb-label">{brand.label}</div>
          </div>
        </div>
      ))}

      {/* Main Phone SVG */}
      <svg className="phone-svg" viewBox="0 0 280 560" fill="none" style={{ transform: `perspective(1000px) rotateY(${(scrollProgress - 0.5) * 10}deg) rotateX(${(scrollProgress - 0.5) * -5}deg)` }}>
        <defs>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="280" y2="560" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F8FAFC" />
            <stop offset="1" stopColor="#E2E8F0" />
          </linearGradient>
          <filter id="dropshadow" x="-20" y="-20" width="320" height="600" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="20" stdDeviation="20" floodColor="#000" floodOpacity="0.15"/>
          </filter>
          <clipPath id="screenClip">
            <rect x="12" y="12" width="256" height="536" rx="36" />
          </clipPath>
          {/* Vorce Logo Gradient */}
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7B68EE"/>
            <stop offset="100%" stopColor="#E352FF"/>
          </linearGradient>
        </defs>

        {/* Phone Body */}
        <rect x="0" y="0" width="280" height="560" rx="48" fill="#24223E" filter="url(#dropshadow)" />
        <rect x="4" y="4" width="272" height="552" rx="44" stroke="#484569" strokeWidth="2" />
        
        {/* Screen Area */}
        <g clipPath="url(#screenClip)">
          {/* Background */}
          <rect x="12" y="12" width="256" height="536" fill="white" />
          
          {/* Header Background */}
          <rect x="12" y="12" width="256" height="140" fill="url(#logoGrad)" />
          
          {/* Dynamic Notch Island */}
          <rect x="80" y="24" width="120" height="30" rx="15" fill="#1e293b" />
          <circle cx="170" cy="39" r="4" fill="#10b981" className="recording-dot" />
          
          {/* Time & Status Bar */}
          <text x="140" y="55" textAnchor="middle" fontSize="12" fontWeight="600" fill="white" opacity="0.9">09:41</text>
          
          {/* App Header Title */}
          <text x="140" y="100" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">Smart Attendance</text>
          
          {/* Location Card */}
          <g transform="translate(28, 130)">
            <rect x="0" y="0" width="224" height="60" rx="16" fill="white" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.08))" />
            <circle cx="30" cy="30" r="18" fill="#eff6ff" />
            <text x="21" y="39" className="material-icons" fontSize="18" fill="#3b82f6" style={{fontFamily: 'Material Icons'}}>place</text>
            <text x="60" y="25" fontSize="12" fontWeight="bold" fill="#333">Lokasi Terdeteksi</text>
            <text x="60" y="42" fontSize="10" fill="#888">Kantor Pusat - Jakarta</text>
            <circle cx="200" cy="30" r="4" fill="#22c55e" />
          </g>

          {/* Clock Display */}
          <g transform="translate(140, 260)">
             <circle r="80" fill="none" stroke="#f1f5f9" strokeWidth="6" />
             <circle r="80" fill="none" stroke="url(#logoGrad)" strokeWidth="6" strokeDasharray="300" strokeDashoffset={300 - (scrollProgress * 300)} strokeLinecap="round" style={{transform: 'rotate(-90deg)'}} />
             <text x="0" y="10" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#1e293b">08:45</text>
             <text x="0" y="35" textAnchor="middle" fontSize="12" fill="#64748b">Senin, 31 Jan</text>
          </g>

          {/* Clock In Button - Animated */}
          <g transform="translate(48, 400)" style={{cursor: 'pointer'}}>
             <rect x="0" y="0" width="184" height="56" rx="28" fill="url(#logoGrad)" filter="drop-shadow(0 10px 20px rgba(123, 104, 238, 0.4))" />
             <g transform="translate(50, 28)">
                <circle r="12" fill="white" opacity="0.2" />
                <path d="M-6 0 L6 0 M0 -6 L0 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
             </g>
             <text x="92" y="34" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" style={{letterSpacing: '0.5px'}}>CLOCK IN</text>
          </g>

          {/* Notification Popup (Animated) */}
          <g transform={`translate(${scrollProgress * 20}, ${180 + scrollProgress * 10})`} opacity={scrollProgress > 0.3 ? 1 : 0} style={{transition: 'all 0.5s ease'}}>
             <rect x="140" y="0" width="160" height="50" rx="12" fill="white" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.1))" />
             <path d="M155 25 L165 25 L160 15 Z" fill="#22c55e" transform="rotate(90 160 25)" />
             <text x="170" y="20" fontSize="11" fontWeight="bold" fill="#333">Absensi Berhasil!</text>
             <text x="170" y="35" fontSize="9" fill="#888">Tepat waktu 08:45</text>
          </g>

          {/* Stats Row Bottom */}
          <g transform="translate(28, 480)">
             <rect x="0" y="0" width="65" height="40" rx="10" fill="#f8fafc" />
             <text x="32" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">08:45</text>
             <text x="32" y="32" textAnchor="middle" fontSize="8" fill="#888">Masuk</text>

             <rect x="79" y="0" width="65" height="40" rx="10" fill="#f8fafc" />
             <text x="111" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">--:--</text>
             <text x="111" y="32" textAnchor="middle" fontSize="8" fill="#888">Keluar</text>

             <rect x="158" y="0" width="65" height="40" rx="10" fill="#f8fafc" />
             <text x="190" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">8h 0m</text>
             <text x="190" y="32" textAnchor="middle" fontSize="8" fill="#888">Durasi</text>
          </g>
        </g>
      </svg>

      {/* Style for animations */}
      <style jsx>{`
        .svg-phone-container {
          position: relative;
          width: 380px;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        .phone-svg {
          width: 300px;
          height: auto;
          z-index: 10;
          transition: transform 0.1s ease-out;
          filter: drop-shadow(0 30px 60px rgba(0,0,0,0.4));
        }

        .brand-orb {
          position: absolute;
          top: 50%;
          left: 50%;
          /* Start exactly at center */
          width: 0;
          height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
          pointer-events: none;
        }

        .orb-inner-container {
           /* This container handles the movement */
           display: flex;
           flex-direction: column;
           align-items: center;
           gap: 6px;
           animation: absorbAnimation 6s infinite cubic-bezier(0.4, 0, 0.2, 1);
           animation-delay: var(--orb-delay);
           opacity: 0; /* Change default to hidden */
        }
        
        .orb-icon {
          width: 44px;
          height: 44px;
          background: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          color: var(--orb-color);
          border: 1px solid rgba(0,0,0,0.05);
          position: relative;
        }

        .orb-icon::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 14px;
          border: 1px solid var(--orb-color);
          opacity: 0.3;
          animation: pulseBorder 2s infinite;
        }

        .orb-label {
          background: rgba(255,255,255,0.9);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 600;
          color: #333;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          white-space: nowrap;
        }

        @keyframes absorbAnimation {
            0% {
                /* Start: Hidden at origin */
                transform: translate(0, 0) scale(0);
                opacity: 0;
            }
            5% {
                /* Appear quickly at offset position */
                transform: translate(var(--offset-x), var(--offset-y)) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            45% {
                /* float slightly around offset */
               transform: translate(calc(var(--offset-x) + 10px), calc(var(--offset-y) - 10px)) scale(1);
               opacity: 1;
            }
            60% {
                /* SUCK IN: Move exactly to 0,0 (Center) */
                transform: translate(0, 0) scale(0.2);
                opacity: 0;
            }
            100% {
                transform: translate(0, 0) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes pulseBorder {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        
        /* Define Offsets from Center (0,0) */
        /* Center is (0,0). Positive X is Right, Positive Y is Down */
        /* Phone width approx 300px. So 150px is edge. */
        
        .brand-orb:nth-child(1) { --offset-x: -180px; --offset-y: -140px; } /* WA: Top Left */
        .brand-orb:nth-child(2) { --offset-x: 180px; --offset-y: -80px; }   /* Maps: Top Right */
        .brand-orb:nth-child(3) { --offset-x: -200px; --offset-y: 100px; }  /* Biz: Bot Left */
        .brand-orb:nth-child(4) { --offset-x: 190px; --offset-y: -180px; }  /* Tele: Top Right High */
        .brand-orb:nth-child(5) { --offset-x: 210px; --offset-y: 120px; }   /* Trello: Bot Right */
        .brand-orb:nth-child(6) { --offset-x: -160px; --offset-y: 200px; }  /* Drive: Bot Left Low */
        .brand-orb:nth-child(7) { --offset-x: 170px; --offset-y: 220px; }   /* Todoist: Bot Right Low */
        .brand-orb:nth-child(8) { --offset-x: 0px; --offset-y: -240px; }    /* Teams: Top Center */
        
        @media (max-width: 1024px) {
          .svg-phone-container {
            transform: scale(0.9);
          }
        }

        @media (max-width: 768px) {
          .svg-phone-container {
            width: 300px;
            height: 500px;
            margin: 40px auto;
            transform: scale(1);
          }
          .phone-svg {
            width: 260px;
          }
          /* Reduced offsets for mobile */
          .brand-orb:nth-child(1) { --offset-x: -140px; --offset-y: -120px; }
          .brand-orb:nth-child(2) { --offset-x: 140px; --offset-y: -60px; }
          .brand-orb:nth-child(3) { --offset-x: -150px; --offset-y: 80px; }
          .brand-orb:nth-child(4) { --offset-x: 140px; --offset-y: -140px; }
          .brand-orb:nth-child(5) { --offset-x: 150px; --offset-y: 100px; }
          .brand-orb:nth-child(6) { --offset-x: -120px; --offset-y: 160px; }
          .brand-orb:nth-child(7) { --offset-x: 130px; --offset-y: 180px; }
          .brand-orb:nth-child(8) { --offset-x: 0px; --offset-y: -200px; }
        }
      `}</style>
    </div>
  );
}
