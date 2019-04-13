import React from "react";

import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {
    render() {
        if (this.props.location === undefined) {
            return null;
        }
        return (
            <Map
                disableDefaultUI
                google={this.props.google}
                initialCenter={this.props.location}
                style={{
                    height: "70vh",
                    width: "100%"
                }}
                zoom={14}>
                <Marker position={this.props.location} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyB5-8epmMKePCleRhDv765rwYFDXWCr8UQ"
})(MapContainer)