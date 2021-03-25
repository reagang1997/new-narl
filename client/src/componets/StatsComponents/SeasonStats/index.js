import React from 'react';

function SeasonStats({wins, pts, fl}){
    return(
        <div>
            <h1>Season Stats</h1>
            <h2>{pts}</h2>
            <h2>{wins}</h2>
            <h2>{fl}</h2>
        </div>
    )
}

export default SeasonStats;