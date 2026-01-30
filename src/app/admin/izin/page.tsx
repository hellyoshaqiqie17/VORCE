"use client";

import { useState, useRef } from "react";

import ArchiveModal from "@/components/Admin/ArchiveModal";

interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  type: "Cuti" | "Sakit" | "Izin";
  status: "pending" | "approved" | "rejected";
  startDate: string;
  endDate: string;
  reason: string;
  attachment?: string;
  createdAt: string;
}

const initialRequests: LeaveRequest[] = [
  {
    id: "1",
    userId: "1",
    userName: "Putri Amelia",
    userAvatar: "https://i.pravatar.cc/100?img=1",
    userRole: "Designer",
    type: "Cuti",
    status: "pending",
    startDate: "2025-12-23",
    endDate: "2026-01-06",
    reason: "Liburan akhir tahun bersama keluarga",
    attachment: "tiket_pesawat.pdf",
    createdAt: "2025-12-20",
  },
  {
    id: "2",
    userId: "2",
    userName: "Rizky Pratama",
    userAvatar: "https://i.pravatar.cc/100?img=2",
    userRole: "Developer",
    type: "Sakit",
    status: "approved",
    startDate: "2025-01-10",
    endDate: "2025-01-12",
    reason: "Demam tinggi dan flu",
    attachment: "surat_dokter.jpg",
    createdAt: "2025-01-10",
  },
  {
    id: "3",
    userId: "3",
    userName: "Budi Hartono",
    userAvatar: "https://i.pravatar.cc/100?img=3",
    userRole: "Manager",
    type: "Izin",
    status: "rejected",
    startDate: "2025-01-15",
    endDate: "2025-01-15",
    reason: "Urusan keluarga mendadak",
    createdAt: "2025-01-14",
  },
  {
    id: "4",
    userId: "4",
    userName: "Siti Nurhaliza",
    userAvatar: "https://i.pravatar.cc/100?img=4",
    userRole: "Manager",
    type: "Cuti",
    status: "pending",
    startDate: "2026-02-01",
    endDate: "2026-02-05",
    reason: "Cuti tahunan",
    createdAt: "2026-01-20",
  },
];

const teamMembers = [
  { id: "1", name: "Putri Amelia", role: "Designer", avatar: "https://i.pravatar.cc/100?img=1" },
  { id: "2", name: "Rizky Pratama", role: "Developer", avatar: "https://i.pravatar.cc/100?img=2" },
  { id: "3", name: "Budi Hartono", role: "Manager", avatar: "https://i.pravatar.cc/100?img=3" },
  { id: "4", name: "Siti Nurhaliza", role: "Manager", avatar: "https://i.pravatar.cc/100?img=4" },
  { id: "5", name: "Ahmad Fauzi", role: "Engineer", avatar: "https://i.pravatar.cc/100?img=5" },
];

