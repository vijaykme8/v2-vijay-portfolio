import './IntroSection.css';
import quoteSvg from '../assets/illustrations/quote-illustration.svg';
import signSvg from '../assets/illustrations/sign-illustration-2.svg';

function IntroSection() {
  return (
    <section className="intro-section">
      <div className="quote-text-group">
        <img
          src={quoteSvg}
          alt="Quote Illustration"
          className="intro-illustration quote-svg"
        />
        <p className="intro-text">
          UI design is like a dolphin - <br />
          graceful to the eye, fierce in motion.
        </p>
      </div>
      <img
        src={signSvg}
        alt="Sign Illustration"
        className="intro-illustration sign-svg"
      />
    </section>
  );
}

export default IntroSection;