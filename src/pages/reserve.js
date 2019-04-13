import React from "react";
import { withRouter } from "react-router";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SearchMap from "../components/search-map";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

class Reserve extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            destination: "",
            location: undefined
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });
        });
    }

    onChange = (event) => {
        this.setState({
            destination: event.target.value
        });
    };

    submit = () => {
        console.log(this.state);
        this.props.history.push(
            "/driver-rider",
            {
                startLocation: this.state.location,
                endString: this.state.destination
            }
        );
    };

    render() {
        const firstName = window.localStorage.getItem("name").split(" ")[0];

        return (
            <div>
                <div style={{
                    height: "70vh"
                }}>
                    <SearchMap location={this.state.location}/>
                </div>
                <Paper style={{
                    padding: "1rem",
                    height: "30vh",
                    overflowY: "auto"
                }}>
                    <div style={{
                        display: "flex"
                    }}>
                        <TextField
                            autoFocus
                            fullWidth
                            label={`Good morning, ${firstName}`}
                            placeholder="Where would you like to go?"
                            onChange={this.onChange}
                            value={this.state.value}
                            variant="outlined" />
                        <IconButton onClick={this.submit}>
                            <SendIcon/>
                        </IconButton>
                    </div>
                    <Typography
                        style={{
                            marginTop: "1rem"
                        }}
                        variant="h6">
                        History
                    </Typography>
                    <Typography>
                        No recent rides.
                    </Typography>
                </Paper>
            </div>
        );
    }
}

export default withRouter(Reserve);