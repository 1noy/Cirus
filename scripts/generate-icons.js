// Script pour générer les icônes PWA
// Note: Ce script nécessite Node.js et Canvas

import fs from 'fs';
import { createCanvas } from 'canvas';

const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Fond dégradé
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#1cc6ff');
  gradient.addColorStop(1, '#009fff');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Cercle central
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.beginPath();
  ctx.arc(size/2, size/2, size * 0.3, 0, 2 * Math.PI);
  ctx.fill();

  // Icône de chat
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${size * 0.4}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('💬', size/2, size/2);

  return canvas.toBuffer('image/png');
}

// Créer le dossier public s'il n'existe pas
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// Générer toutes les icônes
sizes.forEach(size => {
  const iconBuffer = generateIcon(size);
  const filename = `public/icon-${size}x${size}.png`;
  fs.writeFileSync(filename, iconBuffer);
  console.log(`Icône générée: ${filename}`);
});

console.log('Toutes les icônes PWA ont été générées !'); 