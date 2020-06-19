import React, { memo } from "react";
import styled from "styled-components";

const Button = ({ label, onClick, color }) => {
  return (
    <StyledContainer onClick={onClick} color={color}>
      {label}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 200px;
  padding: 14px;
  border-radius: 100px;
  background-color: white;
  margin-bottom: 32px;

  text-align: center;
  font-size: 1em;
  font-weight: bold;
  color: ${({ color }) => color || "#333"};
  cursor: pointer;
  transition: all 0.4s;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  :hover {
    transform: scale(1.05);
  }
`;

export default memo(Button);
