import React from "react";
import styled from "styled-components";


export const Number = ({ num }) => {
  return <NumberText>{num}</NumberText>;
};

export default Number;

const NumberText = styled.h1`
  font-family: Montserrat;
  text-align: center;
  font-size: 4em;
  letter-spacing: 0.2em;
  font-weight: normal;
  color: black;
  @media only screen and (max-width: 500px) {
  }
`;

