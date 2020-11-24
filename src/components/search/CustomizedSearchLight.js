import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import LaunchIcon from "@material-ui/icons/Launch";

// import DirectionsIcon from "@material-ui/icons/Directions";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1px 2px",
    display: "flex",
    alignItems: "center",
    width: 240,
    backgroundColor: "rgb(226, 226, 226)",
    marginTop: "1%",
    marginBottom: "1%",
    boxShadow: "none",
  },
  input: {
    marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    color: "black",
  },
  iconButton: {
    padding: 10,
    color: "black",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBaseLight(props) {
    const classes = useStyles();

    const submitSearch = (e) => {
        e.preventDefault();
    }

  return (
    <Paper component="form" className={classes.root} onSubmit={submitSearch}>
      <IconButton className={classes.iconButton} aria-label="menu"></IconButton>
          <InputBase id="search" className={classes.input} placeholder="Search" onChange={props.searchNewsHandler}/>
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <LaunchIcon />
    </Paper>
  );
}
