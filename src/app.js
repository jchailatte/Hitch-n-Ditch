import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import AccountIcon from "@material-ui/icons/Person";

import Login from "./pages/login";
import Reserve from "./pages/reserve";
import DriverRider from "./pages/driver-rider";
import Finding from "./pages/finding";
import Driving from "./pages/driving";
import SmartCar from "./components/smartcar";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 1
        };
    }

    handleBottomNav = (event, value) => {
        this.setState({ value });
    };

    render() {
        return (
            <CssBaseline>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                }}>
                    <div style={{
                        flexGrow: 1
                    }}>
                        <Router>
                            <Route path="/" exact component={Login} />
                            <Route path="/reserve" component={Reserve} />
                            <Route path="/driver-rider" component={DriverRider} />
                            <Route path="/finding" component={Finding} />
                            <Route path="/driving" component={Driving} />
                        </Router>
                    </div>
                    <BottomNavigation
                        value={this.state.value}
                        onChange={this.handleBottomNav}
                        showLabels>
                        <SmartCar/>
                        <BottomNavigationAction label="Main" icon={<HomeIcon />} />
                        <BottomNavigationAction label="Account" icon={<AccountIcon />} />
                    </BottomNavigation>
                </div>
            </CssBaseline>
        );
    }
}

export default App;