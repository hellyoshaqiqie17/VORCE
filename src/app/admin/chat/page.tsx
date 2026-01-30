"use client";

import { useState, useEffect } from "react";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  type?: "call" | "voice" | "file" | "message";
  isActive?: boolean;
  email?: string;
}

interface Message {
  id: string;
  sender: string;
  senderAvatar: string;
  content: string;
  time: string;
  isMe: boolean;
  image?: string;
}

const contacts: Contact[] = [
  { id: "1", name: "Putri Amelia", avatar: "https://i.pravatar.cc/100?img=1", lastMessage: "Halo, saya butuh bantuan 🙏", time: "Now", isActive: true, email: "putri.amelia@email.com" },
  // ... (keeping other contacts for reference if needed, though they are hidden now)
];

// Messages: isMe = true means admin/us (right side), isMe = false means user (left side)
const initialMessages: Message[] = [
  { id: "1", sender: "Siti Nurhaliza", senderAvatar: "https://i.pravatar.cc/100?img=4", content: "Bagaimana cara mendapatkan info lebih lanjut?", time: "11:12 AM", isMe: false },
  { id: "2", sender: "Admin", senderAvatar: "https://i.pravatar.cc/100?img=11", content: "Jika Anda seorang pemula yang mencari bantuan untuk memulai, atau seorang desainer veteran yang mencari panduan detail tentang hal-hal seperti best practice atau kolaborasi, kami telah menyiapkan beberapa course dan resource favorit kami di bawah ini.", time: "11:43 AM", isMe: true },
  { id: "3", sender: "Siti Nurhaliza", senderAvatar: "https://i.pravatar.cc/100?img=4", content: "Seharusnya sudah mencakup semua yang perlu Anda ketahui dari navigasi.", time: "11:48 AM", isMe: false },
  { id: "4", sender: "Siti Nurhaliza", senderAvatar: "https://i.pravatar.cc/100?img=4", content: "Oke, tolong kirimkan saya informasi lebih lanjut di sini, saya butuh sekarang. Kami telah menyiapkan beberapa course favorit kami.", time: "12:12 PM", isMe: false },
  { id: "5", sender: "Admin", senderAvatar: "https://i.pravatar.cc/100?img=11", content: "Ngomong-ngomong, negara Anda juga sudah ditentukan dengan benar. Nibh sit netus suscipit egestas eget ut. Ut massa malesuada lectus sed.", time: "12:27 PM", isMe: true },
  { id: "6", sender: "Admin", senderAvatar: "https://i.pravatar.cc/100?img=11", content: "Oke, mengerti! @annette silakan lihat", time: "12:28 PM", isMe: true },
];

