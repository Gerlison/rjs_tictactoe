import React, { useState } from "react";
import styled from "styled-components";

import Score from "./Score";
import Board from "./Board";

const Layout = () => {
  const [score, setScore] = useState({
    1: 0,
    2: 0,
  });

  return (
    <StyledContainer>
      <Score score={score} />
      <Board setScore={setScore} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  max-width: 1366px;
  height: 100%;

  margin: auto;
  padding: 3.75%;
`;

export default Layout;
