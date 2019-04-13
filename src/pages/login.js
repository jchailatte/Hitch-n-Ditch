import React from 'react';
import GoogleLogin from 'react-google-login';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router";

class Login extends React.Component {
    /**
     * Successful log in with Google API - get the user's full name
     */
    onSuccess = (googleUser) => {
        this.props.history.push(
            "/reserve",
            {
                name: googleUser.getBasicProfile().getName()
            }
        );
    };

    /**
     * Error log in case Google sign in fails
     */
    onFailure = (error) => {
        console.error(error);
    };

    render() {
        return (
            <div style={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={{
                    background: "white",
                    borderRadius: "100%",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                    padding: "2.5rem",
                    height: "10rem",
                    width: "10rem"
                }}>
                    <img
                        style={{
                            height: "100%"
                        }}
                        src="/static/img/car.png" />
                </div>
                <Typography
                    gutterBottom
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