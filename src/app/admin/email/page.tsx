"use client";

import { useState } from "react";

type Folder = "inbox" | "sent" | "spam" | "favourite" | "deleted";

interface Email {
  id: number;
  from: string;
  subject: string;
  preview: string;
  date: string;
  isRead: boolean;
  isFavourite: boolean;
  folder: Folder;
}

const mockEmails: Email[] = [
  { id: 1, from: "HR Department", subject: "Monthly Newsletter - January 2026", preview: "Dear team, welcome to our monthly newsletter...", date: "10:30 AM", isRead: false, isFavourite: true, folder: "inbox" },
  { id: 2, from: "John Doe", subject: "Re: Project Update", preview: "Thanks for the update. I'll review it...", date: "09:15 AM", isRead: true, isFavourite: false, folder: "inbox" },
  { id: 3, from: "Finance Team", subject: "Reimbursement Approved", preview: "Your reimbursement request has been approved...", date: "Yesterday", isRead: true, isFavourite: false, folder: "inbox" },
  { id: 4, from: "IT Support", subject: "Password Reset Required", preview: "For security reasons, please reset your...", date: "Yesterday", isRead: false, isFavourite: false, folder: "inbox" },
  { id: 5, from: "Me", subject: "Meeting Notes - Q1 Planning", preview: "Hi team, please find attached the notes...", date: "Jan 20", isRead: true, isFavourite: false, folder: "sent" },
  { id: 6, from: "Promo Alert", subject: "50% OFF Limited Time!", preview: "Don't miss this amazing offer...", date: "Jan 18", isRead: true, isFavourite: false, folder: "spam" },
];

