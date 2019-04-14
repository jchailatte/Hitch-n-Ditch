import React from "react";
import {withRouter} from "react-router-dom";
import Smartcar from "@smartcar/auth";
import {AxiosInstance as axios} from "axios";
import Cookies from 'universal-cookie';

import Connect from '../components/Connect';
import Vehicle from '../components/Vehicle';

const REACT_APP_SERVER = 'http://localhost:8000';
const COOKIES = new Cookies();

class SmartcarApi extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            vehicle: {},
        };
        this.authorize = this.authorize.bind(this);
        this.onComplete = this.onComplete.bind(this);
        console.log(3);

        this.smartcar = new Smartcar({
            clientId: '55c8e6b7-859b-4b53-9f23-9199841a7e29',
            redirectUri: 'https://javascript-sdk.smartcar.com/redirect-2.0.0?app_origin=http://localhost:8000',
            scope: ['read_vehicle_info'],
            testMode: false,
            onComplete: this.onComplete,
        });
        console.log(4);

    }

    onComplete(err, code, status) {
        alert('complete');
        console.log('complete');;
        console.log(status);

        COOKIES.set('myCar', code, { path: '/' });
        console.log(COOKIES.get('myCar'));

        return axios
            .get(`${REACT_APP_SERVER}/exchange?code=${code}`)
            .then( () => {
                alert('vehicle');
                console.log('vehicle');
                return axios.get(`${REACT_APP_SERVER}/vehicle`);
            })
            .then(res => {
                alert('last:'+res.data);
                console.log('last:'+res.data);
                this.setState({vehicle: res.data});
            });
    }

    authorize() {
        if(this.smartcar !== undefined) {
            alert("DEFINED!");
            console.log(this.smartcar);
        }
        this.smartcar.openDialog({forcePrompt: true});
    }

    render() {
        return Object.keys(this.state.vehicle).length !== 0 ? (
            <Vehicle info={this.state.vehicle} />
        ) : (
            <Connect onClick={this.authorize} />
        );
    }
}

export default withRouter(SmartcarApi);