"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminEditor() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("header");
  const [content, setContent] = useState<any>(null);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  useEffect(() => {
    // Check auth
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/admin");
      return;
    }

    // Fetch content
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load content", err);
        setMessage({ type: "error", text: "Failed to load content" });
        setIsLoading(false);
      });
  }, [router]);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      
      if (res.ok) {
        setMessage({ type: "success", text: "Content saved successfully!" });
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save content" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeepChange = (path: string[], value: any) => {
    setContent((prev: any) => {
      const newState = JSON.parse(JSON.stringify(prev));
      let current = newState;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newState;
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, path: string[]) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    // Optional: Set a temporary uploading state or message
    setMessage({ type: "success", text: "Uploading..." });

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      if (res.ok) {
        const data = await res.json();
        handleDeepChange(path, data.path);
        setMessage({ type: "success", text: "File uploaded successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to upload file" });
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage({ type: "error", text: "Failed to upload file" });
    }
  };

  if (isLoading) return <div className="loading">Loading editor...</div>;

  return (
    <div className="admin-editor">
      <header className="editor-header">
        <div className="header-left">
          <Link href="/admin/dashboard" className="back-btn">
            <span className="material-icons">arrow_back</span>
            Back to Dashboard
          </Link>
          <h1>Content Editor</h1>
        </div>
        <div className="header-right">
          <a href="/" target="_blank" className="preview-btn">
            <span className="material-icons">visibility</span>
            Preview Site
          </a>
          <button onClick={handleSave} disabled={isSaving} className="save-btn">
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </header>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="editor-container">
        <aside className="editor-sidebar">
          <nav>
            <button 
              className={activeTab === "header" ? "active" : ""} 
              onClick={() => setActiveTab("header")}
            >
              Header
            </button>
            <button 
              className={activeTab === "banner" ? "active" : ""} 
              onClick={() => setActiveTab("banner")}
            >
              Banner Section
            </button>
            <button 
              className={activeTab === "footer" ? "active" : ""} 
              onClick={() => setActiveTab("footer")}
            >
              Footer
            </button>
            <button 
              className={activeTab === "features" ? "active" : ""} 
              onClick={() => setActiveTab("features")}
            >
              Features
            </button>
            <button 
              className={activeTab === "testimonials" ? "active" : ""} 
              onClick={() => setActiveTab("testimonials")}
            >
              Testimonials
            </button>
          </nav>
        </aside>

        <main className="editor-main">
          {activeTab === "header" && (
            <div className="editor-section">
              <h2>Header Settings</h2>
              <div className="form-group">
                <label>Site Title</label>
                <input 
                  type="text" 
                  value={content.header.title} 
                  onChange={(e) => handleDeepChange(["header", "title"], e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Logo Path</label>
                <input 
                  type="text" 
                  value={content.header.logo} 
                  onChange={(e) => handleDeepChange(["header", "logo"], e.target.value)}
                />
                <input 
                  type="file" 
                  onChange={(e) => handleFileUpload(e, ["header", "logo"])}
                  className="mt-2"
                />
                <small>Path to image in public folder (e.g., /assets/images/...)</small>
              </div>
            </div>
          )}

          {activeTab === "banner" && (
            <div className="editor-section">
              <h2>Banner Settings</h2>
              <div className="form-group">
                <label>Main Title</label>
                <input 
                  type="text" 
                  value={content.banner.title} 
                  onChange={(e) => handleDeepChange(["banner", "title"], e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Subtitle</label>
                <textarea 
                  value={content.banner.subtitle} 
                  onChange={(e) => handleDeepChange(["banner", "subtitle"], e.target.value)}
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Button Text</label>
                <input 
                  type="text" 
                  value={content.banner.buttonText} 
                  onChange={(e) => handleDeepChange(["banner", "buttonText"], e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Banner Image Path</label>
                <input 
                  type="text" 
                  value={content.banner.image} 
                  onChange={(e) => handleDeepChange(["banner", "image"], e.target.value)}
                />
                <input 
                  type="file" 
                  onChange={(e) => handleFileUpload(e, ["banner", "image"])}
                  className="mt-2"
                />
              </div>
            </div>
          )}

          {activeTab === "footer" && (
            <div className="editor-section">
              <h2>Footer Settings</h2>
              <div className="form-group">
                <label>Footer Title</label>
                <input 
                  type="text" 
                  value={content.footer.title} 
                  onChange={(e) => handleDeepChange(["footer", "title"], e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={content.footer.description} 
                  onChange={(e) => handleDeepChange(["footer", "description"], e.target.value)}
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Copyright Text</label>
                <input 
                  type="text" 
                  value={content.footer.copyright} 
                  onChange={(e) => handleDeepChange(["footer", "copyright"], e.target.value)}
                />
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="editor-section">
              <h2>Features Settings</h2>
              
              <div className="feature-block mb-4">
                <h3 className="text-lg font-bold mb-2" style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Pink Section (Project & Tasks)</h3>
                {Object.entries(content.features.pink.content).map(([key, val]: any) => (
                  <div key={key} style={{ background: '#f9f9f9', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}>
                    <h4 style={{ marginTop: 0, textTransform: 'capitalize' }}>{key}</h4>
                    <div className="form-group">
                      <label>Title</label>
                      <input 
                        type="text" 
                        value={val.title} 
                        onChange={(e) => handleDeepChange(["features", "pink", "content", key, "title"], e.target.value)}
                      />
                    </div>
                    {val.text && (
                      <div className="form-group">
                        <label>Text</label>
                        <textarea 
                          value={val.text} 
                          onChange={(e) => handleDeepChange(["features", "pink", "content", key, "text"], e.target.value)}
                          rows={2}
                        />
                      </div>
                    )}
                    {val.video !== undefined && (
                      <div className="form-group">
                        <label>Video Path</label>
                        <input 
                          type="text" 
                          value={val.video} 
                          onChange={(e) => handleDeepChange(["features", "pink", "content", key, "video"], e.target.value)}
                        />
                        <input 
                          type="file" 
                          onChange={(e) => handleFileUpload(e, ["features", "pink", "content", key, "video"])}
                          className="mt-2"
                        />
                      </div>
                    )}
                    {val.poster !== undefined && (
                      <div className="form-group">
                        <label>Poster/Image Path</label>
                        <input 
                          type="text" 
                          value={val.poster} 
                          onChange={(e) => handleDeepChange(["features", "pink", "content", key, "poster"], e.target.value)}
                        />
                        <input 
                          type="file" 
                          onChange={(e) => handleFileUpload(e, ["features", "pink", "content", key, "poster"])}
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="feature-block mb-4">
                <h3 className="text-lg font-bold mb-2" style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Primary Section (Docs & Whiteboards)</h3>
                {Object.entries(content.features.primary.content).map(([key, val]: any) => (
                  <div key={key} style={{ background: '#f9f9f9', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}>
                    <h4 style={{ marginTop: 0, textTransform: 'capitalize' }}>{key}</h4>
                    <div className="form-group">
                      <label>Title</label>
                      <input 
                        type="text" 
                        value={val.title} 
                        onChange={(e) => handleDeepChange(["features", "primary", "content", key, "title"], e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Video Path</label>
                      <input 
                        type="text" 
                        value={val.video} 
                        onChange={(e) => handleDeepChange(["features", "primary", "content", key, "video"], e.target.value)}
                      />
                      <input 
                        type="file" 
                        onChange={(e) => handleFileUpload(e, ["features", "primary", "content", key, "video"])}
                        className="mt-2"
                      />
                    </div>
                    <div className="form-group">
                      <label>Poster Path</label>
                      <input 
                        type="text" 
                        value={val.poster} 
                        onChange={(e) => handleDeepChange(["features", "primary", "content", key, "poster"], e.target.value)}
                      />
                      <input 
                        type="file" 
                        onChange={(e) => handleFileUpload(e, ["features", "primary", "content", key, "poster"])}
                        className="mt-2"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="feature-block mb-4">
                <h3 className="text-lg font-bold mb-2" style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Green Section (Import & Integrations)</h3>
                {Object.entries(content.features.green.content).map(([key, val]: any) => (
                  <div key={key} style={{ background: '#f9f9f9', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}>
                    <h4 style={{ marginTop: 0, textTransform: 'capitalize' }}>{key}</h4>
                    <div className="form-group">
                      <label>Title</label>
                      <input 
                        type="text" 
                        value={val.title} 
                        onChange={(e) => handleDeepChange(["features", "green", "content", key, "title"], e.target.value)}
                      />
                    </div>
                    {val.text && (
                      <div className="form-group">
                        <label>Text</label>
                        <textarea 
                          value={val.text} 
                          onChange={(e) => handleDeepChange(["features", "green", "content", key, "text"], e.target.value)}
                          rows={2}
                        />
                      </div>
                    )}
                    {val.video !== undefined && (
                      <div className="form-group">
                        <label>Video Path</label>
                        <input 
                          type="text" 
                          value={val.video} 
                          onChange={(e) => handleDeepChange(["features", "green", "content", key, "video"], e.target.value)}
                        />
                        <input 
                          type="file" 
                          onChange={(e) => handleFileUpload(e, ["features", "green", "content", key, "video"])}
                          className="mt-2"
                        />
                      </div>
                    )}
                    {val.poster !== undefined && (
                      <div className="form-group">
                        <label>Poster/Image Path</label>
                        <input 
                          type="text" 
                          value={val.poster} 
                          onChange={(e) => handleDeepChange(["features", "green", "content", key, "poster"], e.target.value)}
                        />
                        <input 
                          type="file" 
                          onChange={(e) => handleFileUpload(e, ["features", "green", "content", key, "poster"])}
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="feature-block mb-4">
                <h3 className="text-lg font-bold mb-2" style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Cyan Section (Teams)</h3>
                <div style={{ background: '#f9f9f9', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}>
                  <div className="form-group">
                    <label>Title</label>
                    <input 
                      type="text" 
                      value={content.features.cyan.title} 
                      onChange={(e) => handleDeepChange(["features", "cyan", "title"], e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle</label>
                    <input 
                      type="text" 
                      value={content.features.cyan.subtitle} 
                      onChange={(e) => handleDeepChange(["features", "cyan", "subtitle"], e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ marginBottom: '0.5rem', display: 'block' }}>Feature Images</label>
                    {content.features.cyan.images && Object.entries(content.features.cyan.images).map(([key, val]: any) => (
                      <div key={key} style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '2px solid #eee' }}>
                        <label style={{ fontSize: '0.9rem', color: '#666', textTransform: 'capitalize' }}>{key}</label>
                        <input 
                          type="text" 
                          value={val} 
                          onChange={(e) => handleDeepChange(["features", "cyan", "images", key], e.target.value)}
                          style={{ marginBottom: '0.5rem' }}
                        />
                        <input 
                          type="file" 
                          onChange={(e) => handleFileUpload(e, ["features", "cyan", "images", key])}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="feature-block mb-4">
                <h3 className="text-lg font-bold mb-2" style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Purple Section (Support)</h3>
                <div style={{ background: '#f9f9f9', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}>
                  <div className="form-group">
                    <label>Title</label>
                    <input 
                      type="text" 
                      value={content.features.purple.title} 
                      onChange={(e) => handleDeepChange(["features", "purple", "title"], e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle</label>
                    <input 
                      type="text" 
                      value={content.features.purple.subtitle} 
                      onChange={(e) => handleDeepChange(["features", "purple", "subtitle"], e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Text</label>
                    <textarea 
                      value={content.features.purple.text} 
                      onChange={(e) => handleDeepChange(["features", "purple", "text"], e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="form-group">
                    <label>Image Path</label>
                    <input 
                      type="text" 
                      value={content.features.purple.image} 
                      onChange={(e) => handleDeepChange(["features", "purple", "image"], e.target.value)}
                    />
                    <input 
                      type="file" 
                      onChange={(e) => handleFileUpload(e, ["features", "purple", "image"])}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "testimonials" && (
            <div className="editor-section">
              <h2>Testimonials Settings</h2>
              {content.testimonials.map((testimonial: any, index: number) => (
                <div key={index} style={{ background: '#f9f9f9', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}>
                  <h4 style={{ marginTop: 0 }}>Testimonial {index + 1}</h4>
                  <div className="form-group">
                    <label>User Name</label>
                    <input 
                      type="text" 
                      value={testimonial.user} 
                      onChange={(e) => handleDeepChange(["testimonials", index.toString(), "user"], e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Review Text</label>
                    <textarea 
                      value={testimonial.text} 
                      onChange={(e) => handleDeepChange(["testimonials", index.toString(), "text"], e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="form-group">
                    <label>Image Path</label>
                    <input 
                      type="text" 
                      value={testimonial.image} 
                      onChange={(e) => handleDeepChange(["testimonials", index.toString(), "image"], e.target.value)}
                    />
                    <input 
                      type="file" 
                      onChange={(e) => handleFileUpload(e, ["testimonials", index.toString(), "image"])}
                      className="mt-2"
                    />
                  </div>
                  <div className="form-group">
                    <label>Company Logo Path</label>
                    <input 
                      type="text" 
                      value={testimonial.logo} 
                      onChange={(e) => handleDeepChange(["testimonials", index.toString(), "logo"], e.target.value)}
                    />
                    <input 
                      type="file" 
                      onChange={(e) => handleFileUpload(e, ["testimonials", index.toString(), "logo"])}
                      className="mt-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        .admin-editor {
          min-height: 100vh;
          background: #f5f7fb;
          font-family: 'Montserrat', sans-serif;
        }
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 1.2rem;
          color: #666;
        }
        .editor-header {
          background: white;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e0e0e0;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
          text-decoration: none;
          font-size: 0.9rem;
        }
        .header-left h1 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }
        .header-right {
          display: flex;
          gap: 1rem;
        }
        .preview-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          border: 1px solid #ddd;
          background: white;
          color: #333;
          border-radius: 6px;
          text-decoration: none;
          font-size: 0.9rem;
        }
        .save-btn {
          padding: 0.6rem 1.5rem;
          background: #0066FF;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }
        .save-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .message {
          padding: 1rem;
          text-align: center;
          font-weight: 500;
        }
        .message.success {
          background: #d4edda;
          color: #155724;
        }
        .message.error {
          background: #f8d7da;
          color: #721c24;
        }
        .editor-container {
          display: flex;
          max-width: 1200px;
          margin: 2rem auto;
          gap: 2rem;
          padding: 0 2rem;
        }
        .editor-sidebar {
          width: 250px;
          flex-shrink: 0;
        }
        .editor-sidebar nav {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .editor-sidebar button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 1rem 1.5rem;
          border: none;
          background: none;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          color: #555;
          transition: all 0.2s;
        }
        .editor-sidebar button:hover {
          background: #f9f9f9;
          color: #0066FF;
        }
        .editor-sidebar button.active {
          background: #f0f0ff;
          color: #0066FF;
          font-weight: 600;
          border-left: 3px solid #0066FF;
        }
        .editor-main {
          flex: 1;
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .editor-section h2 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eee;
          font-size: 1.3rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #333;
        }
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-family: inherit;
          font-size: 0.95rem;
        }
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #7b68ee;
          box-shadow: 0 0 0 3px rgba(123, 104, 238, 0.1);
        }
        .form-group small {
          display: block;
          margin-top: 0.3rem;
          color: #888;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}
