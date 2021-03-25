import React from 'react';
import TeamIcon from '../TeamIcon';
import  { Link, Redirect, useHistory } from 'react-router-dom'


function WDCRow(props){
    const {name, team, points, wins, fastestLaps, pos} = props;

    const history = useHistory();


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
            <td>{name}</td>
            <td>{points}</td>
            <td>{wins}</td>
            <td>{fastestLaps}</td>
        </tr>
    )
}

export default WDCRow;