export default function EmailPage() {
  const [activeFolder, setActiveFolder] = useState<Folder>("inbox");
  const [showCompose, setShowCompose] = useState(false);
  const [syncAccount, setSyncAccount] = useState("work");

  const folders = [
    { id: "inbox" as Folder, label: "Inbox", icon: "inbox", count: 4 },
    { id: "sent" as Folder, label: "Sent", icon: "send", count: 0 },
    { id: "spam" as Folder, label: "Spam", icon: "report", count: 1 },
    { id: "favourite" as Folder, label: "Favourite", icon: "star", count: 1 },
    { id: "deleted" as Folder, label: "Deleted", icon: "delete", count: 0 },
  ];

  const filteredEmails = mockEmails.filter((email) => {
    if (activeFolder === "favourite") return email.isFavourite;
    return email.folder === activeFolder;
  });

  return (
    <div className="email-container">
      {/* Header */}
      <div className="page-header">
        <h1>Email</h1>
        <div className="sync-section">
          <span className="material-icons">sync</span>
          <select value={syncAccount} onChange={(e) => setSyncAccount(e.target.value)}>
            <option value="work">Work Account</option>
            <option value="personal">Personal Account</option>
            <option value="all">All Accounts</option>
          </select>
        </div>
      </div>

      <div className="email-layout">
        {/* Folder Sidebar */}
        <div className="folder-sidebar">
          <button className="compose-btn" onClick={() => setShowCompose(true)}>
            <span className="material-icons">edit</span>
            Compose
          </button>

          <nav className="folder-list">
            {folders.map((folder) => (
              <button
                key={folder.id}
                className={`folder-item ${activeFolder === folder.id ? "active" : ""}`}
                onClick={() => setActiveFolder(folder.id)}
              >
                <span className="material-icons">{folder.icon}</span>
                <span className="folder-label">{folder.label}</span>
                {folder.count > 0 && <span className="folder-count">{folder.count}</span>}
              </button>
            ))}
          </nav>

          <div className="synced-accounts">
            <h4>Synced Accounts</h4>
            <div className="account-item">
              <div className="account-avatar">W</div>
              <div className="account-info">
                <span className="account-name">Work Email</span>
                <span className="account-email">admin@vorce.com</span>
              </div>
              <span className="material-icons check">check_circle</span>
            </div>
            <div className="account-item">
              <div className="account-avatar personal">P</div>
              <div className="account-info">
                <span className="account-name">Personal</span>
                <span className="account-email">user@gmail.com</span>
              </div>
              <span className="material-icons check">check_circle</span>
            </div>
          </div>
        </div>

        {/* Email List */}
        <div className="email-list-section">
          <div className="list-header">
            <h3>{folders.find((f) => f.id === activeFolder)?.label}</h3>
            <div className="list-actions">
              <button className="icon-btn"><span className="material-icons">refresh</span></button>
              <button className="icon-btn"><span className="material-icons">more_vert</span></button>
            </div>
          </div>

          <div className="email-list">
            {filteredEmails.length === 0 ? (
              <div className="empty-state">
                <span className="material-icons">mail_outline</span>
                <p>No emails in this folder</p>
              </div>
            ) : (
              filteredEmails.map((email) => (
                <div key={email.id} className={`email-item ${!email.isRead ? "unread" : ""}`}>
                  <button className="star-btn">
                    <span className="material-icons">
                      {email.isFavourite ? "star" : "star_outline"}
                    </span>
                  </button>
                  <div className="email-content">
                    <div className="email-header">
                      <span className="email-from">{email.from}</span>
                      <span className="email-date">{email.date}</span>
                    </div>
                    <div className="email-subject">{email.subject}</div>
                    <div className="email-preview">{email.preview}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="modal-overlay" onClick={() => setShowCompose(false)}>
          <div className="compose-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>New Message</h3>
              <button className="close-btn" onClick={() => setShowCompose(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="compose-form">
              <div className="form-row">
                <label>To:</label>
                <input type="email" placeholder="recipient@email.com" />
              </div>
              <div className="form-row">
                <label>Subject:</label>
                <input type="text" placeholder="Email subject" />
              </div>
              <textarea placeholder="Write your message here..." rows={10}></textarea>
              <div className="compose-actions">
                <button className="send-btn">
                  <span className="material-icons">send</span>
                  Send
                </button>
                <button className="discard-btn" onClick={() => setShowCompose(false)}>
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .email-container {
          height: calc(100vh - 100px);
          display: flex;
          flex-direction: column;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .page-header h1 {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
        }

        .sync-section {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 10px 16px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
        }

        .sync-section .material-icons {
          color: #0066FF;
          font-size: 20px;
        }

        .sync-section select {
          border: none;
          background: none;
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
          cursor: pointer;
          outline: none;
          font-family: 'Montserrat', sans-serif;
        }

        .email-layout {
          flex: 1;
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 24px;
          min-height: 0;
        }

        @media (max-width: 900px) {
          .email-layout {
            grid-template-columns: 1fr;
          }
          .folder-sidebar {
            display: none;
          }
        }

        .folder-sidebar {
          background: white;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .compose-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          background: #0066FF;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 24px;
          font-family: 'Montserrat', sans-serif;
        }

        .compose-btn:hover {
          background: #0052CC;
          transform: translateY(-2px);
        }

        .folder-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 24px;
        }

        .folder-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: none;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          font-family: 'Montserrat', sans-serif;
        }

        .folder-item:hover {
          background: #f8fafc;
        }

        .folder-item.active {
          background: #eff6ff;
        }

        .folder-item .material-icons {
          font-size: 20px;
          color: #64748b;
        }

        .folder-item.active .material-icons {
          color: #0066FF;
        }

        .folder-label {
          flex: 1;
          font-size: 14px;
          font-weight: 500;
          color: #475569;
        }

        .folder-item.active .folder-label {
          color: #0066FF;
          font-weight: 600;
        }

        .folder-count {
          background: #e2e8f0;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
        }

        .folder-item.active .folder-count {
          background: #0066FF;
          color: white;
        }

        .synced-accounts {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid #f1f5f9;
        }

        .synced-accounts h4 {
          font-size: 12px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .account-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
        }

        .account-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #0066FF;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
        }

        .account-avatar.personal {
          background: #8b5cf6;
        }

        .account-info {
          flex: 1;
        }

        .account-name {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .account-email {
          font-size: 12px;
          color: #94a3b8;
        }

        .account-item .check {
          font-size: 18px;
          color: #22c55e;
        }

        .email-list-section {
          background: white;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #f1f5f9;
        }

        .list-header h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .list-actions {
          display: flex;
          gap: 8px;
        }

        .icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: none;
          background: #f8fafc;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-btn:hover {
          background: #e2e8f0;
        }

        .email-list {
          flex: 1;
          overflow-y: auto;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px;
          color: #94a3b8;
        }

        .empty-state .material-icons {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .email-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px 24px;
          border-bottom: 1px solid #f1f5f9;
          transition: background 0.2s;
          cursor: pointer;
        }

        .email-item:hover {
          background: #f8fafc;
        }

        .email-item.unread {
          background: #eff6ff;
        }

        .star-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        .star-btn .material-icons {
          font-size: 20px;
          color: #d1d5db;
        }

        .email-item.unread .star-btn .material-icons,
        .star-btn:hover .material-icons {
          color: #fbbf24;
        }

        .email-content {
          flex: 1;
          min-width: 0;
        }

        .email-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .email-from {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .email-item.unread .email-from {
          color: #0066FF;
        }

        .email-date {
          font-size: 12px;
          color: #94a3b8;
        }

        .email-subject {
          font-size: 14px;
          color: #475569;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .email-preview {
          font-size: 13px;
          color: #94a3b8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Compose Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .compose-modal {
          background: white;
          width: 100%;
          max-width: 600px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #f1f5f9;
        }

        .modal-header h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: #f1f5f9;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .compose-form {
          padding: 24px;
        }

        .form-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .form-row label {
          width: 60px;
          font-size: 14px;
          font-weight: 500;
          color: #64748b;
        }

        .form-row input {
          flex: 1;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
        }

        .compose-form textarea {
          width: 100%;
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          resize: none;
          margin-bottom: 20px;
          font-family: 'Montserrat', sans-serif;
        }

        .compose-actions {
          display: flex;
          gap: 12px;
        }

        .send-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #0066FF;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
        }

        .discard-btn {
          padding: 12px 24px;
          background: #f1f5f9;
          color: #64748b;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </div>
  );
}
