import styled from "styled-components";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Axios from "axios";

const ip = "http://192.168.2.7:3001/";

export const SettingsPage = () => {
  const [loggedInUser, setloggedInUser] = useState();

  const getHistory = (user) => {
    console.log(user);
    Axios.post(ip.concat("history"), {
      user_id: user,
    }).then((response) => {
      console.log(response.data);
    });
  };

  let navigate = useNavigate();
  //let loggedInUser = [];

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get(ip.concat("login")).then((response) => {
      if (response.data.loggedIn === true) {
        console.log(response.data.loggedIn);
        console.log("logged in");
        console.log(response.data.user[0].id);
        setloggedInUser(response.data.user[0].username);
        getHistory(response.data.user[0].id);
      } else {
        console.log("not logged in");
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <SettingsPageContainer>
      <HeadBar>
        <HeaderTextUser>{loggedInUser} | </HeaderTextUser>
        <HeaderTextLogout href="./">Logout</HeaderTextLogout>
        <HeaderTextUser> | </HeaderTextUser>
        <HeaderTextLogout href="./map">Map</HeaderTextLogout>
      </HeadBar>

      <LoginWrapper>
        <HeadWrapper>
          <Head>Settings</Head>
          <SmallHead>Please sign in to continue</SmallHead>
        </HeadWrapper>
      </LoginWrapper>
    </SettingsPageContainer>
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

const SettingsPageContainer = styled.div`
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
  color: #fffbfb;
  @media only screen and (max-width: 500px) {
    margin-top: 20vh;
    font-size: 3.5em;
  }
`;

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
