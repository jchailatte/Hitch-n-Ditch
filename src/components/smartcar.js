import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import CarIcon from "@material-ui/icons/TimeToLeave";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Smartcar from "@smartcar/auth";
import Button from "@material-ui/core/Button";

const styles = {
    grid: {
        width: "60%"
    },
    appBar: {
        position: "relative"
    },
    flex: {
        flex: 1
    }
};

class SmartCar extends React.Component {
    static BACKEND_SERVER = "https://us-central1-hacksc-2019-1555206075460.cloudfunctions.net/hnd";
    static accessToken;
    static vehicle;

    authorize = () => {
        if (!window.smartcar) {
            window.smartcar = new Smartcar({
                clientId: '55c8e6b7-859b-4b53-9f23-9199841a7e29',
                redirectUri: "https://javascript-sdk.smartcar.com/redirect-2.0.0?app_origin=http://localhost:8080",
                scope: ['read_vehicle_info'],
                testMode: false,
                onComplete: this.onComplete,
            });
        }
        window.smartcar.openDialog({ forcePrompt: true });
    };

    onComplete = (err, code, status) => {
        fetch(`${SmartCar.BACKEND_SERVER}/?method=exchange&code=${code}`)
            .then(response => response.json())
            .then(data => {
                SmartCar.accessToken = data;
                this.getVehicleData();
                this.setState({
                    qRerender: true
                }, () => this.setState({ qRender: false }));
            });
    };

    getVehicleData = () => {
        fetch(`${SmartCar.BACKEND_SERVER}/?method=vehicle&accessToken=${SmartCar.accessToken.accessToken}`)
            .then(response => response.json())
            .then(data => {
                SmartCar.vehicle = data;
                this.setState({
                    qRender: true
                }, () => this.setState({ qRender: false }))
            });
    };

    static unlockVehicle = async () => {
        return await fetch(`${SmartCar.BACKEND_SERVER}/?method=unlock&accessToken=${SmartCar.accessToken.accessToken}`)
            .then(response => response.json())
            .then(data => data);
    };

    static lockVehicle = async () => {
        return await fetch(`${SmartCar.BACKEND_SERVER}/?method=lock&accessToken=${SmartCar.accessToken.accessToken}`)
            .then(response => response.json())
            .then(data => data);
    };

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            qRerender: false
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    Transition = props => {
        return <Slide direction="up" {...props} />;
    };

    render() {
        const { classes } = this.props;

        return (
            <>
                <BottomNavigationAction
                    showLabel
                    onClick={this.handleClickOpen}
                    label="Your Car"
                    icon={<CarIcon />} />
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={this.Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                Your Car
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {
                        SmartCar.accessToken
                            ? (
                                <div style={{ margin: "1rem" }}>
                                    {
                                        SmartCar.vehicle
                                        && (
                                            <>
                                                <Typography
                                                    align="center"
                                                    variant="h5">
                                                    Make
                                                </Typography>
                                                <Typography
                                                    align="center"
                                                    gutterBottom>
                                                    {SmartCar.vehicle.make}
                                                </Typography>
                                                <Typography
                                                    align="center"
                                                    variant="h5">
                                                    Model
                                                </Typography>
                                                <Typography
                                                    align="center"
                                                    gutterBottom>
                                                    {SmartCar.vehicle.model}
                                                </Typography>
                                                <Typography
                                                    align="center"
                                                    variant="h5">
                                                    Year
                                                </Typography>
                                                <Typography
                                                    align="center"
                                                    gutterBottom>
                                                    {SmartCar.vehicle.year}
                                                </Typography>
                                                <img
                                                    alt="Tesla"
                                                    src="static/img/tesla.png"
                                                    width="100%"/>
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "space-around"
                                                }}>
                                                    <Button
                                                        onClick={SmartCar.unlockVehicle}>
                                                        Lock
                                                    </Button>
                                                    <Button
                                                        color="primary"
                                                        onClick={SmartCar.lockVehicle}
                                                        variant="contained">
                                                        Unlock
                                                    </Button>
                                                </div>
                                            </>
                                        )
                                    }

                                </div>
                            )
                            : (
                                <Fab
                                    color="secondary"
                                    onClick={this.authorize}
                                    style={{
                                        position: "fixed",
                                        bottom: 0,
                                        right: 0,
                                        margin: "1rem"
                                    }}>
                                    <AddIcon />
                                </Fab>
                            )
                    }
                </Dialog>
            </>
        );
    }
}

export default withStyles(styles)(SmartCar);
