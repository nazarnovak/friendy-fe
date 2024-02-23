import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "src/Root.css";

import Header from "src/components/Header/Header";
import ConsentBanner from "src/components/ConsentBanner/ConsentBanner";
import FeedbackModal from "src/components/FeedbackModal/FeedbackModal";

const Root = () => {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  return (
    <>
      <ConsentBanner />
      <FeedbackModal
        open={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
      />

      <Header openFeedbackModal={() => setFeedbackModalOpen(true)} />
      <Hero />
      <CTA />
      <Benefits />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  );
};

const Hero = () => {
  return (
    <div id="hero-wrapper">
      <h1>Main message</h1>
      <h2>Supporting/explainer text</h2>
    </div>
  );
};

const Benefits = () => {
  return (
    <div id="benefits-wrapper">
      <div className="benefit">Benefit 1</div>
      <div className="benefit">Benefit 2</div>
      <div className="benefit">Benefit 3</div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div id="how-it-works-wrapper">
      <div className="benefit">How it works 1</div>
      <div className="benefit">How it works 2</div>
      <div className="benefit">How it works 3</div>
    </div>
  );
};

const CTA = () => {
  const navigate = useNavigate();

  const onCTAClick = () => {
    navigate("/intro");
  };

  return (
    <div id="cta-wrapper">
      <div id="cta-headline">Sign up and find best friends</div>
      <div id="cta-inputs">
        <input id="cta-input" type="text" placeholder="hello@friendy.app" />
        <button id="cta-action" onClick={onCTAClick}>
          Start
        </button>
      </div>
    </div>
  );
};

const Footer = () => {
  return <div id="footer">Footer</div>;
};

export default Root;
