import React from "react";
import "./Doorin.css";
import heroIllustration from "../assets/doorin/hero-illustration.svg";
import illustration1 from "../assets/doorin/typography/illustration-1.svg";
import aboutDoorinIllust from "../assets/doorin/about-doorin/about-doorin-illust.svg";
  import homeIcon from "../assets/doorin/app-screen-1/home-icon.svg";
  import deviceMockup09 from "../assets/doorin/device-mockups/09.svg";
  import deviceMockup04 from "../assets/doorin/device-mockups/04.svg";
  import registrationIcon from "../assets/doorin/app-screen-2/registration-icon.svg";
  import iconographyIllustration from "../assets/doorin/iconography/iconography-illustration.svg";
  import deviceMockup112 from "../assets/doorin/device-mockups/11-2.svg";
  import deviceMockup12 from "../assets/doorin/device-mockups/12.svg";
  import findHotelsIcon from "../assets/doorin/app-screen-3/find-hotels-icon.svg";
  import easySetupIcon from "../assets/doorin/app-screen-4/easy-setup-icon.svg";
  import uiScreens1 from "../assets/doorin/ui-screen-1.svg";
import userflowDiagram from "../assets/doorin/userflow/userflow-diagram.svg";
import wireframesIllustration1 from "../assets/doorin/wireframes/wireframes-illustration-1.svg";
import mockupsIllustration1 from "../assets/doorin/mockups/mockups-illustration-1.svg";

