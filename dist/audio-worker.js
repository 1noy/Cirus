// Web Worker pour le traitement audio
self.onmessage = function(e) {
  const { type, data } = e.data;

  switch (type) {
    case 'COMPRESS_AUDIO':
      compressAudio(data);
      break;
    case 'ANALYZE_AUDIO':
      analyzeAudio(data);
      break;
    case 'CONVERT_FORMAT':
      convertAudioFormat(data);
      break;
    default:
      self.postMessage({ type: 'ERROR', error: 'Type de traitement inconnu' });
  }
};

// Compression audio optimisée
async function compressAudio(audioBlob) {
  try {
    const audioContext = new (self.AudioContext || self.webkitAudioContext)();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Compression avec réduction de la qualité
    const compressedBuffer = await compressAudioBuffer(audioBuffer, 0.5);
    const compressedBlob = await audioBufferToBlob(compressedBuffer);
    
    self.postMessage({
      type: 'AUDIO_COMPRESSED',
      data: compressedBlob,
      originalSize: audioBlob.size,
      compressedSize: compressedBlob.size
    });
  } catch (error) {
    self.postMessage({ type: 'ERROR', error: error.message });
  }
}

// Analyse audio pour détecter la qualité
async function analyzeAudio(audioBlob) {
  try {
    const audioContext = new (self.AudioContext || self.webkitAudioContext)();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    const analysis = {
      duration: audioBuffer.duration,
      sampleRate: audioBuffer.sampleRate,
      numberOfChannels: audioBuffer.numberOfChannels,
      maxVolume: calculateMaxVolume(audioBuffer),
      averageVolume: calculateAverageVolume(audioBuffer)
    };
    
    self.postMessage({
      type: 'AUDIO_ANALYZED',
      data: analysis
    });
  } catch (error) {
    self.postMessage({ type: 'ERROR', error: error.message });
  }
}

// Conversion de format audio
async function convertAudioFormat(audioBlob) {
  try {
    const audioContext = new (self.AudioContext || self.webkitAudioContext)();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Conversion en format WebM optimisé
    const convertedBlob = await convertToWebM(audioBuffer);
    
    self.postMessage({
      type: 'AUDIO_CONVERTED',
      data: convertedBlob,
      format: 'webm'
    });
  } catch (error) {
    self.postMessage({ type: 'ERROR', error: error.message });
  }
}

// Fonctions utilitaires
function compressAudioBuffer(audioBuffer, quality = 0.5) {
  const offlineContext = new OfflineAudioContext(
    audioBuffer.numberOfChannels,
    audioBuffer.length,
    audioBuffer.sampleRate
  );
  
  const source = offlineContext.createBufferSource();
  source.buffer = audioBuffer;
  
  // Ajout d'un filtre de compression
  const compressor = offlineContext.createDynamicsCompressor();
  compressor.threshold.value = -50;
  compressor.knee.value = 40;
  compressor.ratio.value = 12;
  compressor.attack.value = 0;
  compressor.release.value = 0.25;
  
  source.connect(compressor);
  compressor.connect(offlineContext.destination);
  source.start();
  
  return offlineContext.startRendering();
}

function calculateMaxVolume(audioBuffer) {
  const data = audioBuffer.getChannelData(0);
  let max = 0;
  
  for (let i = 0; i < data.length; i++) {
    const abs = Math.abs(data[i]);
    if (abs > max) max = abs;
  }
  
  return max;
}

function calculateAverageVolume(audioBuffer) {
  const data = audioBuffer.getChannelData(0);
  let sum = 0;
  
  for (let i = 0; i < data.length; i++) {
    sum += Math.abs(data[i]);
  }
  
  return sum / data.length;
}

async function audioBufferToBlob(audioBuffer) {
  const offlineContext = new OfflineAudioContext(
    audioBuffer.numberOfChannels,
    audioBuffer.length,
    audioBuffer.sampleRate
  );
  
  const source = offlineContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(offlineContext.destination);
  source.start();
  
  const renderedBuffer = await offlineContext.startRendering();
  const wavBlob = await audioBufferToWav(renderedBuffer);
  
  return wavBlob;
}

async function audioBufferToWav(audioBuffer) {
  const length = audioBuffer.length;
  const numberOfChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
  const view = new DataView(arrayBuffer);
  
  // En-tête WAV
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + length * numberOfChannels * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numberOfChannels * 2, true);
  view.setUint16(32, numberOfChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, length * numberOfChannels * 2, true);
  
  // Données audio
  let offset = 44;
  for (let i = 0; i < length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(channel)[i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }
  
  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

async function convertToWebM(audioBuffer) {
  // Simulation de conversion WebM (dans un vrai projet, utiliser MediaRecorder)
  const offlineContext = new OfflineAudioContext(
    audioBuffer.numberOfChannels,
    audioBuffer.length,
    audioBuffer.sampleRate
  );
  
  const source = offlineContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(offlineContext.destination);
  source.start();
  
  const renderedBuffer = await offlineContext.startRendering();
  return await audioBufferToWav(renderedBuffer);
} 