import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectMonthDropdown = (props) => {
  const classes = useStyles();
  const [month, setMonth] = React.useState("");
  const { currentDate, setCurrentDate } = props;

  const handleChange = (event) => {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);

    const initialDateData = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      day: currentDate.getDate(),
      dayOfWeek: currentDate.getDay(),
    };

    const targetDate = `${initialDateData.year}-${selectedMonth}-${initialDateData.day}`;

    const targetDateString = new Date(targetDate);
    setCurrentDate(targetDateString);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={month} onChange={handleChange}>
          {props.options.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectMonthDropdown;
