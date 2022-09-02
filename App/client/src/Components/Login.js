import React from 'react';
import {useNavigate} from "react-router";
import { useState, useEffect } from 'react';
import Axios from 'axios';
import styled from "styled-components";

//const networkAdress = "http://192.168.2.2:";

export const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loginStatus, setloginStatus] = useState();

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();

  const loginUser = () => {
    Axios.post("http://192.168.2.7:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response.data);
      if (response.data.message) {
        setloginStatus(response.data.message);
      } else {
        setloginStatus(response.data[0].username);
        navigate("/map");
      }
    });
  };

  useEffect(() => {
    Axios.get("http://192.168.2.7:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setloginStatus(response.data.user[0].username);
        navigate("/map");
      }
    });
  });

  return (
    <LoginWrapper>
      <HeadWrapper>
        <Head>LOGIN</Head>
        <SmallHead>Please sign in to continue</SmallHead>
      </HeadWrapper>
      <Form>
        <StyledInput
          type="email"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button onClick={loginUser}>LOGIN</Button>
        {loginStatus && <ErrorSign errorText={loginStatus}></ErrorSign>}
        <SmallHead>
          Not yet a member? <a href="/Register">Register</a>
          <button
            onClick={() => {
              navigate("/map");
            }}
          ></button>
        </SmallHead>
      </Form>
    </LoginWrapper>
  );
};

export const Register = () => {
  const [username, setUsername] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();
  const [registrationError, setregistrationError] = useState();

  const passwordsDontMatch = () => {
    console.log("PASSWORDS DONT MATCH");
    setregistrationError("PASSWORDS DONT MATCH");
  };

  const registerUser = () => {
    if (password1 === password2) {
      Axios.post("http://192.168.2.7:3001/register", {
        username: username,
        password: password1,
      }).then(() => {
        console.log("SUCCESS");
      });
    } else {
      passwordsDontMatch();
    }
  };

  return (
    <RegisterWrapper>
      <HeadWrapper>
        <Head>Register</Head>
        <SmallHead>Please register to continue</SmallHead>
      </HeadWrapper>
      <Form>
        <StyledInput
          type="email"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword1(event.target.value);
          }}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword2(event.target.value);
          }}
        />
        <Button onClick={registerUser}>Register</Button>
        {registrationError && (
          <ErrorSign errorText="PASSWORDS DONT MATCH"></ErrorSign>
        )}
      </Form>
      <SmallHead>
        Already a member? <a href="/">Sign in</a>
      </SmallHead>
    </RegisterWrapper>
  );
};


const ErrorSign = ({errorText}) => {

    return(
        <ErrorText>{errorText}</ErrorText>
    );
}



//STYLED ELEMENTS
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

const RegisterWrapper = styled.div`
    width: 30vw;
    height: 40vh;
    min-width: 300px;
    min-height: 500px;
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
    color: #FFFBFB;
    @media only screen and (max-width: 500px) {
        margin-top: 20vh;
        font-size: 3.5em;
    }
    
`;

const SmallHead =styled.h5`
    text-align: center;
    font-size: 0.9em;
    font-weight: normal;
    color: #35735D;
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
     und: linear-gradient(89.81deg, #F4F4F4 -3.52%, #FFFFFF 98.63%);
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.25);
    border-radius: 0.3em;
    padding: 0 1.5em;
    transition: all 0.15s ease-in;

    &:hover{
        //transform: scale(100.5%);
        background: linear-gradient(89.81deg, #ECECEC -3.52%, #F5F5F5 98.63%);
    }
    &:focus{
        transform: scale(101%);
        background: linear-gradient(89.81deg, #ECECEC -3.52%, #F5F5F5 98.63%);
        border-style: solid;
        border-width: 0.05em;
        border-color: #387a63;
    }

`;

const Button = styled.button`
    color: white;
    margin-bottom: 1em;
    text-align: center;
    width:8em;
    height:4em;
    background: linear-gradient(89.81deg, #D8CC60 -3.52%, #D1D35C 98.63%);
    border: none;
    border-radius: 30px;
    transition: all 0.2s ease-in;

    &:hover{
        background: linear-gradient(89.81deg, #C2B85C -3.52%, #BDB251 98.63%);
    }

`;

export default Login;