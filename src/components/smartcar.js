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
import SmartcarApi from "./smartcar-api";

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
    constructor(props) {
        super(props);

        this.state = {
            open: false
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
                                Authenticate your car
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <SmartcarApi/>
                </Dialog>
            </>
        );
    }
}

export default withStyles(styles)(SmartCar);
