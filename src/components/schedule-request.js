import "date-fns";
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import { ListItem } from "@material-ui/core";

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

class MaterialUIPickers extends React.Component {
  state = {
    selectedDate: new Date(),
    open: false
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

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
    const { selectedDate } = this.state;

    return (
      <div>
        <Button
          variant="outlined"
          onClick={this.handleClickOpen}>
          Schedule
        </Button>
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
                Calendar
              </Typography>
            </Toolbar>
          </AppBar>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <List style={{ width: "100%", marginTop: "40%" }}>
              <ListItem style={{ display: "flex", justifyContent: "center" }}>
                <DatePicker
                  margin="normal"
                  label="Date picker"
                  value={selectedDate}
                  onChange={this.handleDateChange}
                />
              </ListItem>
              <ListItem style={{ display: "flex", justifyContent: "center" }}>
                <TimePicker
                  label="Time picker"
                  value={selectedDate}
                  onChange={this.handleDateChange}
                />
              </ListItem>
              <ListItem style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.handleClose}>
                  Submit
                </Button>
              </ListItem>
            </List>
          </MuiPickersUtilsProvider>
        </Dialog>
      </div>
    );
  }
}

MaterialUIPickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MaterialUIPickers);
