import React from 'react';
import CurrentTrack from '../CurrentTrack';
import CurrentGrid from '../CurrentGrid';
import { Card, Col, Row } from 'react-bootstrap';
import NewsFeed from '../NewsFeed';
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from '../theme/Header/Header';
import HeaderLinks from '../theme/Header/HeaderLinks';
import Parallax from '../theme/Parallax/Parallax'
import HeaderLinksRight from '../theme/Header/HeaderLinksRight';
const useStyles = makeStyles(styles);
const RaceInfo = ({loggedIn}) => {
  const classes = useStyles();

  return (

    <div >
      <Header
        color="transparent"
        brand="NARL"
        rightLinks={<HeaderLinks loggedIn={loggedIn}/>}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
      />

      <Parallax
        small
        filter
        image={require("../../assets/img/race-info-bg.jpg").default}
      />
      <div>
        <div body  className={classNames(classes.main, classes.mainRaised, 'f1')}>
          <h1  style={{ width: 'fit-content', margin: 'auto', fontSize: '60px', borderBottom: '2px solid rgb(255, 230, 0)' }}>Round 17</h1>
          <Row>
            <Col md={6}>
              <Row>
                <Col md={12}>
                  <CurrentTrack />

                </Col>
              </Row>
            </Col>
            <Col md={6}>
              {/* <NewsFeed/> */}
              <CurrentGrid />

            </Col>
          </Row>
        </div>
      </div>
      <div>
      </div>


    </div>
  )
}

export default RaceInfo;