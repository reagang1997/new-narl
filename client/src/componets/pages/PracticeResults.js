import axios from 'axios';
import React, {useEffect, useState} from 'react';
import API from '../../utils/API';

import PracticeRow from '../PracticeRow';
function PracticeResults(props) {

    const [practiceResults, setPracticeResults] = useState([]);

    useEffect(() => {
        getPractice();
    }, [])

    const getPractice = async() => {
        const practice = await axios.get('/api/practiceResults');
        console.log(practice);
        setPracticeResults(practice.data);
    }
    return (
        
        <div className='practice-container'>
            
                <table className="table rounded table-hover table-responsive-lg">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Team</th>
                            <th scope="col">Time</th>
                            <th scope="col">Name</th>
                            <th scope="col">Tire</th>
                            <th scope="col">Laps</th>
                        </tr>
                    </thead>
                    <tbody>
                        {practiceResults.map((driver, i) => 
                            <PracticeRow
                                pos={i+1}
                                driverName={driver.driverName}
                                rawTime={driver.rawLapTime}
                                tires={driver.tire}
                                laps={driver.laps}
                                team={driver.teamName}
                            />
                        )}
                    
                        
                    </tbody>
                </table>

        </div>



    )
}

export default PracticeResults;