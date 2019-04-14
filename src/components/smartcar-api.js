import React from "react";
import Smartcar from "@smartcar/auth";
import Vehicle from './vehicle';

const REACT_APP_SERVER = 'https://us-central1-hacksc-2019-1555206075460.cloudfunctions.net/hnd';

export default class SmartcarApi extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vehicle: undefined
        };

        if (!window.smartcar) {
            console.log("Here!");
            window.smartcar = new Smartcar({
                clientId: '55c8e6b7-859b-4b53-9f23-9199841a7e29',
                redirectUri: "https://javascript-sdk.smartcar.com/redirect-2.0.0?app_origin=http://localhost:8080",
                scope: ['read_vehicle_info'],
                testMode: false,
                onComplete: this.onComplete,
            });
        }
    }

    onComplete = (err, code, status) => {
        console.log(err, code, status);

        return fetch(`${REACT_APP_SERVER}/?method=exchange&code=${code}`)
            .then(() => {
                fetch(`${REACT_APP_SERVER}/?method=vehicle`)
                    .then(vehicleResponse => vehicleResponse.json())
                    .then(vehicleData => {
                        this.setState({
                            vehicle: vehicleData
                        });
                    })
            })
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
        else
        {
            return <Vehicle info={this.state.vehicle}/>
        }
    }
}