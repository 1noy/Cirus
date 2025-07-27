import React, { useState, useRef, useEffect } from 'react';
import { useToast } from './ToastContext';

export default function VoiceRecorder({ onSendVoice, disabled = false }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const { showToast } = useToast();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      const chunks = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        
        // Calculer la durée
        const audio = new Audio(url);
        audio.addEventListener('loadedmetadata', () => {
          setDuration(audio.duration);
        });
        
        // Arrêter tous les tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Timer pour le temps d'enregistrement
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      showToast({ message: 'Enregistrement démarré...', severity: 'info' });
    } catch {
      showToast({ message: 'Erreur d\'accès au microphone', severity: 'error' });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      showToast({ message: 'Enregistrement terminé', severity: 'success' });
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSend = () => {
    if (audioBlob && onSendVoice) {
      onSendVoice(audioBlob, duration);
      setAudioBlob(null);
      setAudioUrl(null);
      setDuration(0);
      setRecordingTime(0);
    }
  };

  const handleCancel = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setDuration(0);
    setRecordingTime(0);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '16px',
      background: 'rgba(28, 198, 255, 0.05)',
      borderRadius: '12px',
      border: '1px solid rgba(62, 242, 255, 0.2)',
      marginTop: '12px'
    }}>
      {/* Enregistrement en cours */}
      {isRecording && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          background: 'rgba(255, 71, 87, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 71, 87, 0.3)'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#ff4757',
            animation: 'pulse 1s infinite'
          }} />
          <span style={{ color: '#ff4757', fontWeight: '600' }}>
            Enregistrement en cours... {formatTime(recordingTime)}
          </span>
          <button
            onClick={stopRecording}
            style={{
              padding: '8px 16px',
              background: 'linear-gradient(90deg, #ff4757 0%, #ff3742 100%)',
              border: 'none',
              borderRadius: '6px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Arrêter
          </button>
        </div>
      )}

      {/* Audio enregistré */}
      {audioBlob && !isRecording && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          background: 'rgba(28, 198, 255, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(28, 198, 255, 0.3)'
        }}>
          <button
            onClick={isPlaying ? pauseAudio : playAudio}
            style={{
              padding: '8px',
              background: 'linear-gradient(90deg, #1cc6ff 0%, #009fff 100%)',
              border: 'none',
              borderRadius: '50%',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '16px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#3ef2ff' }}>
              Message vocal
            </div>
            <div style={{ fontSize: '12px', color: '#a0f0ff' }}>
              Durée: {formatTime(Math.floor(duration))}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleSend}
              style={{
                padding: '6px 12px',
                background: 'linear-gradient(90deg, #4caf50 0%, #45a049 100%)',
                border: 'none',
                borderRadius: '6px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              Envoyer
            </button>
            <button
              onClick={handleCancel}
              style={{
                padding: '6px 12px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '6px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Bouton d'enregistrement */}
      {!isRecording && !audioBlob && (
        <button
          onClick={startRecording}
          disabled={disabled}
          style={{
            padding: '12px 20px',
            background: 'linear-gradient(90deg, #1cc6ff 0%, #009fff 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            cursor: disabled ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: disabled ? 0.6 : 1,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(28, 198, 255, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(28, 198, 255, 0.3)';
          }}
        >
          🎤 Enregistrer un message vocal
        </button>
      )}

      {/* Audio element caché */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
} 