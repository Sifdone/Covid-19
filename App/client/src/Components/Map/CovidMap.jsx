import L from "leaflet";
import Axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Pop } from "../PopUp";
import { useState, useEffect } from "react";
import ChangeMapView from "./ChangeMapView";
import testData from "../../data/starting_pois_test2.json";
import styled from "styled-components";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";

// Icons
let currentLocationIcon = L.icon({
  iconUrl: require("../icons/currentLocationMarker.png"),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -41],
});

let greenPOIIcon = L.icon({
  iconUrl: require("../icons/greenPOIIcon.png"),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -20],
});
let orangePOIIcon = L.icon({
  iconUrl: require("../icons/orangePOIIcon.png"),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -20],
});
let redPOIIcon = L.icon({
  iconUrl: require("../icons/redPOIIcon.png"),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -20],
});

const CovidMap = ({ selectedPOI, selectedType }) => {
  const [state, setState] = useState({ lat: 38.26473, lng: 21.745822 }); //georgiou: { lat: 38.245987, lng: 21.735366 } //near zacherino: {lat: 38.264730, lng: 21.745822}    test: lat: 38.265524, lng: 21.749094 }
  const [loggedInUser, setloggedInUser] = useState();
  const [currentPOI, setcurrentPOI] = useState({});
  const [visitRegistered, setVisitRegistered] = useState(false);
  const [busynessDropdown, setBusynessDropdown] = useState(false);
  Axios.defaults.withCredentials = true;

  //Checks if a user is logged in upon loading |

  //Gets location after login check | maybe check anyways?
  //We will need to check for disctance to all objects in database - performance? | keep in mind getLocation is asynchr - needs to be finished to compare
  useEffect(() => {
    Axios.get("http://192.168.2.2:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setloggedInUser(response.data.user[0]);
        //getLocation();
      }
    });
  }, []);

  useEffect(() => {
    setVisitRegistered(false);
  }, [selectedPOI]);

  //Register Visit function - takes in Location object makes POST request to backend for visit registration
  const registerVisit = (location) => {
    setVisitRegistered(true);
    Axios.post("http://192.168.2.2:3001/visit", {
      user: loggedInUser.id,
      location: location.id,
    }).then((response) => {
      console.log(response.data);
    });
  };

  const registerBusyness = (busyness) => {
    Axios.post("http://192.168.2.2:3001/busy", {
      location: currentPOI.id,
      busyness: busyness,
    }).then((response) => {
      console.log(response.data);
    });
  };

  function handleHereClick(poi) {
    registerVisit(poi);
    //Taking the location info straight from the poi object to avoid async problems - setCurrentPOI() is async
    setcurrentPOI(poi);
  }
  function handleSubmitClick(busyness) {
    console.log("CheckSubmit");
    switch (busyness) {
      case "Not busy":
        busyness = 1;
        break;
      case "Not too busy":
        busyness = 2;
        break;
      case "A little Busy":
        busyness = 3;
        break;
      case "Very busy":
        busyness = 4;
        break;
      case "As busy as it gets":
        busyness = 5;
        break;
      default:
        console.log("test");
    }
    registerBusyness(busyness);
  }

  function findDistance(poi) {
    let x1 = state.lat;
    let y1 = state.lng;
    let x2 = poi.coordinates.lat;
    let y2 = poi.coordinates.lng;
    let distance = Math.hypot(x2 - x1, y2 - y1) * 10000;
    console.log(distance);
  }

  function dayToString(n) {
    switch (n) {
      default:
        return null;
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }
  }
  function getTime(offset) {
    let time = new Date();
    return time.getHours() + offset;
  }
  //takes in the POI object and returns the popularity at current day/hour
  function getPopularity(poi, offset) {
    let popularity;
    //Find day and time
    const time = new Date();
    let hour = time.getHours() + offset;
    if (hour === 24) {
      hour = 0;
    } else if (hour === 25) {
      hour = 1;
    }
    let day = time.getDay();
    poi.populartimes.forEach((popTimes) => {
      if (popTimes.name === dayToString(day)) {
        popularity = popTimes.data[hour];
      }
    });
    return popularity;
  }

  function getPopularityGraph(popularity) {
    if (popularity < 33) {
      return require("../icons/popularityGreen.png");
    } else if (popularity < 65) {
      return require("../icons/popularityYellow.png");
    } else return require("../icons/popularityRed.png");
  }

  //takes in popularity and returns corresponding icon
  function determineIcon(popularity) {
    if (popularity < 33) {
      return greenPOIIcon;
    } else if (popularity < 65) {
      return orangePOIIcon;
    } else return redPOIIcon;
  }
  //getsLocation - async - waits until user confirms
  function getLocation() {
    console.log("1check");
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
      setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }

  /*function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setState((prevState) => {
        console.log("check");
        return {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    });
  }
*/

  //measures distance from current Location to POI and checks if it is shorter than 20m -if so returns true - We need it when we check wether to show the "I am here"(Register Visit) Icon in PopUp
  function isNearEnough(poi) {
    let x1 = state.lat;
    let y1 = state.lng;
    let x2 = poi.coordinates.lat;
    let y2 = poi.coordinates.lng;
    let distance = Math.hypot(x2 - x1, y2 - y1) * 100000;
    console.log(distance);
    if (distance <= 50) {
      return true;
    } else {
      return false;
    }
  }

  let position = [state.lat, state.lng];

  return (
    <MapContainerDiv>
      <Map
        center={[10, 10]}
        zoom={15}
        tap={false}
        dragging={false}
        scrollWheelZoom={false}
      >
        <ChangeMapView coords={[state.lat, state.lng]}></ChangeMapView>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={currentLocationIcon}></Marker>
        {selectedPOI.name && (
          <Marker
            key={selectedPOI.id}
            position={[
              selectedPOI.coordinates.lat,
              selectedPOI.coordinates.lng,
            ]}
            icon={determineIcon(getPopularity(selectedPOI, 0))}
          >
            <Popup>
              <PopUpContainer>
                <TitleText>{selectedPOI.name}</TitleText>

                {!visitRegistered && <h4>Popularity</h4>}

                {!visitRegistered && (
                  <Popularity>
                    <TimeDiv>
                      <h4>{getTime(0)}:00</h4>
                    </TimeDiv>
                    <PopDiv>
                      <img
                        src={getPopularityGraph(getPopularity(selectedPOI, 0))}
                        alt="text"
                      ></img>
                    </PopDiv>
                  </Popularity>
                )}
                {!visitRegistered && (
                  <Popularity>
                    <TimeDiv>
                      <h4>{getTime(1)}:00</h4>
                    </TimeDiv>
                    <PopDiv>
                      <img
                        src={getPopularityGraph(getPopularity(selectedPOI, 1))}
                        alt="text"
                      ></img>
                    </PopDiv>
                  </Popularity>
                )}
                {!visitRegistered && (
                  <Popularity>
                    <TimeDiv>
                      <h4>{getTime(2)}:00</h4>
                    </TimeDiv>
                    <PopDiv>
                      <img
                        src={getPopularityGraph(getPopularity(selectedPOI, 2))}
                        alt="text"
                      ></img>
                    </PopDiv>
                  </Popularity>
                )}
                {!visitRegistered && (
                  <LiveDiv>
                    <Live>
                      <LiveText>LIVE</LiveText>
                    </Live>
                    <h5>A little busy</h5>
                  </LiveDiv>
                )}
                {isNearEnough(selectedPOI) && !visitRegistered && (
                  <HereButton onClick={(e) => handleHereClick(selectedPOI)}>
                    I am here!
                  </HereButton>
                )}
                {visitRegistered && (
                  <Estimate>
                    <h4>How busy is it currenty?</h4>
                    <DropdownList
                      defaultValue="Not busy"
                      onChange={(nextValue) => setBusynessDropdown(nextValue)}
                      data={[
                        "Not busy",
                        "Not too busy",
                        "A little busy",
                        "Very busy",
                        "As busy as it gets",
                      ]}
                    />
                    <HereButton
                      onClick={(e) => handleSubmitClick(busynessDropdown)}
                    >
                      Submit
                    </HereButton>
                  </Estimate>
                )}
              </PopUpContainer>
            </Popup>
          </Marker>
        )}
      </Map>

      <h1>{currentPOI.name && currentPOI.name}</h1>
    </MapContainerDiv>
  );
};
export default CovidMap;

