"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// Mock device data - in real app, fetch from API/socket
const mockDevices: Record<string, Device> = {
  "1": { id: "1", name: "MacBook Pro - Designer", user: "Sarah Evans", lastActive: "Now", status: "online", battery: 85, cpu: 45, ram: 62, ssd: 72 },
  "2": { id: "2", name: "Dell XPS 15 - Developer", user: "John Doe", lastActive: "Now", status: "online", battery: 72, cpu: 78, ram: 54, ssd: 45 },
  "3": { id: "3", name: "ThinkPad X1 - Marketing", user: "Anna Lee", lastActive: "1 hour ago", status: "offline", battery: 15, cpu: 0, ram: 0, ssd: 89 },
  "4": { id: "4", name: "iMac 27 - Finance", user: "Mike Kim", lastActive: "Now", status: "online", battery: 100, cpu: 92, ram: 71, ssd: 34 },
  "5": { id: "5", name: "Surface Pro - Sales", user: "Ryan Brown", lastActive: "2 days ago", status: "offline", battery: 8, cpu: 0, ram: 0, ssd: 56 },
};

// Mock active apps data
const mockActiveApps = [
  { name: "VS Code", icon: "code", startTime: "09:00 AM", duration: "2h 30m", isActive: true },
  { name: "Google Chrome", icon: "public", startTime: "09:15 AM", duration: "2h 15m", isActive: true },
  { name: "Slack", icon: "chat", startTime: "09:30 AM", duration: "1h 45m", isActive: false },
  { name: "Figma", icon: "brush", startTime: "10:00 AM", duration: "1h 20m", isActive: true },
  { name: "Terminal", icon: "terminal", startTime: "10:30 AM", duration: "45m", isActive: false },
  { name: "Spotify", icon: "music_note", startTime: "09:05 AM", duration: "2h 25m", isActive: true },
  { name: "Notion", icon: "description", startTime: "11:00 AM", duration: "30m", isActive: false },
];

interface Device {
  id: string;
  name: string;
  user: string;
  lastActive: string;
  status: "online" | "offline";
  battery: number;
  cpu: number;
  ram: number;
  ssd: number;
}

