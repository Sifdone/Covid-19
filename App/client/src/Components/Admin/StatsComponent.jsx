import React from "react";
import { Number } from "./Number.jsx";
import styled from "styled-components";

export const StatsComponents = ({ num }) => {
  return (
    <StatsWrapper>
      <Number num="17"></Number>
      <Number num="17"></Number>
    </StatsWrapper>
  );
};

export default StatsComponents;

const StatsWrapper = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;
  @media only screen and (max-width: 500px) {
    margin-bottom: 0;
    height: auto;
  }
`;
