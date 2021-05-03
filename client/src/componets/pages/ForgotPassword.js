import { Card, Form, Button, Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [msg, setMsg] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        const foundUser = await axios.get(`/api/userEmail/${email}`);
        console.log(foundUser);
        if(foundUser.data.guid){
            const sentEmail = await axios.get(`/api/sendForgotPasswordEmail/${foundUser.data.guid}`);
        }
        else{
            setShowAlert(true);
            setMsg('Email not found')
        }
    }

    return (
        <Card body className='box f1 signup' style={{ marginTop: '50px' }}>
            {showAlert ? <Alert variant='danger'>{msg}</Alert>  : <div></div>}

            <h1>Forgot Password?</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        An email will be sent with a link to change password
                    </Form.Text>
                </Form.Group>

                <Button variant="warning" type="submit" onClick={handleClick}>
                    Send Email
                </Button>
            </Form>

        </Card>
    )
}

export default ForgotPassword;