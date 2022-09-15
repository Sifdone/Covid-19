import CovidMap from "../Components/Map/CovidMap"
import styled from "styled-components"
import {useNavigate} from "react-router";
import { useState, useEffect } from 'react';
import Axios from 'axios';
import SearchBar from "../Components/SearchBar";
//import TestData from '../data/starting_pois_test3.json'

const ip = "http://192.168.2.7:3001/";

export const MapPage = () => {
  const [loggedInUser, setloggedInUser] = useState({});
  const [selectedPOI, setselectedPOI] = useState({});
  //    const [selectedType,setselectedType] =useState({});
  // eslint-disable-next-line
  const [selectedLocation, setselectedLocation] = useState({});
  const [locationData, setlocationData] = useState({});

  //get current date for testing
  let currentDate = new Date().toJSON().slice(0, 10);

  let navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const getPOIs = () => {
    Axios.get(ip.concat("pois")).then((response) => {
      setlocationData(response.data);
    });
  };

  const registerCase = (date) => {
    Axios.post(ip.concat("covid"), {
      user_id: loggedInUser.id,
      date: date,
    }).then((response) => {
      console.log(response.data);
      if (response.data.message) {
      }
    });
  };

  useEffect(() => {
    Axios.get(ip.concat("login")).then((response) => {
      if (response.data.loggedIn === true) {
        console.log(response.data.loggedIn);
        console.log("logged in");
        setloggedInUser(response.data.user[0]);
        getPOIs();
      } else {
        console.log("not logged in");
      }
    });
  }, [navigate]);

  return (
    <MapPageContainer>
      <HeadBar>
        <HeaderTextUser>{loggedInUser.username} | </HeaderTextUser>
        <HeaderTextLogout href="./">Logout</HeaderTextLogout>
        <HeaderTextUser> | </HeaderTextUser>
        <HeaderTextLogout href="./settings">Settings</HeaderTextLogout>
      </HeadBar>
      <SearchBar
        placeholder="Search"
        data={locationData}
        setselectedPOI={setselectedPOI}
      ></SearchBar>

      <CovidMap selectedPOI={selectedPOI} />
      <GotCovidButton
        onClick={() => {
          registerCase(currentDate);
        }}
      >
        I have COVID
      </GotCovidButton>
    </MapPageContainer>
  );
};

const HeadBar = styled.div`
  width: 100%;
  height: 3em;
  padding-right: 2vw;
  background-color: rgba(154, 180, 182, 1);
  display: flex;
  justify-content: right;
  align-items: center;
`;

const HeaderTextUser = styled.h5`
  font-family: Montserrat;
  text-align: center;
  font-size: 0.9em;
  letter-spacing: 0.2em;
  font-weight: normal;
  color: #fffbfb;
  @media only screen and (max-width: 500px) {
  }
`;

const HeaderTextLogout = styled.a`
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
// eslint-disable-next-line
const SearchInput = styled.input`
  width: 100%;
  max-width: 800px;
  min-width: 150px;
  height: 4em;
  margin-top: 3em;
  margin-bottom: 1.6em;
  border: none;
  border-color: #50af8e;
  und: linear-gradient(89.81deg, #f4f4f4 -3.52%, #ffffff 98.63%);
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.25);
  border-radius: 0.3em;
  padding: 0 1.5em;
  transition: all 0.2s ease-out;

  &:hover {
    //transform: scale(100.5%);
    background: linear-gradient(89.81deg, #ececec -3.52%, #f5f5f5 98.63%);
  }
  &:focus {
    transform: scale(101%);
    margin-bottom: 1em;
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

const MapPageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 0;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100vw;
  height: 100vh;
`;

const GotCovidButton = styled.button`
  color: white;
  margin-bottom: 1em;
  margin-top: 1em;
  text-align: center;
  width: 15em;
  height: 4em;
  background: linear-gradient(89.81deg, #d8cc60 -3.52%, #d1d35c 98.63%);
  border: none;
  border-radius: 30px;
  transition: all 0.2s ease-in;

  &:hover {
    background: linear-gradient(89.81deg, #c2b85c -3.52%, #bdb251 98.63%);
  }
`;