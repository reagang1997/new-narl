import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Card, Form, Button } from 'react-bootstrap';
import TeamIcon from '../TeamIcon'
import { useHistory } from 'react-router-dom'


const LoginSignup = ({setLoggedIn, guid, setGuid}) => {


    const history = useHistory();

    const [toLogin, setToLogin] = useState(true);
    const [hide, setHide] = useState({display: 'none'});
    const [hideLogin, setHideLogin] = useState({fontSize: '12px'});

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

    }, [toLogin]);

    const handleClick = (e) => {
        setHide({display: 'block'});
        setHideLogin({ fontSize: '12px', display: 'none'})
        setToLogin(false);
    }

    const loginSignup = async (e) => {
        e.preventDefault();
        if (toLogin) {
            // login

            const loggedIn = await axios.post('/login', {email: email, password: password});
            if(loggedIn.status === 200) {
                const user = loggedIn.data.user;
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

            const signedUp = await axios.post('/signup', newUser);
            console.log(signedUp)

            if(signedUp.status === 200){
                setLoggedIn(true);

                history.push(`/driverHome/${guid}`);
            }
        }
    }
    return (
        <Card body className='box f1 signup' style={{marginTop: '50px'}}>
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
            </div>
        </Card>
    )
}

export default LoginSignup;