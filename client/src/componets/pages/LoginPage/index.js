import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios'
// @material-ui/core ../../theme
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core ../../theme
import Header from '../../theme/Header/Header';
import HeaderLinks from '../../theme/Header/HeaderLinks';
import HeaderLinksRight from '../../theme/Header/HeaderLinksRight';
import Footer from "../../theme/Footer/Footer.js";
import GridContainer from "../../theme/Grid/GridContainer.js";
import GridItem from "../../theme/Grid/GridItem.js";
import Button from "../../theme/CustomButtons/Button.js";
import Card from "../../theme/Card/Card.js";
import CardBody from "../../theme/Card/CardBody.js";
import CardHeader from "../../theme/Card/CardHeader.js";
import CardFooter from "../../theme/Card/CardFooter.js";
import CustomInput from "../../theme/CustomInput/CustomInput.js";
import Muted from '../../theme/Typography/Muted';

import styles from "../../../assets/jss/material-kit-react/views/loginPage.js";

import image from "../../../assets/img/login-image.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const useStyles = makeStyles(styles);


  const { setLoggedIn, guid, setGuid, driver, setDriver, loggedIn } = props;
  const history = useHistory();

  const [toLogin, setToLogin] = useState(true);
  const [hide, setHide] = useState({ display: 'none' });
  const [hideLogin, setHideLogin] = useState({ fontSize: '12px' });

  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('hit')
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

      console.log(newUser);
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
  const handleEmail = (e) => {
    setEmail(e.target.value)
    console.log(e.target.value)
  };
  const handle = (e) => console.log(email, password);
  return (
    <div >
      <div

        className={`f1`}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          height: '1000px'
        }}
      >
        <Header color='transparent' brand="NARL" rightLinks={<HeaderLinks loggedIn={loggedIn} />} ></Header>


        <div className={`f1 ${classes.container}`}>
          {toLogin ?
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="warning" className={classes.cardHeader}>
                      <h4>Login</h4>

                    </CardHeader>
                    <CardBody>

                      <CustomInput
                        labelText="Email..."
                        id="email"
                        onChange={handleEmail}
                        formControlProps={{
                          fullWidth: true,
                          onChange: handleEmail
                        }}
                        inputProps={{
                          type: "email",

                          value: email,
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
                        onchange={handleEmail}
                        formControlProps={{
                          fullWidth: true,
                          onChange: e => setPassword(e.target.value)
                        }}
                        inputProps={{
                          type: "password",
                          value: password,
                          endAdornment: (
                            <InputAdornment position="end">

                            </InputAdornment>
                          ),
                          autoComplete: "off",
                        }}
                      />
                    </CardBody>
                    {/* <CardFooter className={classes.cardFooter}> */}
                    <div style={{ width: 'fit-content', margin: 'auto' }}>
                      <Button color='warning' round='true'>
                        <span onClick={loginSignup}>Login</span>
                      </Button>
                    </div>
                    <div style={{ width: 'fit-content', margin: 'auto' }}>

                      <Button round='true' onClick={e => {
                        setCardAnimation('cardHidden');

                        setToLogin(false)
                      }}>Don't have an account? Sign up!</Button>
                    </div>

                    {/* </CardFooter> */}
                  </form>
                </Card>
              </GridItem>
            </GridContainer>:
            <GridContainer justify="center" style={{marginTop: '-160px'}}>
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="warning" className={classes.cardHeader}>
                    <h4>Sign Up</h4>
                  </CardHeader>
                  <CardBody>

                    <CustomInput
                      labelText="Driver Name"
                      id="driverName"
                      formControlProps={{
                        fullWidth: true,
                        onChange: e => setUsername(e.target.value)
                      }}
                      inputProps={{
                        type: "text",
                        value: username,
                      }}
                    />
                    <Muted>This will be your name on the AC server during races.</Muted>
                    <CustomInput
                      labelText="Steam GUID"
                      id="guid"
                      formControlProps={{
                        fullWidth: true,
                        onChange: e => setGuid(e.target.value)
                      }}
                      inputProps={{
                        type: "text",
                        value: guid,
                      }}
                    />
                    <Muted>Login to steam on browser and view profile. Steam id will be in the url. EX: https://steamcommunity.com/profiles/765xxxxxxxxxxxxxx. GUID will be 765xxxxxxxxxxxxxx</Muted>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      onchange={handleEmail}
                      formControlProps={{
                        fullWidth: true,
                        onChange: e => setEmail(e.target.value)
                      }}
                      inputProps={{
                        type: "email",
                        value: email,
                        endAdornment: (
                          <InputAdornment position="end">

                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                        onChange: e => setPassword(e.target.value)
                      }}
                      inputProps={{
                        type: "password",
                        value: password,
                        endAdornment: (
                          <InputAdornment position="end">

                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  {/* <CardFooter className={classes.cardFooter}> */}
                  <div style={{ width: 'fit-content', margin: 'auto' }}>
                    <Button color='warning' round='true'>
                      <span onClick={loginSignup}>Sign Up</span>
                    </Button>
                  </div>
                  <div style={{ width: 'fit-content', margin: 'auto' }}>

                    <Button round='true' onClick={e => {
                      setCardAnimation('cardHidden');

                      setToLogin(true)
                    }}>Already have an account? Log in!</Button>
                  </div>

                  {/* </CardFooter> */}
                </form>
              </Card>
            </GridItem>
          </GridContainer>
                  }
        </div>
      </div>
    </div>
  );
}

