import React, { useState, useEffect, useRef } from "react";
// import Navbar from '../components/Navbar';
import "./AboutMe.css";
import instagramCard from '../assets/links_shortcuts_cards/instagram-card.svg';
import whatsappCard from '../assets/links_shortcuts_cards/whatsapp-card.svg';
import gmailCard from '../assets/links_shortcuts_cards/gmail-card.svg';
import behanceCard from '../assets/links_shortcuts_cards/behance-card.svg';
import dribbbleCard from '../assets/links_shortcuts_cards/dribbble-card.svg';
import linkedinCard from '../assets/links_shortcuts_cards/linkedin-card.svg';
import bulbIcon from '../assets/skills_icons/bulb.svg';
import uxResearchIcon from '../assets/skills_icons/ux-research.svg';
import designWireframingIcon from '../assets/skills_icons/design&wireframing.svg';
import prototypeInteractionIcon from '../assets/skills_icons/prototype_interaction.svg';
import toolsHandoffIcon from '../assets/skills_icons/tools&handsoff.svg';
import animationTransitionIcon from '../assets/skills_icons/animation_transition.svg';
import chromeLogo from '../assets/images/chrome-logo.svg';

const AboutMe = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const animationRef = useRef(null);
  const totalFrames = 238;

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentFrame(prevFrame => (prevFrame + 1) % totalFrames);
      }
    }, 1000 / 45); // 45 FPS (increased from 30 FPS)

    return () => clearInterval(interval);
  }, [isPlaying, totalFrames]);

  const getFramePath = (frameNumber) => {
    const paddedFrame = frameNumber.toString().padStart(4, '0');
    return `/sequences/about-me-animation/webp/frame${paddedFrame}.webp`;
  };

  return (
    <>
      {/* <Navbar /> */}
      
      <section className="about-section">
        <div className="about-inner">
          <div className="about-content-1">
            <img src={chromeLogo} alt="logo" className="about-logo" />
            <h1 className="about-heading">vijay kumar.</h1>
          </div>
          <p className="about-paragraph">
            I'm a passionate UI/UX designer with a strong focus on creating intuitive, user-centered digital experiences. With a knack for balancing aesthetics and functionality, I specialize in transforming complex ideas into clean, interactive interfaces. My work blends strategic thinking with a refined visual language, ensuring each design is purposeful and engaging. I believe in prototyping early, testing often, and designing with empathy at the core.
          </p>
        </div>
      </section>

      <div className="about-wrapper">
        <div className="links-titles">
          Links /
          <br />
          Shortcuts
        </div>
        <div className="social-cards">
          <a href="https://www.linkedin.com/in/vijaykumarux/" target="_blank" rel="noopener noreferrer">
            <img src={linkedinCard} alt="LinkedIn" />
          </a>
          <a href="https://dribbble.com/vijaykumarux" target="_blank" rel="noopener noreferrer">
            <img src={dribbbleCard} alt="Dribbble" />
          </a>
          <a href="https://www.behance.net/vijaykumarux" target="_blank" rel="noopener noreferrer">
            <img src={behanceCard} alt="Behance" />
          </a>
          <a href="mailto:vijaykme8@gmail.com">
            <img src={gmailCard} alt="Gmail" />
          </a>
          <a href="https://wa.me/917373903391" target="_blank" rel="noopener noreferrer">
            <img src={whatsappCard} alt="WhatsApp" />
          </a>
          <a href="https://www.instagram.com/vijaykumarux/" target="_blank" rel="noopener noreferrer">
            <img src={instagramCard} alt="Instagram" />
          </a>
        </div>
      </div>
      <div className="skills-wrapper">
        <div className="skill-titles">
          Expertise/
          <br />
          Skills
        </div>
        <div className="skill-cards-modules">
          <div className="skill-cards-1">
            <div className="skill-cards-1-item-1">
            <img src={bulbIcon} alt="User Centered Design Icon" />
              <div className="skill-text-group">
                <div className="skill-text-1">User Centered Design</div>
                <div className="skill-text-2">
                  <p>A design philosophy that puts real users at the core of every decision.
                  (Empathize, Define, Ideate, Prototype, Iterate)
                  {/* <br />&nbsp;<br /> */}
                  </p>
                </div>
              </div>
            </div>
            <div className="skill-cards-1-item-2">
            <img src={uxResearchIcon} alt="UX Research Icon" />
              <div className="skill-text-group">
                <div className="skill-text-1">UX Research</div>
                <div className="skill-text-2">
                  <p>Understanding user behaviors, needs, and motivations through observation and feedback.
                 {/* <br />&nbsp;<br /> */}
                  </p>
                </div>
              </div>
            </div>
            <div className="skill-cards-1-item-3">
            <img src={designWireframingIcon} alt="Design & Wireframing Icon" />
              <div className="skill-text-group">
                <div className="skill-text-1">Design & Wireframing</div>
                <div className="skill-text-2">
                  <p>Creating low-fidelity blueprints, Crafting visually appealing interfaces, Building reusable components
                  {/* <br />&nbsp;<br /> */}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="skill-cards-2">
            <div className="skill-cards-2-item-1">
            <img src={prototypeInteractionIcon} alt="Prototype/Interaction Icon" />
              <div className="skill-text-group">
                <div className="skill-text-1">Prototype/Interaction</div>
                <div className="skill-text-2">
                  <p>Building interactive models, small animations and transitions, ensuring responsiveness, optimizing performance, and accessibility.
                  {/* <br />&nbsp;<br /> */}
                  </p>
                </div>
              </div>
            </div>
            <div className="skill-cards-2-item-2">
            <img src={toolsHandoffIcon} alt="Tools & Handoff Icon" />
              <div className="skill-text-group">
                <div className="skill-text-1">Tools & Handoff</div>
                <div className="skill-text-2">
                  <p>Structuring designs into reusable UI components, managing design iterations efficiently, collaborating and consistency.
                 {/* <br />&nbsp;<br /> */}
                  </p>
                </div>
              </div>
            </div>
            <div className="skill-cards-2-item-3">
            <img src={animationTransitionIcon} alt="Animation/Transitions Icon" />
              <div className="skill-text-group">
                <div className="skill-text-1">Animation/Transitions</div>
                <div className="skill-text-2">
                  <p>Small motion on hover or load, Transitions in websites and mobile apps using After Effects.
                  {/* <br />&nbsp;<br /> */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="animation-wrapper">
        <div className="image-sequence-container">
          <img
            ref={animationRef}
            src={getFramePath(currentFrame)}
            alt={`Animation frame ${currentFrame}`}
            className="sequence-image"
            onLoad={() => {
              // Preload next frame for smoother animation
              const nextFrame = (currentFrame + 1) % totalFrames;
              const nextImage = new Image();
              nextImage.src = getFramePath(nextFrame);
            }}
          />
        </div>
      </div>
      <div className="about-me-animation">
        
      </div>
    </>
  );
};

export default AboutMe;
