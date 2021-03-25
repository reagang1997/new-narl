import React from 'react';

function CareerStatRow ({name, careerPoints, careerWins, careerFastestLaps, }) {


    return(
        <tr>
            <td>{name}</td>
            <td>{careerPoints}</td>
            <td>{careerWins}</td>
            <td>{careerFastestLaps}</td>
        </tr>
    )

}

export default CareerStatRow;