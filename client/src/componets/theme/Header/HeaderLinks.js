/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";

import styles from "../../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link to='/practiceResults' className={classes.navLink}>
          Practice Results
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          hoverColor='warning'
          noLiPadding
          buttonText="Standings"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          dropdownList={[
            <Link to="/driverStandings" className={classes.dropdownLink}>
              Driver Standings
            </Link>,
            <Link to="/constructorStandings" className={classes.dropdownLink}>
              Constructor Standings
            </Link>
          ]}
        />

      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          hoverColor='warning'
          buttonText="League Info"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          dropdownList={[
            <Link to="/raceInformation" className={classes.dropdownLink}>
              This Week
            </Link>,
            <Link to="/schedule" className={classes.dropdownLink}>
              Schedule
            </Link>,
            <Link to="/ruleBook" className={classes.dropdownLink}>
              Rule Book
            </Link>
            //         <NavDropdown.Item onClick={e => history.push('/driverStandings')}>Driver Standings</NavDropdown.Item>

          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <div className='driver-home'>
          {props.loggedIn ? <Link className={classes.navLink} to={`/driverHome/${props.guid}`} >Driver Home</Link> : <Link className={classes.navLink} to='/loginSignup' >Log in / Signup</Link>}
        </div>
      </ListItem>
    </List>
  );
}
