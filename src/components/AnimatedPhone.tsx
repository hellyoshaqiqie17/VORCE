import { useEffect, useRef, useState } from "react";

export default function AnimatedPhone() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scaleFactor = isMobile ? 0.55 : 1;
  
  const brands = [
    { name: "WhatsApp", color: "#25D366", delay: 0, pos: { x: -180, y: -120 }, logo: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>) },
    { name: "Telegram", color: "#0088cc", delay: 1, pos: { x: 200, y: -40 }, logo: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>) },
    { name: "MS Teams", color: "#6264A7", delay: 2, pos: { x: 160, y: -120 }, logo: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12.5 13.5v-7h8v7h-8zm-11.5 5.5v-9h7v9h-7zm0-16.5v6.5h6.5v-6.5h-6.5zm8 6.5h7v-3h-7v3z" opacity=".8"/><path d="M16 9.5l-3.5 1.5v3.5l3.5 1.5 3.5-1.5v-3.5l-3.5-1.5z" fill="#5059C9"/><path d="M8 9.5l-3.5 1.5v3.5l3.5 1.5 3.5-1.5v-3.5l-3.5-1.5z" fill="#5059C9"/></svg>) },
    { name: "Google Map", color: "#EA4335", delay: 3, pos: { x: 190, y: 70 }, logo: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path fill="#1A73E8" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>) },
    { name: "Trello", color: "#0079BF", delay: 4, pos: { x: 160, y: 180 }, logo: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.656 1.343 3 3 3h18c1.656 0 3-1.344 3-3V3c0-1.657-1.344-3-3-3zM10.44 18.18c0 .795-.645 1.44-1.44 1.44H4.56c-.795 0-1.44-.646-1.44-1.44V5.82c0-.795.645-1.44 1.44-1.44H9c.795 0 1.44.645 1.44 1.44v12.36zm10.44-6c0 .794-.645 1.44-1.44 1.44H15c-.795 0-1.44-.646-1.44-1.44V5.82c0-.795.646-1.44 1.44-1.44h4.44c.795 0 1.44.645 1.44 1.44v6.36z"/></svg>) },
    { name: "Slack", color: "#4A154B", delay: 5, pos: { x: -180, y: -200 }, logo: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path fill="#E01E5A" d="M6 15c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2h2v2zm1 0c0-1.1.9-2 2-2s2 .9 2 2v5c0 1.1-.9 2-2 2s-2-.9-2-2v-5z"/><path fill="#36C5F0" d="M9 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2v2H9zm0 1c1.1 0 2 .9 2 2s-.9 2-2 2H4c-1.1 0-2-.9-2-2s.9-2 2-2h5z"/><path fill="#2EB67D" d="M18 9c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2h-2V9zm-1 0c0 1.1-.9 2-2 2s-2-.9-2-2V4c0-1.1.9-2 2-2s2 .9 2 2v5z"/><path fill="#ECB22E" d="M15 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2v-2h2zm0-1c-1.1 0-2-.9-2-2s.9-2 2-2h5c1.1 0 2 .9 2 2s-.9 2-2 2h-5z"/></svg>) },
    { name: "Google Drive", color: "#4285F4", delay: 6, pos: { x: -170, y: 0 }, logo: (<svg viewBox="0 0 87.3 78" fill="none" width="18" height="18"><path d="M6.6 66.85L0 56.15 28.95 6.85l13.25 23z" fill="#0066DA"/><path d="M43.65 25L29.4 1.2 58.35 1.15l14.25 23z" fill="#00AC47"/><path d="M73.55 26.8L59.8 3H87.3l-13.75 23.8z" fill="#EA4335"/><path d="M43.65 25L58.35 1.15 73.55 26.8 58.85 50.6z" fill="#00832D"/><path d="M58.85 50.6L73.55 26.8 87.3 51.45 72.6 75.25z" fill="#2684FC"/><path d="M58.85 50.6L43.65 25 28.95 6.85 6.6 66.85l13.75 8.4z" fill="#FFBA00"/></svg>) },
    { name: "OneDrive", color: "#0078D4", delay: 7, pos: { x: 220, y: -120 }, logo: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M13.8 11.6c-.2-.4-.4-.7-.7-1-.1-.1-.2-.2-.3-.3.3-.1.6-.2.9-.4 1.8-.8 2.6-2.8 1.8-4.6-.8-1.8-2.8-2.6-4.6-1.8-1.1.5-1.9 1.4-2.2 2.5-.5-.1-1-.1-1.5 0C5.4 6.5 4 8.4 4.5 10.2c.3 1.1 1.1 2 2.2 2.4-.1.3-.2.6-.2.9 0 2.2 1.8 4 4 4h7c2.2 0 4-1.8 4-4 0-2-1.5-3.7-3.5-3.9-.1 0-.1 0-.2 0z"/></svg>) },
    { name: "Todoist", color: "#E44332", delay: 8, pos: { x: -160, y: 120 }, logo: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M21.5 7.5l-9 9-4-4-1.5 1.5 5.5 5.5 10.5-10.5z"/><path d="M3 12l2-2 2 2-2 2z"/></svg>) },
    { name: "WA Business", color: "#128C7E", delay: 9, pos: { x: -220, y: -80 }, logo: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19.05 4.91A9.816 9.816 0 0012.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 012.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z"/></svg>) },
    { name: "Kamera GPS", color: "#34A853", delay: 10, pos: { x: 210, y: -20 }, logo: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z"/></svg>) },
    { name: "Notta.ai", color: "#FF6B6B", delay: 11, pos: { x: 130, y: 250 }, logo: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>) },
    { name: "Fireflies.ai", color: "#FF9500", delay: 12, pos: { x: -120, y: 250 }, logo: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>) },
    { name: "Dropbox", color: "#0061FF", delay: 13, pos: { x: -190, y: 200 }, logo: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M6 1.807L0 5.629l6 3.822 6.001-3.822L6 1.807zM18 1.807l-6 3.822 6 3.822 6-3.822-6-3.822zM0 13.274l6 3.822 6.001-3.822L6 9.452l-6 3.822zM18 9.452l-6 3.822 6 3.822 6-3.822-6-3.822zM6 18.371l6.001 3.822 6-3.822-6-3.822L6 18.371z"/></svg>) },
    { name: "Kontak", color: "#5856D6", delay: 8.5, pos: { x: 200, y: -220 }, logo: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>) },
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
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={phoneRef} className={`svg-phone-container ${isVisible ? 'visible' : ''}`}>
      {brands.map((brand, i) => (
        <div key={i} className="brand-orb" style={{
            ['--start-x' as any]: `${brand.pos.x * scaleFactor}px`,
            ['--start-y' as any]: `${brand.pos.y * scaleFactor}px`,
            ['--anim-delay' as any]: `${brand.delay}s`,
          } as React.CSSProperties}>
          <div className="orb-inner-container">
            <div className="orb-icon" style={{color: brand.color}}>{brand.logo}</div>
            <div className="orb-label">{brand.name}</div>
          </div>
        </div>
      ))}

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
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7B68EE"/>
            <stop offset="100%" stopColor="#E352FF"/>
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="280" height="560" rx="48" fill="#24223E" filter="url(#dropshadow)" />
        <rect x="4" y="4" width="272" height="552" rx="44" stroke="#484569" strokeWidth="2" />
        
        <foreignObject x="12" y="12" width="256" height="536" clipPath="url(#screenClip)">
          <div style={{
            width: "100%", height: "100%", background: "#FAFAFA", fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative'
          }}>
            
            <div style={{ padding: '24px 20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="/assets/uploads/1768209897559_vorce.svg" alt="Vorce Logo" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                <span style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', letterSpacing: -0.5 }}>Vorce</span>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e2e8f0', overflow: 'hidden' }}>
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="User" style={{ width: '100%', height: '100%' }} />
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 80px', scrollbarWidth: 'none' }}>
              
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 12, color: '#64748B', marginBottom: 12, fontWeight: 600 }}>Alat</h3>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div className="app-btn-white">
                    <span className="material-icons" style={{ color: '#7B5AFF', fontSize: 20 }}>camera_alt</span>
                    <span>Kamera GPS</span>
                  </div>
                  <div className="app-btn-white">
                     <span className="material-icons" style={{ color: '#7B5AFF', fontSize: 20 }}>mic</span>
                     <span>Perekam</span>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 12, color: '#64748B', marginBottom: 12, fontWeight: 600 }}>Fitur</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {[
                    { icon: 'folder', label: 'Arsip' },
                    { icon: 'home', label: 'Izin' },
                    { icon: 'bar_chart', label: 'Kinerja' },
                    { icon: 'chat', label: 'Pesan' },
                    { icon: 'receipt', label: 'Reimburse' },
                    { icon: 'task_alt', label: 'Tugas' }
                  ].map((item, idx) => (
                    <div key={idx} className="app-btn-purple">
                      <span className="material-icons" style={{ fontSize: 18, marginBottom: 4 }}>{item.icon}</span>
                      <span style={{ fontSize: 10 }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: 12, color: '#64748B', marginBottom: 12, fontWeight: 600 }}>Log Aktivitas</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { title: 'Reimburse baru Rp. 80.000', time: '18:38' },
                    { title: 'Mini Mine menambahkan berkas', time: '18:38' },
                    { title: 'Daffa Rendra mengajukan izin', time: '16:50' },
                    { title: 'Daffa Rendra tambah berkas', time: '16:50' }
                  ].map((log, idx) => (
                    <div key={idx} style={{ background: 'white', padding: 12, borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <span style={{ fontSize: 11, color: '#334155', fontWeight: 500, maxWidth: '140px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{log.title}</span>
                       <span style={{ fontSize: 10, color: '#94A3B8' }}>{log.time} &gt;</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div style={{ 
              height: 60, background: 'white', borderTop: '1px solid #F1F5F9', 
              display: 'flex', justifyContent: 'space-around', alignItems: 'center',
              position: 'absolute', bottom: 0, left: 0, right: 0
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#7B5AFF' }}>
                <span className="material-icons" style={{ fontSize: 24 }}>grid_view</span>
                <span style={{ fontSize: 10, fontWeight: 600, marginTop: 2 }}>Beranda</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#94A3B8' }}>
                <span className="material-icons" style={{ fontSize: 24 }}>place</span>
                <span style={{ fontSize: 10, fontWeight: 600, marginTop: 2 }}>Kehadiran</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#94A3B8' }}>
                <span className="material-icons" style={{ fontSize: 24 }}>person</span>
                <span style={{ fontSize: 10, fontWeight: 600, marginTop: 2 }}>Profil</span>
              </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
              .app-btn-white {
                flex: 1;
                background: white;
                border: 1px solid #F1F5F9;
                border-radius: 12px;
                padding: 12px;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 11px;
                font-weight: 600;
                color: #334155;
                cursor: pointer;
                transition: all 0.2s;
              }
              .app-btn-white:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                border-color: #7B5AFF;
              }

              .app-btn-purple {
                background: #7B5AFF;
                color: white;
                border-radius: 12px;
                height: 64px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 4px 6px rgba(123, 90, 255, 0.2);
              }
              .app-btn-purple:hover {
                background: #6D28D9;
                transform: translateY(-3px);
                box-shadow: 0 8px 15px rgba(123, 90, 255, 0.4);
              }
            `}} />
          </div>
        </foreignObject>

      </svg>

      <style jsx>{`
        .svg-phone-container {
          position: relative;
          width: 320px;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
          margin-left: 60px; /* Shift phone & brands to right */
        }

        .phone-svg {
          width: 240px;
          height: auto;
          z-index: 10;
          transition: transform 0.1s ease-out;
          filter: drop-shadow(0 30px 60px rgba(0,0,0,0.4));
        }

        .brand-orb {
          position: absolute;
          top: 50%;
          left: 50%;
          /* Start exactly at ZERO (Center) */
          width: 0;
          height: 0;
          z-index: 20;
          pointer-events: none;
        }

        .orb-inner-container {
           position: absolute;
           /* Start Hidden */
           opacity: 0;
           transform: translate(0, 0) scale(0);
           
           display: flex;
           flex-direction: column;
           align-items: center;
           gap: 5px;

           /* Total cycle duration 14s for clean looping of 14 items (assuming 1s stagger) 
              Actually to have clear waves, we can do 14s total duration.
           */
           animation: absorbCycle 14s infinite cubic-bezier(0.4, 0, 0.2, 1);
           animation-delay: var(--anim-delay);
        }
        
        @keyframes absorbCycle {
            0% {
                opacity: 0;
                transform: translate(0, 0) scale(0);
            }
            5% {
                /* Appear at Start Position (Offset from center) */
                opacity: 1;
                transform: translate(var(--start-x), var(--start-y)) scale(1);
            }
            35% {
                 /* Float/Hover slightly */
                opacity: 1;
                transform: translate(calc(var(--start-x) + 5px), calc(var(--start-y) - 5px)) scale(1.05);
            }
            45% {
                /* SUCK IN TO CENTER (0,0) - The vanish point */
                opacity: 0;
                transform: translate(0, 0) scale(0.2);
            }
            100% {
                 /* Stay hidden for remainder of cycle */
                opacity: 0;
                transform: translate(0, 0) scale(0);
            }
        }
        
        .orb-icon {
          width: 42px;
          height: 42px;
          background: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          border: 2px solid rgba(0,0,0,0.04);
          position: relative;
        }

        .orb-icon::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 14px;
          border: 2px solid var(--orb-color);
          opacity: 0.4;
          animation: pulseBorder 2.5s infinite;
        }

        .orb-label {
          background: rgba(255,255,255,0.98);
          padding: 4px 10px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 700;
          color: #333;
          box-shadow: 0 3px 8px rgba(0,0,0,0.1);
          white-space: nowrap;
          border: 1px solid rgba(0,0,0,0.05);
        }

        @keyframes pulseBorder {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        
        @media (max-width: 1024px) {
          .svg-phone-container {
            transform: scale(0.85);
          }
        }
      `}</style>
    </div>
  );
}
