import React from "react";
import { Number } from "./Number.jsx";
import styled from "styled-components";
import { useState, useEffect } from "react";

export const StatsComponents = ({
  totalVisits,
  totalCases,
  visitsByCases,
  typeScore,
  typeScoresByCases,
}) => {
  const [typeScoreState, settypeScoreState] = useState([]);
  const [typeScoreByCasesState, settypeScoreByCasesState] = useState([]);

  useEffect(() => {
    settypeScoreState(typeScore);
  }, [typeScore]);

  useEffect(() => {
    settypeScoreByCasesState(typeScoresByCases);
  }, [typeScoresByCases]);

  return (
    <StatsWrapper>
      <TopRow>
        <Stat>
          <Number num={totalVisits}></Number>
          <NumberText>Total Visits</NumberText>
        </Stat>
        <Stat>
          <Number num={totalCases}></Number>
          <NumberText>Total Cases</NumberText>
        </Stat>
        <Stat>
          <Number num={visitsByCases}></Number>
          <NumberText>Total Cases</NumberText>
        </Stat>
      </TopRow>
      <TopRow>
        <ListContainer>
          <ListTitle>Visits per Location Type</ListTitle>
          <List>
            {typeScoreState.map((type, i) => {
              return (
                <TypeItem key={i}>
                  <TypeText>{type.type}</TypeText>
                  <TypeText>{type.score}</TypeText>
                </TypeItem>
              );
            })}
          </List>
        </ListContainer>

        <ListContainer>
          <ListTitle>Visits by Confirmed Cases per Location Type</ListTitle>
          <List>
            {typeScoreByCasesState.map((type, i) => {
              return (
                <TypeItem key={i}>
                  <TypeText>{type.type}</TypeText>
                  <TypeText>{type.score}</TypeText>
                </TypeItem>
              );
            })}
          </List>
        </ListContainer>
      </TopRow>
    </StatsWrapper>
  );
};

export default StatsComponents;

const NumberText = styled.h3`
  font-family: Montserrat;
  text-align: center;
  font-size: 1em;
  letter-spacing: 0.2em;
  font-weight: normal;
  color: black;
  @media only screen and (max-width: 500px) {
  }
`;
const TypeItem = styled.div`
  //margin-top: 1em;
  padding: 0.5em;
  width: 90%;
  height: 1.6em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: left;
`;

const TypeText = styled.h4`
  //margin-bottom: 1em;
  text-align: left;
  font-size: 0.9em;
  font-weight: normal;
  color: #35735d;
  @media only screen and (max-width: 500px) {
    margin-top: 0;
    font-size: 0.8em;
  }
`;

const ListTitle = styled.h2`
  margin-bottom: 1em;
  text-align: center;
  font-size: 1em;
  font-weight: bold;
  color: #35735d;
  @media only screen and (max-width: 500px) {
    margin-top: 0;
    font-size: 0.8em;
  }
`;

const Stat = styled.div`
  height: auto;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;
  @media only screen and (max-width: 500px) {
    margin-bottom: 0;
    height: auto;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
`;

const List = styled.div`
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(154, 180, 182, 1);
    border-radius: 10px;
  }
  height: auto;
  max-height: 10em;
  width: 100%;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;
  @media only screen and (max-width: 500px) {
    margin-bottom: 0;
    height: auto;
  }
`;

const TopRow = styled.div`
  height: auto;
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: left;
  margin-bottom: 1em;
  @media only screen and (max-width: 500px) {
    margin-bottom: 0;
    height: auto;
  }
`;

const StatsWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 1em;
  @media only screen and (max-width: 500px) {
    margin-bottom: 0;
    height: auto;
  }
`;
