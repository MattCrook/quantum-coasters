import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1px 2px",
    display: "flex",
    alignItems: "center",
    width: 300,
    backgroundColor: "#363636",
  },
  input: {
    marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    color: "white",
  },
  iconButton: {
    padding: 10,
    color: "white",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let state = e.target.value;
    if (state === "") {
      props.setParks(props.allParks);
    }
  };

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu"></IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={props.handleSearchInput}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={handleSearchSubmit}>
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions"></IconButton>
    </Paper>
  );
}
