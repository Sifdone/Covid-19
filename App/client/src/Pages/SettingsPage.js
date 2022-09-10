import styled from "styled-components";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Axios from "axios";

const ip = "http://192.168.2.7:3001/";

export const SettingsPage = () => {
  const [loggedInUser, setloggedInUser] = useState({ username: "default" });
  const [usernameView, setusernameView] = useState(false);
  const [passwordView, setpasswordView] = useState(false);
  const [buttonView, setbuttonView] = useState(true);
  const [newUsername, setnewUsername] = useState("");
  const [usernameUnique, setusernameUnique] = useState(false);
  const [newPassword1, setnewPassword1] = useState();
  const [newPassword2, setnewPassword2] = useState();
  const [oldPassword, setoldPassword] = useState();
  const [passwordChanged, setpasswordChanged] = useState(false);
  const [usernameChanged, setusernameChanged] = useState(false);
  const [history, sethistory] = useState([]);

  const getHistory = (user) => {
    console.log(user);
    Axios.post(ip.concat("history"), {
      user_id: user,
    }).then((response) => {
      sethistory(response.data);
      console.log(response.data);
    });
  };

  let navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get(ip.concat("login")).then((response) => {
      if (response.data.loggedIn === true) {
        console.log(response.data.loggedIn);
        console.log("logged in");
        console.log(response.data.user[0]);
        setloggedInUser(response.data.user[0]);
        getHistory(response.data.user[0].id);
      } else {
        console.log("not logged in");
        navigate("/");
      }
    });
  }, [navigate]);

  useEffect(() => {
    if (newUsername.length > 4) {
      console.log(newUsername);
      Axios.post(ip.concat("usernamecheck"), {
        username: newUsername,
      }).then((response) => {
        console.log(response);
        setusernameUnique(response.data);
      });
    } else {
      setusernameUnique(false);
    }
  }, [newUsername]);

  const changeUsername = (newUser) => {
    Axios.post(ip.concat("changeusername"), {
      user_id: loggedInUser.id,
      newUsername: newUser,
    }).then((response) => {
      setloggedInUser(response.data[0]);
      setusernameChanged(true);
    });
  };

  const changePassword = (newUser) => {
    if (newPassword1 === newPassword2) {
      Axios.post(ip.concat("changepass"), {
        user_id: loggedInUser.id,
        password: oldPassword,
        newPassword: newPassword1,
      }).then((response) => {
        console.log(response.data);
        setpasswordChanged(true);
      });
    }
  };

  return (
    <SettingsPageContainer>
      <HeadBar>
        <HeaderTextUser>{loggedInUser.username} | </HeaderTextUser>
        <HeaderTextLogout href="./">Logout</HeaderTextLogout>
        <HeaderTextUser> | </HeaderTextUser>
        <HeaderTextLogout href="./map">Map</HeaderTextLogout>
      </HeadBar>

      <SettingsWrapper>
        <HeadWrapper>
          <Head>Settings</Head>
        </HeadWrapper>

        <Form>
          {buttonView && (
            <Button
              onClick={(e) => {
                setusernameView(true);
                setpasswordView(false);
                setbuttonView(false);
                setusernameChanged(false);
              }}
            >
              CHANGE USERNAME
            </Button>
          )}
          {usernameView && (
            <Form>
              <SmallHead>
                {usernameChanged
                  ? "Username changed Successfully"
                  : "Enter New Username"}
              </SmallHead>
              {!usernameChanged && (
                <StyledInput
                  type="email"
                  placeholder="Username"
                  onChange={(event) => {
                    setnewUsername(event.target.value);
                  }}
                />
              )}
              {!usernameChanged && !usernameUnique && (
                <ButtonInactive>Submit</ButtonInactive>
              )}
              {!usernameChanged && usernameUnique && (
                <Button
                  onClick={(e) => {
                    changeUsername(newUsername);
                  }}
                >
                  Submit
                </Button>
              )}
              <ButtonRed
                onClick={(e) => {
                  setusernameView(false);
                  setbuttonView(true);
                }}
              >
                {usernameChanged ? "Back" : "Cancel"}
              </ButtonRed>
            </Form>
          )}

          {buttonView && (
            <Button
              onClick={(e) => {
                setpasswordView(true);
                setusernameView(false);
                setbuttonView(false);
                setusernameChanged(false);
              }}
            >
              CHANGE PASSWORD
            </Button>
          )}

          {passwordView && (
            <Form>
              {!passwordChanged && (
                <SmallHead>Enter current password</SmallHead>
              )}
              {!passwordChanged && (
                <StyledInput
                  type="password"
                  placeholder="Password"
                  onChange={(event) => {
                    setoldPassword(event.target.value);
                  }}
                />
              )}
              {!passwordChanged && (
                <StyledInput
                  type="password"
                  placeholder="Password"
                  onChange={(event) => {
                    setnewPassword1(event.target.value);
                  }}
                />
              )}
              {!passwordChanged && (
                <StyledInput
                  type="password"
                  placeholder="Password"
                  onChange={(event) => {
                    setnewPassword2(event.target.value);
                  }}
                />
              )}
              {!passwordChanged && (
                <Button
                  onClick={(e) => {
                    changePassword();
                  }}
                >
                  Submit
                </Button>
              )}
              <ButtonRed
                onClick={(e) => {
                  setpasswordView(false);
                  setbuttonView(true);
                }}
              >
                Cancel
              </ButtonRed>
            </Form>
          )}
        </Form>
        <Head>History</Head>
        <HistoryContainer>
          {history.map((poi) => {
            return (
              <HistoryItem>
                <HistoryTitle>{poi.NAME}</HistoryTitle>
                <HistoryText>{poi.ADDRESS}</HistoryText>
                <HistoryText>{poi.TIMESTAMP}</HistoryText>
              </HistoryItem>
            );
          })}
        </HistoryContainer>
      </SettingsWrapper>
    </SettingsPageContainer>
  );
};

