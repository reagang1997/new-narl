import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../StatsComponents/Header';
import SeasonStats from '../StatsComponents/SeasonStats';
import HistoryStats from '../StatsComponents/HistoryStats';
import CurrentDrivers from '../StatsComponents/CurrentDrivers';
import TeamLogo from '../StatsComponents/TeamLogo';
import { Row, Col } from 'react-bootstrap';
function TeamPage() {

    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        const getTeamData = async () => {
            let url = window.location.href.split('/');
            const team = url[url.length - 1];
            console.log(team);
            let tmpteamData = await axios.get(`/api/teams/` + `${team}`);
            setTeamData(tmpteamData.data)


        }

        getTeamData();
    }, [])


    return (
        <div>{console.log(teamData.drivers)}
            <Row>
                <Col md={6}>
                    <TeamLogo teamName={teamData.name} />
                </Col>
                <Col md={2}>
                    <Header teamName={teamData.name} />
                </Col>
            </Row>
            <Row style={{ width: '85%', margin: 'auto' }}>
                <Col md={6}>
                    <SeasonStats pts={teamData.points} wins={teamData.wins} fl={teamData.fastestLaps} />
                </Col>
                <Col md={6}>
                    <HistoryStats pts={teamData.historyPoints} wins={teamData.historyWins} fl={teamData.historyFastestLaps} />
                </Col>
            </Row>
            {/* <CurrentDrivers drivers={teamData.drivers}/> */}
        </div>
    );
}

export default TeamPage;