import axios from 'axios';
import React from 'react';
import Row from '../WDCRow';
import './style.css'
function WDCTable(props) {

    return (
        <div className='wdc-container'>


            <table class="table rounded table-hover table-responsive-lg">
                <thead>
                    <tr>
                        <th scope="col">POS</th>
                        <th scope="col">Team</th>
                        <th scope="col">Name</th>
                        <th scope="col">Points</th>
                        <th scope="col">Wins</th>
                        <th scope="col">Fastest Laps</th>
                    </tr>
                </thead>
                <tbody>
                    {props.drivers.map((driver, i) => <Row key={i} pos={i + 1} name={driver.name} team={driver.team} points={driver.points} wins={driver.wins} fastestLaps={driver.fastestLaps} />)}
                </tbody>
            </table>

        </div>
    )

}

export default WDCTable;