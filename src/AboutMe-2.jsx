import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import './AboutMe.css';

function AboutMe() {
  const totalFrames = 238;
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);

  // Load image sequence
  useEffect(() => {
    const loadedImages = new Array(totalFrames).fill(null);
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, '0');
      img.src = `/sequences/about-me-animation/webp/frame${frameNum}.webp`;
      img.onload = () => {
        loadedImages[i] = img;
        setImages(prev => {
          const updated = [...prev];
          updated[i] = img;
          return updated;
        });
      };
    }
  }, []);

  // Animate in canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let frame = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const img = images[frame];
      if (img) {
        const imgAspect = img.width / img.height;
        const drawWidth = width;
        const drawHeight = width / imgAspect;

        const dx = 0;
        const dy = height - drawHeight; // ✅ Align to bottom

        ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
      }
      frame = (frame + 1) % totalFrames;
    };

    const interval = setInterval(render, 33); // ~30fps
    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      <Navbar />

      <section className="about-section">
        {/* ✅ Background animation canvas */}
        <canvas ref={canvasRef} className="about-bg-canvas"></canvas>

        <div className="about-inner">
          <div className="about-content-1">
            <img src="./src/assets/images/chrome-logo.svg" alt="logo" className="about-logo" />
            <h1 className="about-heading">vijay kumar.</h1>
          </div>
          <p className="about-paragraph">
            I’m a passionate UI/UX designer with a strong focus on creating intuitive, user-centered digital experiences. With a knack for balancing aesthetics and functionality, I specialize in transforming complex ideas into clean, interactive interfaces. My work blends strategic thinking with a refined visual language, ensuring each design is purposeful and engaging. I believe in prototyping early, testing often, and designing with empathy at the core.
          </p>
        </div>
      </section>
    </>
  );
}

export default AboutMe;
