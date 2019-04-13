import React from "react";
import { withRouter } from "react-router-dom";

class Driving extends React.Component {
    componentDidMount() {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsDisplay = new window.google.maps.DirectionsRenderer();
        const mapOptions = {
            zoom: 7,
            center: this.props.location.state.startLocation,
            disableDefaultUI: true
        };
        const map = new window.google.maps.Map(document.getElementById("driving-map"), mapOptions);
        directionsDisplay.setMap(map);
        const start = this.props.location.state.startLocation;
        const end = this.props.location.state.endLocation.location;
        const request = {
            origin: this.props.location.state.startLocation,
            destination: end,
            travelMode: "DRIVING",
            waypoints: [
                {
                    location: this._generateRandomPointNear(start.lat, start.lng, 0.5),
                    stopover: true
                },
                {
                    location: this._generateRandomPointNear(end.lat, end.lng),
                    stopover: true
                }
            ]
        };
        console.log(request);
        directionsService.route(request, (result, status) => {
            console.log(result);
            if (status == "OK") {
                directionsDisplay.setDirections(result);
            }
        });
    }

    _generateRandomPointNear(lat, long, withinMiles = 1) {
        const latInRadians = lat * Math.PI / 180;
        const milesPerLong = latInRadians * 69.172;
        const milesPerLat = 69.2;

        const latMin = lat - withinMiles / milesPerLat;
        const latMax = lat + withinMiles / milesPerLat;

        const longMin = long - withinMiles / milesPerLong;
        const longMax = long + withinMiles / milesPerLong;

        return {
            lat: latMin + (latMax - latMin) * Math.random(),
            lng: longMin + (longMax - longMin) * Math.random()
        };
    }

    render() {
        return (
            <div id="driving-map" style={{
                height: "100%",
                width: "100%"
            }}>
            </div>
        );
    }
}

export default withRouter(Driving);