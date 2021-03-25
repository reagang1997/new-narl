import React from 'react';

function CurrentDrivers({drivers}){

    return (
        <div>
            {console.log(drivers)}
            {drivers[0]}
            {drivers[1]}
        </div>
    )
}

export default CurrentDrivers;