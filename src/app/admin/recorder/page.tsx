"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Recording {
  id: string;
  name: string;
  size: string;
  type: "audio" | "pdf";
  duration?: string;
  date: string;
  audioUrl?: string;
}

const initialRecordings: Recording[] = [
  { id: "1", name: "Rekaman1.mp3", size: "10 MB", type: "audio", duration: "05:30", date: "2025-01-30" },
];

export default function RecorderPage() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState<Recording[]>(initialRecordings);
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);
  const [waveformBars, setWaveformBars] = useState<number[]>([]);
  const [audioLevel, setAudioLevel] = useState<number[]>([]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Request microphone permission on mount
  useEffect(() => {
    checkMicrophonePermission();
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setPermissionGranted(true);
      setErrorMessage("");
    } catch (err) {
      setPermissionGranted(false);
      setErrorMessage("Izinkan akses mikrofon untuk merekam suara");
    }
  };

  // Generate waveform visualization from audio levels
  useEffect(() => {
    const generateWaveform = () => {
      if (isRecording && analyserRef.current) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Sample 40 bars from the frequency data
        const bars = [];
        const step = Math.floor(dataArray.length / 40);
        for (let i = 0; i < 40; i++) {
          const value = dataArray[i * step];
          bars.push(Math.max(10, (value / 255) * 100));
        }
        setWaveformBars(bars);
      } else if (isPlaying) {
        // Simulated waveform for playback
        const bars = [];
        for (let i = 0; i < 40; i++) {
          bars.push(Math.random() * 60 + 20);
        }
        setWaveformBars(bars);
      } else {
        // Static minimal waveform
        const bars = [];
        for (let i = 0; i < 40; i++) {
          bars.push(10);
        }
        setWaveformBars(bars);
      }
    };

    if (isRecording || isPlaying) {
      animationRef.current = setInterval(generateWaveform, 50);
    } else {
      generateWaveform();
    }

    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [isRecording, isPlaying]);

  // Timer for recording
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `00:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Set up audio context for visualization
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      
      // Set up media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Calculate size
        const sizeKB = Math.round(audioBlob.size / 1024);
        const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
        
        // Save recording
        const newRecording: Recording = {
          id: Date.now().toString(),
          name: `Rekaman${recordings.length + 1}.mp3`,
          size: sizeStr,
          type: "audio",
          duration: formatTime(recordingTime).substring(3),
          date: new Date().toISOString().split("T")[0],
          audioUrl: audioUrl,
        };
        setRecordings([newRecording, ...recordings]);
        setSelectedRecording(newRecording);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      setErrorMessage("");
      
    } catch (err) {
      console.error("Error starting recording:", err);
      setErrorMessage("Gagal mengakses mikrofon. Pastikan mikrofon tersedia dan izin sudah diberikan.");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      // Close audio context
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    }
  };

  const handlePlayPause = () => {
    if (selectedRecording?.audioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(selectedRecording.audioUrl);
        audioRef.current.onended = () => setIsPlaying(false);
      }
      
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleSave = () => {
    if (selectedRecording?.audioUrl) {
      const a = document.createElement('a');
      a.href = selectedRecording.audioUrl;
      a.download = selectedRecording.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      alert("Rekaman berhasil diunduh!");
    } else {
      alert("Pilih rekaman terlebih dahulu");
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus rekaman ini?")) {
      const recording = recordings.find(r => r.id === id);
      if (recording?.audioUrl) {
        URL.revokeObjectURL(recording.audioUrl);
      }
      setRecordings(recordings.filter((r) => r.id !== id));
      if (selectedRecording?.id === id) {
        setSelectedRecording(null);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        setIsPlaying(false);
      }
    }
  };

  const handleShareToMessage = () => {
    router.push('/admin/chat');
  };

  const handleSelectRecording = (recording: Recording) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setSelectedRecording(recording);
  };

  return (
    <div className="recorder-container">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => router.back()}>
          <span className="material-icons">arrow_back</span>
        </button>
        <h1>Perekam</h1>
        <div className="header-spacer"></div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="error-message">
          <span className="material-icons">warning</span>
          {errorMessage}
          <button onClick={checkMicrophonePermission}>Coba Lagi</button>
        </div>
      )}

      {/* Recorder Section */}
      <div className="recorder-card">
        {/* Waveform Visualization */}
        <div className="waveform-container">
          <div className="waveform">
            {waveformBars.map((height, index) => (
              <div
                key={index}
                className={`waveform-bar ${isRecording ? "recording" : ""} ${isPlaying ? "playing" : ""}`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        {/* Timer Display */}
        <div className="timer-display">
          {formatTime(recordingTime)}
        </div>

        {/* Control Buttons */}
        <div className="controls">
          <button className="control-btn" title="Mundur 5 detik" disabled={isRecording}>
            <span className="material-icons">replay_5</span>
          </button>
          
          {!isRecording ? (
            <button 
              className="control-btn record-btn" 
              onClick={isPlaying ? handlePlayPause : handleStartRecording}
              title={isPlaying ? "Pause" : "Rekam"}
            >
              <span className="material-icons">
                {isPlaying ? "pause" : "fiber_manual_record"}
              </span>
            </button>
          ) : (
            <button 
              className="control-btn stop-btn" 
              onClick={handleStopRecording}
              title="Berhenti"
            >
              <span className="material-icons">stop</span>
            </button>
          )}

          <button className="control-btn" title="Maju 5 detik" disabled={isRecording}>
            <span className="material-icons">forward_5</span>
          </button>
        </div>
      </div>

      {/* Recordings List */}
      <div className="recordings-section">
        <h3>Rekaman Tersimpan</h3>
        <div className="recordings-list">
          {recordings.length === 0 ? (
            <div className="empty-recordings">
              <span className="material-icons">mic_off</span>
              <p>Belum ada rekaman</p>
            </div>
          ) : (
            recordings.map((recording) => (
              <div
                key={recording.id}
                className={`recording-item ${selectedRecording?.id === recording.id ? "selected" : ""}`}
                onClick={() => handleSelectRecording(recording)}
              >
                <div className="recording-icon">
                  <span className="material-icons">
                    {recording.type === "audio" ? "audio_file" : "picture_as_pdf"}
                  </span>
                </div>
                <div className="recording-info">
                  <span className="recording-name">{recording.name}</span>
                  <span className="recording-meta">
                    {recording.duration && `${recording.duration} • `}{recording.size}
                  </span>
                </div>
                <button 
                  className="delete-btn"
                  onClick={(e) => { e.stopPropagation(); handleDelete(recording.id); }}
                >
                  <span className="material-icons">delete_outline</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="save-btn" onClick={handleSave} disabled={!selectedRecording}>
          <span className="material-icons">save</span>
          Simpan
        </button>
        <button className="delete-main-btn" onClick={() => selectedRecording && handleDelete(selectedRecording.id)} disabled={!selectedRecording}>
          <span className="material-icons">delete</span>
          Hapus
        </button>
      </div>

      {/* Share Button */}
      <button className="share-btn" onClick={handleShareToMessage}>
        <span className="material-icons">send</span>
        Bagikan ke pesan
      </button>

      <style jsx>{`
        .recorder-container {
          max-width: 480px;
          margin: 0 auto;
          padding: 0 0 100px;
          min-height: 100vh;
          background: #f8fafc;
        }

        .page-header {
          display: flex;
          align-items: center;
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
          text-align: center;
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .header-spacer {
          width: 40px;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 16px 20px;
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          color: #dc2626;
          font-size: 14px;
        }

        .error-message .material-icons {
          font-size: 20px;
        }

        .error-message button {
          margin-left: auto;
          padding: 8px 16px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
        }

        .recorder-card {
          background: white;
          margin: 20px;
          border-radius: 24px;
          padding: 40px 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }

        .waveform-container {
          position: relative;
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .waveform {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
          height: 100%;
          width: 100%;
        }

        .waveform-bar {
          width: 4px;
          background: #f87171;
          border-radius: 2px;
          transition: height 0.05s ease;
          min-height: 4px;
        }

        .waveform-bar.recording {
          background: #ef4444;
          animation: pulse 0.3s ease infinite alternate;
        }

        .waveform-bar.playing {
          background: #22c55e;
        }

        @keyframes pulse {
          from { opacity: 0.7; }
          to { opacity: 1; }
        }

        .timer-display {
          text-align: center;
          font-size: 32px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 32px;
          font-family: 'SF Mono', 'Consolas', monospace;
        }

        .controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
        }

        .control-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          background: #f1f5f9;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .control-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .control-btn:hover:not(:disabled) {
          background: #e2e8f0;
          color: #1e293b;
        }

        .control-btn.record-btn {
          width: 72px;
          height: 72px;
          background: #ef4444;
          color: white;
          box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
        }

        .control-btn.record-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 32px rgba(239, 68, 68, 0.5);
        }

        .control-btn.stop-btn {
          width: 72px;
          height: 72px;
          background: #ef4444;
          color: white;
          box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
        }

        .control-btn .material-icons {
          font-size: 28px;
        }

        .recordings-section {
          padding: 0 20px;
          margin-top: 24px;
        }

        .recordings-section h3 {
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          margin: 0 0 16px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .recordings-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .empty-recordings {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          color: #94a3b8;
        }

        .empty-recordings .material-icons {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .recording-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: white;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.2s;
          border: 2px solid transparent;
        }

        .recording-item:hover {
          border-color: #e2e8f0;
        }

        .recording-item.selected {
          border-color: #7c3aed;
          background: #f5f3ff;
        }

        .recording-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #f3e8ff;
          color: #7c3aed;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .recording-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .recording-name {
          font-size: 15px;
          font-weight: 600;
          color: #1e293b;
        }

        .recording-meta {
          font-size: 13px;
          color: #94a3b8;
        }

        .delete-btn {
          width: 36px;
          height: 36px;
          border: none;
          background: none;
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 8px;
        }

        .delete-btn:hover {
          background: #fee2e2;
          color: #ef4444;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          padding: 24px 20px 16px;
        }

        .save-btn, .delete-main-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px 24px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          border: none;
          transition: all 0.2s;
        }

        .save-btn {
          background: #7c3aed;
          color: white;
        }

        .save-btn:hover:not(:disabled) {
          background: #6d28d9;
        }

        .save-btn:disabled, .delete-main-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .delete-main-btn {
          background: #ef4444;
          color: white;
        }

        .delete-main-btn:hover:not(:disabled) {
          background: #dc2626;
        }

        .share-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: calc(100% - 40px);
          margin: 0 20px 24px;
          padding: 14px 24px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          transition: all 0.2s;
        }

        .share-btn:hover {
          background: #f8fafc;
          border-color: #7c3aed;
          color: #7c3aed;
        }
      `}</style>
    </div>
  );
}
