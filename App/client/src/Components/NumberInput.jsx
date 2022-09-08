import styled from "styled-components";
//import {useState} from 'react';

const NumberInput = ({ setBusyness }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setBusyness(value);
  };

  return <Input placeholder={"5"} onChange={handleChange}></Input>;
};

export default NumberInput;

const Input = styled.input`
  width: 30%;
  max-width: 100px;
  height: 3em;
  margin-top: 1em;
  margin-bottom: 0.5em;
  border: none;
  border-color: #50af8e;
  background: linear-gradient(89.81deg, #fefefe -3.52%, #ffffff 98.63%);
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.25);
  border-radius: 0.3em;
  padding: 0 1em;
  transition: all 0.2s ease-out;

  &:hover {
    //transform: scale(100.5%);
    background: linear-gradient(89.81deg, #ececec -3.52%, #f5f5f5 98.63%);
  }
  &:focus {
    transform: scale(103%);
    margin-bottom: 0.7em;
    background: linear-gradient(89.81deg, #ececec -3.52%, #f5f5f5 98.63%);
    border-style: solid;
    border-width: 0.05em;
    border-color: #387a63;
  }

  @media only screen and (max-width: 500px) {
    width: 80%;

    &:focus {
      margin-top: 1em;
      transform: scale(101%);
      background: linear-gradient(89.81deg, #ececec -3.52%, #f5f5f5 98.63%);
      border-style: solid;
      border-width: 0.05em;
      border-color: #387a63;
    }
  }
`;
