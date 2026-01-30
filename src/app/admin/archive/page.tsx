"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ArchivedItem {
  id: string;
  month: string;
  monthIndex: number;
  size: string;
  year: string;
  items: ArchiveDetail[];
}

interface ArchiveDetail {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "task" | "leave" | "reimburse" | "attendance";
  completedBy: string;
  status?: string;
  amount?: string;
  checkIn?: string;
  checkOut?: string;
  location?: string;
}

// All months in Indonesian
const allMonths = [
  { name: "Januari", index: 0 },
  { name: "Februari", index: 1 },
  { name: "Maret", index: 2 },
  { name: "April", index: 3 },
  { name: "Mei", index: 4 },
  { name: "Juni", index: 5 },
  { name: "Juli", index: 6 },
  { name: "Agustus", index: 7 },
  { name: "September", index: 8 },
  { name: "Oktober", index: 9 },
  { name: "November", index: 10 },
  { name: "Desember", index: 11 },
];

// Generate sample data for demonstration
const generateMonthData = (category: string, year: string): ArchivedItem[] => {
  return allMonths.map((month, idx) => {
    const itemCount = Math.floor(Math.random() * 5);
    const items: ArchiveDetail[] = [];
    
    for (let i = 0; i < itemCount; i++) {
      const day = Math.floor(Math.random() * 28) + 1;
      const dateStr = `${year}-${String(month.index + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      if (category === "izin") {
        items.push({
          id: `${month.name}-${i}`,
          title: ["Cuti Tahunan", "Izin Sakit", "Cuti Melahirkan", "Izin Pribadi"][Math.floor(Math.random() * 4)],
          description: ["Cuti liburan keluarga", "Demam dan flu", "Istirahat medis", "Keperluan keluarga"][Math.floor(Math.random() * 4)],
          date: dateStr,
          type: "leave",
          completedBy: ["Andi Pratama", "Siti Rahayu", "Budi Hartono", "Dewi Lestari"][Math.floor(Math.random() * 4)],
          status: ["Disetujui", "Ditolak", "Pending"][Math.floor(Math.random() * 3)],
        });
      } else if (category === "tugas") {
        items.push({
          id: `${month.name}-${i}`,
          title: ["Laporan Bulanan", "Review Code", "Update Dokumentasi", "Testing Aplikasi"][Math.floor(Math.random() * 4)],
          description: ["Laporan progress project", "Code review sprint", "Update API docs", "QA testing"][Math.floor(Math.random() * 4)],
          date: dateStr,
          type: "task",
          completedBy: ["Tim Dev", "Tim QA", "Tim Design", "Manajemen"][Math.floor(Math.random() * 4)],
          status: "Selesai",
        });
      } else if (category === "reimburse") {
        items.push({
          id: `${month.name}-${i}`,
          title: ["Transportasi", "Makan", "Peralatan", "Perjalanan Dinas"][Math.floor(Math.random() * 4)],
          description: ["Grab ke kantor", "Meeting klien", "Beli keyboard", "Kunjungan Jakarta"][Math.floor(Math.random() * 4)],
          date: dateStr,
          type: "reimburse",
          completedBy: ["Andi", "Siti", "Budi", "Dewi"][Math.floor(Math.random() * 4)],
          amount: `Rp ${(Math.floor(Math.random() * 5000) + 100).toLocaleString('id-ID')}.000`,
          status: "Disetujui",
        });
      } else {
        items.push({
          id: `${month.name}-${i}`,
          title: ["Andi Pratama", "Siti Rahayu", "Budi Hartono", "Dewi Lestari"][Math.floor(Math.random() * 4)],
          description: ["Shift Pagi", "Shift Siang", "Shift Malam"][Math.floor(Math.random() * 3)],
          date: dateStr,
          type: "attendance",
          completedBy: "HR",
          status: ["Tepat Waktu", "Terlambat"][Math.floor(Math.random() * 2)],
          checkIn: `0${Math.floor(Math.random() * 3) + 8}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
          checkOut: `1${Math.floor(Math.random() * 3) + 6}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
          location: ["Kantor Pusat", "Remote", "Client Site"][Math.floor(Math.random() * 3)],
        });
      }
    }
    
    return {
      id: `${category}-${year}-${month.index}`,
      month: month.name,
      monthIndex: month.index,
      size: `${Math.floor(Math.random() * 20) + 5} KB`,
      year: year,
      items: items,
    };
  }).reverse(); // Reverse to show December first
};

type CategoryType = "izin" | "tugas" | "reimburse" | "kehadiran";

const categoryConfig = {
  izin: { label: "Izin", icon: "event_available", color: "#3b82f6" },
  tugas: { label: "Tugas", icon: "assignment", color: "#f97316" },
  reimburse: { label: "Reimburse", icon: "receipt_long", color: "#22c55e" },
  kehadiran: { label: "Kehadiran", icon: "schedule", color: "#8b5cf6" },
};

// Available years
const availableYears = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"];

export default function ArchivePage() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryType>("izin");
  const [showYearPicker, setShowYearPicker] = useState(false);

  // Generate data based on category and year
  const currentData = generateMonthData(activeCategory, selectedYear);

  const filteredData = currentData.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.month.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.items.some(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSendToEmail = (month: string) => {
    alert(`Arsip ${activeCategory} ${month} ${selectedYear} akan dikirim ke email Anda`);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Disetujui": case "Selesai": case "Tepat Waktu": return "#22c55e";
      case "Ditolak": case "Terlambat": return "#ef4444";
      case "Pending": return "#f59e0b";
      default: return "#64748b";
    }
  };

  return (
    <div className="archive-container">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => router.back()}>
          <span className="material-icons">arrow_back</span>
        </button>
        <h1>Arsip</h1>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => setShowSearch(!showSearch)}>
            <span className="material-icons">search</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="search-bar">
          <span className="material-icons">search</span>
          <input
            type="text"
            placeholder="Cari arsip..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery("")}>
              <span className="material-icons">close</span>
            </button>
          )}
        </div>
      )}

      {/* Category Tabs */}
      <div className="category-tabs">
        {(Object.keys(categoryConfig) as CategoryType[]).map((cat) => (
          <button
            key={cat}
            className={`category-tab ${activeCategory === cat ? "active" : ""}`}
            onClick={() => { setActiveCategory(cat); setExpandedId(null); }}
            style={{ 
              borderColor: activeCategory === cat ? categoryConfig[cat].color : "transparent",
              color: activeCategory === cat ? categoryConfig[cat].color : "#64748b"
            }}
          >
            <span className="material-icons">{categoryConfig[cat].icon}</span>
            <span>{categoryConfig[cat].label}</span>
          </button>
        ))}
      </div>

      {/* Year Selector */}
      <div className="year-selector">
        <h2>{selectedYear}</h2>
        <button className="year-picker-btn" onClick={() => setShowYearPicker(true)}>
          <span className="material-icons">calendar_today</span>
          Pilih Tahun
        </button>
      </div>

      {/* Archive List - All 12 Months */}
      <div className="archive-list">
        {filteredData.map((archive) => (
          <div key={archive.id} className="archive-group">
            <div className="archive-month-item">
              <div className="month-icon" style={{ background: `${categoryConfig[activeCategory].color}15`, color: categoryConfig[activeCategory].color }}>
                <span className="material-icons">{categoryConfig[activeCategory].icon}</span>
              </div>
              <div className="month-info">
                <h4>{archive.month} {archive.year}</h4>
                <span className="size">{archive.items.length} item • {archive.size}</span>
              </div>
              {archive.items.length > 0 && (
                <>
                  <button 
                    className="send-email-btn"
                    onClick={() => handleSendToEmail(archive.month)}
                  >
                    <span className="material-icons">email</span>
                  </button>
                  <button 
                    className={`expand-btn ${expandedId === archive.id ? 'expanded' : ''}`}
                    onClick={() => toggleExpand(archive.id)}
                  >
                    <span className="material-icons">
                      {expandedId === archive.id ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                    </span>
                  </button>
                </>
              )}
              {archive.items.length === 0 && (
                <span className="empty-badge">Kosong</span>
              )}
            </div>

            {/* Expanded Details */}
            {expandedId === archive.id && archive.items.length > 0 && (
              <div className="archive-details">
                {archive.items.map((item) => (
                  <div key={item.id} className="detail-item">
                    <div className="detail-content">
                      <div className="detail-header">
                        <h5>{item.title}</h5>
                        <span 
                          className="status-badge"
                          style={{ 
                            backgroundColor: `${getStatusColor(item.status)}15`, 
                            color: getStatusColor(item.status) 
                          }}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="detail-desc">{item.description}</p>
                      
                      <div className="detail-meta">
                        <span className="meta-item">
                          <span className="material-icons">calendar_today</span>
                          {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        
                        {activeCategory === "reimburse" && item.amount && (
                          <span className="meta-item amount">
                            <span className="material-icons">payments</span>
                            {item.amount}
                          </span>
                        )}
                        
                        {activeCategory === "kehadiran" && (
                          <>
                            <span className="meta-item">
                              <span className="material-icons">login</span>
                              Masuk: {item.checkIn}
                            </span>
                            <span className="meta-item">
                              <span className="material-icons">logout</span>
                              Keluar: {item.checkOut}
                            </span>
                            <span className="meta-item">
                              <span className="material-icons">location_on</span>
                              {item.location}
                            </span>
                          </>
                        )}
                        
                        {activeCategory !== "kehadiran" && (
                          <span className="meta-item">
                            <span className="material-icons">person</span>
                            {item.completedBy}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Year Picker Modal */}
      {showYearPicker && (
        <div className="modal-overlay" onClick={() => setShowYearPicker(false)}>
          <div className="year-picker-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Pilih Tahun</h2>
              <button className="close-btn" onClick={() => setShowYearPicker(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="year-grid">
              {availableYears.map((year) => (
                <button
                  key={year}
                  className={`year-option ${selectedYear === year ? "active" : ""}`}
                  onClick={() => { setSelectedYear(year); setShowYearPicker(false); setExpandedId(null); }}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .archive-container {
          max-width: 800px;
          margin: 0 auto;
          background: #f8fafc;
          min-height: 100vh;
        }

        .page-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: white;
          border-bottom: 1px solid #f1f5f9;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .back-btn {
          width: 40px;
          height: 40px;
          border: none;
          background: none;
          color: #1e293b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 8px;
        }

        .back-btn:hover {
          background: #f1f5f9;
        }

        .page-header h1 {
          flex: 1;
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .icon-btn {
          width: 40px;
          height: 40px;
          border: none;
          background: none;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 8px;
        }

        .icon-btn:hover {
          background: #f1f5f9;
          color: #1e293b;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: white;
          border-bottom: 1px solid #f1f5f9;
        }

        .search-bar .material-icons {
          color: #94a3b8;
          font-size: 20px;
        }

        .search-bar input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
        }

        .clear-btn {
          width: 24px;
          height: 24px;
          border: none;
          background: #f1f5f9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .clear-btn .material-icons {
          font-size: 16px;
          color: #64748b;
        }

        /* Category Tabs */
        .category-tabs {
          display: flex;
          gap: 8px;
          padding: 16px 20px;
          background: white;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .category-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: #f8fafc;
          border: 2px solid transparent;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .category-tab:hover {
          background: #f1f5f9;
        }

        .category-tab.active {
          background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .category-tab .material-icons {
          font-size: 18px;
        }

        /* Year Selector */
        .year-selector {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          background: white;
          margin: 16px;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .year-selector h2 {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .year-picker-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: #7c3aed;
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
        }

        .year-picker-btn:hover {
          background: #6d28d9;
        }

        .year-picker-btn .material-icons {
          font-size: 18px;
        }

        .archive-list {
          padding: 0 16px 16px;
        }

        .archive-group {
          margin-bottom: 12px;
        }

        .archive-month-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .month-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .month-info {
          flex: 1;
        }

        .month-info h4 {
          font-size: 15px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 2px 0;
        }

        .month-info .size {
          font-size: 12px;
          color: #94a3b8;
        }

        .empty-badge {
          padding: 6px 12px;
          background: #f1f5f9;
          color: #94a3b8;
          font-size: 12px;
          font-weight: 500;
          border-radius: 8px;
        }

        .send-email-btn {
          width: 40px;
          height: 40px;
          border: none;
          background: #f1f5f9;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #64748b;
        }

        .send-email-btn:hover {
          background: #7c3aed;
          color: white;
        }

        .expand-btn {
          width: 40px;
          height: 40px;
          border: none;
          background: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #94a3b8;
          transition: transform 0.2s;
        }

        .expand-btn.expanded {
          transform: rotate(180deg);
        }

        .archive-details {
          margin-top: 8px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .detail-item {
          padding: 16px 20px;
          border-bottom: 1px solid #f1f5f9;
        }

        .detail-item:last-child {
          border-bottom: none;
        }

        .detail-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .detail-header h5 {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .status-badge {
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
        }

        .detail-desc {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }

        .detail-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 4px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #94a3b8;
        }

        .meta-item .material-icons {
          font-size: 14px;
        }

        .meta-item.amount {
          color: #22c55e;
          font-weight: 600;
        }

        /* Year Picker Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .year-picker-modal {
          background: white;
          width: 100%;
          max-width: 360px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        }

        .modal-header {
          padding: 20px 24px;
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
          border-radius: 8px;
          border: none;
          background: #f1f5f9;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .year-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          padding: 24px;
        }

        .year-option {
          padding: 16px;
          background: #f8fafc;
          border: 2px solid transparent;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          transition: all 0.2s;
        }

        .year-option:hover {
          border-color: #7c3aed;
          background: #f5f3ff;
        }

        .year-option.active {
          background: #7c3aed;
          color: white;
          border-color: #7c3aed;
        }
      `}</style>
    </div>
  );
}