const Estimate = styled.div`
  margin-top: 1em;
  height: auto;
  width: 100%;
  border: none;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`;

const PopUpContainer = styled.div`
  margin-left: -5px;
  height: auto;
  width: auto;
  max-width: 15vw;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 500px) {
    max-width: 50vw;
    margin-left: 5px;
  }
`;
const PopDiv = styled.div`
  margin-top: 5px;
  margin-left: 5px;
  flex-direction: column;
  display: flex;
`;

const Popularity = styled.div`
  height: auto;
  width: auto;
  max-width: 20vw;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const TitleText = styled.h3`
  font-style: normal;
  font-weight: bold;
  font-size: 1.1em;
  letter-spacing: -0.03em;
`;

const TimeDiv = styled.div`
  height: auto;
  width: auto;
  margin-top: 0.3vh;
`;
const LiveDiv = styled.div`
  margin-top: 0.8vh;
  margin-bottom: 0.8vh;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: center;
`;
const LiveText = styled.h4`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.1em;
  color: #ffffff;
`;
const Live = styled.div`
  margin-right: 0.8vw;
  height: 25px;
  width: 40px;
  border-radius: 0.3em;
  background: #a02d49;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const HereButton = styled.button`
  margin-top: 0.5em;
  height: 3em;
  width: 100%;
  border: none;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c4c4c4;
  border-radius: 14px;
  color: white;

  &:hover {
    background: #b1b1b1;
  }
