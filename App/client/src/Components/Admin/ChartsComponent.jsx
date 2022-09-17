import React from "react";
import styled from "styled-components";
//import { useState, useEffect } from "react";

export const ChartsComponent = ({
  visitByCasesCountPerDay,
  visitCountPerDay,
}) => {
  return <StatsWrapper></StatsWrapper>;
};

export default ChartsComponent;

const StatsWrapper = styled.div`
  width: 50vw;
  height: 40vh;
  min-width: 300px;
  min-height: 500px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
