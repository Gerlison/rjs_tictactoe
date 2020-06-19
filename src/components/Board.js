/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import StatusAlert from "./StatusAlert";

import { PLAYERS_ENUM } from "../config/enums";
import Button from "./core/Button";

const INITIAL_BOARD_DATA = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const Board = ({ setScore }) => {
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState(true);
  const [boardData, setBoardData] = useState(INITIAL_BOARD_DATA);

  const verifyPairs = (arrOfPairs) => {
    if (arrOfPairs.every((column) => column === 1)) {
      setScore((prev) => ({
        ...prev,
        1: prev[1] + 1,
      }));
      setWinner(1);
      return true;
    }

    if (arrOfPairs.every((column) => column === 2)) {
      setScore((prev) => ({
        ...prev,
        2: prev[2] + 1,
      }));
      setWinner(2);
      return true;
    }

    return false;
  };

  const verifyHorizontalPairs = () => {
    let pairFound = false;
    boardData.forEach((row) => {
      if (verifyPairs(row)) {
        pairFound = true;
      }
    });
    return pairFound;
  };

  const verifyVerticalPairs = () => {
    let pairFound = false;
    for (let i = 0; i < 3; i++) {
      const column = boardData.map((row) => row[i]);
      if (verifyPairs(column)) {
        pairFound = true;
      }
    }
    return pairFound;
  };

  const verifyDiagonalPairs = () => {
    const primaryDiagonal = boardData.map((row, index) => row[index]);
    if (verifyPairs(primaryDiagonal)) return true;

    const secundaryDiagonal = boardData.map(
      (row, index) => row[boardData.length - index - 1]
    );
    if (verifyPairs(secundaryDiagonal)) return true;

    return false;
  };

  const verifyTie = () => {
    let thereIsPlay = false;
    boardData.forEach((row) => {
      if (thereIsPlay) return;
      if (row.some((column) => column === 0)) {
        thereIsPlay = true;
      }
    });
    if (!thereIsPlay) setWinner(0);

    return thereIsPlay;
  };

  const verifyWinner = () => {
    if (verifyHorizontalPairs()) return;
    else if (verifyVerticalPairs()) return;
    else if (verifyDiagonalPairs()) return;
    else verifyTie();
  };

  const handleFieldClick = (row, column) => {
    if (winner !== null || boardData[row][column] !== 0) return;

    let newData = [...boardData].map((column) => [...column]);
    newData[row][column] = turn ? 1 : 2;
    setBoardData(newData);
    setTurn((prev) => !prev);
  };

  const nextRound = () => {
    setBoardData(INITIAL_BOARD_DATA);
    setWinner(null);
  };

  const resetGame = () => {
    setScore({ 1: 0, 2: 0 });
    nextRound();
  };

  useEffect(verifyWinner, [boardData]);

  return (
    <>
      <StyledContainer>
        <StyledOpacity opacity={winner !== null ? 0.1 : 1}>
          {boardData.map((row, rowIndex) => (
            <StyledRow bordered={rowIndex < boardData.length - 1}>
              {row.map((column, columnIndex) => (
                <StyledField
                  isEmpty={column === 0}
                  onClick={() => handleFieldClick(rowIndex, columnIndex)}
                  bordered={columnIndex < row.length - 1}
                >
                  <img src={PLAYERS_ENUM[column]} />
                </StyledField>
              ))}
            </StyledRow>
          ))}
        </StyledOpacity>
        {winner !== null && <StatusAlert winner={winner} />}
      </StyledContainer>
      <div style={{ width: 200 }}>
        <Button onClick={resetGame} label="Restart" color="#FF6363" />
        {winner !== null && (
          <Button onClick={nextRound} label="Next Round" color="#70D6BD" />
        )}
      </div>
    </>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  height: 300px;

  position: relative;
`;

const StyledRow = styled.div`
  display: inline-flex;
  border-bottom: ${({ bordered }) => (bordered ? "2px" : "0px")} solid #3562ff;
`;

const StyledField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 100px;
  border-right: ${({ bordered }) => (bordered ? "2px" : "0px")} solid #3562ff;
  cursor: pointer;

  :after {
    content: "";
    width: 80px;
    height: 80px;
    display: block;
    transform: scale(0.6);
    transition: all 0.2s;
    border-radius: 4px;
    position: absolute;
  }

  :hover:after {
    ${({ isEmpty }) =>
      isEmpty
        ? `
          transform: scale(0.9);
          background-color: #1a1a1add;
        `
        : ""}
  }

  :active:after {
    transform: scale(1);
    background-color: #222;
  }
`;

const StyledOpacity = styled.div`
  opacity: ${({ opacity }) => opacity};
`;

export default Board;
