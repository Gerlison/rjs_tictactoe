import React from "react";
import styled from "styled-components";

const Score = ({ score }) => {
  return (
    <StyledContainer>
      <p>
        <StyledImg src="/images/circle.png" alt="circle" />
        {score[1]} wins
      </p>
      <p>
        <StyledImg src="/images/x.png" alt="circle" />
        {score[2]} wins
      </p>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  p {
    display: flex;
    align-items: center;
    margin-bottom: 50px;

    color: white;
    font-size: 2em;
  }
`;

const StyledImg = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 24px;
`;

export default Score;
