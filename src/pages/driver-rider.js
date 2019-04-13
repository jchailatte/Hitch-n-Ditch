import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
    center: {
        display: "flex",
        justifyContent: "center"
    },
    root: {
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "1rem",
        flexDirection: "column"
    },
    image: {
        position: "relative",
        height: 150,
        width: "100%",
        margin: "0.5rem 0"
    },
    focusVisible: {},
    imageButton: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.common.white
    },
    imageSrc: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: "cover",
        backgroundPosition: "center 40%"
    },
    imageBackdrop: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.1,
        transition: theme.transitions.create("opacity")
    },
    imageTitle: {
        position: "relative",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
            .spacing.unit + 6}px`,
        background: "rgba(0, 0, 0, 0.5)",
        fontSize: "2rem",
        fontWeight: "bold"
    }
});

class ButtonBases extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            days: [false, false, false, false, false, false, false],
            isDriver: true,
            isPassenger: false,
            price: Math.random() * 3
        };
    }

    enableDriver = () => {
        this.setState({
            isDriver: true,
            isPassenger: false
        });
    }

    enablePassenger = () => {
        this.setState({
            isDriver: false,
            isPassenger: true
        });
    }

    handleChange = index => {
        this.setState(prevState => {
            const deepCopy = [...prevState.days];
            deepCopy[index] = !deepCopy[index];
            return {
                days: deepCopy
            };
        });
    };

    submit = () => {
        this.props.history.push(
            "/finding",
            {
                ...this.props.location.state,
                isDriver: this.state.isDriver,
                isPassenger: this.state.isPassenger,
                days: this.state.days
            }
        )
    };

    render() {
        const { classes } = this.props;

        const price = this.state.isDriver ? this.state.price * 0.7 : this.state.price;

        return (
            <div className={classes.root}>
                <div>
                    <Typography
                        gutterBottom
                        variant="h5"
                        style={{
                            fontWeight: "lighter",
                            display: "inline"
                        }}>
                        Your trip to
                    </Typography>
                    {" "}
                    <Typography
                        gutterBottom
                        variant="h5"
                        style={{
                            fontWeight: "bold",
                            display: "inline"
                        }}>
                        {this.props.location.state.endString}
                    </Typography>
                </div>

                <div>
                    {/* Driver button */}
                    <ButtonBase
                        focusRipple
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        onClick={this.enableDriver}
                        style={{
                            filter: this.state.isDriver ? "" : "grayscale(100%)"
                        }}>
                        <span
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: "url(static/img/driver.jpg)"
                            }}
                        />
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                className={classes.imageTitle}>
                                Driver
                        </Typography>
                        </span>
                    </ButtonBase>

                    {/* Rider button */}
                    <ButtonBase
                        focusRipple
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        onClick={this.enablePassenger}
                        style={{
                            filter: this.state.isPassenger ? "" : "grayscale(100%)"
                        }}>
                        <span
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: "url(static/img/passenger.jpg)"
                            }}
                        />
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                className={classes.imageTitle}>
                                Passenger
                        </Typography>
                        </span>
                    </ButtonBase>
                </div>

                <div>
                    <div style={{ width: "100%", marginTop: "2rem" }}>
                        <Typography variant="h6" align="center">
                            Is this a regular pattern?
                        </Typography>
                    </div>

                    <div className={classes.center}>
                        {
                            ["S", "M", "T", "W", "T", "F", "S"]
                                .map((item, index) => {
                                    return (
                                        <IconButton
                                            color={this.state.days[index] ? "secondary" : ""}
                                            onClick={() => this.handleChange(index)}>
                                            {item}
                                        </IconButton>
                                    );
                                })
                        }
                    </div>
                </div>

                <Typography
                    variant="h3"
                    style={{
                        textAlign: "center",
                        margin: "auto"
                    }}>
                    ${price.toFixed(2)}
                </Typography>

                <div style={{
                    display: "flex",
                    width: "100%",
                    marginTop: "auto"
                }}>
                    <Button
                        onClick={this.submit}
                        variant="outlined">
                        Schedule
                    </Button>
                    <Button
                        onClick={this.submit}
                        color="primary"
                        variant="contained"
                        style={{
                            flexGrow: 1,
                            marginLeft: "1rem"
                        }}>
                        Let's {this.state.isDriver ? "drive" : "ride"}!
                    </Button>
                </div>
            </div>
        );
    }
}

ButtonBases.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ButtonBases));
