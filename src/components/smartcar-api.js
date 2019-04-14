import React from "react";
import Smartcar from "@smartcar/auth";
import Vehicle from './vehicle';

const REACT_APP_SERVER = 'https://us-central1-hacksc-2019-1555206075460.cloudfunctions.net/';

export default class SmartcarApi extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vehicle: undefined
        };

        if (!window.smartcar) {
            window.smartcar = new Smartcar({
                clientId: '55c8e6b7-859b-4b53-9f23-9199841a7e29',
                redirectUri: "http://localhost:8080",
                scope: ['read_vehicle_info'],
                testMode: false,
                onComplete: (err, code) => console.log("Completed"),
            });
        }
    }

    onComplete = (err, code, status) => {
        console.log(err, code, status);

        return fetch(`${REACT_APP_SERVER}/exchange?code=${code}`)
            .then(response => response.json())
            .then(data => console.log(data))
            .then(() => {
                fetch(`${REACT_APP_SERVER}/vehicle`)
                    .then(vehicleResponse => vehicleResponse.json())
                    .then(vehicleData => {
                        this.setState({
                            vehicle: vehicleData
                        });
                    })
            });
    };

    authorize = () => {
        if(window.smartcar) {
            console.log(window.smartcar);
        }
        window.smartcar.openDialog({forcePrompt: true});
    };

    render() {
        if (this.state.vehicle === undefined) {
            return (
                <button onClick={this.authorize}>Connect to vehicle</button>
            );
        }
        return <Vehicle info={this.state.vehicle}/>
    }
}