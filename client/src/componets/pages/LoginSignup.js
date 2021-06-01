import React, { useEffect, useState } from 'react';
import axios from 'axios'
import TeamIcon from '../TeamIcon'
import { useHistory } from 'react-router-dom'

import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "../theme/Header/Header.js";
import HeaderLinks from "../theme/Header/HeaderLinks.js";
import Footer from "../theme/Footer/Footer.js";
import GridContainer from "../theme/Grid/GridContainer.js";
import GridItem from "../theme/Grid/GridItem.js";
import Button from "../theme/CustomButtons/Button.js";
import Card from "../theme/Card/Card.js";
import CardBody from "../theme/Card/CardBody.js";
import CardHeader from "../theme/Card/CardHeader.js";
import CardFooter from "../theme/Card/CardFooter.js";
import CustomInput from "../theme/CustomInput/CustomInput.js";

import styles from "../../assets/jss/material-kit-react/views/loginPage.js";

// import image from "assets/img/bg7.jpg";


const LoginSignup = (props) => {

    const useStyles = makeStyles(styles);


    const { setLoggedIn, guid, setGuid, driver, setDriver } = props;
    const history = useHistory();

  const [cardAnimaton, setCardAnimation] = useState("cardHidden");


    const [toLogin, setToLogin] = useState(true);
    const [hide, setHide] = useState({ display: 'none' });
    const [hideLogin, setHideLogin] = useState({ fontSize: '12px' });

    const [showAlert, setShowAlert] = useState(false);
    const [msg, setMsg] = useState('');

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

    }, [toLogin]);

    useEffect(() => {

    }, [msg]);

    const handleClick = (e) => {
        setHide({ display: 'block' });
        setHideLogin({ fontSize: '12px', display: 'none' })
        setToLogin(false);
        if (showAlert) {
            setShowAlert(false);
            setMsg('');
        }
    }

    const loginSignup = async (e) => {
        e.preventDefault();
        if (toLogin) {
            // login

            const loggedIn = await axios.post('/login', { email: email, password: password });
            console.log(loggedIn);
            if (loggedIn.data.error) {
                console.log('hit')
                setMsg(loggedIn.data.error[0]);
                setShowAlert(true);
            }
            else {
                const user = loggedIn.data;
                console.log(user);
                setGuid(user.guid)
                let tmp = user.guid;
                // let userGUID = await axios.get(`/api/user/${user._id}`);
                // setGuid(user.data.guid);
                // userGUID = userGUID.data.guid;
                // console.log(userGUID);
                setLoggedIn(true);
                history.push(`/driverHome/${tmp}`);
            }

        }
        else {
            //signup
            const newUser = {
                email: email,
                username: username,
                password: password,
                guid: guid
            }

            const newDriver = {
                name: username,
                guid: guid,
                team: 'Reserve'
            }

            const signedUp = await axios.post('/signup', newUser);
            console.log(signedUp)
            if (signedUp.data.error) {
                setShowAlert(true);
                setMsg(signedUp.data.error);
            }
            else {
                setLoggedIn(true);
                const createdDriver = await axios.post('/api/CreateNewDriver', newDriver);
                setDriver(createdDriver.data);
                history.push(`/driverHome/${guid}`);
            }
        }
    }

    const classes = useStyles();
    const { ...rest } = props;
    return (
        <div>
            <Header
                absolute
                color="transparent"
                brand="Material Kit React"
                rightLinks={<HeaderLinks />}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                    // backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                }}
            >
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Login</h4>
                                        <div className={classes.socialLine}>
                                            <Button
                                                justIcon
                                                href="#pablo"
                                                target="_blank"
                                                color="transparent"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className={"fab fa-twitter"} />
                                            </Button>
                                            <Button
                                                justIcon
                                                href="#pablo"
                                                target="_blank"
                                                color="transparent"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className={"fab fa-facebook"} />
                                            </Button>
                                            <Button
                                                justIcon
                                                href="#pablo"
                                                target="_blank"
                                                color="transparent"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className={"fab fa-google-plus-g"} />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <p className={classes.divider}>Or Be Classical</p>
                                    <CardBody>
                                        <CustomInput
                                            labelText="First Name..."
                                            id="first"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                type: "text",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <People className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <CustomInput
                                            labelText="Email..."
                                            id="email"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                type: "email",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Email className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <CustomInput
                                            labelText="Password"
                                            id="pass"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                type: "password",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className={classes.inputIconsColor}>
                                                            lock_outline
                              </Icon>
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off",
                                            }}
                                        />
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button simple color="primary" size="lg">
                                            Get started
                      </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    )
}

export default LoginSignup;