import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = 180;
    const h = canvas.height = 180;
    const cols = Math.floor(w / 10);
    const ypos = Array(cols).fill(0);
    let animationFrameId;
    
    function matrix() {
      ctx.fillStyle = 'rgba(34,34,68,0.15)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#00ff99';
      ctx.font = '14px monospace';
      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, ind * 10, y);
        if (y > h + Math.random() * 100) ypos[ind] = 0;
        else ypos[ind] = y + 10;
      });
      animationFrameId = requestAnimationFrame(matrix);
    }
    matrix();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #23234a 0%, #181828 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Particules de fond */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(28, 198, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(252, 92, 125, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginBottom: 32,
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ 
          position: 'relative', 
          width: 180, 
          height: 180, 
          marginBottom: 24,
          filter: 'drop-shadow(0 8px 32px rgba(28, 198, 255, 0.3))'
        }}>
          <canvas 
            ref={canvasRef} 
            width={180} 
            height={180} 
            style={{ 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #6a82fb 0%, #fc5c7d 100%)', 
              boxShadow: '0 4px 32px #0008',
              border: '2px solid rgba(62, 242, 255, 0.3)'
            }} 
          />
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: 180, 
            height: 180, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            pointerEvents: 'none' 
          }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" fill="#fff" opacity="0.15" />
              <path d="M40 22a18 18 0 0 1 18 18H22A18 18 0 0 1 40 22z" fill="#fff" />
            </svg>
          </div>
        </div>
        
        <h1 style={{ 
          color: '#3ef2ff', 
          fontWeight: 900, 
          fontSize: '48px', 
          margin: 0, 
          letterSpacing: 2,
          textShadow: '0 4px 16px rgba(62, 242, 255, 0.5)',
          animation: 'glow 2s ease-in-out infinite alternate'
        }}>
          Chat-changing
        </h1>
        
        <div style={{ 
          color: '#a0f0ff', 
          fontWeight: 500, 
          fontSize: '20px', 
          marginBottom: 32,
          textAlign: 'center',
          maxWidth: '400px',
          lineHeight: 1.4
        }}>
          Messagerie moderne et sécurisée
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: 0, 
          marginBottom: 16,
          filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.3))'
        }}>
          <button 
            onClick={() => navigate('/login')} 
            style={{
            flex: 1,
              padding: '16px 48px',
              fontSize: '22px',
            fontWeight: 700,
            border: 'none',
            borderRadius: '32px 0 0 32px',
            background: 'linear-gradient(90deg, #1cc6ff 0%, #009fff 100%)',
            color: '#fff',
            boxShadow: '0 2px 16px #1cc6ff44',
            cursor: 'pointer',
            outline: 'none',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 24px #1cc6ff66';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 16px #1cc6ff44';
            }}
          >
            Connexion
          </button>
          <button 
            onClick={() => navigate('/register')} 
            style={{
            flex: 1,
              padding: '16px 48px',
              fontSize: '22px',
            fontWeight: 700,
            border: 'none',
            borderRadius: '0 32px 32px 0',
            background: 'linear-gradient(90deg, #fc5c7d 0%, #6a82fb 100%)',
            color: '#fff',
            boxShadow: '0 2px 16px #fc5c7d44',
            cursor: 'pointer',
            outline: 'none',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 24px #fc5c7d66';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 16px #fc5c7d44';
            }}
          >
            Inscription
          </button>
        </div>
        
        <div style={{
          color: '#a0f0ff',
          fontSize: '14px',
          opacity: 0.7,
          textAlign: 'center',
          maxWidth: '300px'
        }}>
          Connectez-vous pour accéder à votre messagerie privée
        </div>
      </div>
      

    </div>
  );
} 