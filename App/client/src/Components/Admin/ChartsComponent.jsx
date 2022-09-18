import React from "react";
import styled from "styled-components";
//import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from "chart.js/auto";
export const ChartsComponent = ({
  visitByCasesCountPerDay,
  visitCountPerDay,
  data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Visits",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: visitCountPerDay,
      },
    ],
  },
}) => {
  return (
    <StatsWrapper>
      <Bar
        data={data}
        options={{
          title: {
            display: true,
            text: "User Visits",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </StatsWrapper>
  );
};

export default ChartsComponent;
// eslint-disable-next-line
const StatsWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
