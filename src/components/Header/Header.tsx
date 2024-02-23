import styled from "styled-components";

const HeaderStyled = styled.div`
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    90deg,
    rgba(0, 17, 116, 1) 0%,
    rgba(9, 9, 121, 1) 35%,
    rgba(0, 99, 186, 1) 100%
  );
`;

const Header = () => {
  return <HeaderStyled>Header</HeaderStyled>;
};

export default Header;
