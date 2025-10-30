// GlobalSelection.jsx
import React, { useState, useEffect, useRef } from 'react';
import './GlobalSelection.css';

import globeIdle from '../assets/globe/Globe.png';
import globeHover1 from '../assets/globe/Globe-hover-1.png';
import globeHover2 from '../assets/globe/Globe-hover-2.png';
import globeHover3 from '../assets/globe/Globe-hover-3.png';
import globeHover4 from '../assets/globe/Globe-hover-4.png';
import globeHover5 from '../assets/globe/Globe-hover-5.png';

import gridImage1 from '../assets/grid-images/grid-image-1.svg';
import gridImage2 from '../assets/grid-images/grid-image-2.svg';
import gridImage3 from '../assets/grid-images/grid-image-3.svg';
import gridImage4 from '../assets/grid-images/grid-image-4.png';
import gridImage5 from '../assets/grid-images/grid-image-5.png';
import gridImage6 from '../assets/grid-images/grid-image-6.svg';
import gridImage7 from '../assets/grid-images/grid-image-7.svg';
import gridImage8 from '../assets/grid-images/grid-image-8.png';
import gridImage9 from '../assets/grid-images/grid-image-9.png';
import gridImage10 from '../assets/grid-images/grid-image-10.svg';
import gridImage11 from '../assets/grid-images/grid-image-11.svg';
import gridImage12 from '../assets/grid-images/grid-image-12.png';
import { Link } from 'react-router-dom';

function GlobalSelection() {
  const texts = [
    { id: 'mkept', text: '1.MKept', targetIndex: 2 },
    { id: 'creative', text: '2.Creatives', targetIndex: 4 },
    { id: 'trillex', text: '3.Trillex', targetIndex: 6 },
    { id: 'doorin', text: '4.Doorin', targetIndex: 8 },
    { id: 'medBox', text: '5.Med box', targetIndex: 11 },
  ];

  const visibleMap = {
    mkept: [1, 3],
    creative: [2, 4],
    trillex: [5, 7],
    doorin: [6, 8],
    medBox: [9, 11],
  };

  const [currentGlobeImage, setCurrentGlobeImage] = useState(globeIdle);
  const [hoveredTextId, setHoveredTextId] = useState(null);
  const scrollRefs = useRef([]);
  const subcontainerRef = useRef(null);

  const hoverImageMap = {
    mkept: globeHover1,
    creative: globeHover2,
    trillex: globeHover3,
    doorin: globeHover4,
    medBox: globeHover5,
  };

  useEffect(() => {
    Object.values(hoverImageMap).concat(globeIdle).forEach((img) => {
      const image = new Image();
      image.src = img;
    });
  }, []);

  const handleMouseEnter = (id, targetIndex) => {
    setCurrentGlobeImage(hoverImageMap[id]);
    setHoveredTextId(id);

    const targetRef = scrollRefs.current[targetIndex];
    if (targetRef) {
      targetRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleMouseLeave = () => {
    setCurrentGlobeImage(globeIdle);
    setHoveredTextId(null);
  };

  // ✅ Scroll logic: when wrapper hits bottom, scroll subcontainer-2
  useEffect(() => {
    const wrapper = document.querySelector('.global-selection-wrapper');
    const container = document.querySelector('.global-selection-container');
    const sub2 = subcontainerRef.current;

    const handleWheel = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const wrapperBottomReached = rect.bottom <= window.innerHeight;

      const deltaY = e.deltaY;

      const containerScrollTop = container.scrollTop;
      const containerMaxScroll = container.scrollHeight - container.clientHeight;

      const sub2ScrollTop = sub2.scrollTop;
      const sub2MaxScroll = sub2.scrollHeight - sub2.clientHeight;

      const scrollingDown = deltaY > 0;
      const scrollingUp = deltaY < 0;

      const containerCanScroll =
        (scrollingDown && containerScrollTop < containerMaxScroll) ||
        (scrollingUp && containerScrollTop > 0);

      const sub2CanScroll =
        (scrollingDown && sub2ScrollTop < sub2MaxScroll) ||
        (scrollingUp && sub2ScrollTop > 0);

      if (!wrapperBottomReached) {
        if (containerCanScroll) {
          container.scrollTop += deltaY;
          e.preventDefault();
        }
      } else {
        if (sub2CanScroll) {
          sub2.scrollTop += deltaY;
          e.preventDefault();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const gridImages = [
    gridImage1, gridImage2, gridImage3, gridImage4, gridImage5, gridImage6,
    gridImage7, gridImage8, gridImage9, gridImage10, gridImage11, gridImage12
  ];

  return (
    <div className="global-selection-wrapper">
      <div className="global-selection-container">
        <div className="subcontainer-1">
          <div className="subcontainer-1-1">
            <span className="title-text-1">Explore my</span>
            <span className="title-text-2">Works</span>
          </div>

          <div
            className="subcontainer-1-2"
            style={{ backgroundImage: `url(${currentGlobeImage})` }}
          >
            <div className="text-list-container">
              {texts.map((item) => (
                <p
                  key={item.id}
                  className={`sub-container-text ${
                    hoveredTextId === item.id ? 'text-hover-color' : 'text-idle-color'
                  }`}
                  onMouseEnter={() => handleMouseEnter(item.id, item.targetIndex)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.text}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="subcontainer-2" ref={subcontainerRef}>
          <div className="grid-container-2">
            {gridImages.map((img, i) => {
              const isActive =
                !hoveredTextId || visibleMap[hoveredTextId]?.includes(i);

              const gridItemContent = (
                <div
                  className={`grid-item ${!isActive ? 'grid-fade' : ''}`}
                  key={i}
                  ref={(el) => (scrollRefs.current[i] = el)}
                >
                  <img src={img} alt="" className="grid-image" />
                </div>
              );

              return i === 8 ? (
                <Link to="/doorin" key={i} style={{ display: 'contents' }}>
                  {gridItemContent}
                </Link>
              ) : (
                gridItemContent
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalSelection;
