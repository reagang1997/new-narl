import React, { useEffect, useState } from 'react';
import axios from 'axios'
import WCCTable from '../WCCTable'

function ConstructorStandings() {

    const [ConstructorStandings, setConstructorStandings] = useState([]);

    useEffect(() => {
        async function getStandings() {
            const teams = await axios.get('http://localhost:8080/api/WCC');
            console.log(teams.data);
            setConstructorStandings(teams.data);
        }
        getStandings();
    }, [])

    return (
        <WCCTable teams={ConstructorStandings} />
    )
}

export default ConstructorStandings;