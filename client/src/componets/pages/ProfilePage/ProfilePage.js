import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core ../../theme
import { makeStyles } from "@material-ui/core/styles";
import SeasonStats from '../../StatsComponents/SeasonStats'
import CareerStats from '../../StatsComponents/CareerStats'
// @material-ui/icons
import Equalizer from "@material-ui/icons/Equalizer";
import Check from "@material-ui/icons/Check";
import Edit from "@material-ui/icons/Edit";
// core ../../theme
import Header from "../../theme/Header/Header.js";
import Footer from "../../theme/Footer/Footer.js";
import Button from "../../theme/CustomButtons/Button.js";
import GridContainer from "../../theme/Grid/GridContainer.js";
import GridItem from "../../theme/Grid/GridItem.js";
import HeaderLinks from "../../theme/Header/HeaderLinks.js";
import NavPills from "../../theme/NavPills/NavPills.js";
import Parallax from "../../theme/Parallax/Parallax.js";

import profile from "../../../assets/img/faces/christian.jpg";

import studio1 from "../../../assets/img/examples/studio-1.jpg";
import studio2 from "../../../assets/img/examples/studio-2.jpg";
import studio3 from "../../../assets/img/examples/studio-3.jpg";
import studio4 from "../../../assets/img/examples/studio-4.jpg";
import studio5 from "../../../assets/img/examples/studio-5.jpg";
import work1 from "../../../assets/img/examples/olu-eletu.jpg";
import work2 from "../../../assets/img/examples/clem-onojeghuo.jpg";
import work3 from "../../../assets/img/examples/cynthia-del-rio.jpg";
import work4 from "../../../assets/img/examples/mariya-georgieva.jpg";
import work5 from "../../../assets/img/examples/clem-onojegaw.jpg";

import styles from "../../../assets/jss/material-kit-react/views/profilePage.js";
import { Row } from "react-bootstrap";

import RSVP from '../../RSVP';
import ReserveSignup from '../../ReserveSignup';
import ReserveTeamSignup from '../../ReserveTeamSignup'
import EditProfile from "../../EditProfile";
import TeamIcon from "../../TeamIcon";
import axios from 'axios'
import HeaderLinksRight from "../../theme/Header/HeaderLinksRight";
const useStyles = makeStyles(styles);

export default function ProfilePage(props) {

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const { driver, guid, rsvp, setDriver } = props;
  useEffect(() => {
    console.log(driver);
  }, [driver])
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  const reserveRsvp = async (e) => {
    const entry = {
      name: driver.name,
      team: e.target.value,
      driverNumber: e.target.id,
      guid: guid
    }
    console.log(entry);
    setDriver({ ...driver, rsvp: 'Yes' });
    const addedEntry = await axios.post('/api/createEntry', entry);
    const tmpRsvp = { rsvp: 'Yes', guid: guid }
    const updatedRsvp = await axios.post(`/api/updateRSVP`, tmpRsvp);

  }

  const updateRsvp = async (e) => {
    setDriver({ ...driver, rsvp: e.target.innerHTML });
    const entry = {
      rsvp: e.target.innerHTML,
      guid: guid
    }
    const updated = await axios.post(`/api/updateRSVP`, entry);
    if (driver.team !== 'Reserve')
      if (e.target.innerHTML === 'Yes') {
        const entry = {
          guid: guid,
          team: driver.team,
          driverNumber: driver.driverNumber,
          name: driver.name
        };
        const newEntry = await axios.post('/api/createEntry', entry);
        console.log(newEntry.data);
      }
    console.log(e.target.innerHTML);
  }
  return (
    <div>
      <Header
        color="transparent"
        brand="NARL"
        rightLinks={<div><HeaderLinks/><HeaderLinksRight /></div>}

        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
      />
      <Parallax
        small
        filter
        image={require("../../../assets/img/profile-bg.jpg").default}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile} style={{ marginTop: '75px' }}>
                  {/* <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div> */}
                  <div className={classes.name}>
                    <h3 className={classes.title}>{props.driver.name}</h3>
                    <div style={{ marginTop: '15px' }}>
                      {/* <TeamIcon teamName={props.driver.team} /> */}
                    </div>
                    <h6 className={classes.title}>{props.driver.team}</h6>
                  </div>
                </div>
              </GridItem>
            </GridContainer>

            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="warning"
                  tabs={[
                    {
                      tabButton: "Stats",
                      tabIcon: Equalizer,
                      tabContent: (
                        <GridContainer justify="center">
                          <Row>
                            <GridItem xs={12} sm={12} md={4}>
                              <SeasonStats wins={props.driver.wins} pts={props.driver.points} fl={props.driver.fastestLaps}></SeasonStats>
                            </GridItem>
                          </Row>
                          <Row>
                            <GridItem xs={12} sm={12} md={4}>
                              <CareerStats wins={props.driver.careerWins} pts={props.driver.careerPoints} fl={props.driver.careerFastestLaps}></CareerStats>
                            </GridItem>
                          </Row>
                        </GridContainer>
                      ),
                    },
                    {
                      tabButton: "Registration",
                      tabIcon: Check,
                      tabContent: (

                        <GridContainer justify="center">
                          {
                            props.driver.team !== 'Reserve' ? <RSVP setRsvp={props.setRsvp} updateRsvp={updateRsvp} driver={props.driver} setDriver={props.setDriver} rsvp={rsvp} /> :
                              <div>
                                <GridItem xs={12} sm={12} md={4}>
                                  <ReserveSignup reserveRsvp={props.reserveRsvp} setTeam={props.setTeam} setNumber={props.setNumber} driver={props.driver} />

                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>

                                  <ReserveTeamSignup driver={props.driver} setDriver={props.setDriver}></ReserveTeamSignup>
                                </GridItem>
                              </div>
                          }
                        </GridContainer>
                      ),
                    },
                    {
                      tabButton: "Edit Profile",
                      tabIcon: Edit,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>

                            <EditProfile driver={props.driver} setDriver={props.setDriver} />

                          </GridItem>

                        </GridContainer>
                      ),
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
