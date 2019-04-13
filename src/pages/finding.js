import React from "react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

class Finding extends React.Component {
    /**
     * Pretend to be working on finding a neat ride
     */
    componentDidMount() {
        setTimeout(() => {
            this.props.history.push(
                "/driving",
                this.props.location.state
            );
        }, 3000);
    }
    
    render() {
        return (
            <div style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
            }}>
                <Typography
                    gutterBottom
                    variant="h5">
                    Loading
                </Typography>
                <CircularProgress color="primary" />
            </div>
        );
    }
}

export default withRouter(Finding);