export default function DeviceDetail() {
  const params = useParams();
  const router = useRouter();
  const deviceId = params.deviceId as string;
  
  const [device, setDevice] = useState<Device | null>(null);
  const [isLocking, setIsLocking] = useState(false);
  const [showLockConfirm, setShowLockConfirm] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // Simulate fetching device data
    const foundDevice = mockDevices[deviceId];
    if (foundDevice) {
      setDevice(foundDevice);
    }
  }, [deviceId]);

  const handleLockDevice = () => {
    setIsLocking(true);
    setTimeout(() => {
      setIsLocking(false);
      setShowLockConfirm(false);
      setIsLocked(true);
    }, 2000);
  };

  const handleUnlockDevice = () => {
    setIsLocked(false);
  };

  const getHealthColor = (value: number, type: "battery" | "usage") => {
    if (type === "battery") {
      if (value > 50) return "green";
      if (value > 20) return "yellow";
      return "red";
    } else {
      if (value < 70) return "green";
      if (value < 90) return "yellow";
      return "red";
    }
  };

  if (!device) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading device...</p>
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            gap: 16px;
            color: #64748b;
          }
          .spinner-large {
            width: 40px;
            height: 40px;
            border: 3px solid #e2e8f0;
            border-top-color: #0066FF;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="device-detail-container">
      {/* Breadcrumb & Header */}
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/admin/assets" className="back-link">
            <span className="material-icons">arrow_back</span>
            Back to Assets
          </Link>
        </div>
        <div className="header-content">
          <div className="device-info">
            <div className="device-icon">
              <span className="material-icons">
                {device.name.includes("Mac") || device.name.includes("iMac") ? "laptop_mac" : "laptop"}
              </span>
            </div>
            <div>
              <h1>{device.name}</h1>
              <p>Assigned to <strong>{device.user}</strong> • Last active: {device.lastActive}</p>
            </div>
          </div>
          <div className="status-section">
            <span className={`status-badge large ${device.status} ${isLocked ? 'locked' : ''}`}>
              {device.status === "online" && !isLocked && <span className="pulse-dot"></span>}
              {isLocked ? "🔒 Locked" : device.status}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="detail-grid">
        {/* Left Column - System Metrics */}
        <div className="metrics-card">
          <div className="card-header">
            <h3>
              <span className="material-icons">monitoring</span>
              System Metrics
            </h3>
            <span className="live-indicator">
              <span className="pulse-dot-small"></span>
              Live
            </span>
          </div>
          <div className="metrics-grid">
            {/* Battery */}
            <div className="metric-item">
              <div className="metric-icon battery">
                <span className="material-icons">battery_std</span>
              </div>
              <div className="metric-content">
                <div className="metric-header">
                  <span className="metric-label">Battery</span>
                  <span className={`metric-value ${getHealthColor(device.battery, "battery")}`}>
                    {device.battery}%
                  </span>
                </div>
                <div className="progress-bar large">
                  <div 
                    className={`progress-fill ${getHealthColor(device.battery, "battery")}`}
                    style={{ width: `${device.battery}%` }}
                  ></div>
                </div>
                <span className="metric-status">
                  {device.battery > 50 ? "Healthy" : device.battery > 20 ? "Low" : "Critical"}
                </span>
              </div>
            </div>

            {/* CPU */}
            <div className="metric-item">
              <div className="metric-icon cpu">
                <span className="material-icons">memory</span>
              </div>
              <div className="metric-content">
                <div className="metric-header">
                  <span className="metric-label">CPU Usage</span>
                  <span className={`metric-value ${getHealthColor(device.cpu, "usage")}`}>
                    {device.cpu}%
                  </span>
                </div>
                <div className="progress-bar large">
                  <div 
                    className={`progress-fill ${getHealthColor(device.cpu, "usage")}`}
                    style={{ width: `${device.cpu}%` }}
                  ></div>
                </div>
                <span className="metric-status">
                  {device.cpu < 70 ? "Normal" : device.cpu < 90 ? "High" : "Critical"}
                </span>
              </div>
            </div>

            {/* RAM */}
            <div className="metric-item">
              <div className="metric-icon ram">
                <span className="material-icons">sd_card</span>
              </div>
              <div className="metric-content">
                <div className="metric-header">
                  <span className="metric-label">RAM Usage</span>
                  <span className={`metric-value ${getHealthColor(device.ram, "usage")}`}>
                    {device.ram}%
                  </span>
                </div>
                <div className="progress-bar large">
                  <div 
                    className={`progress-fill ${getHealthColor(device.ram, "usage")}`}
                    style={{ width: `${device.ram}%` }}
                  ></div>
                </div>
                <span className="metric-status">
                  {device.ram < 70 ? "Normal" : device.ram < 85 ? "High" : "Critical"}
                </span>
              </div>
            </div>

            {/* SSD */}
            <div className="metric-item">
              <div className="metric-icon ssd">
                <span className="material-icons">storage</span>
              </div>
              <div className="metric-content">
                <div className="metric-header">
                  <span className="metric-label">SSD Usage</span>
                  <span className={`metric-value ${getHealthColor(device.ssd, "usage")}`}>
                    {device.ssd}%
                  </span>
                </div>
                <div className="progress-bar large">
                  <div 
                    className={`progress-fill ${getHealthColor(device.ssd, "usage")}`}
                    style={{ width: `${device.ssd}%` }}
                  ></div>
                </div>
                <span className="metric-status">
                  {256 - Math.round((device.ssd / 100) * 256)} GB free of 256 GB
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Controls & Apps */}
        <div className="right-column">
          {/* Remote Control Card */}
          <div className="control-card">
            <div className="card-header">
              <h3>
                <span className="material-icons">admin_panel_settings</span>
                Remote Control
              </h3>
            </div>
            <div className="control-buttons">
              <button 
                className={`lock-btn ${isLocked ? 'disabled' : ''}`}
                onClick={() => !isLocked && setShowLockConfirm(true)} 
                disabled={device.status === "offline" || isLocked}
              >
                <span className="material-icons">lock</span>
                <div>
                  <strong>Lock Device</strong>
                  <span>Immediately lock screen</span>
                </div>
              </button>
              <button 
                className={`unlock-btn ${!isLocked ? 'disabled' : ''}`}
                onClick={handleUnlockDevice} 
                disabled={device.status === "offline" || !isLocked}
              >
                <span className="material-icons">lock_open</span>
                <div>
                  <strong>Unlock Device</strong>
                  <span>Remove remote lock</span>
                </div>
              </button>
            </div>
            {device.status === "offline" && (
              <div className="offline-notice">
                <span className="material-icons">info</span>
                Device is offline. Commands will execute when device reconnects.
              </div>
            )}
          </div>

          {/* Active Apps Card */}
          <div className="apps-card">
            <div className="card-header">
              <h3>
                <span className="material-icons">apps</span>
                Active Applications
              </h3>
              <span className="app-count">{mockActiveApps.filter(a => a.isActive).length} running</span>
            </div>
            <div className="apps-list">
              {mockActiveApps.map((app, index) => (
                <div key={index} className={`app-item ${app.isActive ? 'active' : ''}`}>
                  <div className="app-icon">
                    <span className="material-icons">{app.icon}</span>
                  </div>
                  <div className="app-info">
                    <span className="app-name">{app.name}</span>
                    <span className="app-time">Started {app.startTime} • {app.duration}</span>
                  </div>
                  <span className={`app-status ${app.isActive ? 'running' : 'idle'}`}>
                    {app.isActive ? 'Running' : 'Idle'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lock Confirmation Modal */}
      {showLockConfirm && (
        <div className="modal-overlay" onClick={() => !isLocking && setShowLockConfirm(false)}>
          <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">
              <span className="material-icons">lock</span>
            </div>
            <h3>Lock This Device?</h3>
            <p>
              You are about to lock <strong>{device.name}</strong>. 
              The user <strong>{device.user}</strong> will be immediately logged out and won't be able to access the device until unlocked.
            </p>
            <div className="confirm-actions">
              <button className="cancel-btn" onClick={() => setShowLockConfirm(false)} disabled={isLocking}>
                Cancel
              </button>
              <button className="danger-btn" onClick={handleLockDevice} disabled={isLocking}>
                {isLocking ? (
                  <>
                    <span className="spinner"></span>
                    Locking...
                  </>
                ) : (
                  <>
                    <span className="material-icons">lock</span>
                    Yes, Lock Device
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .device-detail-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 32px;
        }

        .breadcrumb {
          margin-bottom: 20px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: #0066FF;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
        }

        .device-info {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .device-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #0066FF 0%, #0052CC 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(0, 102, 255, 0.25);
        }

        .device-icon .material-icons {
          font-size: 32px;
          color: white;
        }

        .device-info h1 {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 6px 0;
        }

        .device-info p {
          color: #64748b;
          font-size: 14px;
          margin: 0;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          border-radius: 24px;
          font-size: 13px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .status-badge.large {
          padding: 10px 20px;
          font-size: 14px;
        }

        .status-badge.online {
          background: #dcfce7;
          color: #16a34a;
        }

        .status-badge.offline {
          background: #f1f5f9;
          color: #64748b;
        }

        .status-badge.locked {
          background: #fee2e2;
          color: #dc2626;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #16a34a;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .pulse-dot-small {
          width: 6px;
          height: 6px;
          background: #16a34a;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .detail-grid {
            grid-template-columns: 1fr;
          }
        }

        .metrics-card, .control-card, .apps-card {
          background: white;
          border-radius: 20px;
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
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .card-header h3 .material-icons {
          font-size: 20px;
          color: #0066FF;
        }

        .live-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #16a34a;
          background: #dcfce7;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .metrics-grid {
          padding: 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }

        .metric-item {
          display: flex;
          gap: 16px;
          padding: 20px;
          background: #f8fafc;
          border-radius: 16px;
        }

        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .metric-icon .material-icons { font-size: 24px; }
        .metric-icon.battery { background: #fef3c7; color: #d97706; }
        .metric-icon.cpu { background: #dbeafe; color: #2563eb; }
        .metric-icon.ram { background: #ede9fe; color: #7c3aed; }
        .metric-icon.ssd { background: #dcfce7; color: #16a34a; }

        .metric-content {
          flex: 1;
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .metric-label {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
        }

        .metric-value {
          font-size: 18px;
          font-weight: 700;
        }

        .metric-value.green { color: #16a34a; }
        .metric-value.yellow { color: #d97706; }
        .metric-value.red { color: #dc2626; }

        .progress-bar {
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-bar.large {
          height: 10px;
          border-radius: 5px;
        }

        .progress-fill {
          height: 100%;
          border-radius: inherit;
          transition: width 0.5s ease;
        }

        .progress-fill.green { background: linear-gradient(90deg, #22c55e, #16a34a); }
        .progress-fill.yellow { background: linear-gradient(90deg, #fbbf24, #d97706); }
        .progress-fill.red { background: linear-gradient(90deg, #f87171, #dc2626); }

        .metric-status {
          font-size: 11px;
          color: #94a3b8;
        }

        .right-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .control-buttons {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .lock-btn, .unlock-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          border: 2px solid transparent;
          border-radius: 16px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
        }

        .lock-btn {
          background: #fef2f2;
          border-color: #fecaca;
        }

        .lock-btn:hover:not(:disabled) {
          background: #fee2e2;
          border-color: #fca5a5;
        }

        .lock-btn .material-icons {
          font-size: 28px;
          color: #dc2626;
        }

        .lock-btn strong {
          display: block;
          color: #dc2626;
          font-size: 15px;
          margin-bottom: 2px;
        }

        .lock-btn span {
          color: #f87171;
          font-size: 12px;
        }

        .unlock-btn {
          background: #f0fdf4;
          border-color: #bbf7d0;
        }

        .unlock-btn:hover:not(:disabled) {
          background: #dcfce7;
          border-color: #86efac;
        }

        .unlock-btn .material-icons {
          font-size: 28px;
          color: #16a34a;
        }

        .unlock-btn strong {
          display: block;
          color: #16a34a;
          font-size: 15px;
          margin-bottom: 2px;
        }

        .unlock-btn span {
          color: #4ade80;
          font-size: 12px;
        }

        .lock-btn:disabled, .unlock-btn:disabled,
        .lock-btn.disabled, .unlock-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .offline-notice {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px 24px;
          font-size: 13px;
          color: #64748b;
        }

        .offline-notice .material-icons {
          font-size: 18px;
          color: #94a3b8;
        }

        .app-count {
          font-size: 12px;
          color: #64748b;
          background: #f1f5f9;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .apps-list {
          padding: 16px;
          max-height: 400px;
          overflow-y: auto;
        }

        .app-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px;
          border-radius: 12px;
          margin-bottom: 8px;
          transition: background 0.2s;
        }

        .app-item:hover {
          background: #f8fafc;
        }

        .app-item.active {
          background: #f0fdf4;
        }

        .app-icon {
          width: 40px;
          height: 40px;
          background: #f1f5f9;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .app-item.active .app-icon {
          background: #dcfce7;
        }

        .app-icon .material-icons {
          font-size: 20px;
          color: #64748b;
        }

        .app-item.active .app-icon .material-icons {
          color: #16a34a;
        }

        .app-info {
          flex: 1;
        }

        .app-name {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 2px;
        }

        .app-time {
          font-size: 12px;
          color: #94a3b8;
        }

        .app-status {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .app-status.running {
          background: #dcfce7;
          color: #16a34a;
        }

        .app-status.idle {
          background: #f1f5f9;
          color: #64748b;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal {
          background: white;
          border-radius: 24px;
          width: 100%;
          max-width: 420px;
        }

        .confirm-modal {
          text-align: center;
          padding: 40px 32px;
        }

        .confirm-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #fee2e2;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }

        .confirm-icon .material-icons {
          font-size: 36px;
          color: #dc2626;
        }

        .confirm-modal h3 {
          font-size: 22px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 12px 0;
        }

        .confirm-modal p {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 28px 0;
          line-height: 1.6;
        }

        .confirm-actions {
          display: flex;
          gap: 12px;
        }

        .cancel-btn {
          flex: 1;
          padding: 16px;
          background: #f1f5f9;
          color: #475569;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .cancel-btn:hover:not(:disabled) {
          background: #e2e8f0;
        }

        .danger-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .danger-btn:hover:not(:disabled) {
          background: #b91c1c;
        }

        .danger-btn:disabled, .cancel-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
          }
          
          .device-info {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
