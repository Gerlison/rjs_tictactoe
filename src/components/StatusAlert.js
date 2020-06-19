/* eslint-disable jsx-a11y/alt-text */
import React, { memo } from "react";
import styled from "styled-components";

import { PLAYERS_ENUM } from "../config/enums";

const StatusAlert = ({ winner }) => {
  return (
    <StyledContainer winner={winner !== undefined}>
      <img src={PLAYERS_ENUM[winner]} />
      <StyledBadge color={winner !== 0 ? "#70d6bd" : "#D6C570"}>
        {winner !== 0 ? "Victory" : "Tie"}
      </StyledBadge>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 102%;
`;

const StyledBadge = styled.p`
  color: white;
  font-size: 2em;
  text-align: center;

  min-width: 150px;
  margin: 16px;
  padding: 4px 20px;
  border-radius: 10px;
  background-color: ${({ color }) => color};
`;

export default memo(StatusAlert);
