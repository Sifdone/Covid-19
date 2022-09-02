import L from "leaflet";

export const currentLocationIcon = () => {
  let currentLocationIcon = L.icon({
    iconUrl: require("../icons/currentLocationMarker.png"),
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -41],
  });

  return currentLocationIcon;
};

export const greenPOIIcon = () => {
  let greenPOIIcon = L.icon({
    iconUrl: require("../icons/greenPOIIcon.png"),
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -20],
  });

  return greenPOIIcon;
};

export const orangePOIIcon = () => {
  let orangePOIIcon = L.icon({
    iconUrl: require("../icons/orangePOIIcon.png"),
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -20],
  });

  return orangePOIIcon;
};

export const redPOIIcon = () => {
  let redPOIIcon = L.icon({
    iconUrl: require("../icons/redPOIIcon.png"),
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -20],
  });

  return redPOIIcon;
};