const HistoryItem = styled.div`
  //margin-top: 1em;
  padding: 0.5em;
  width: 100%;
  height: 1.6em;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const HistoryText = styled.h4`
  //margin-bottom: 1em;
  text-align: center;
  font-size: 0.9em;
  font-weight: normal;
  color: #35735d;
  @media only screen and (max-width: 500px) {
    margin-top: 0;
    font-size: 0.8em;
  }
`;

const HistoryTitle = styled.h4`
  //margin-bottom: 1em;
  text-align: center;
  font-size: 0.9em;
  font-weight: bold;
  color: #35735d;
  @media only screen and (max-width: 500px) {
    margin-top: 0;
    font-size: 0.8em;
  }
`;

const HistoryContainer = styled.div`
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  height: auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  margin-bottom: 1em;
  margin-top: 1em;

  background-color: white;
  @media only screen and (max-width: 500px) {
    border-radius: 10px;
    margin-bottom: 0;
    padding-left: 0.6em;
    padding-right: 0.6em;
    width: 85%;
    height: auto;
  }
`;

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

const SettingsWrapper = styled.div`
  width: 70vw;
  height: auto;
  min-width: 300px;
  min-height: 400px;
  background-color: rgba(154, 180, 182, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-top: 3vh;
  padding-left: 0.3em;
  text-align: center;
  font-size: 2.5em;
  font-weight: normal;
  letter-spacing: 0.24em;
  color: #fffbfb;
  @media only screen and (max-width: 500px) {
    margin-top: 4vh;
    font-size: 2em;
  }
`;

const SmallHead = styled.h4`
  margin-bottom: 1em;
  text-align: center;
  font-size: 0.9em;
  font-weight: normal;
  color: #35735d;
  @media only screen and (max-width: 500px) {
    margin-top: 0;
    font-size: 1em;
  }
`;

const Form = styled.div`
  height: auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;
  @media only screen and (max-width: 500px) {
    margin-bottom: 0;
    height: auto;
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

const ButtonSmall = styled.button`
  color: white;
  text-align: center;
  width: 3em;
  height: 2em;
  background: linear-gradient(89.81deg, #d8cc60 -3.52%, #d1d35c 98.63%);
  border: none;
  border-radius: 30px;
  transition: all 0.2s ease-in;

  &:hover {
    background: linear-gradient(89.81deg, #c2b85c -3.52%, #bdb251 98.63%);
  }
`;

const ButtonInactive = styled.button`
  color: white;
  margin-bottom: 1em;
  text-align: center;
  width: 15em;
  height: 4em;
  background: linear-gradient(89.81deg, #d8cc9e -3.52%, #d1d396 98.63%);
  border: none;
  border-radius: 30px;
  transition: all 0.2s ease-in;
`;

const ButtonRed = styled.button`
  color: white;
  margin-bottom: 1em;
  text-align: center;
  width: 15em;
  height: 4em;
  background: linear-gradient(89.81deg, #163336 -3.52%, #132526 98.63%);
  border: none;
  border-radius: 30px;
  transition: all 0.2s ease-in;

  &:hover {
    background: linear-gradient(89.81deg, #1d3436 -3.52%, #3f494a 98.63%);
  }
`;