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
    height: 40,
    backgroundColor: "#363636",
    border: "1px solid rgb(124, 124, 124)",
  },
  input: {
    marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    color: "white",
    paddingRight: 30,
  },
  iconButton: {
    paddingLeft: 25,
    color: "white",
    display: "flex",
    justifyContent: "center"
  },
  divider: {
    height: 28,
    margin: 4,
    backgroundColor: "rgb(185, 185, 185)",
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
      <InputBase
        className={classes.input}
        placeholder="Search"
        onChange={props.handleSearchInput}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={handleSearchSubmit}>
        <SearchIcon/>
      </IconButton>
    </Paper>
  );
}
