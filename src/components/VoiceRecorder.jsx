import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';
import { useSafeTimer, useMemoryLeakPrevention } from '../utils/useMemoryLeakPrevention';

export default function VoiceRecorder({ onClose, onSend, disabled = false }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const audioWorkerRef = useRef(null);
  const { showToast } = useToast();
  const { setTimeout, clearTimer, isMounted } = useSafeTimer();
  const { isMounted: isComponentMounted } = useMemoryLeakPrevention();

  // Initialisation du Web Worker
  useEffect(() => {
    if (typeof Worker !== 'undefined') {
      audioWorkerRef.current = new Worker('/audio-worker.js');
      
      audioWorkerRef.current.onmessage = (e) => {
        if (!isComponentMounted()) return;
        
        const { type, data, error } = e.data;
        
        switch (type) {
          case 'AUDIO_COMPRESSED':
            setAudioBlob(data);
            const url = URL.createObjectURL(data);
            setAudioUrl(url);
            setDuration(data.duration || 0);
            setIsProcessing(false);
            showToast({ 
              message: `Audio compressé: ${Math.round((data.compressedSize / data.originalSize) * 100)}% de réduction`, 
              severity: 'success' 
            });
            break;
          case 'AUDIO_ANALYZED':
            console.log('Analyse audio:', data);
            break;
          case 'ERROR':
            showToast({ message: `Erreur audio: ${error}`, severity: 'error' });
            setIsProcessing(false);
            break;
        }
      };
    }

    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (audioWorkerRef.current) {
        audioWorkerRef.current.terminate();
      }
    };
  }, [audioUrl, showToast, isComponentMounted]);

  // Optimisation avec useCallback
  const startRecording = useCallback(async () => {
    if (!isComponentMounted()) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
          channelCount: 1
        } 
      });
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      const chunks = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        if (!isComponentMounted()) return;
        
        const blob = new Blob(chunks, { type: 'audio/webm' });
        
        // Traitement avec Web Worker si disponible
        if (audioWorkerRef.current) {
          setIsProcessing(true);
          audioWorkerRef.current.postMessage({
            type: 'COMPRESS_AUDIO',
            data: blob
          });
        } else {
          // Fallback sans Web Worker
          setAudioBlob(blob);
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
          
          const audio = new Audio(url);
          audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
          });
        }
        
        // Arrêter tous les tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Timer optimisé avec requestAnimationFrame
      let startTime = Date.now();
      const updateTimer = () => {
        if (isRecording && isComponentMounted()) {
          setRecordingTime(Math.floor((Date.now() - startTime) / 1000));
          const timerId = requestAnimationFrame(updateTimer);
          return () => cancelAnimationFrame(timerId);
        }
      };
      requestAnimationFrame(updateTimer);
      
      showToast({ message: 'Enregistrement démarré...', severity: 'info' });
    } catch (error) {
      if (!isComponentMounted()) return;
      
      showToast({ message: 'Erreur d\'accès au microphone', severity: 'error' });
      console.error('Erreur d\'enregistrement:', error);
    }
  }, [isRecording, showToast, isComponentMounted]);

  const stopRecording = useCallback(() => {
    if (!isComponentMounted()) return;
    
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      showToast({ message: 'Enregistrement terminé', severity: 'success' });
    }
  }, [isRecording, showToast, isComponentMounted]);

  const playAudio = useCallback(() => {
    if (audioRef.current && isComponentMounted()) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isComponentMounted]);

  const pauseAudio = useCallback(() => {
    if (audioRef.current && isComponentMounted()) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isComponentMounted]);

  const handleSend = useCallback(() => {
    if (!isComponentMounted()) return;
    
    if (audioBlob && onSend) {
      onSend(audioBlob, duration);
      setAudioBlob(null);
      setAudioUrl(null);
      setDuration(0);
      setRecordingTime(0);
      onClose();
    }
  }, [audioBlob, duration, onSend, onClose, isComponentMounted]);

  const handleCancel = useCallback(() => {
    if (!isComponentMounted()) return;
    
    setAudioBlob(null);
    setAudioUrl(null);
    setDuration(0);
    setRecordingTime(0);
    setIsProcessing(false);
    onClose();
  }, [onClose, isComponentMounted]);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

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
          
          {/* Boutons d'action */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '20px'
          }}>
            <button
              type="button"
              onClick={handleSend}
              disabled={!audioBlob || isProcessing}
              aria-label="Envoyer le message vocal"
              role="button"
              tabIndex={0}
              style={{
                flex: 1,
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                background: audioBlob && !isProcessing 
                  ? 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '600',
                cursor: audioBlob && !isProcessing ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                opacity: audioBlob && !isProcessing ? 1 : 0.5
              }}
              onMouseEnter={(e) => {
                if (audioBlob && !isProcessing) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(28, 198, 255, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && audioBlob && !isProcessing) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            >
              {isProcessing ? 'Traitement...' : 'Envoyer'}
            </button>
            
            <button
              type="button"
              onClick={handleCancel}
              aria-label="Annuler l'enregistrement"
              role="button"
              tabIndex={0}
              style={{
                flex: 1,
                padding: '12px 24px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCancel();
                }
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