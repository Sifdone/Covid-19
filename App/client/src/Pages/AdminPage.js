import * as React from "react";
import { useNavigate } from "react-router";
// eslint-disable-next-line
import { useState, useEffect } from "react";
import { Number } from "../Components/Admin/Number.jsx";
import Axios from "axios";
import styled from "styled-components";

const ip = "http://192.168.2.7:3001/";

export const AdminPanel = () => {
  // eslint-disable-next-line
  const [loginStatus, setloginStatus] = useState();
  const [selectedFile, setselectedFile] = useState();
  const [totalvisits, settotalvisits] = useState();
  const [totalcases, settotalcases] = useState();
  Axios.defaults.withCredentials = true;
  // eslint-disable-next-line
  let navigate = useNavigate();

  const uploadData = () => {
    const data = new FormData();
    console.log(selectedFile);
    data.append("file", selectedFile);
    Axios.post(ip.concat("uploadFileAPI"), data).then((response) => {
      console.log(response);
    });
  };
  const getTotalCases = () => {
    Axios.get(ip.concat("totalCases")).then((response) => {
      settotalcases(response.data);
      console.log(response.data);
    });
  };
  const getTotalVisits = () => {
    Axios.get(ip.concat("totalVisits")).then((response) => {
      settotalvisits(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    getTotalVisits();
    getTotalCases();
  }, []);

  return (
    <AdminPageContainer>
      <AdminWrapper>
        <Head>Update Data</Head>
        <Button
          onClick={() => {
            uploadData();
          }}
        >
          Upload Data
        </Button>
        <StyledInput
          type="file"
          onChange={(e) => {
            setselectedFile(e.target.files[0]);
          }}
        ></StyledInput>
        <Button>Delete All Data</Button>
      </AdminWrapper>
      <AdminWrapper>
        <Number num={totalcases} />
        <Number num={totalvisits} />
      </AdminWrapper>
    </AdminPageContainer>
  );
};

//STYLED ELEMENTS
// eslint-disable-next-line
const ErrorText = styled.h5`
  text-align: center;
  font-size: 0.9em;
  font-weight: normal;
  color: #ff2222;
  @media only screen and (max-width: 500px) {
    margin-top: 0;
    font-size: 1em;
  }
`;

const AdminPageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 0;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: rgba(154, 180, 182, 1);
  width: 100vw;
  height: 100vh;
`;

const AdminWrapper = styled.div`
  width: 40vw;
  height: 40vh;
  min-width: 300px;
  min-height: 500px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 500px) {
    width: 100vw;
    height: 100%;
    justify-content: start;
  }
`;
// eslint-disable-next-line
const Form = styled.div`
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
// eslint-disable-next-line
const LoginWrapper = styled.div`
  width: 30vw;
  height: 35vh;
  min-width: 300px;
  min-height: 400px;
  background-color: rgba(154, 180, 182, 1);
  display: flex;
  flex-direction: column;
  justify-content: start;

  @media only screen and (max-width: 500px) {
    width: 100vw;
    height: 100%;
    justify-content: start;
  }
`;
// eslint-disable-next-line
const HeadWrapper = styled.div`
  margin-bottom: 1.5em;
`;

const Head = styled.h1`
  margin-top: 5vh;
  padding-left: 0.3em;
  text-align: center;
  font-size: 2.5em;
  font-weight: normal;
  letter-spacing: 0.24em;
  color: grey;
  @media only screen and (max-width: 500px) {
    margin-top: 20vh;
    font-size: 3.5em;
  }
`;
// eslint-disable-next-line
const SmallHead = styled.h5`
  text-align: center;
  font-size: 0.9em;
  font-weight: normal;
  color: #35735d;
  @media only screen and (max-width: 500px) {
    margin-top: 0;
    font-size: 1em;
  }
`;

const StyledInput = styled.input`
  width: 65%;
  max-width: 350px;
  min-width: 150px;
  height: 4em;
  margin-bottom: 1.6em;
  border: none;
  border-color: #50af8e;
  und: linear-gradient(89.81deg, #f4f4f4 -3.52%, #ffffff 98.63%);
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.25);
  border-radius: 0.3em;
  padding: 0 1.5em;
  transition: all 0.15s ease-in;

  &:hover {
    //transform: scale(100.5%);
    background: linear-gradient(89.81deg, #ececec -3.52%, #f5f5f5 98.63%);
  }
  &:focus {
    transform: scale(101%);
    background: linear-gradient(89.81deg, #ececec -3.52%, #f5f5f5 98.63%);
    border-style: solid;
    border-width: 0.05em;
    border-color: #387a63;
  }
`;

const Button = styled.button`
  color: white;
  margin-bottom: 1em;
  text-align: center;
  width: 8em;
  height: 4em;
  background: linear-gradient(89.81deg, #d8cc60 -3.52%, #d1d35c 98.63%);
  border: none;
  border-radius: 30px;
  transition: all 0.2s ease-in;

  &:hover {
    background: linear-gradient(89.81deg, #c2b85c -3.52%, #bdb251 98.63%);
  }
`;
