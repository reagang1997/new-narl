import React from 'react';

function HistoryStats({wins, fl, pts}) {
    return(
        <div>
            <h1>History Stats</h1>
            <h2>{pts}</h2>
            <h2>{wins}</h2>
            <h2>{fl}</h2>
        </div>
    )
}

export default HistoryStats;