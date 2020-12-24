import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { lightBlue } from "@material-ui/core/colors";

// const useStyles = makeStyles((theme) => ({
//   input: {
//     // marginLeft: theme.spacing(1),
//     // display: "flex",
//     // alignItems: "center",
//     color: "white",
//   },
//   iconButton: {
//     padding: 10,
//     color: "white",
//   },
//   divider: {
//     height: 28,
//     margin: 4,
//   },
// }));

const materialTheme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      root: {
        color: lightBlue,
      },
    },
    MuiFormLabel: {
      root: {
        color: lightBlue,
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: lightBlue,
      },
    },
  },
});

export default function TimePicker(props) {
  const [selectedDate, setSelectedDate] = useState(new Date("2014-08-18T21:11:54"));
  //   const classes = useStyles();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={materialTheme}>
        <Grid container justify="space-around">
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </Grid>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}
