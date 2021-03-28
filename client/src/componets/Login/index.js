import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './style.css'
import { Alert } from 'bootstrap';

const Login = ({ loggedIn, setLoggedIn }) => {

    const [signup, setSignUp] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();

        if (signup) {
            let user = {
                email: email,
                username: username,
                password: password
            }
            setShow(true);
            const newAdmin = await axios.post('/signup', user);
        }
        else {
            let user = {
                email: email,
                password: password
            };

            user = await axios.post('/login', user);
            if (user.status === 200) {
                setLoggedIn(true);
            }

        }
    }

    return (
        <div className='login'>
            {/* {show ? 
            <Alert variant="success">
                <Alert.Heading>Thank you for applying to be an Admin! We will get back to you shortly!</Alert.Heading>
            </Alert>
            : <div></div>} */}

            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onBlur={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>
                {signup ?
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Username" onBlur={e => setUsername(e.target.value)} />
                        {/* <Form.Label>Tell us why you want to be an admin</Form.Label>
                        <Form.Control as="textarea" rows={5} cols={50} placeholder="Your message here" /> */}
                        </Form.Group>
                        :
                        <div></div>}

                        <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onBlur={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="warning" onClick={handleClick}>
                    Submit
                </Button>
                {!signup ? <Button variant="dark" style={{ marginLeft: '25px' }} onClick={(e) => setSignUp(true)}>
                    Signup
                </Button> : <div></div>}

            </Form>
        </div>
    )
}

export default Login;