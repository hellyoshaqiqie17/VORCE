"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Mock data for devices
const mockDevices: { id: string; name: string; user: string; lastActive: string; status: "online" | "offline"; battery: number; cpu: number; ram: number; }[] = [
  { id: "1", name: "MacBook Pro - Designer", user: "Sarah Evans", lastActive: "2 min ago", status: "online", battery: 85, cpu: 45, ram: 62 },
  { id: "2", name: "Dell XPS 15 - Developer", user: "John Doe", lastActive: "5 min ago", status: "online", battery: 72, cpu: 78, ram: 54 },
  { id: "3", name: "ThinkPad X1 - Marketing", user: "Anna Lee", lastActive: "1 hour ago", status: "offline", battery: 15, cpu: 0, ram: 0 },
  { id: "4", name: "iMac 27 - Finance", user: "Mike Kim", lastActive: "3 min ago", status: "online", battery: 100, cpu: 92, ram: 71 },
  { id: "5", name: "Surface Pro - Sales", user: "Ryan Brown", lastActive: "2 days ago", status: "offline", battery: 8, cpu: 0, ram: 0 },
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
}

export default function AssetOverview() {
  const router = useRouter();
  const [devices] = useState<Device[]>(mockDevices);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [generatedToken, setGeneratedToken] = useState("");
  const [copied, setCopied] = useState(false);

  // Stats calculations
  const totalAssets = devices.length;
  const onlineNow = devices.filter(d => d.status === "online").length;
  const criticalAlerts = devices.filter(d => d.cpu > 90 || d.battery < 20).length;

  const generateToken = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const part2 = Array(4).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
    const part3 = Array(2).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
    return `TRX-${part2}-${part3}`;
  };

  const handleAddDevice = () => {
    if (newDeviceName.trim()) {
      const token = generateToken();
      setGeneratedToken(token);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openDeviceDetail = (device: Device) => {
    router.push(`/admin/assets/${device.id}`);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewDeviceName("");
    setGeneratedToken("");
    setCopied(false);
  };

  return (
    <div className="asset-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Asset Control & Monitoring</h1>
          <p>Monitor and manage all company devices in real-time.</p>
        </div>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          <span className="material-icons">add</span>
          Add Device
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon devices">
            <span className="material-icons">devices</span>
          </div>
          <div className="stat-info">
            <span className="label">Total Assets</span>
            <div className="value">{totalAssets}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon online">
            <span className="material-icons">wifi</span>
          </div>
          <div className="stat-info">
            <span className="label">Online Now</span>
            <div className="value">{onlineNow}</div>
          </div>
          <div className="stat-trend positive">
            <span className="pulse-dot"></span>
            <span>Live</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon critical">
            <span className="material-icons">warning</span>
          </div>
          <div className="stat-info">
            <span className="label">Critical Alerts</span>
            <div className="value">{criticalAlerts}</div>
          </div>
          {criticalAlerts > 0 && (
            <div className="stat-trend negative">
              <span>Needs Attention</span>
            </div>
          )}
        </div>
      </div>

      {/* Device List */}
      <div className="card device-list">
        <div className="card-header">
          <h3>Registered Devices</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Device Name</th>
                <th>Assigned User</th>
                <th>Last Active</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.id} onClick={() => openDeviceDetail(device)}>
                  <td>
                    <div className="device-name">
                      <span className="material-icons">
                        {device.name.includes("Mac") || device.name.includes("iMac") ? "laptop_mac" : "laptop"}
                      </span>
                      {device.name}
                    </div>
                  </td>
                  <td>{device.user}</td>
                  <td>{device.lastActive}</td>
                  <td>
                    <span className={`status-badge ${device.status}`}>
                      {device.status === "online" && <span className="pulse-dot-small"></span>}
                      {device.status}
                    </span>
                  </td>
                  <td>
                    <button className="view-btn" onClick={(e) => { e.stopPropagation(); openDeviceDetail(device); }}>
                      <span className="material-icons">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={closeAddModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Device</h2>
              <button className="close-btn" onClick={closeAddModal}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-body">
              {!generatedToken ? (
                <>
                  <label>Device Name</label>
                  <input
                    type="text"
                    placeholder="e.g., MacBook Pro - Designer"
                    value={newDeviceName}
                    onChange={(e) => setNewDeviceName(e.target.value)}
                  />
                  <button className="primary-btn" onClick={handleAddDevice} disabled={!newDeviceName.trim()}>
                    Generate Pairing Token
                  </button>
                </>
              ) : (
                <div className="token-display">
                  <p className="token-label">Your Pairing Token</p>
                  <div className="token-value">{generatedToken}</div>
                  <button className="copy-btn" onClick={copyToClipboard}>
                    <span className="material-icons">{copied ? "check" : "content_copy"}</span>
                    {copied ? "Copied!" : "Copy to Clipboard"}
                  </button>
                  <p className="token-instruction">
                    Enter this token into the Desktop App to link the device.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .asset-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .page-header h1 {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .page-header p {
          color: #64748b;
          font-size: 14px;
        }

        .add-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #0066FF;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .add-btn:hover {
          background: #6354d3;
          transform: translateY(-1px);
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

        .stat-icon .material-icons { font-size: 24px; }
        .stat-icon.devices { background: #ede9fe; color: #7c3aed; }
        .stat-icon.online { background: #dcfce7; color: #16a34a; }
        .stat-icon.critical { background: #fee2e2; color: #dc2626; }

        .stat-info { flex: 1; }
        .stat-info .label {
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
          display: block;
          margin-bottom: 4px;
        }
        .stat-info .value {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
        }

        .stat-trend {
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .stat-trend.positive { color: #16a34a; }
        .stat-trend.negative { color: #dc2626; }

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
          margin-right: 4px;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
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
        }

        .card-header h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .table-container {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          text-align: left;
          padding: 16px 24px;
          font-size: 14px;
        }

        th {
          background: #f8fafc;
          color: #64748b;
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        tr {
          border-bottom: 1px solid #f1f5f9;
          cursor: pointer;
          transition: background 0.2s;
        }

        tr:hover {
          background: #f8fafc;
        }

        tr:last-child {
          border-bottom: none;
        }

        .device-name {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 500;
          color: #1e293b;
        }

        .device-name .material-icons {
          color: #94a3b8;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .status-badge.online {
          background: #dcfce7;
          color: #16a34a;
        }

        .status-badge.offline {
          background: #f1f5f9;
          color: #64748b;
        }

        .view-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: white;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .view-btn:hover {
          background: #0066FF;
          color: white;
          border-color: #0066FF;
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
          border-radius: 20px;
          width: 100%;
          max-width: 480px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          padding: 24px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h2 {
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
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }

        .close-btn:hover {
          background: #e2e8f0;
        }

        .modal-body {
          padding: 24px;
        }

        .modal-body label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 8px;
        }

        .modal-body input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          margin-bottom: 20px;
          transition: border-color 0.2s;
        }

        .modal-body input:focus {
          outline: none;
          border-color: #0066FF;
        }

        .primary-btn {
          width: 100%;
          padding: 14px;
          background: #0066FF;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .primary-btn:hover:not(:disabled) {
          background: #6354d3;
        }

        .primary-btn:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
        }

        .token-display {
          text-align: center;
        }

        .token-label {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 16px;
        }

        .token-value {
          font-size: 32px;
          font-weight: 700;
          color: #7b68ee;
          letter-spacing: 2px;
          margin-bottom: 20px;
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
          font-family: 'Courier New', monospace;
        }

        .copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
          margin-bottom: 20px;
        }

        .copy-btn:hover {
          background: #059669;
        }

        .token-instruction {
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.5;
        }

        /* Command Center Modal */
        .command-center-modal {
          max-width: 800px;
        }

        .command-center-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 24px;
        }

        @media (max-width: 768px) {
          .command-center-body {
            grid-template-columns: 1fr;
          }
        }

        .telemetry-column h4,
        .controls-column h4 {
          font-size: 14px;
          font-weight: 600;
          color: #475569;
          margin: 0 0 16px 0;
        }

        .metric-card {
          background: #f8fafc;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 12px;
        }

        .metric-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          font-size: 13px;
          color: #64748b;
        }

        .metric-header .material-icons {
          font-size: 18px;
        }

        .metric-value {
          margin-left: auto;
          font-weight: 700;
          color: #1e293b;
        }

        .progress-bar {
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .progress-fill.green { background: #10b981; }
        .progress-fill.yellow { background: #f59e0b; }
        .progress-fill.red { background: #ef4444; }

        .control-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .lock-btn, .unlock-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .lock-btn {
          background: #fee2e2;
          color: #dc2626;
        }

        .lock-btn:hover:not(:disabled) {
          background: #fecaca;
        }

        .unlock-btn {
          background: #dcfce7;
          color: #16a34a;
        }

        .unlock-btn:hover:not(:disabled) {
          background: #bbf7d0;
        }

        .lock-btn:disabled, .unlock-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .activity-feed {
          background: #f8fafc;
          border-radius: 12px;
          padding: 16px;
          max-height: 200px;
          overflow-y: auto;
        }

        .activity-item {
          display: flex;
          gap: 12px;
          padding: 8px 0;
          border-bottom: 1px solid #e2e8f0;
          font-size: 13px;
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-item .time {
          color: #94a3b8;
          font-weight: 500;
          white-space: nowrap;
        }

        /* Confirm Modal */
        .confirm-modal {
          max-width: 400px;
          text-align: center;
          padding: 32px;
        }

        .confirm-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #fee2e2;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .confirm-icon .material-icons {
          font-size: 32px;
          color: #dc2626;
        }

        .confirm-modal h3 {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 12px 0;
        }

        .confirm-modal p {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 24px 0;
          line-height: 1.5;
        }

        .confirm-actions {
          display: flex;
          gap: 12px;
        }

        .cancel-btn {
          flex: 1;
          padding: 14px;
          background: #f1f5f9;
          color: #475569;
          border: none;
          border-radius: 10px;
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
          padding: 14px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 10px;
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
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: 16px;
          }

          .add-btn {
            width: 100%;
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
