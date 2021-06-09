import React, { useState, useEffect } from 'react';
import { Col, Card } from 'react-bootstrap';
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from '../theme/Header/Header';
import HeaderLinks from '../theme/Header/HeaderLinks';
import Parallax from '../theme/Parallax/Parallax'
import HeaderLinksRight from '../theme/Header/HeaderLinksRight.js';
import axios from 'axios';
import SeasonTable from '../SeasonTable'
const useStyles = makeStyles(styles);
const Schedule = ({ loggedIn }) => {

    const classes = useStyles();

    const [schedule, setScheule] = useState([]);

    useEffect(() => {
        getSchedule();
    }, [])

    const getSchedule = async () => {
        const tmp = await axios.get('/api/currentSeasonSchedule');
        console.log(tmp.data);
    }

    return (
        <div>
            <Header
                color="transparent"
                brand="NARL"
                rightLinks={<HeaderLinks />}
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
            <div className={classNames(classes.main, classes.mainRaised, 'f1')}>
                <SeasonTable ></SeasonTable>
            </div>

        </div>
    )
}

export default Schedule;