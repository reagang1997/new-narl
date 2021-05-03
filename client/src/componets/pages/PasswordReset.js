import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, FormControl } from 'react-bootstrap';

const PasswordReset = () => {

    const [guid, setGuid] = useState('');
    const [driver, setDriver] = useState({});
    const [password, setPassword] = useState('');

    useEffect(() => {
        getGuid()
    }, []);


    const getGuid = async () => {
        let url = window.location.href.split('/');
        const guidTmp = url[url.length - 1];
        setGuid(guidTmp);

        const tmpDriver = await axios.get(`/api/driver/${guidTmp}`);
        setDriver(tmpDriver.data);

    }
    return (
        <Card body className='f1 box' style={{ width: '1250px', marginTop: '50px' }}>
            <h1>Password Reset</h1>
            <h2>Driver Name: {driver.name} </h2>
            <Form>
                <Form.Control type="password" placeholder="New Password" onBlur={e => setPassword(e.target.value)} style={{ width: '200px', marginTop: '25px' }} />
                <Button variant='warning' style={{marginTop: '25px'}}>Change Password</Button>
            </Form>
        </Card>
    )

}

export default PasswordReset;