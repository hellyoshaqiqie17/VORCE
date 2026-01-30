"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

interface SidebarProps {
  collapsed?: boolean;
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin");
  };

  const isActive = (path: string) => pathname === path ? "active" : "";

  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="admin-sidebar-header">
        <div className="admin-logo">
          <Image src="/assets/uploads/1768209897559_vorce.svg" alt="Vorce" width={28} height={28} />
          <span>Vorce HR</span>
        </div>
        <span className="material-icons admin-expand-icon">unfold_more</span>
      </div>

      <div className="admin-search-box">
        <span className="material-icons">search</span>
        <input type="text" placeholder="Cari..." />
        <span className="shortcut">⌘F</span>
      </div>

      <nav className="admin-nav-section">
        <Link href="/admin/dashboard" className={`admin-nav-item ${isActive("/admin/dashboard")}`}>
          <span className="material-icons">dashboard</span>
          Dasbor
        </Link>
        <Link href="/admin/attendance" className={`admin-nav-item ${isActive("/admin/attendance")}`}>
          <span className="material-icons">location_on</span>
          Kehadiran
        </Link>
        <Link href="/admin/izin" className={`admin-nav-item ${isActive("/admin/izin")}`}>
          <span className="material-icons">event_note</span>
          Izin
        </Link>
        <Link href="/admin/tasks" className={`admin-nav-item ${isActive("/admin/tasks")}`}>
          <span className="material-icons">assignment</span>
          Tugas
        </Link>
        <Link href="/admin/reimburse" className={`admin-nav-item ${isActive("/admin/reimburse")}`}>
          <span className="material-icons">receipt_long</span>
          Reimburse
        </Link>
        <Link href="/admin/archive" className={`admin-nav-item ${isActive("/admin/archive")}`}>
          <span className="material-icons">archive</span>
          Arsip
        </Link>
        <Link href="/admin/gps-camera" className={`admin-nav-item ${isActive("/admin/gps-camera")}`}>
          <span className="material-icons">camera_alt</span>
          Kamera GPS
        </Link>
        <Link href="/admin/chat" className={`admin-nav-item ${isActive("/admin/chat")}`}>
          <span className="material-icons">chat</span>
          Pesan
          <span className="badge notification">5</span>
        </Link>
        <Link href="/admin/email" className={`admin-nav-item ${isActive("/admin/email")}`}>
          <span className="material-icons">email</span>
          Email
          <span className="badge notification">4</span>
        </Link>
        <Link href="/admin/contacts" className={`admin-nav-item ${isActive("/admin/contacts")}`}>
          <span className="material-icons">contacts</span>
          Kontak
        </Link>
        <Link href="/admin/employees" className={`admin-nav-item ${isActive("/admin/employees")}`}>
          <span className="material-icons">people</span>
          Karyawan
        </Link>
        <Link href="/admin/assets" className={`admin-nav-item ${isActive("/admin/assets")}`}>
          <span className="material-icons">devices</span>
          Kontrol Aset
        </Link>
        <Link href="/admin/recorder" className={`admin-nav-item ${isActive("/admin/recorder")}`}>
          <span className="material-icons">mic</span>
          Perekam
        </Link>
      </nav>


      <div className="admin-nav-divider"></div>

      <nav className="admin-nav-section">
        <div className="admin-nav-label">CMS & Pengaturan</div>
        <Link href="/admin/editor" className={`admin-nav-item ${isActive("/admin/editor")}`}>
          <span className="material-icons">edit_note</span>
          Editor Konten
        </Link>
        <Link href="/admin/company" className={`admin-nav-item ${isActive("/admin/company")}`}>
          <span className="material-icons">business</span>
          Perusahaan
        </Link>
        <Link href="/admin/info" className={`admin-nav-item ${isActive("/admin/info")}`}>
          <span className="material-icons">info</span>
          Info
        </Link>
      </nav>

      <div className="admin-nav-divider"></div>

      <div className="admin-user-section">
        <Link href="/admin/company" className="admin-user-item">
          <div className="admin-user-avatar">AS</div>
          <span>Acme Startup</span>
        </Link>
      </div>

      <div className="admin-sidebar-footer">
        <button onClick={handleLogout} className="admin-logout-btn">
          <span className="material-icons">logout</span>
          Keluar
        </button>

        <div className="admin-back-to-site">
          <Link href="/" className="admin-nav-item">
            <span className="material-icons">arrow_back</span>
            Kembali ke Website
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .admin-sidebar {
          width: 260px;
          height: 100vh;
          background: #fff;
          border-right: 1px solid #f0f0f0;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          overflow-y: auto;
          z-index: 100;
          transition: transform 0.3s ease;
        }

        .admin-sidebar.collapsed {
          transform: translateX(-100%);
        }

        .admin-sidebar-header {
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-sidebar-header .admin-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-sidebar-header .admin-logo span {
          font-size: 18px;
          font-weight: 700;
          color: #292d34;
          letter-spacing: -0.5px;
        }

        .admin-sidebar-header .admin-expand-icon {
          margin-left: auto;
          color: #999;
          font-size: 20px;
          cursor: pointer;
        }

        .admin-search-box {
          margin: 0 24px 24px;
          position: relative;
        }

        .admin-search-box input {
          width: 100%;
          padding: 10px 12px 10px 36px;
          border: 1px solid #e8e8e8;
          border-radius: 8px;
          font-size: 13px;
          font-family: 'Montserrat', sans-serif;
          background: #fafafa;
          transition: all 0.2s;
        }

        .admin-search-box input:focus {
          outline: none;
          border-color: #0066FF;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(123, 104, 238, 0.1);
        }

        .admin-search-box .material-icons {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
          font-size: 18px;
        }

        .admin-search-box .shortcut {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: #fff;
          border: 1px solid #e8e8e8;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          color: #999;
          font-weight: 600;
        }

        .admin-nav-section {
          padding: 0 16px;
        }

        .admin-nav-label {
          font-size: 11px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 16px 12px 8px;
        }

        .admin-nav-item {
          display: flex !important;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          color: #64748b;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          margin-bottom: 4px;
          width: 100%;
          box-sizing: border-box;
        }

        .admin-nav-item:hover {
          background: #f8fafc;
          color: #1e293b;
        }

        .admin-nav-item.active {
          background: #eff6ff;
          color: #0066FF;
        }

        .admin-nav-item .material-icons {
          font-size: 20px;
          color: #94a3b8;
          min-width: 20px; /* Prevent icon shrinking */
        }

        .admin-nav-item.active .material-icons {
          color: #0066FF;
        }

        .admin-nav-item .badge {
          margin-left: auto;
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
        }

        .admin-nav-item .badge.notification {
          background: #fee2e2;
          color: #dc2626;
          min-width: 20px;
          height: 20px;
          padding: 0 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
        }

        .admin-nav-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 16px 24px;
        }

        .admin-user-section {
          padding: 0 16px;
        }

        .admin-user-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 14px;
          color: #475569;
          cursor: pointer;
          transition: background 0.2s;
        }

        .admin-user-item:hover {
          background: #f8fafc;
        }

        .admin-user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(245, 158, 11, 0.2);
        }

        .admin-sidebar-footer {
          margin-top: auto;
          padding: 24px;
          border-top: 1px solid #f1f5f9;
        }

        .admin-logout-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          color: #64748b;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          font-family: 'Montserrat', sans-serif;
        }

        .admin-logout-btn:hover {
          background: #fef2f2;
          color: #ef4444;
        }

        .admin-back-to-site {
          margin-top: 8px;
        }
      `}</style>
    </aside>
  );
}
