// Utilitaire d'optimisation d'images avancé
export class ImageOptimizer {
  constructor() {
    this.supportedFormats = ['webp', 'avif', 'jpg', 'jpeg', 'png'];
    this.quality = 0.8;
    this.maxWidth = 1920;
    this.maxHeight = 1080;
  }

  // Détection du format supporté
  async getBestFormat() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 1, 1);
    
    // Test WebP
    try {
      const webpData = canvas.toDataURL('image/webp', 0.8);
      if (webpData.length > 0) return 'webp';
    } catch (e) {}
    
    // Test AVIF
    try {
      const avifData = canvas.toDataURL('image/avif', 0.8);
      if (avifData.length > 0) return 'avif';
    } catch (e) {}
    
    return 'jpeg';
  }

  // Compression d'image
  async compressImage(file, options = {}) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calcul des dimensions optimales
        const { width, height } = this.calculateDimensions(
          img.width, 
          img.height, 
          options.maxWidth || this.maxWidth,
          options.maxHeight || this.maxHeight
        );
        
        canvas.width = width;
        canvas.height = height;
        
        // Optimisation du rendu
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Dessiner l'image redimensionnée
        ctx.drawImage(img, 0, 0, width, height);
        
        // Compression avec le meilleur format
        const format = options.format || 'jpeg';
        const quality = options.quality || this.quality;
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({
                blob,
                size: blob.size,
                originalSize: file.size,
                compressionRatio: (blob.size / file.size) * 100,
                width,
                height,
                format
              });
            } else {
              reject(new Error('Échec de la compression'));
            }
          },
          `image/${format}`,
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Impossible de charger l\'image'));
      img.src = URL.createObjectURL(file);
    });
  }

  // Calcul des dimensions optimales
  calculateDimensions(width, height, maxWidth, maxHeight) {
    let newWidth = width;
    let newHeight = height;
    
    if (width > maxWidth) {
      newWidth = maxWidth;
      newHeight = (height * maxWidth) / width;
    }
    
    if (newHeight > maxHeight) {
      newHeight = maxHeight;
      newWidth = (newWidth * maxHeight) / newHeight;
    }
    
    return {
      width: Math.round(newWidth),
      height: Math.round(newHeight)
    };
  }

  // Lazy loading d'image avec placeholder
  createLazyImage(src, alt, placeholder = null) {
    const img = new Image();
    img.loading = 'lazy';
    img.decoding = 'async';
    
    if (placeholder) {
      img.src = placeholder;
      img.style.filter = 'blur(10px)';
      img.style.transition = 'filter 0.3s ease';
    }
    
    img.onload = () => {
      if (placeholder) {
        img.style.filter = 'none';
      }
    };
    
    return img;
  }

  // Optimisation pour différents appareils
  async generateResponsiveImages(file) {
    const sizes = [
      { width: 320, height: 240, suffix: 'sm' },
      { width: 640, height: 480, suffix: 'md' },
      { width: 1280, height: 720, suffix: 'lg' },
      { width: 1920, height: 1080, suffix: 'xl' }
    ];
    
    const results = {};
    
    for (const size of sizes) {
      try {
        const result = await this.compressImage(file, {
          maxWidth: size.width,
          maxHeight: size.height
        });
        
        results[size.suffix] = result;
      } catch (error) {
        console.warn(`Échec de génération pour ${size.suffix}:`, error);
      }
    }
    
    return results;
  }
}

// Instance globale
export const imageOptimizer = new ImageOptimizer();

// Hook React pour l'optimisation d'images
export const useImageOptimization = () => {
  const optimizeImage = async (file, options = {}) => {
    try {
      return await imageOptimizer.compressImage(file, options);
    } catch (error) {
      console.error('Erreur d\'optimisation d\'image:', error);
      return null;
    }
  };

  const generateResponsiveImages = async (file) => {
    try {
      return await imageOptimizer.generateResponsiveImages(file);
    } catch (error) {
      console.error('Erreur de génération d\'images responsives:', error);
      return null;
    }
  };

  return {
    optimizeImage,
    generateResponsiveImages,
    getBestFormat: () => imageOptimizer.getBestFormat()
  };
}; 