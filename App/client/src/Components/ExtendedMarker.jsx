import {Marker} from "react-leaflet";


export class ExtendedMarker extends Marker {
    componentDidMount() {
        // Call the Marker class componentDidMount (to make sure everything behaves as normal)
        super.componentDidMount();

       // Access the marker element and open the popup.
      this.leafletElement.openPopup();
    }
}

export default ExtendedMarker;
