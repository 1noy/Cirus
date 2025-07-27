import React, { useState, useRef, useEffect } from 'react';

export default function VoiceMessage({ audioUrl, duration, sender, timestamp, isOwnMessage }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || !progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progressWidth = rect.width;
    const clickPercent = clickX / progressWidth;
    
    audioRef.current.currentTime = clickPercent * audioRef.current.duration;
  };

  return (
    <div style={{
      padding: '12px 16px',
      background: isOwnMessage 
        ? 'linear-gradient(90deg, #1cc6ff 0%, #009fff 100%)'
        : 'rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      maxWidth: '280px',
      border: isOwnMessage 
        ? '1px solid rgba(62, 242, 255, 0.3)'
        : '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: isOwnMessage 
        ? '0 4px 16px rgba(28, 198, 255, 0.3)'
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
      animation: 'fadeInUp 0.3s ease'
    }}>
      {/* En-tête du message */}
      <div style={{
        fontSize: '12px',
        opacity: 0.7,
        marginBottom: '8px',
        fontWeight: '600',
        color: isOwnMessage ? '#fff' : '#a0f0ff'
      }}>
        {isOwnMessage ? 'Vous' : sender} • Message vocal
      </div>

      {/* Contrôles audio */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        {/* Bouton play/pause */}
        <button
          onClick={togglePlay}
          disabled={!isLoaded}
          style={{
            padding: '8px',
            background: isOwnMessage 
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(28, 198, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            color: isOwnMessage ? '#fff' : '#3ef2ff',
            cursor: isLoaded ? 'pointer' : 'not-allowed',
            fontSize: '16px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isLoaded ? 1 : 0.6,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (isLoaded) {
              e.target.style.transform = 'scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        {/* Barre de progression */}
        <div style={{ flex: 1 }}>
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            style={{
              width: '100%',
              height: '4px',
              background: isOwnMessage 
                ? 'rgba(255, 255, 255, 0.3)'
                : 'rgba(28, 198, 255, 0.3)',
              borderRadius: '2px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              width: `${isLoaded ? (currentTime / duration) * 100 : 0}%`,
              height: '100%',
              background: isOwnMessage 
                ? 'rgba(255, 255, 255, 0.8)'
                : '#3ef2ff',
              borderRadius: '2px',
              transition: 'width 0.1s ease'
            }} />
          </div>
          
          {/* Temps */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '10px',
            color: isOwnMessage ? 'rgba(255, 255, 255, 0.8)' : '#a0f0ff',
            marginTop: '4px'
          }}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Timestamp */}
      <div style={{
        fontSize: '10px',
        opacity: 0.6,
        marginTop: '8px',
        textAlign: 'right',
        color: isOwnMessage ? 'rgba(255, 255, 255, 0.8)' : '#a0f0ff'
      }}>
        {new Date(timestamp).toLocaleTimeString()}
      </div>

      {/* Audio element caché */}
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        style={{ display: 'none' }}
      />
    </div>
  );
} 