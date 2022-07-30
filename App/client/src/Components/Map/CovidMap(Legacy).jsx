import '../App.css';
import L from 'leaflet';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { Component } from 'react';

let currentMarkerIcon = L.icon({
    iconUrl: './icons/currentLocationMarker.png',
    iconSize: [25, 41],
    iconAnchor:[12.5, 41],
    popupAnchor: [0,-41]
  });


class CovidMap extends Component {
  state= {
    lat: 0,
    lng:0,
    zoom:13
  } 
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) =>{
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      })
  }
    render(){
      let position=[this.state.lat,this.state.lng];
    return (
        <div className="mapContainer" >
        <MapContainer className="map" center={position} zoom={this.state.zoom}>
            <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={currentMarkerIcon}>
          <Popup>
            I am a green leaf
          </Popup>
        </Marker>
    </MapContainer>
    </div>
    )
    }
  }
export default CovidMap;
