"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Activity {
  id: string;
  type: "join" | "leave" | "task" | "reimburse" | "file" | "contact" | "chat";
  user: string;
  description: string;
  time: string;
}

interface Approval {
  id: string;
  type: "reimburse" | "leave";
  title: string;
  user: string;
  amount?: string;
  days?: string;
  status: "pending" | "approved" | "rejected";
}

const initialActivities: Activity[] = [
  { id: "1", type: "join", user: "Jane Doe", description: "ingin bergabung", time: "09:40" },
  { id: "2", type: "leave", user: "Jane Doe", description: "Izin diajukan", time: "09:40" },
  { id: "3", type: "leave", user: "Jane Doe", description: "Izin ditolak", time: "09:40" },
  { id: "4", type: "leave", user: "Jane Doe", description: "Izin diterima", time: "09:40" },
  { id: "5", type: "file", user: "File_name", description: "details ditambahkan", time: "09:40" },
  { id: "6", type: "file", user: "File_name", description: "details dihapus", time: "09:40" },
  { id: "7", type: "contact", user: "Jane Doe", description: "Kontak baru", time: "09:40" },
  { id: "8", type: "contact", user: "Jane Doe", description: "Kontak diperbarui baru", time: "09:40" },
  { id: "9", type: "chat", user: "Jane Doe", description: "mengirimkan kontak ke pesan", time: "09:40" },
  { id: "10", type: "chat", user: "Jane Doe", description: "mengirimkan media ke pesan", time: "09:40" },
  { id: "11", type: "task", user: "Jane Doe", description: "mengirimkan tugas ke pesan", time: "09:40" },
  { id: "12", type: "reimburse", user: "Jane Doe", description: "mengirimkan reimburse ke pesan", time: "09:40" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [approvals, setApprovals] = useState<Approval[]>([
    { id: "1", type: "reimburse", title: "Biaya Perjalanan", user: "Anna Lee", amount: "Rp 4.500.000", status: "pending" },
    { id: "2", type: "leave", title: "Izin Sakit", user: "Ryan Brown", days: "2 Hari", status: "pending" },
  ]);
  const [activities] = useState<Activity[]>(initialActivities);

  const handleApprove = (id: string) => {
    setApprovals(approvals.map(a => a.id === id ? {...a, status: "approved"} : a));
  };

  const handleReject = (id: string) => {
    setApprovals(approvals.map(a => a.id === id ? {...a, status: "rejected"} : a));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "join": return "person_add";
      case "leave": return "event_note";
      case "task": return "assignment";
      case "reimburse": return "receipt_long";
      case "file": return "description";
      case "contact": return "contacts";
      case "chat": return "chat";
      default: return "info";
    }
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Selamat Pagi, Acme Startup! 👋</h1>
        <p>Ini yang terjadi dengan tim Anda hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => router.push("/admin/attendance")}>
          <div className="stat-icon attendance">
            <span className="material-icons">people</span>
          </div>
          <div className="stat-info">
            <span className="label">Hadir Hari Ini</span>
            <div className="value">24<span>/30</span></div>
          </div>
          <div className="stat-trend positive">
            <span className="material-icons">trending_up</span>
            <span>80%</span>
          </div>
        </div>

        <div className="stat-card" onClick={() => router.push("/admin/izin")}>
          <div className="stat-icon leave">
            <span className="material-icons">event_busy</span>
          </div>
          <div className="stat-info">
            <span className="label">Sedang Cuti</span>
            <div className="value">3</div>
          </div>
          <div className="stat-trend neutral">
            <span>Terjadwal</span>
          </div>
        </div>

        <div className="stat-card" onClick={() => router.push("/admin/tasks")}>
          <div className="stat-icon tasks">
            <span className="material-icons">assignment</span>
          </div>
          <div className="stat-info">
            <span className="label">Tugas Pending</span>
            <div className="value">12</div>
          </div>
          <div className="stat-trend negative">
            <span>4 Terlambat</span>
          </div>
        </div>

        <div className="stat-card" onClick={() => router.push("/admin/reimburse")}>
          <div className="stat-icon reimburse">
            <span className="material-icons">receipt_long</span>
          </div>
          <div className="stat-info">
            <span className="label">Reimburse</span>
            <div className="value">Rp 12,5 Jt</div>
          </div>
          <div className="stat-trend">
            <span>Menunggu Persetujuan</span>
          </div>
        </div>
      </div>

      {/* Quick Access Features */}
      <div className="quick-links-section">
        <h3 className="section-title">Akses Cepat</h3>
        <div className="quick-links-grid">
          <a href="/admin/tasks" className="quick-link-card">
            <div className="quick-icon tasks">
              <span className="material-icons">assignment</span>
            </div>
            <span>Tugas</span>
          </a>
          <a href="/admin/reimburse" className="quick-link-card">
            <div className="quick-icon reimburse">
              <span className="material-icons">receipt_long</span>
            </div>
            <span>Reimburse</span>
          </a>
          <a href="/admin/izin" className="quick-link-card">
            <div className="quick-icon izin">
              <span className="material-icons">event_available</span>
            </div>
            <span>Izin</span>
          </a>
          <a href="/admin/employees" className="quick-link-card">
            <div className="quick-icon kinerja">
              <span className="material-icons">insert_chart</span>
            </div>
            <span>Kinerja</span>
          </a>
          <a href="/admin/chat" className="quick-link-card">
            <div className="quick-icon pesan">
              <span className="material-icons">chat_bubble</span>
            </div>
            <span>Pesan</span>
          </a>
          <a href="/admin/archive" className="quick-link-card">
            <div className="quick-icon arsip">
              <span className="material-icons">archive</span>
            </div>
            <span>Arsip</span>
          </a>
          <a href="/admin/gps-camera" className="quick-link-card">
            <div className="quick-icon kamera">
              <span className="material-icons">photo_camera</span>
            </div>
            <span>Kamera</span>
          </a>
          <a href="/admin/company" className="quick-link-card">
            <div className="quick-icon log">
              <span className="material-icons">business</span>
            </div>
            <span>Perusahaan</span>
          </a>
          <a href="/admin/recorder" className="quick-link-card">
            <div className="quick-icon perekam">
              <span className="material-icons">mic</span>
            </div>
            <span>Perekam</span>
          </a>
        </div>
      </div>


      <div className="dashboard-grid">
        {/* Recent Activity / Attendance Feed */}
        <div className="card attendance-feed">
          <div className="card-header">
            <h3>Feed Kehadiran</h3>
            <button className="text-btn" onClick={() => router.push("/admin/attendance")}>Lihat Semua</button>
          </div>
          <div className="feed-list">
            <div className="feed-item">
              <div className="avatar">JD</div>
              <div className="feed-content">
                <p><strong>John Doe</strong> masuk</p>
                <span className="time">08:55 • Kantor</span>
              </div>
              <span className="status on-time">Tepat Waktu</span>
            </div>
            <div className="feed-item">
              <div className="avatar purple">SE</div>
              <div className="feed-content">
                <p><strong>Sarah Evans</strong> masuk</p>
                <span className="time">09:15 • Remote</span>
              </div>
              <span className="status late">Terlambat</span>
            </div>
            <div className="feed-item">
              <div className="avatar green">MK</div>
              <div className="feed-content">
                <p><strong>Mike Kim</strong> pulang</p>
                <span className="time">18:05 • Kantor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="card pending-approvals">
          <div className="card-header">
            <h3>Perlu Persetujuan</h3>
          </div>
          <div className="approval-list">
            {approvals.filter(a => a.status === "pending").length === 0 ? (
              <div className="empty-approval">
                <span className="material-icons">check_circle</span>
                <p>Semua approval sudah selesai!</p>
              </div>
            ) : (
              approvals.filter(a => a.status === "pending").map((approval) => (
                <div key={approval.id} className="approval-item">
                  <div className={`approval-icon ${approval.type}`}>
                    <span className="material-icons">
                      {approval.type === "reimburse" ? "receipt" : "flight_takeoff"}
                    </span>
                  </div>
                  <div className="approval-content">
                    <h4>{approval.title}</h4>
                    <p>Diajukan oleh {approval.user} • {approval.amount || approval.days}</p>
                  </div>
                  <div className="approval-actions">
                    <button className="btn-approve" onClick={() => handleApprove(approval.id)}>
                      <span className="material-icons">check</span>
                    </button>
                    <button className="btn-reject" onClick={() => handleReject(approval.id)}>
                      <span className="material-icons">close</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Employee Activity Log */}
      <div className="activity-section">
        <div className="card">
          <div className="card-header">
            <h3>Log Aktivitas</h3>
            <button className="text-btn">Lihat Semua</button>
          </div>
          <div className="activity-list">
            {activities.slice(0, 8).map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  <span className="material-icons">{getActivityIcon(activity.type)}</span>
                </div>
                <div className="activity-content">
                  <p>
                    <strong>{activity.user}</strong> {activity.description}
                  </p>
                </div>
                <span className="activity-time">{activity.time}</span>
                <span className="material-icons activity-arrow">chevron_right</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .welcome-section {
          margin-bottom: 32px;
        }

        .welcome-section h1 {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .welcome-section p {
          color: #64748b;
          font-size: 14px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon .material-icons {
          font-size: 24px;
        }

        .stat-icon.attendance { background: #eff6ff; color: #3b82f6; }
        .stat-icon.leave { background: #fef2f2; color: #ef4444; }
        .stat-icon.tasks { background: #fff7ed; color: #f97316; }
        .stat-icon.reimburse { background: #f0fdf4; color: #22c55e; }

        .stat-info {
          flex: 1;
        }

        .stat-info .label {
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
          display: block;
          margin-bottom: 4px;
        }

        .stat-info .value {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
        }

        .stat-info .value span {
          font-size: 14px;
          color: #94a3b8;
          font-weight: 500;
        }

        .stat-trend {
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .stat-trend.positive { color: #22c55e; }
        .stat-trend.negative { color: #ef4444; }
        .stat-trend.neutral { color: #64748b; }

        .quick-links-section {
          margin-bottom: 32px;
        }

        .section-title {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 16px;
        }

        .quick-links-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        @media (max-width: 900px) {
          .quick-links-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 600px) {
          .quick-links-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .quick-link-card {
          background: white;
          border: 1px solid #f1f5f9;
          border-radius: 16px;
          padding: 24px 16px;
          text-align: center;
          text-decoration: none;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .quick-link-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
          border-color: #0066FF;
        }

        .quick-link-card span:last-child {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
        }

        .quick-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quick-icon .material-icons {
          font-size: 24px;
        }

        .quick-icon.tasks { background: #fff7ed; color: #f97316; }
        .quick-icon.reimburse { background: #f0fdf4; color: #22c55e; }
        .quick-icon.izin { background: #eff6ff; color: #3b82f6; }
        .quick-icon.kinerja { background: #fdf4ff; color: #a855f7; }
        .quick-icon.pesan { background: #ecfeff; color: #06b6d4; }
        .quick-icon.arsip { background: #fef2f2; color: #ef4444; }
        .quick-icon.kamera { background: #fefce8; color: #eab308; }
        .quick-icon.log { background: #f1f5f9; color: #64748b; }
        .quick-icon.perekam { background: #fce7f3; color: #ec4899; }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        .card {
          background: white;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
          overflow: hidden;
        }

        .card-header {
          padding: 20px 24px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-header h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .text-btn {
          background: none;
          border: none;
          color: #0066FF;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
        }

        .feed-list {
          padding: 0 24px;
        }

        .feed-item {
          padding: 16px 0;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .feed-item:last-child {
          border-bottom: none;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }

        .avatar.purple { background: #8b5cf6; }
        .avatar.green { background: #10b981; }

        .feed-content {
          flex: 1;
        }

        .feed-content p {
          font-size: 14px;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .feed-content .time {
          font-size: 12px;
          color: #94a3b8;
        }

        .status {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .status.on-time { background: #dcfce7; color: #16a34a; }
        .status.late { background: #fee2e2; color: #dc2626; }

        .approval-list {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .approval-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: #f8fafc;
          border-radius: 12px;
        }

        .approval-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .approval-icon .material-icons { font-size: 20px; }
        .approval-icon.reimburse { background: #dbeafe; color: #3b82f6; }
        .approval-icon.leave { background: #fce7f3; color: #db2777; }

        .approval-content {
          flex: 1;
        }

        .approval-content h4 {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .approval-content p {
          font-size: 12px;
          color: #64748b;
          margin: 0;
        }

        .approval-actions {
          display: flex;
          gap: 8px;
        }

        .approval-actions button {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-approve { background: #dcfce7; color: #16a34a; }
        .btn-approve:hover { background: #bbf7d0; }

        .btn-reject { background: #fee2e2; color: #dc2626; }
        .btn-reject:hover { background: #fecaca; }

        .empty-approval {
          text-align: center;
          padding: 24px;
          color: #94a3b8;
        }

        .empty-approval .material-icons {
          font-size: 40px;
          color: #22c55e;
          margin-bottom: 8px;
        }

        .empty-approval p {
          margin: 0;
          font-size: 14px;
        }

        .activity-section {
          margin-top: 24px;
        }

        .activity-list {
          padding: 0;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 24px;
          border-bottom: 1px solid #f1f5f9;
          cursor: pointer;
          transition: background 0.2s;
        }

        .activity-item:hover {
          background: #f8fafc;
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .activity-icon .material-icons {
          font-size: 18px;
        }

        .activity-icon.join { background: #dbeafe; color: #3b82f6; }
        .activity-icon.leave { background: #fef3c7; color: #d97706; }
        .activity-icon.task { background: #fff7ed; color: #f97316; }
        .activity-icon.reimburse { background: #dcfce7; color: #22c55e; }
        .activity-icon.file { background: #fdf4ff; color: #a855f7; }
        .activity-icon.contact { background: #ecfeff; color: #06b6d4; }
        .activity-icon.chat { background: #f1f5f9; color: #64748b; }

        .activity-content {
          flex: 1;
          min-width: 0;
        }

        .activity-content p {
          margin: 0;
          font-size: 14px;
          color: #1e293b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .activity-time {
          font-size: 12px;
          color: #94a3b8;
          flex-shrink: 0;
        }

        .activity-arrow {
          color: #cbd5e1;
          font-size: 20px;
        }

        .stat-card {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