`;

const Map = styled(MapContainer)`
  height: 50vh;
  width: 70vw;

  @media only screen and (max-width: 500px) {
    height: 60vh;
    width: 85vw;
  }
`;

const MapContainerDiv = styled.div`
  z-index: -1; 
  height: auto;
  width: 100vw;
  flex-direction: column;
  display: flex;
  align-items: center;
`;




/*
display pois from json to map
{testData.map((poi) => {
          findDistance(poi);
          return (
            <Marker
              key={poi.id}
              position={[poi.coordinates.lat, poi.coordinates.lng]}
              icon={determineIcon(getPopularity(poi, 0))}
            >
              <Popup>
                <PopUpContainer>
                  <TitleText>{poi.name}</TitleText>
                  <h4>Popularity</h4>
                  <Popularity>
                    <TimeDiv>
                      <h4>{getTime(0)}:00</h4>
                    </TimeDiv>
                    <PopDiv>
                      <img
                        src={getPopularityGraph(getPopularity(poi, 0))}
                        alt="text"
                      ></img>
                    </PopDiv>
                  </Popularity>
                  <Popularity>
                    <TimeDiv>
                      <h4>{getTime(1)}:00</h4>
                    </TimeDiv>
                    <PopDiv>
                      <img
                        src={getPopularityGraph(getPopularity(poi, 1))}
                        alt="text"
                      ></img>
                    </PopDiv>
                  </Popularity>
                  <Popularity>
                    <TimeDiv>
                      <h4>{getTime(2)}:00</h4>
                    </TimeDiv>
                    <PopDiv>
                      <img
                        src={getPopularityGraph(getPopularity(poi, 2))}
                        alt="text"
                      ></img>
                    </PopDiv>
                  </Popularity>
                  <LiveDiv>
                    <Live>
                      <LiveText>LIVE</LiveText>
                    </Live>
                    <h5>A little busy</h5>
                  </LiveDiv>
                  <HereButton onClick={handleClick}>I am here!</HereButton>
                </PopUpContainer>
              </Popup>
            </Marker>
          );
        })}


*/