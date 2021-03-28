import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../StatsComponents/Header';
import SeasonStats from '../StatsComponents/SeasonStats';
import HistoryStats from '../StatsComponents/HistoryStats';
import CurrentDrivers from '../StatsComponents/CurrentDrivers';
import TeamLogo from '../StatsComponents/TeamLogo';
function TeamPage() {

    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        const getTeamData = async () => {
            let url = window.location.href.split('/');
            const team = url[url.length - 1];

            let tmpteamData = await axios.get(`/api/teams/` + `${team}`);
            setTeamData(tmpteamData.data)


        }

        getTeamData();
    }, [])


    return (
        <div>{console.log(teamData.drivers)}
            <TeamLogo teamName={teamData.name} />
            <Header teamName={teamData.name}/>
            <SeasonStats pts={teamData.points} wins={teamData.wins} fl={teamData.fastestLaps} />
            <HistoryStats pts={teamData.historyPoints} wins={teamData.historWins} fl={teamData.historyFastestLaps} />
            {/* <CurrentDrivers drivers={teamData.drivers}/> */}
        </div>
    );
}

export default TeamPage;