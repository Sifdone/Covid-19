import {Login, Register} from "./Components/Login";
//import CovidMap from "./Components/CovidMap.jsx"
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
//import {LoginPage} from './Pages/LoginPage'
import { MapPage } from "./Pages/MapPage";
import { SettingsPage } from "./Pages/SettingsPage";
import styled from "styled-components";

function App() {
  return (
    <BrowserRouter>
      <AppDiv>
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/Map" element={<MapPage></MapPage>} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Settings" element={<SettingsPage />} />
        </Routes>
      </AppDiv>
    </BrowserRouter>
  );
}

export default App;



const AppDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 0;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`
