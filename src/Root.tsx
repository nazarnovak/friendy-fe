import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import "src/Root.css";

import Header from "src/components/Header/Header";
import ConsentBanner from "src/components/ConsentBanner/ConsentBanner";
import FeedbackModal from "./components/FeedbackModal/FeedbackModal";

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
    </>
  );
};

const HookStyled = styled.div`
  background: darkblue;
  text-align: center;
`;

const Hero = () => {
  return (
    <HookStyled>
      <h1>Main message</h1>
      <h2>Supporting/explainer text</h2>
    </HookStyled>
  );
};

const BenefitsStyled = styled.div`
  background: blue;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const BenefitStyled = styled.div`
  height: 160px;
  display: flex;
  align-items: center;
`;

const Benefits = () => {
  return (
    <BenefitsStyled>
      <BenefitStyled>Benefit 1</BenefitStyled>
      <BenefitStyled>Benefit 2</BenefitStyled>
      <BenefitStyled>Benefit 3</BenefitStyled>
    </BenefitsStyled>
  );
};

const HowItWorks = () => {
  return <div>How it works</div>;
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

export default Root;
