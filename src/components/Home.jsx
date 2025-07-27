import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Composant Canvas pour l'animation Matrix optimisée
function Matrix({ width = 420, height = 320, columns = 50 }) {
  const ref = useRef();
  
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let running = true;
    
    // Caractères Matrix
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?";
    
    // Génère les colonnes avec une meilleure distribution
    const columns = [];
    const columnWidth = Math.max(20, width / 40);
    const numColumns = Math.floor(width / columnWidth);
    
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        x: i * columnWidth,
        y: Math.random() * height,
        speed: 0.5 + Math.random() * 1.5,
        chars: [],
        length: 8 + Math.floor(Math.random() * 15),
        opacity: 0.3 + Math.random() * 0.7
      });
    }
    
    function draw() {
      // Effet de traînée plus subtil
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      for (let col of columns) {
        // Génère de nouveaux caractères
        if (col.chars.length < col.length) {
          col.chars.push({
            char: chars[Math.floor(Math.random() * chars.length)],
            y: col.y,
            opacity: col.opacity
          });
        }
        
        // Dessine les caractères
        for (let i = 0; i < col.chars.length; i++) {
          const char = col.chars[i];
          ctx.fillStyle = `rgba(0, 255, 0, ${char.opacity})`;
          ctx.font = '14px monospace';
          ctx.fillText(char.char, col.x, char.y);
          
          char.y += col.speed;
          char.opacity -= 0.01;
          
          // Supprime les caractères qui sortent de l'écran
          if (char.y > height || char.opacity <= 0) {
            col.chars.splice(i, 1);
            i--;
          }
        }
        
        // Déplace la colonne
        col.y += col.speed;
        if (col.y > height) {
          col.y = -20;
        }
      }
      
      if (running) requestAnimationFrame(draw);
    }
    
    draw();
    
    return () => { 
      running = false; 
    };
  }, [width, height, columns]);
  
  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  );
}

export default function Home() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?";
      const columnWidth = Math.max(20, width / 40);
      const numColumns = Math.floor(width / columnWidth);

      const columns = [];
      for (let i = 0; i < numColumns; i++) {
        columns.push({
          x: i * columnWidth,
          y: Math.random() * height,
          speed: 0.5 + Math.random() * 1.5,
          chars: [],
          length: 8 + Math.floor(Math.random() * 15),
          opacity: 0.3 + Math.random() * 0.7
        });
      }

      function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);

        for (let col of columns) {
          if (col.chars.length < col.length) {
            col.chars.push({
              char: chars[Math.floor(Math.random() * chars.length)],
              y: col.y,
              opacity: col.opacity
            });
          }

          for (let i = 0; i < col.chars.length; i++) {
            const char = col.chars[i];
            ctx.fillStyle = `rgba(0, 255, 0, ${char.opacity})`;
            ctx.font = '14px monospace';
            ctx.fillText(char.char, col.x, char.y);

            char.y += col.speed;
            char.opacity -= 0.01;

            if (char.y > height || char.opacity <= 0) {
              col.chars.splice(i, 1);
              i--;
            }
          }

          col.y += col.speed;
          if (col.y > height) {
            col.y = -20;
          }
        }

        requestAnimationFrame(draw);
      }

      draw();
    }
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #181828 0%, #23234a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Canvas Matrix en arrière-plan */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.3,
          zIndex: 1
        }}
      />
      
      {/* Contenu principal */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: window.innerWidth <= 768 ? '20px' : '40px',
        maxWidth: window.innerWidth <= 768 ? '90%' : '600px'
      }}>
        <h1 style={{
          fontSize: window.innerWidth <= 768 ? '28px' : '48px',
          fontWeight: '800',
          color: '#1cc6ff',
          margin: '0 0 20px 0',
          textShadow: '0 0 20px rgba(28, 198, 255, 0.5)',
          lineHeight: window.innerWidth <= 768 ? '1.2' : '1.1'
        }}>
          Bienvenue sur Cirus-chat
        </h1>
        
        <button
          onClick={() => navigate('/chat')}
          aria-label="Accéder au chat"
          role="button"
          tabIndex={0}
          style={{
            background: 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)',
            border: 'none',
            borderRadius: window.innerWidth <= 768 ? '20px' : '24px',
            padding: window.innerWidth <= 768 ? '16px 28px' : '16px 32px',
            color: '#fff',
            fontSize: window.innerWidth <= 768 ? '16px' : '18px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 32px rgba(28, 198, 255, 0.3)',
            minWidth: window.innerWidth <= 768 ? '200px' : 'auto',
            minHeight: window.innerWidth <= 768 ? '48px' : 'auto',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 12px 40px rgba(28, 198, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 8px 32px rgba(28, 198, 255, 0.3)';
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/chat');
            }
          }}
        >
          Accéder au chat
        </button>
      </div>
    </div>
  );
} 