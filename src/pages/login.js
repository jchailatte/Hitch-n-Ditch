import React from 'react';
import GoogleLogin from 'react-google-login';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router";

class Login extends React.Component {
    /**
     * Resets saved name / history
     */
    componentDidMount() {
        window.localStorage.clear();
    }

    /**
     * Successful log in with Google API - get the user's full name
     */
    onSuccess = (googleUser) => {
        window.localStorage.setItem("name", googleUser.getBasicProfile().getName());
        this.props.history.push("/reserve");
    };

    /**
     * Error log in case Google sign in fails
     */
    onFailure = (error) => {
        console.error(error);
    };

    render() {
        return (
            <div
                className="background-image"
                style={{
                    display: "flex",
                    height: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "url('static/img/traffic.png')"
                }}>
                <Typography
                    gutterBottom
                    style={{
                        fontWeight: "bold",
                        color: "white",
                        background: "rgba(0, 0, 0, .75)",
                        padding: "1rem"
                    }}
                    variant="h3">
                    Hitch 'n Ditch
                </Typography>
                <GoogleLogin
                    clientId="440012979261-1hfqvi9b0bsdsjcn8t5ma3gloa5bak88.apps.googleusercontent.com"
                    onSuccess={this.onSuccess}
                    onFailure={this.onFailure} />
            </div>
        );
    }
}

export default withRouter(Login);