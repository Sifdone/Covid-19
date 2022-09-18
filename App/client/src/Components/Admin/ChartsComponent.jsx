import React from "react";
import styled from "styled-components";
//import { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from "chart.js/auto";

export const ChartsComponent = ({
  visitByCasesCountPerDay,
  visitCountPerDay,
}) => {
  const casesvisits = visitByCasesCountPerDay.map(function (elem) {
    return elem.visits;
  });
  const visits = visitCountPerDay.map(function (elem) {
    return elem.visits;
  });
  const date = visitCountPerDay.map(function (elem) {
    return elem.date;
  });
  const state = {
    labels: date,
    datasets: [
      {
        label: "Cases Visits",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: casesvisits,
      },
      {
        backgroundColor: "rgba(75,192,100,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        label: "Total Visits",
        data: visits,
      },
    ],
  };
  return (
    <StatsWrapper>
      <Bar
        data={state}
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

export const LineChartsComponent = ({
  visitByCasesCountPerDay,
  visitCountPerDay,
}) => {
  const casesvisits = visitByCasesCountPerDay.map(function (elem) {
    return elem.visits;
  });
  const visits = visitCountPerDay.map(function (elem) {
    return elem.visits;
  });
  const date = visitCountPerDay.map(function (elem) {
    return elem.date;
  });
  const state = {
    labels: date,
    datasets: [
      {
        label: "Cases Visits",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: casesvisits,
      },
      {
        backgroundColor: "rgba(75,192,100,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        label: "Total Visits",
        data: visits,
      },
    ],
  };
  return (
    <StatsWrapper>
      <Line
        data={state}
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