export default function ChatPage() {
  const [activeContact, setActiveContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case "call":
        return <span className="material-icons type-icon">call</span>;
      case "voice":
        return <span className="material-icons type-icon">mic</span>;
      case "file":
        return <span className="material-icons type-icon file">insert_drive_file</span>;
      default:
        return null;
    }
  };

  // Function to render message content with @mention highlighting
  const renderMessageContent = (content: string) => {
    const parts = content.split(/(@\w+)/g);
    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        return <span key={index} className="mention">{part}</span>;
      }
      return part;
    });
  };

  useEffect(() => {
    // Check for pending image from camera
    const pendingImage = localStorage.getItem("pendingChatImage");
    if (pendingImage) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "Admin",
        senderAvatar: "https://i.pravatar.cc/100?img=11",
        content: "Sent a photo from camera",
        image: pendingImage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      setMessages(prev => [...prev, newMessage]);
      localStorage.removeItem("pendingChatImage");
      
      // Scroll to bottom (mock)
      setTimeout(() => {
        const chatContainer = document.querySelector('.chat-messages');
        if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 100);
    }
  }, []);

  return (
    <div className="chat-container">
      {/* Left Sidebar - Conversation List */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <div className="search-box">
            <span className="material-icons">search</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="menu-btn">...</button>
          <button className="new-chat-btn">
            <span className="material-icons">edit_note</span>
          </button>
        </div>

        <div className="chat-list">
            <div className={`chat-item active`}>
              <div className="avatar-placeholder group">
                  <span className="material-icons">groups</span>
              </div>
              <div className="chat-info">
                <div className="chat-name">General Team</div>
                <div className="chat-preview">
                  <span>Start collaborating with your team!</span>
                </div>
              </div>
              <div className="chat-meta">
                <span className="time">Now</span>
              </div>
            </div>
        </div>
      </div>

      {/* Right Panel - Chat Area */}
      <div className="chat-main">
        <div className="chat-header">
          <div className="header-left">
            <div className="avatar-placeholder group-header">
                <span className="material-icons">groups</span>
            </div>
            <div className="header-info">
              <h3>General Team</h3>
              <span className="phone">All Employees</span>
            </div>
          </div>
          <div className="header-actions">
            <button className="icon-btn"><span className="material-icons">search</span></button>
            <button className="icon-btn"><span className="material-icons">more_horiz</span></button>
          </div>
        </div>

        <div className="chat-messages">
          <div className="date-separator">
            <span>15 Januari</span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.isMe ? "sent" : "received"}`}>
              <div className="message-content">
                <div className="message-header">
                  <span className="sender-name">{msg.sender}</span>
                </div>
                {msg.image && (
                   <img src={msg.image} alt="Shared photo" className="shared-image" style={{maxWidth: '200px', borderRadius: '12px', marginBottom: '8px'}} />
                )}
                <div className="bubble">{msg.content}</div>
                <span className="time">{msg.time}</span>
              </div>
              <img src={msg.senderAvatar} alt={msg.sender} className="message-avatar" />
            </div>
          ))}
        </div>

        <div className="chat-input">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Reply..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
          </div>
          <div className="input-toolbar">
            <div className="toolbar-left">
              <button className="toolbar-btn"><span className="material-icons">text_format</span></button>
              <button className="toolbar-btn"><span className="material-icons">sentiment_satisfied_alt</span></button>
              <button className="toolbar-btn"><span className="material-icons">content_copy</span></button>
              <button className="toolbar-btn"><span className="material-icons">label</span></button>
              <button className="toolbar-btn"><span className="material-icons">attach_file</span></button>
              <button className="toolbar-btn"><span className="material-icons">image</span></button>
              <button className="toolbar-btn"><span className="material-icons">visibility</span></button>
            </div>
            <div className="toolbar-right">
              <button className="more-btn">...</button>
              <button className="send-btn">
                Send
                <span className="material-icons">expand_more</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .chat-container {
          display: flex;
          height: calc(100vh - 100px);
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }

        /* Sidebar Styles */
        .chat-sidebar {
          width: 340px;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          background: #fafafa;
        }

        .sidebar-header {
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid #e5e7eb;
        }

        .search-box {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 10px 14px;
        }

        .search-box .material-icons {
          color: #9ca3af;
          font-size: 20px;
        }

        .search-box input {
          flex: 1;
          border: none;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
          color: #374151;
        }

        .search-box input:focus {
          outline: none;
        }

        .menu-btn {
          background: none;
          border: none;
          font-size: 20px;
          color: #6b7280;
          cursor: pointer;
          padding: 4px;
        }

        .new-chat-btn {
          background: #3b82f6;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
        }

        .chat-list {
          flex: 1;
          overflow-y: auto;
        }

        .chat-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          cursor: pointer;
          transition: background 0.2s;
          border-left: 3px solid transparent;
        }

        .chat-item:hover {
          background: #f3f4f6;
        }

        .chat-item.active {
          background: #eff6ff;
          border-left-color: #3b82f6;
        }

        .avatar-img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
        }

        .avatar-placeholder {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
        }

        .chat-info {
          flex: 1;
          min-width: 0;
        }

        .chat-name {
          font-weight: 600;
          color: #111827;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .chat-preview {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          font-size: 13px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .type-icon {
          font-size: 16px;
          color: #9ca3af;
        }

        .type-icon.file {
          color: #f59e0b;
        }

        .chat-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }

        .time {
          font-size: 12px;
          color: #9ca3af;
        }

        .badge {
          background: #3b82f6;
          color: white;
          font-size: 11px;
          font-weight: 600;
          min-width: 20px;
          height: 20px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Chat Main Styles */
        .chat-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: white;
        }

        .chat-header {
          padding: 16px 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .header-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
        }

        .header-info h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 2px 0;
          color: #111827;
        }

        .phone {
          font-size: 13px;
          color: #6b7280;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .action-link {
          background: none;
          border: none;
          color: #3b82f6;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
        }

        .icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: none;
          background: #f3f4f6;
          color: #6b7280;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-btn .material-icons {
          font-size: 20px;
        }

        .details-btn {
          background: none;
          border: none;
          color: #6b7280;
          font-size: 14px;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
        }

        /* Messages Styles */
        .chat-messages {
          flex: 1;
          padding: 20px 24px;
          overflow-y: auto;
          background: #fafafa;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .date-separator {
          text-align: center;
          color: #6b7280;
          font-size: 13px;
          font-weight: 500;
          padding: 10px 0;
        }

        .date-separator span {
          background: #e5e7eb;
          padding: 6px 16px;
          border-radius: 20px;
        }

        .message {
          display: flex;
          gap: 12px;
          max-width: 75%;
        }

        .message.received {
          align-self: flex-start;
          flex-direction: row-reverse;
        }

        .message.sent {
          align-self: flex-end;
        }

        .message-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .message-content {
          display: flex;
          flex-direction: column;
        }

        .message-header {
          margin-bottom: 6px;
        }

        .sender-name {
          font-size: 13px;
          font-weight: 600;
          color: #111827;
        }

        .bubble {
          padding: 14px 18px;
          border-radius: 16px;
          font-size: 14px;
          line-height: 1.6;
        }

        .message.received .bubble {
          background: #3b82f6;
          color: white;
          border-bottom-left-radius: 4px;
        }

        .message.sent .bubble {
          background: #f3f4f6;
          color: #374151;
          border-bottom-right-radius: 4px;
        }

        .message .time {
          margin-top: 6px;
          font-size: 11px;
          color: #9ca3af;
        }

        .message.sent .time {
          text-align: right;
        }

        /* Input Styles */
        .chat-input {
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          background: white;
        }

        .input-wrapper {
          margin-bottom: 12px;
        }

        .input-wrapper input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
          color: #374151;
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .input-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .toolbar-left {
          display: flex;
          gap: 4px;
        }

        .toolbar-btn {
          width: 36px;
          height: 36px;
          border: none;
          background: none;
          color: #9ca3af;
          cursor: pointer;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toolbar-btn:hover {
          background: #f3f4f6;
          color: #6b7280;
        }

        .toolbar-btn .material-icons {
          font-size: 20px;
        }

        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .more-btn {
          background: none;
          border: none;
          font-size: 20px;
          color: #6b7280;
          cursor: pointer;
        }

        .send-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 10px 16px;
          background: #f3f4f6;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
        }

        .send-btn:hover {
          background: #e5e7eb;
        }

        .send-btn .material-icons {
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}
