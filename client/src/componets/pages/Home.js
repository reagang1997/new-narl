import React, { useState } from 'react';
import { Row, Col, Jumbotron, Button } from 'react-bootstrap';
import { makeStyles } from "@material-ui/core/styles";
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

import { useHistory } from 'react-router-dom'
import Card from '../theme/Card/Card'
import NewsFeed from '../NewsFeed';
import styles from "../../assets/jss/material-kit-react/homeStyles";
import classNames from "classnames";

// import logo from './img/logo.png'
import image from '../../assets/img/home.png'
import { container } from '../../assets/jss/material-kit-react';
import Header from '../theme/Header/Header';
import HeaderLinks from '../theme/Header/HeaderLinks';
import HeaderLinksRight from '../theme/Header/HeaderLinksRight';

const useStyles = makeStyles(styles);


function Home({loggedIn}) {

    const home_container = {
        container,
        zIndex: "2",
        position: "relative",
        paddingTop: "20vh",
        paddingBottom: "200px",

    }
    const history = useHistory();
    const classes = useStyles();
    

    return (
        <div
            className={`f1 ${classes.pageHeader}`}
            style={{
                backgroundImage: "url(" + image + ")",
                backgroundSize: "cover",
                backgroundPosition: "top center",

            }}>
            <Header color='transparent' brand="NARL" rightLinks={<HeaderLinks loggedIn={loggedIn}/>}></Header>
            <div className={`f1 ${classes.container}`} style={home_container}>
                <Card body className={classNames(classes.main, classes.mainRaised, 'f1')} style={{padding: '50px', opacity:'85%'}}>
                    <div >
                        <h1 style={{ fontSize: '50px' }}>North American Racing League</h1>
                        <h4>North Americas Finest Racing League.</h4>
                        <br />
                        <p>
                            North American Racing League (NARL) is the NA's best racing league. Home of the friendliest, cleanest, and most importantly, the fastest drivers.
                            No matter your skill, you can find a home here with us.
                </p>
                        <p>
                            Race times are 8pm CT every sunday following the Formula 1 calander.
                </p>
                        <p>
                            Think you have what it takes? Apply to Drive!
                </p>
                        <Button variant='warning' onClick={e => history.push('/loginSignup')}>Apply</Button>
                        <Button variant='warning' href='https://discord.gg/emxn6C6' target='blank' style={{ marginLeft: '15px' }}>Join our Discord</Button>

                        <br />
                        <br />
                        <br />
                        <h3>Already a driver and enjoing the close competition?<span style={{ fontSize: '8px', marginLeft: '-5px' }}>and this gorgeous website</span></h3>
                        <p>Please donate! All procedes will be put towards funding for a new server to run a new grid, and into the website. Thank you!</p>
                        <a href='https://www.paypal.com/donate?business=X8RLSA8DMG4VW&currency_code=USD' target='blank'><Button variant='warning'>Donate</Button></a>
                    </div>
                </Card>
            </div>
        </div>




    )
}

export default Home;