export default function IzinPage() {
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // New Request Form State
  const [newRequest, setNewRequest] = useState({
    userId: "",
    type: "Cuti" as "Cuti" | "Sakit" | "Izin",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [newAttachment, setNewAttachment] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredRequests = requests.filter(
    (req) =>
      req.status === activeTab &&
      req.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  };

  const handleStatusChange = (id: string, newStatus: "approved" | "rejected") => {
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: newStatus } : req)));
    if (selectedRequest?.id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
  };

  const handleDelete = (id: string) => {
    setRequests(requests.filter((req) => req.id !== id));
    if (selectedRequest?.id === id) {
      setSelectedRequest(null);
    }
  };

  const handleCreateRequest = () => {
    const user = teamMembers.find((m) => m.id === newRequest.userId);
    if (!user || !newRequest.startDate || !newRequest.endDate) return;

    const request: LeaveRequest = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      userRole: user.role,
      type: newRequest.type,
      status: "pending",
      startDate: newRequest.startDate,
      endDate: newRequest.endDate,
      reason: newRequest.reason,
      attachment: newAttachment || undefined,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setRequests([request, ...requests]);
    setShowNewModal(false);
    setNewRequest({ userId: "", type: "Cuti", startDate: "", endDate: "", reason: "" });
    setNewAttachment(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewAttachment(e.target.files[0].name);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="izin-container">
      {/* Header & Stats */}
      <div className="page-header">
        <div className="header-title">
          <h1>Permintaan Izin</h1>
          <p>Kelola cuti, sakit, dan izin karyawan</p>
        </div>
        <div className="header-actions">
          <button className="archive-btn" onClick={() => setShowArchiveModal(true)}>
            <span className="material-icons">inventory_2</span>
            Arsip
          </button>
          <button className="primary-btn" onClick={() => setShowNewModal(true)}>
            <span className="material-icons">add</span>
            Ajukan Izin
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><span className="material-icons">assignment</span></div>
          <div className="stat-info">
            <h3>Total</h3>
            <span>{stats.total} Pengajuan</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><span className="material-icons">pending</span></div>
          <div className="stat-info">
            <h3>Menunggu</h3>
            <span>{stats.pending} Pending</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><span className="material-icons">check_circle</span></div>
          <div className="stat-info">
            <h3>Disetujui</h3>
            <span>{stats.approved} Diterima</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><span className="material-icons">cancel</span></div>
          <div className="stat-info">
            <h3>Ditolak</h3>
            <span>{stats.rejected} Ditolak</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-grid">
        {/* Left Column: List */}
        <div className="list-column">
          <div className="list-header">
            <div className="tabs">
              <button
                className={`tab ${activeTab === "pending" ? "active" : ""}`}
                onClick={() => setActiveTab("pending")}
              >
                Diajukan
              </button>
              <button
                className={`tab ${activeTab === "approved" ? "active" : ""}`}
                onClick={() => setActiveTab("approved")}
              >
                Diterima
              </button>
              <button
                className={`tab ${activeTab === "rejected" ? "active" : ""}`}
                onClick={() => setActiveTab("rejected")}
              >
                Ditolak
              </button>
            </div>
            <div className="search-box">
              <span className="material-icons">search</span>
              <input
                type="text"
                placeholder="Cari karyawan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="request-list">
            {filteredRequests.length === 0 ? (
              <div className="empty-state">
                <span className="material-icons">inbox</span>
                <p>Tidak ada data</p>
              </div>
            ) : (
              filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className={`request-item ${selectedRequest?.id === req.id ? "active" : ""}`}
                  onClick={() => setSelectedRequest(req)}
                >
                  <img src={req.userAvatar} alt={req.userName} className="item-avatar" />
                  <div className="item-info">
                    <h4>{req.userName}</h4>
                    <span className="item-role">{req.userRole}</span>
                  </div>
                  <div className="item-meta">
                    <span className={`type-badge ${req.type.toLowerCase()}`}>{req.type}</span>
                    <span className="item-date">{formatDate(req.startDate)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="detail-column">
          {selectedRequest ? (
            <div className="detail-card">
              <div className="detail-header">
                <div className="user-profile">
                  <img src={selectedRequest.userAvatar} alt={selectedRequest.userName} />
                  <div>
                    <h2>{selectedRequest.userName}</h2>
                    <span>{selectedRequest.userRole}</span>
                  </div>
                </div>
                <div className={`status-badge ${selectedRequest.status}`}>
                  {selectedRequest.status === "pending" ? "Menunggu Konfirmasi" : 
                   selectedRequest.status === "approved" ? "Disetujui" : "Ditolak"}
                </div>
              </div>

              <div className="detail-body">
                {selectedRequest.attachment && (
                  <div className="attachment-preview">
                    <div className="file-info">
                      <span className="material-icons file-icon">description</span>
                      <span>{selectedRequest.attachment}</span>
                    </div>
                    <button className="open-file-btn">Buka</button>
                  </div>
                )}

                <div className="info-list">
                  <div className="info-item">
                    <div className="info-label">
                      <span className="material-icons">badge</span>
                      <span>Izin</span>
                    </div>
                    <span className="info-value">{selectedRequest.type}</span>
                  </div>
                  <div className="info-item">
                    <div className="info-label">
                      <span className="material-icons">event</span>
                      <span>Mulai</span>
                    </div>
                    <span className="info-value">{formatDate(selectedRequest.startDate)}</span>
                  </div>
                  <div className="info-item">
                    <div className="info-label">
                      <span className="material-icons">event_busy</span>
                      <span>Selesai</span>
                    </div>
                    <span className="info-value">{formatDate(selectedRequest.endDate)}</span>
                  </div>
                  {selectedRequest.reason && (
                    <div className="info-item reason-item">
                      <div className="info-label">
                        <span className="material-icons">notes</span>
                        <span>Alasan</span>
                      </div>
                      <p className="info-reason">{selectedRequest.reason}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons - Inside scroll area */}
                <div className="action-section">
                  {selectedRequest.status === "pending" ? (
                    <div className="action-row">
                      <button 
                        className="approve-btn"
                        onClick={() => handleStatusChange(selectedRequest.id, "approved")}
                      >
                        <span className="material-icons">check</span>
                        Terima
                      </button>
                      <button 
                        className="reject-btn"
                        onClick={() => handleStatusChange(selectedRequest.id, "rejected")}
                      >
                        <span className="material-icons">close</span>
                        Tolak
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(selectedRequest.id)}
                    >
                      <span className="material-icons">delete</span>
                      Hapus
                    </button>
                  )}
                  <button className="share-btn">
                    <span className="material-icons">chat</span>
                    Bagikan ke pesan
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-selection">
              <span className="material-icons">touch_app</span>
              <p>Pilih permintaan izin untuk melihat detail</p>
            </div>
          )}
        </div>
      </div>

      {/* New Request Modal */}
      {showNewModal && (
        <div className="modal-overlay" onClick={() => setShowNewModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Ajukan Izin Baru</h2>
              <button className="close-btn" onClick={() => setShowNewModal(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Karyawan</label>
                <select
                  value={newRequest.userId}
                  onChange={(e) => setNewRequest({ ...newRequest, userId: e.target.value })}
                >
                  <option value="">Pilih Karyawan...</option>
                  {teamMembers.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Jenis Izin</label>
                <select
                  value={newRequest.type}
                  onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value as any })}
                >
                  <option value="Cuti">Cuti</option>
                  <option value="Sakit">Sakit</option>
                  <option value="Izin">Izin</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Mulai</label>
                  <input
                    type="date"
                    value={newRequest.startDate}
                    onChange={(e) => setNewRequest({ ...newRequest, startDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Selesai</label>
                  <input
                    type="date"
                    value={newRequest.endDate}
                    onChange={(e) => setNewRequest({ ...newRequest, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Alasan</label>
                <textarea
                  rows={3}
                  value={newRequest.reason}
                  onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                  placeholder="Jelaskan alasan izin..."
                />
              </div>
              <div className="form-group">
                <label>Lampiran</label>
                <div 
                  className="file-upload"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span className="material-icons">cloud_upload</span>
                  <span>{newAttachment || "Klik untuk upload file"}</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="secondary-btn" onClick={() => setShowNewModal(false)}>Batal</button>
              <button 
                className="primary-btn" 
                onClick={handleCreateRequest}
                disabled={!newRequest.userId || !newRequest.startDate || !newRequest.endDate}
              >
                Ajukan
              </button>
            </div>
          </div>
        </div>
      )}

      <ArchiveModal
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
        title="Arsip Izin"
        type="leave"
      />

      <style jsx>{`
        .header-actions {
          display: flex;
          gap: 12px;
        }

        .archive-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #f3e8ff;
          color: #7c3aed;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          transition: background 0.2s;
        }

        .archive-btn:hover {
          background: #e9d5ff;
        }

        .izin-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .stats-grid {
          flex-shrink: 0;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 24px;
          height: calc(100vh - 340px);
        }

        .list-column {
          background: white;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .detail-column {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .detail-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .detail-header {
          padding: 20px 24px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }

        .detail-body {
          flex: 1;
          padding: 20px 24px;
          overflow-y: auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }

        .header-title h1 {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .header-title p {
          color: #64748b;
          font-size: 14px;
          margin: 0;
        }

        .primary-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #7c3aed;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          transition: background 0.2s;
        }

        .primary-btn:hover {
          background: #6d28d9;
        }

        .primary-btn:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
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
          color: white;
        }

        .stat-icon.blue { background: #3b82f6; }
        .stat-icon.orange { background: #f59e0b; }
        .stat-icon.green { background: #22c55e; }
        .stat-icon.red { background: #ef4444; }

        .stat-info h3 {
          font-size: 13px;
          color: #64748b;
          margin: 0 0 4px 0;
          font-weight: 500;
        }

        .stat-info span {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
        }

        /* Content Grid - already defined above, these rules merge */
        
        /* List Column */
        .list-header {
          padding: 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        .tabs {
          display: flex;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .tab {
          flex: 1;
          padding: 8px;
          border: none;
          background: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab.active {
          background: white;
          color: #7c3aed;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: #f8fafc;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
        }

        .search-box input {
          border: none;
          background: none;
          width: 100%;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
        }

        .search-box input:focus {
          outline: none;
        }

        .request-list {
          flex: 1;
          overflow-y: auto;
          padding: 8px;
        }

        .request-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.2s;
          margin-bottom: 4px;
        }

        .request-item:hover {
          background: #f8fafc;
        }

        .request-item.active {
          background: #f5f3ff;
          border: 1px solid #ddd6fe;
        }

        .item-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .item-info {
          flex: 1;
          min-width: 0;
        }

        .item-info h4 {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 2px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-role {
          font-size: 12px;
          color: #64748b;
        }

        .item-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .type-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 10px;
        }

        .type-badge.cuti { background: #dbeafe; color: #1e40af; }
        .type-badge.sakit { background: #fee2e2; color: #991b1b; }
        .type-badge.izin { background: #fef3c7; color: #92400e; }

        .item-date {
          font-size: 11px;
          color: #94a3b8;
        }

        /* Detail Column - styles merged from above */
        .detail-header {
          padding: 24px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-profile img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-profile h2 {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .user-profile span {
          color: #64748b;
          font-size: 14px;
        }

        .status-badge {
          padding: 8px 20px;
          border-radius: 24px;
          font-size: 13px;
          font-weight: 600;
        }

        .status-badge.pending { background: #fff7ed; color: #c2410c; }
        .status-badge.approved { background: #dcfce7; color: #15803d; }
        .status-badge.rejected { background: #fee2e2; color: #b91c1c; }

        .detail-body {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
          min-height: 0;
        }

        .attachment-preview {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          margin-bottom: 32px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
        }

        .file-icon {
          color: #334155;
        }

        .open-file-btn {
          background: none;
          border: none;
          color: #7c3aed;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
        }

        /* Info List - Horizontal Layout */
        .info-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .info-label {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: #64748b;
          font-weight: 500;
        }

        .info-label .material-icons {
          font-size: 20px;
          color: #94a3b8;
        }

        .info-value {
          font-size: 14px;
          color: #1e293b;
          font-weight: 500;
        }

        .reason-item {
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }

        .info-reason {
          font-size: 14px;
          color: #334155;
          line-height: 1.6;
          margin: 0;
          padding-left: 32px;
        }

        /* Action Section - Inside scrollable area */
        .action-section {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .action-row {
          display: flex;
          gap: 10px;
          width: 100%;
        }

        .approve-btn, .reject-btn, .delete-btn {
          flex: 1;
          padding: 10px 14px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .approve-btn .material-icons,
        .reject-btn .material-icons,
        .delete-btn .material-icons,
        .share-btn .material-icons {
          font-size: 16px;
        }

        .approve-btn {
          background: #7c3aed;
          color: white;
        }
        .approve-btn:hover { background: #6d28d9; }

        .reject-btn {
          background: #f59e0b;
          color: white;
        }
        .reject-btn:hover { background: #d97706; }

        .delete-btn {
          background: #ef4444;
          color: white;
          width: 100%;
        }
        .delete-btn:hover { background: #dc2626; }

        .share-btn {
          width: 100%;
          padding: 10px 14px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          background: #f3e8ff;
          color: #7c3aed;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s;
        }
        .share-btn:hover { background: #e9d5ff; }

        .empty-state, .empty-selection {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #94a3b8;
          gap: 12px;
        }

        .empty-state .material-icons, .empty-selection .material-icons {
          font-size: 48px;
          color: #cbd5e1;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-card {
          background: white;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }

        .modal-header h2 {
          font-size: 18px;
          margin: 0;
          color: #1e293b;
        }

        .close-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
        }

        .modal-body {
          padding: 24px;
          overflow-y: auto;
          flex: 1;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 8px;
        }

        .form-group select, .form-group input, .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .file-upload {
          border: 2px dashed #e2e8f0;
          border-radius: 10px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          color: #64748b;
          font-size: 13px;
        }

        .file-upload:hover {
          border-color: #7c3aed;
          color: #7c3aed;
          background: #f5f3ff;
        }

        .modal-footer {
          padding: 20px 24px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          flex-shrink: 0;
        }

        .secondary-btn {
          padding: 12px 20px;
          background: #f1f5f9;
          color: #64748b;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </div>
  );
}
