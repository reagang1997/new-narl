import React from 'react';
import axios from 'axios';
import  { Link, Redirect, useHistory } from 'react-router-dom'
import TeamIcon from '../TeamIcon';

function WCCRow({team, points, pos, wins, fastestLaps}){

    const history = useHistory();

    const getTeamName = (event) => {
        const team = event.target.id;
        return team;
    }

    const getTeamPage = async (event) => {
        let team = getTeamName(event);
        console.log(team);

        team = await axios.get(`/api/${team}`)

        console.log(team.data[0]);

        return <Redirect to={'/teams/'+team.data[0]}/>
    }

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
            
            <td>{points}</td>
            <td>{wins}</td>
            <td>{fastestLaps}</td>
        </tr>
    )
}

export default WCCRow;