import React from "react";
import styled from "styled-components";

import Layout from "./components/Layout";

const Game = () => {
  return (
    <StyledContainer>
      <Layout />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100%;
  background-color: #131313;
`;

export default Game;
