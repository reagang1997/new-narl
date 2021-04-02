import React from 'react';
import TeamIcon from '../TeamIcon';

import  { useHistory } from 'react-router-dom'


function PracticeRow({pos, driverName, rawTime, tires, laps, team}) {
    const history = useHistory();
    const getFormatted = (s) => {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        const formatted = mins + ':' + secs + ':' + ms; 
        return formatted;
    }

    const time = getFormatted(rawTime);
    console.log(time);

    const routeChange = (e) =>{ 
        let path = `/teams/${team}`;
        console.log(team)
        history.push(path);
      }

    return(
        
        <tr>
            <td>{pos}</td>
            <td onClick={routeChange} id={team}>
                {/*Make Team Icon Component for here*/}
                <TeamIcon teamName={team}/>
                </td>
            <td>{time}</td>
            <td>{driverName}</td>
            <td>{tires}</td>
            <td>{laps}</td>
        </tr>
    )

}

export default PracticeRow;