export default function Doorin() {
  return (
    <div className="doorin-root">
      <div className="doorin-page">
        <div className="doorin-wrapper">
          <h1 className="doorin-header">Doorin</h1>
          <div className="doorin-header-underline"></div>
          <p className="doorin-desc">
            Make your every trip the best. Enjoy the customized packages with<br />
            more offers & cashbacks.
          </p>
          <img src={heroIllustration} alt="Doorin Hero Illustration" className="doorin-hero-illustration" />
        </div>
        <div className="typography-wrapper">
          <div className="title-group">
            <div className="text-1">
              <span>01</span>
            </div>
            <div className="text-2">
              <span>Typography</span>
            </div>
          </div>
          <div className="alphabets-group">
            <div className="alphabets-1">abcdefghijklmnopqrstuvwxyz</div>
            <div className="alphabets-2">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
          </div>
          <div className="illustration-group">
            <div className="illustration-text-1">Open Sans</div>
            <div className="illustration-1">
              <img src={illustration1} alt="Typography Illustration 1" />
            </div>
          </div>
        </div>
        <div className="about-doorin-wrapper">
          <div className="column-1">
            <div className="about-doorin-title-group">
              <div className="text-1">
                <span>02</span>
              </div>
              <div className="text-2">
                <span>About Doorin</span>
              </div>
            </div>
            <div className="description">
              <p>
              Simply “a traveller with all the features handheld” mobile application. It can used to access moreover any locations & hotels within the places. numurous features included in making a trip. This app serves a much faster booking and shows results. Best app to be used for travelling.
              </p>
            </div>
          </div>
          <div className="column-2">
            <img
              src={aboutDoorinIllust}
              alt="About Doorin Illustration"
              className="about-doorin-illust"
            />
          </div>
        </div>
        {/* New app screen wrapper */}
        <div className="app-screen-wrapper-1">
          <div className="app-rec-group">
            <div className="all-content">
              <img src={homeIcon} alt="Home Icon" />
              <div className="app-screen-text-parent-group">
                <div className="app-screen-text-group-1">
                  <div className="app-screen-text-1">01</div>
                  <div className="app-screen-text-2">-Home Screen</div>
                </div>
                <div className="app-screen-text-3">Clean, modern home screen showcasing navigation, a bold title, and visually centered branding for an engaging first impression.</div>
              </div>
            </div>
          </div>
          <div className="app-screen-09">
            <img src={deviceMockup09} alt="Device Mockup 09" />
          </div>
        </div>
        {/* Duplicated and renamed app screen wrapper */}
        <div className="app-screen-wrapper-2">
          <div className="app-rec-group-2">
            <div className="all-content-2">
              <img src={registrationIcon} alt="Registration Icon" />
              <div className="app-screen-text-parent-group-2">
                <div className="app-screen-text-group-2">
                  <div className="app-screen-text-1-2">02</div>
                  <div className="app-screen-text-2-2">-Registration</div>
                </div>
                <div className="app-screen-text-3-2">Simple and intuitive registration screen with clear input fields and a clean layout focused on user onboarding.</div>
              </div>
            </div>
          </div>
          <div className="app-screen-04">
            <img src={deviceMockup04} alt="Device Mockup 04" />
          </div>
        </div>
        {/* Iconography wrapper */}
        <div className="iconography-wrapper">
          <div className="iconography-title-group">
            <div className="iconography-text-1">
              <span>03</span>
            </div>
            <div className="iconography-text-2">
              <span>Icons & colors</span>
            </div>
          </div>
          <img src={iconographyIllustration} alt="Iconography Illustration" className="iconography-illustration" />
        </div>
        {/* Duplicated app screen wrappers */}
        <div className="app-screen-wrapper-3">
          <div className="app-rec-group-3">
            <div className="all-content-3">
              <img src={findHotelsIcon} alt="Find Hotels Icon" className="find-hotels-icon" />
              <div className="app-screen-text-parent-group-3">
                <div className="app-screen-text-group-3">
                  <div className="app-screen-text-1-3">03</div>
                  <div className="app-screen-text-2-3">-Find Hotels</div>
                </div>
                <div className="app-screen-text-3-3">User-friendly hotel search screen with filters, location input, and a clean list layout for quick browsing and selection.</div>
              </div>
            </div>
          </div>
          <div className="app-screen-11-2">
            <img src={deviceMockup112} alt="Device Mockup 11-2" />
          </div>
        </div>
        <div className="app-screen-wrapper-4">
          <div className="app-rec-group-4">
            <div className="all-content-4">
              <img src={easySetupIcon} alt="Easy Setup Icon" className="easy-setup-icon" />
              <div className="app-screen-text-parent-group-4">
                <div className="app-screen-text-group-4">
                  <div className="app-screen-text-1-4">04</div>
                  <div className="app-screen-text-2-4">-Easy Setup</div>
                </div>
                <div className="app-screen-text-3-4">Streamlined setup screen with guided steps and minimal visuals, designed for quick and hassle-free onboarding.</div>
              </div>
            </div>
          </div>
          <div className="app-screen-12">
            <img src={deviceMockup12} alt="Device Mockup 12" />
          </div>
        </div>
        <div className="UI-screens-1-wrapper">
          <img src={uiScreens1} alt="UI Screens 1" className="ui-screens-1-svg" />
        </div>
        <div className="userflow-wrapper">
          <div className="userflow-title-group">
            <div className="userflow-text-1">
              <span>04</span>
            </div>
            <div className="userflow-text-2">
              <span>Mind map</span>
            </div>
          </div>
          <div className="userflow-diagram-container">
            <img src={userflowDiagram} alt="User Flow Diagram" className="userflow-diagram" />
          </div>
        </div>
        <div className="wireframes-wrapper">
          <div className="wireframes-title-group">
            <div className="wireframes-text-1">
              <span>05</span>
            </div>
            <div className="wireframes-text-2">
              <span>Wireframes</span>
            </div>
          </div>
          <div className="wireframes-illustration-group">
            <div className="wireframes-illustration-1">
              <img src={wireframesIllustration1} alt="Wireframes Illustration 1" />
            </div>
          </div>
        </div>
        <div className="mockups-wrapper">
          <div className="mockups-title-group">
            <div className="mockups-text-1">
              <span>06</span>
            </div>
            <div className="mockups-text-2">
              <span>Mockups</span>
            </div>
          </div>
          <div className="mockups-illustration-group">
            <div className="mockups-illustration-1">
              <img src={mockupsIllustration1} alt="Mockups Illustration 1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
