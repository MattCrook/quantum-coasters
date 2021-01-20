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
    width: "89%",
    height: 40,
    backgroundColor: "rgb(226, 226, 226)",
    marginTop: "1%",
    marginBottom: "2%",
    marginLeft: "5%",
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

const SearchBarLight = (props) => {
  const classes = useStyles();

  const submitSearch = (e) => {
    e.preventDefault();
  };

  const submitValidation = (e, props) => {
    let state = props.searchInput;

    state === "" || undefined
      ? props.setUserRollerCoasters(props.defaultSectionContent)
      : props.setUserRollerCoasters(props.defaultSectionContent) && props.searchHandler(e);
  };

  return (
    <Paper component="form" className={classes.root} onClick={submitSearch}>
      <IconButton className={classes.iconButton} aria-label="menu"></IconButton>
      <InputBase id="search" className={classes.input} placeholder="Search" onChange={props.searchHandler} />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={(e) => submitValidation(e, props)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBarLight;
