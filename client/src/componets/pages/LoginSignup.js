import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Card, Form, Button, Alert } from 'react-bootstrap';
import TeamIcon from '../TeamIcon'
import { useHistory } from 'react-router-dom'


const LoginSignup = ({setLoggedIn, guid, setGuid, driver, setDriver}) => {


    const history = useHistory();

    const [toLogin, setToLogin] = useState(true);
    const [hide, setHide] = useState({display: 'none'});
    const [hideLogin, setHideLogin] = useState({fontSize: '12px'});

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
        setHide({display: 'block'});
        setHideLogin({ fontSize: '12px', display: 'none'})
        setToLogin(false);
        if(showAlert){
            setShowAlert(false);
            setMsg('');
        }
    }

    const loginSignup = async (e) => {
        e.preventDefault();
        if (toLogin) {
            // login

            const loggedIn = await axios.post('/login', {email: email, password: password});
            console.log(loggedIn);
            if(loggedIn.data.error){
                console.log('hit')
                setMsg(loggedIn.data.error[0]);
                setShowAlert(true);
            }
            else{
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
            if(signedUp.data.error){
                setShowAlert(true);
                setMsg(signedUp.data.error);
            }
            else{
                setLoggedIn(true);
                const createdDriver = await axios.post('/api/CreateNewDriver', newDriver);
                setDriver(createdDriver.data);
                history.push(`/driverHome/${guid}`);
            }
        }
    }
    return (
        <Card body className='box f1 signup' style={{marginTop: '50px'}}>
            {showAlert ? <Alert variant='danger'>{msg}</Alert>  : <div></div>}
            
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>
                <Form.Group style={hide}>
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control type='text' placeholder='Lando Norris' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <Form.Text className='text-muted'>
                        Display Name for standings, stats, and name on AC Server.
                    </Form.Text>
                </Form.Group>
                <Form.Group style={hide}> 
                    <Form.Label>Steam ID</Form.Label>
                    <Form.Control type='text' placeholder='765xxxxxxxxxxxxxx' value={guid} onChange={(e) => setGuid(e.target.value)}/>
                    <Form.Text className='text-muted'>
                        Login to steam on browser and view profile. Steam id will be in the url. EX: https://steamcommunity.com/profiles/765xxxxxxxxxxxxxx/
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="warning" type="submit" onClick={loginSignup}>
                   {toLogin ? <div>Login</div> : <div>Sign Up</div>}
                </Button>
            </Form>
            <div style={{width: 'fit-content', margin: 'auto'}}>
                <a href="#" style={hideLogin} onClick={handleClick}>Dont have an account? Sign up!</a>
                <br/>
                <a href="#" style={{marginLeft: '45px', fontSize: '12px'}} onClick={e => history.push('/forgotPassword')}>Forgot Password?</a>
            </div>
        </Card>
    )
}

export default LoginSignup;