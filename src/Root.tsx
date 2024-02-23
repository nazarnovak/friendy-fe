import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import "src/Root.css";

import Header from "src/components/Header/Header";
import ConsentBanner from "src/components/ConsentBanner/ConsentBanner";

const Root = () => {
  return (
    <>
      <ConsentBanner />
      <Header />
      <Hook />
      <Benefits />
      <CTA />
    </>
  );
};

const HookStyled = styled.div`
  background: darkblue;
  text-align: center;
`;

const Hook = () => {
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

const CTAWrapperStyled = styled.div`
  background: lightblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const CTAHeadlineStyled = styled.div`
  background: lightblue;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const CTAButtonStyled = styled.button`
  background: blue;
  color: white;
  width: 200px;
  margin: 0 auto;
`;

const CTA = () => {
  const navigate = useNavigate();

  const onCTAClick = () => {
    navigate("/intro");
  };

  return (
    <CTAWrapperStyled>
      <CTAHeadlineStyled>Act now!</CTAHeadlineStyled>
      <CTAButtonStyled onClick={onCTAClick}>Act</CTAButtonStyled>
    </CTAWrapperStyled>
  );
};

export default Root;
