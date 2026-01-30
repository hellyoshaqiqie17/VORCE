"use client";

import { useState, useRef } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  assignee: string;
  assigneeInitials: string;
  assigneeColor: string;
  dueDate: string;
  attachments: string[];
  column: "todo" | "progress" | "review" | "done";
}

interface Column {
  id: "todo" | "progress" | "review" | "done";
  title: string;
  color: string;
}

const columns: Column[] = [
  { id: "todo", title: "To Do", color: "#64748b" },
  { id: "progress", title: "In Progress", color: "#3b82f6" },
  { id: "review", title: "Review", color: "#f59e0b" },
  { id: "done", title: "Done", color: "#22c55e" },
];

const teamMembers = [
  { id: "1", name: "Andi Pratama", initials: "AP", color: "#3b82f6" },
  { id: "2", name: "Siti Rahayu", initials: "SR", color: "#8b5cf6" },
  { id: "3", name: "Budi Hartono", initials: "BH", color: "#22c55e" },
  { id: "4", name: "Dewi Lestari", initials: "DL", color: "#f59e0b" },
  { id: "5", name: "Rizal Gunawan", initials: "RG", color: "#ef4444" },
];

const initialTasks: Task[] = [
  { id: "1", title: "Update Banner Homepage", description: "Redesign banner dengan branding baru", priority: "high", assignee: "Andi Pratama", assigneeInitials: "AP", assigneeColor: "#3b82f6", dueDate: "2025-01-26", attachments: ["design.fig"], column: "todo" },
  { id: "2", title: "Perbaiki Navigasi Mobile", description: "Menu tidak menutup di mobile", priority: "medium", assignee: "Siti Rahayu", assigneeInitials: "SR", assigneeColor: "#8b5cf6", dueDate: "2025-01-27", attachments: [], column: "todo" },
  { id: "3", title: "Integrasi API", description: "Koneksi ke payment gateway", priority: "high", assignee: "Budi Hartono", assigneeInitials: "BH", assigneeColor: "#22c55e", dueDate: "2025-01-28", attachments: ["api-docs.pdf"], column: "todo" },
  { id: "4", title: "Review Konten", description: "Review blog posts untuk Q1", priority: "low", assignee: "Dewi Lestari", assigneeInitials: "DL", assigneeColor: "#f59e0b", dueDate: "2025-01-25", attachments: [], column: "progress" },
  { id: "5", title: "Optimasi Database", description: "Optimasi query yang lambat", priority: "medium", assignee: "Budi Hartono", assigneeInitials: "BH", assigneeColor: "#22c55e", dueDate: "2025-01-24", attachments: [], column: "progress" },
  { id: "6", title: "Testing UI", description: "Test semua elemen interaktif", priority: "low", assignee: "Rizal Gunawan", assigneeInitials: "RG", assigneeColor: "#ef4444", dueDate: "2025-01-23", attachments: ["test-cases.xlsx"], column: "review" },
  { id: "7", title: "Laporan Q4", description: "Laporan kinerja kuartal", priority: "high", assignee: "Andi Pratama", assigneeInitials: "AP", assigneeColor: "#3b82f6", dueDate: "2025-01-20", attachments: ["report.pdf", "data.xlsx"], column: "done" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as "high" | "medium" | "low",
    assigneeId: "",
    dueDate: "",
  });
  const [newTaskFiles, setNewTaskFiles] = useState<string[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const newTaskFileInputRef = useRef<HTMLInputElement>(null);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (columnId: "todo" | "progress" | "review" | "done") => {
    if (draggedTask) {
      setTasks(tasks.map((t) => (t.id === draggedTask.id ? { ...t, column: columnId } : t)));
      setDraggedTask(null);
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setEditingTask({ ...task });
    setShowModal(true);
  };

  const handleSaveTask = () => {
    if (!editingTask) return;
    setTasks(tasks.map((t) => (t.id === editingTask.id ? editingTask : t)));
    setSelectedTask(editingTask);
    setShowModal(false);
  };

  const handleUpdateEditingTask = (field: keyof Task, value: any) => {
    if (!editingTask) return;
    setEditingTask({ ...editingTask, [field]: value });
  };

  const handleAssigneeChange = (assigneeId: string) => {
    const member = teamMembers.find((m) => m.id === assigneeId);
    if (member && editingTask) {
      setEditingTask({
        ...editingTask,
        assignee: member.name,
        assigneeInitials: member.initials,
        assigneeColor: member.color,
      });
    }
  };

  const handleCreateTask = () => {
    const assignee = teamMembers.find((m) => m.id === newTask.assigneeId);
    if (!newTask.title || !assignee) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      assignee: assignee.name,
      assigneeInitials: assignee.initials,
      assigneeColor: assignee.color,
      dueDate: newTask.dueDate || "No date",
      attachments: newTaskFiles,
      column: "todo",
    };

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", priority: "medium", assigneeId: "", dueDate: "" });
    setNewTaskFiles([]);
    setShowNewTaskModal(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && editingTask) {
      const fileNames = Array.from(e.target.files).map((f) => f.name);
      setEditingTask({ ...editingTask, attachments: [...editingTask.attachments, ...fileNames] });
    }
  };

  const handleNewTaskFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileNames = Array.from(e.target.files).map((f) => f.name);
      setNewTaskFiles([...newTaskFiles, ...fileNames]);
    }
  };

  const handleRemoveAttachment = (fileName: string) => {
    if (editingTask) {
      setEditingTask({
        ...editingTask,
        attachments: editingTask.attachments.filter((f) => f !== fileName),
      });
    }
  };

  const handleRemoveNewTaskFile = (fileName: string) => {
    setNewTaskFiles(newTaskFiles.filter((f) => f !== fileName));
  };

  const handleArchiveTask = () => {
    if (!editingTask) return;
    if (confirm(`Arsipkan task "${editingTask.title}"?`)) {
      setTasks(tasks.filter((t) => t.id !== editingTask.id));
      setShowModal(false);
      setSelectedTask(null);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = () => {
    if (!editingTask) return;
    if (confirm(`Hapus permanen task "${editingTask.title}"? Tindakan ini tidak dapat dibatalkan.`)) {
      setTasks(tasks.filter((t) => t.id !== editingTask.id));
      setShowModal(false);
      setSelectedTask(null);
      setEditingTask(null);
    }
  };

  const getTasksByColumn = (columnId: string) => tasks.filter((t) => t.column === columnId);

  return (
    <div className="tasks-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-left">
          <h1>Manajemen Tugas</h1>
          <span className="task-count">{tasks.length} tugas</span>
        </div>
        <div className="header-actions">
          <div className="view-toggle">
            <button className="active"><span className="material-icons">view_column</span></button>
            <button><span className="material-icons">view_list</span></button>
          </div>
          <button className="archive-btn" onClick={() => window.location.href = '/admin/archive'}>
            <span className="material-icons">inventory_2</span>
            Arsip
          </button>
          <button className="primary-btn" onClick={() => setShowNewTaskModal(true)}>
            <span className="material-icons">add</span>
            Tugas Baru
          </button>
        </div>
      </div>


      {/* Kanban Board */}
      <div className="kanban-board">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`kanban-column ${draggedTask ? "drop-zone" : ""}`}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            <div className="column-header">
              <div className="column-title">
                <span className="column-dot" style={{ background: column.color }}></span>
                <h3>{column.title}</h3>
                <span className="count">{getTasksByColumn(column.id).length}</span>
              </div>
              <button className="add-btn"><span className="material-icons">add</span></button>
            </div>

            <div className="task-list">
              {getTasksByColumn(column.id).map((task) => (
                <div
                  key={task.id}
                  className={`task-card ${task.column === "done" ? "completed" : ""} ${draggedTask?.id === task.id ? "dragging" : ""}`}
                  draggable
                  onDragStart={() => handleDragStart(task)}
                  onClick={() => handleTaskClick(task)}
                >
                  <span className={`tag ${task.priority}`}>
                    {task.priority === "high" ? "Important" : task.priority === "medium" ? "Medium" : "Low"}
                  </span>
                  <h4>{task.title}</h4>
                  <p className="description">{task.description}</p>
                  <div className="card-footer">
                    <div className="avatar-group">
                      <img src={`https://i.pravatar.cc/40?u=${task.id}`} alt="" className="avatar-img" />
                      <img src={`https://i.pravatar.cc/40?u=${task.id}b`} alt="" className="avatar-img" />
                      {task.attachments.length > 0 && (
                        <span className="avatar-more">+{task.attachments.length}</span>
                      )}
                    </div>
                    <div className="card-stats">
                      <span className="stat-item">
                        <span className="material-icons">chat_bubble_outline</span>
                        {Math.floor(Math.random() * 50) + 5}
                      </span>
                      <span className="stat-item">
                        <span className="material-icons">check_circle_outline</span>
                        {Math.floor(Math.random() * 200) + 20}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Task Detail Modal - Editable */}
      {showModal && selectedTask && editingTask && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="task-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <select
                  className="priority-select"
                  value={editingTask.priority}
                  onChange={(e) => handleUpdateEditingTask("priority", e.target.value)}
                >
                  <option value="high">🔴 High Priority</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="low">🔵 Low</option>
                </select>
                <input
                  type="text"
                  className="title-input"
                  value={editingTask.title}
                  onChange={(e) => handleUpdateEditingTask("title", e.target.value)}
                  placeholder="Task title..."
                />
              </div>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-row">
                <span className="label"><span className="material-icons">person</span>Assignee</span>
                <select
                  className="assignee-select"
                  value={teamMembers.find((m) => m.name === editingTask.assignee)?.id || ""}
                  onChange={(e) => handleAssigneeChange(e.target.value)}
                >
                  {teamMembers.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div className="detail-row">
                <span className="label"><span className="material-icons">calendar_today</span>Due Date</span>
                <input
                  type="date"
                  className="date-input"
                  value={editingTask.dueDate}
                  onChange={(e) => handleUpdateEditingTask("dueDate", e.target.value)}
                />
              </div>

              <div className="detail-row">
                <span className="label"><span className="material-icons">view_kanban</span>Status</span>
                <select
                  className="status-select"
                  value={editingTask.column}
                  onChange={(e) => handleUpdateEditingTask("column", e.target.value)}
                >
                  {columns.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="description-section">
                <h4><span className="material-icons">description</span>Description</h4>
                <textarea
                  className="description-input"
                  value={editingTask.description}
                  onChange={(e) => handleUpdateEditingTask("description", e.target.value)}
                  placeholder="Add task description..."
                  rows={3}
                />
              </div>

              <div className="attachments-section">
                <h4><span className="material-icons">attach_file</span>Attachments</h4>
                <div className="attachments-list">
                  {editingTask.attachments.length === 0 ? (
                    <p className="no-attachments">No files attached</p>
                  ) : (
                    editingTask.attachments.map((file, idx) => (
                      <div key={idx} className="attachment-item">
                        <span className="material-icons">insert_drive_file</span>
                        <span className="attachment-name">{file}</span>
                        <button className="remove-attachment" onClick={() => handleRemoveAttachment(file)}>
                          <span className="material-icons">close</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  multiple
                  onChange={handleFileUpload}
                />
                <button className="upload-btn" onClick={() => fileInputRef.current?.click()}>
                  <span className="material-icons">cloud_upload</span>
                  Upload File
                </button>
              </div>
            </div>

            <div className="modal-footer">
              <div className="footer-left">
                <button className="archive-btn" onClick={handleArchiveTask} title="Arsipkan">
                  <span className="material-icons">archive</span>
                  Arsip
                </button>
                <button className="delete-btn" onClick={handleDeleteTask} title="Hapus Permanen">
                  <span className="material-icons">delete</span>
                </button>
              </div>
              <div className="footer-right">
                <button className="secondary-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="primary-btn" onClick={handleSaveTask}>
                  <span className="material-icons">save</span>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="modal-overlay" onClick={() => setShowNewTaskModal(false)}>
          <div className="task-modal new-task-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Task</h2>
              <button className="close-btn" onClick={() => setShowNewTaskModal(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Task Title *</label>
                <input
                  type="text"
                  placeholder="Enter task title..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Add task description..."
                  rows={3}
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                  >
                    <option value="high">🔴 High</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="low">🔵 Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Assign To *</label>
                  <select
                    value={newTask.assigneeId}
                    onChange={(e) => setNewTask({ ...newTask, assigneeId: e.target.value })}
                  >
                    <option value="">Select person...</option>
                    {teamMembers.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>

              {/* File Upload Section */}
              <div className="form-group">
                <label>Attachments</label>
                <div className="attachments-list">
                  {newTaskFiles.length === 0 ? (
                    <p className="no-attachments">No files attached</p>
                  ) : (
                    newTaskFiles.map((file, idx) => (
                      <div key={idx} className="attachment-item">
                        <span className="material-icons">insert_drive_file</span>
                        <span className="attachment-name">{file}</span>
                        <button className="remove-attachment" onClick={() => handleRemoveNewTaskFile(file)}>
                          <span className="material-icons">close</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <input
                  type="file"
                  ref={newTaskFileInputRef}
                  style={{ display: "none" }}
                  multiple
                  onChange={handleNewTaskFileUpload}
                />
                <button type="button" className="upload-btn" onClick={() => newTaskFileInputRef.current?.click()}>
                  <span className="material-icons">cloud_upload</span>
                  Upload File
                </button>
              </div>
            </div>

            <div className="modal-footer">
              <button className="secondary-btn" onClick={() => setShowNewTaskModal(false)}>Cancel</button>
              <button className="primary-btn" onClick={handleCreateTask} disabled={!newTask.title || !newTask.assigneeId}>
                <span className="material-icons">add</span>
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .tasks-container {
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

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .page-header h1 {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .task-count {
          background: #f1f5f9;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .view-toggle {
          display: flex;
          background: #f1f5f9;
          border-radius: 8px;
          overflow: hidden;
        }

        .view-toggle button {
          padding: 8px 12px;
          border: none;
          background: none;
          color: #64748b;
          cursor: pointer;
        }

        .view-toggle button.active {
          background: white;
          color: #0066FF;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .primary-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #0066FF;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          transition: all 0.2s;
        }

        .primary-btn:hover {
          background: #0052CC;
          transform: translateY(-2px);
        }

        .primary-btn:disabled {
          background: #94a3b8;
          cursor: not-allowed;
          transform: none;
        }

        .secondary-btn {
          padding: 12px 20px;
          background: #f1f5f9;
          color: #64748b;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
        }

        .archive-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #f3e8ff;
          color: #7c3aed;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          transition: all 0.2s;
        }

        .archive-btn:hover {
          background: #e9d5ff;
        }

        .kanban-board {
          flex: 1;
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 20px;
        }

        .kanban-column {
          flex: 1;
          min-width: 300px;
          max-width: 340px;
          background: #f8fafc;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
        }

        .kanban-column.drop-zone {
          border: 2px dashed #0066FF;
          background: #eff6ff;
        }

        .column-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .column-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .column-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .column-header h3 {
          font-size: 14px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .count {
          background: white;
          color: #64748b;
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 600;
        }

        .add-btn {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: none;
          background: white;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .add-btn .material-icons {
          font-size: 18px;
        }

        .task-list {
          flex: 1;
          overflow-y: auto;
        }

        .task-card {
          background: white;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          margin-bottom: 14px;
          cursor: grab;
          transition: all 0.25s ease;
          border: none;
        }

        .task-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.1);
        }

        .task-card.dragging {
          opacity: 0.5;
          transform: rotate(3deg);
        }

        .task-card.completed {
          opacity: 0.6;
        }

        .task-card.completed h4 {
          text-decoration: line-through;
          color: #94a3b8;
        }

        .tag {
          display: inline-block;
          font-size: 12px;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 20px;
          margin-bottom: 14px;
        }

        .tag.high { background: #eff6ff; color: #3b82f6; }
        .tag.medium { background: #f3f4f6; color: #6b7280; }
        .tag.low { background: #f0fdf4; color: #22c55e; }

        .task-card h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 10px 0;
          line-height: 1.4;
        }

        .description {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 18px 0;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid #f3f4f6;
        }

        .avatar-group {
          display: flex;
          align-items: center;
        }

        .avatar-img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid white;
          margin-left: -8px;
          object-fit: cover;
        }

        .avatar-img:first-child {
          margin-left: 0;
        }

        .avatar-more {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #0066FF;
          color: white;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -8px;
          border: 2px solid white;
        }

        .card-stats {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          color: #94a3b8;
          font-weight: 500;
        }

        .stat-item .material-icons {
          font-size: 18px;
        }

        /* Modal Styles */
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
          padding: 20px;
        }

        .task-modal {
          background: white;
          width: 100%;
          max-width: 560px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          padding: 24px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .modal-title h2 {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin: 8px 0 0 0;
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
          color: #64748b;
        }

        .modal-body {
          padding: 24px;
        }

        .detail-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .detail-row .label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #64748b;
        }

        .detail-row .label .material-icons {
          font-size: 18px;
        }

        .assignee-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 12px 6px 6px;
          border-radius: 20px;
          color: white;
          font-size: 13px;
          font-weight: 500;
        }

        .status-badge {
          background: #eff6ff;
          color: #0066FF;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .description-section, .attachments-section {
          margin-top: 24px;
        }

        .description-section h4, .attachments-section h4 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #1e293b;
          margin: 0 0 12px 0;
        }

        .description-section p {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
        }

        .attachments-list {
          background: #f8fafc;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
        }

        .no-attachments {
          color: #94a3b8;
          font-size: 14px;
          text-align: center;
          margin: 0;
        }

        .attachment-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: white;
          border-radius: 8px;
          margin-bottom: 8px;
          font-size: 14px;
          color: #1e293b;
        }

        .attachment-item .material-icons {
          color: #0066FF;
        }

        .upload-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px;
          background: #eff6ff;
          border: 2px dashed #0066FF;
          border-radius: 12px;
          color: #0066FF;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          transition: all 0.2s;
        }

        .upload-btn:hover {
          background: #dbeafe;
        }

        .modal-footer {
          padding: 20px 24px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        /* New Task Form */
        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 8px;
        }

        .form-group input, .form-group select, .form-group textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
          transition: border-color 0.2s;
        }

        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          outline: none;
          border-color: #0066FF;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* Editable Modal Styles */
        .title-input {
          width: 100%;
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 8px 0;
          background: transparent;
          font-family: 'Montserrat', sans-serif;
          transition: border-color 0.2s;
        }

        .title-input:focus {
          outline: none;
          border-bottom-color: #0066FF;
        }

        .priority-select {
          padding: 6px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          background: white;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          margin-bottom: 8px;
        }

        .assignee-select, .status-select {
          padding: 8px 14px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          background: white;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          min-width: 160px;
        }

        .date-input {
          padding: 8px 14px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'Montserrat', sans-serif;
        }

        .description-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
          resize: vertical;
          min-height: 80px;
        }

        .description-input:focus {
          outline: none;
          border-color: #0066FF;
        }

        .attachment-name {
          flex: 1;
        }

        .remove-attachment {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: none;
          background: #fee2e2;
          color: #ef4444;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .remove-attachment .material-icons {
          font-size: 14px;
        }

        .remove-attachment:hover {
          background: #fecaca;
        }

        .footer-left {
          display: flex;
          gap: 8px;
        }

        .footer-right {
          display: flex;
          gap: 12px;
        }

        .archive-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #64748b;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          transition: all 0.2s;
        }

        .archive-btn:hover {
          background: #fef3c7;
          border-color: #fbbf24;
          color: #d97706;
        }

        .archive-btn .material-icons {
          font-size: 18px;
        }

        .delete-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .delete-btn:hover {
          background: #fee2e2;
          border-color: #f87171;
          color: #ef4444;
        }

        .delete-btn .material-icons {
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}
