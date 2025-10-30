// HomeHeroAnimation.jsx
import { useEffect, useRef, useState } from 'react';
import { detectOptimalQuality } from '../utils/imageEnhancer';
import './HomeHeroAnimation.css';

const frameCount = 120;
const baseWidth = 1920;
const baseHeight = 1080;

// Balanced quality settings for optimal performance
const QUALITY_SETTINGS = {
  upscaleFactor: 1.2,
  interpolation: 'bicubic',
  antiAliasing: true,
  smoothing: true,
  sharpening: false,
  progressiveLoading: true
};

function getCurrentFrame(i) {
  const num = String(i).padStart(4, '0');
  return `/sequences/home-hero-animation/white/webp/frame_${num}.webp`;
}

function HomeHeroAnimation() {
  const canvasRef = useRef(null);
  const imageCache = useRef({});
  const wrapperRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [optimalSettings, setOptimalSettings] = useState(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Fast initial loading without enhancement
  const loadImageFast = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
    });
  };

  // Progressive enhancement - enhance images in background
  const enhanceImageProgressive = async (img, frameIndex) => {
    if (!QUALITY_SETTINGS.sharpening) return img;

    try {
      // Simple enhancement approach for balanced quality
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width * QUALITY_SETTINGS.upscaleFactor;
      canvas.height = img.height * QUALITY_SETTINGS.upscaleFactor;
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const enhancedImg = new Image();
      enhancedImg.src = canvas.toDataURL('image/webp', 0.9);
      await new Promise(resolve => enhancedImg.onload = resolve);
      
      return enhancedImg;
    } catch (error) {
      console.warn('Enhancement failed for frame', frameIndex, error);
      return img;
    }
  };

  const drawFrame = (i) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    canvas.width = viewportWidth * dpr;
    canvas.height = viewportHeight * dpr;
    canvas.style.width = `${viewportWidth}px`;
    canvas.style.height = `${viewportHeight}px`;

    if (wrapperRef.current) {
      const scrollableHeightFactor = 0.7;
      const totalWrapperHeight = viewportHeight + (viewportHeight * scrollableHeightFactor);
      wrapperRef.current.style.height = `${totalWrapperHeight}px`;
    }

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.imageSmoothingEnabled = QUALITY_SETTINGS.smoothing;
    context.imageSmoothingQuality = 'high';
    
    context.clearRect(0, 0, viewportWidth, viewportHeight);

    const img = imageCache.current[i];
    if (!img) return;

    const scaleX = viewportWidth / img.width;
    const scaleY = viewportHeight / img.height;
    const scale = Math.max(scaleX, scaleY);

    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;

    const offsetX = (viewportWidth - scaledWidth) / 2;
    const offsetY = (viewportHeight - scaledHeight) / 2;

    context.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
  };

  useEffect(() => {
    let isCancelled = false;

    // Start with fast loading, then enhance progressively
    const loadImagesFast = async () => {
      setIsLoading(true);
      setLoadingProgress(0);
      
      const priorityFrames = [];
      let loadedCount = 0;

      const updateProgress = () => {
        loadedCount++;
        setLoadingProgress((loadedCount / frameCount) * 100);
      };

      // Load first 20 frames immediately for smooth initial animation
      for (let i = 0; i < Math.min(20, frameCount); i++) {
        const loadImage = loadImageFast(getCurrentFrame(i));
        priorityFrames.push(loadImage.then(img => {
          if (img && !isCancelled) {
            imageCache.current[i] = img;
            updateProgress();
          }
        }));
      }

      await Promise.all(priorityFrames);

      if (!isCancelled) {
        drawFrame(0);
        setIsLoading(false);

        // Load remaining frames in background
        const remainingFrames = [];
        for (let i = 20; i < frameCount; i++) {
          remainingFrames.push(
            loadImageFast(getCurrentFrame(i)).then(img => {
              if (img && !isCancelled) {
                imageCache.current[i] = img;
                updateProgress();
              }
            })
          );
        }

        // Load remaining frames progressively
        Promise.all(remainingFrames).catch(console.error);
      }
    };

    loadImagesFast();

    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      
      const scrollTop = window.scrollY - wrapper.offsetTop;
      const maxScroll = wrapper.offsetHeight - window.innerHeight;
      const scrollFraction = Math.min(Math.max(scrollTop / Math.max(maxScroll, 1), 0), 1);
      
      const frameIndex = Math.floor(scrollFraction * (frameCount - 1));
      requestAnimationFrame(() => drawFrame(frameIndex));
    };

    const handleResize = () => drawFrame(0);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      isCancelled = true;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Progressive enhancement effect
  useEffect(() => {
    if (isEnhancing) return;

    const enhanceProgressively = async () => {
      setIsEnhancing(true);
      
      // Enhance frames in chunks to avoid blocking the UI
      const chunkSize = 10;
      for (let i = 0; i < frameCount; i += chunkSize) {
        if (isEnhancing) {
          const chunk = [];
          for (let j = 0; j < chunkSize && i + j < frameCount; j++) {
            const frameIndex = i + j;
            if (imageCache.current[frameIndex]) {
              chunk.push(
                enhanceImageProgressive(imageCache.current[frameIndex], frameIndex)
                  .then(enhancedImg => {
                    if (enhancedImg) {
                      imageCache.current[frameIndex] = enhancedImg;
                    }
                  })
              );
            }
          }
          
          await Promise.all(chunk);
          
          // Small delay to prevent UI blocking
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
      
      setIsEnhancing(false);
    };

    enhanceProgressively();
  }, []);

  // Detect optimal settings after initial load
  useEffect(() => {
    const settings = detectOptimalQuality();
    setOptimalSettings(settings);
  }, []);

  return (
    <section ref={wrapperRef} className="scroll-hero-wrapper">
      <div className="sticky-container">
        <canvas ref={canvasRef} className="hero-canvas" />
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="loading-spinner"></div>
              <p>Loading animation... {Math.round(loadingProgress)}%</p>
              <p className="loading-subtitle">High-quality enhancement will be applied in background</p>
            </div>
          </div>
        )}
        {isEnhancing && !isLoading && (
          <div className="enhancing-overlay">
            <div className="enhancing-content">
              <div className="enhancing-spinner"></div>
              <p>Enhancing image quality...</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeHeroAnimation;
