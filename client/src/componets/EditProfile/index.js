import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Form, FormControl, FormLabel } from 'react-bootstrap';
import Button from '../theme/CustomButtons/Button'

const EditProfile = ({ driver, setDriver }) => {

    const [user, setUser] = useState({});
    const [driverName, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const tmpUser = await axios.get(`/api/user/${driver.guid}`);
        setUser(tmpUser.data);
    }

    const makeChanges = async () => {
        if (driverName.length > 0) {
            const body = { username: driverName };
            const changed = await axios.put(`/api/user/changeName/${driver.guid}`, body);
            setDriver({ ...driver, name: driverName });
        }
        if (email.length > 0) {
            const body = { email: email };
            const changed = await axios.put(`/api/user/changeEmail/${driver.guid}`, body);
        }

    }

    return (
        <div>
            <Card body className='box f1' style={{ width: 'fit-content' }}>
                <h1>Edit Profile</h1>
                <Form>
                    <FormLabel>Change Driver Name</FormLabel>
                    <FormControl type='input' placeholder={driver.name} style={{ width: '300px' }} value={driverName} onChange={e => setName(e.target.value)} />
                    <br></br>
                    <FormLabel>Change Email</FormLabel>
                    <FormControl type='input' placeholder={user.email} style={{ width: '300px' }} value={email} onChange={e => setEmail(e.target.value)} />
                    <div style={{ width: 'fit-content', margin: 'auto', marginTop: '15px' }}>
                        <Button color='warning' onClick={makeChanges}>Save Changes</Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default EditProfile;