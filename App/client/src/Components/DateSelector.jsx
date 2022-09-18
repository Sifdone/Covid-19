import React from "react";
import styled from "styled-components";

export const DateSelector = ({ registerCase }) => {
  let currentDate = new Date().toJSON().slice(0, 10);
  let yesterdayDate = new Date(Date.now() - 86400000).toJSON().slice(0, 10);
  let dayBeforeYesterday = new Date(Date.now() - 172800000)
    .toJSON()
    .slice(0, 10);

  return (
    <DateSelectorContainer>
      <Head>When were you diagnosed?</Head>
      <DateWrapper>
        <DateButton
          onClick={() => {
            registerCase(currentDate);
          }}
        >
          Today
        </DateButton>
        <DateButton
          onClick={() => {
            registerCase(yesterdayDate);
          }}
        >
          Yesterday
        </DateButton>
        <DateButton
          onClick={() => {
            registerCase(dayBeforeYesterday);
          }}
        >
          Day Before Yesterday
        </DateButton>
      </DateWrapper>
    </DateSelectorContainer>
  );
};

export default DateSelector;

const DateWrapper = styled.div`
  height: 5em;
  width: auto;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 40px;
`;

const DateSelectorContainer = styled.div`
  margin-top: 0.5em;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: auto;
`;

const DateButton = styled.button`
  color: white;
  padding: 0.3em;
  margin: 0.5em;
  margin-bottom: 1em;
  margin-top: 1em;
  text-align: center;
  font-size: 0.8em;
  width: 7em;
  height: 4em;
  background: linear-gradient(89.81deg, #d8cc60 -3.52%, #d1d35c 98.63%);
  border: none;
  border-radius: 30px;
  transition: all 0.2s ease-in;

  &:hover {
    background: linear-gradient(89.81deg, #c2b85c -3.52%, #bdb251 98.63%);
  }
`;

const Head = styled.a`
  margin-bottom: 0.5em;
  text-decoration: none; /* no underline */
  font-family: Montserrat;
  text-align: center;
  font-size: 0.9em;
  letter-spacing: 0.2em;
  font-weight: bold;
  color: #35735d;
  @media only screen and (max-width: 500px) {
  }
`;
