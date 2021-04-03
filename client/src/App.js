import axios from "axios";
import React, {useState} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavTabs from './componets/NavTabs'
import ConstructorStandings from "./componets/pages/ConstructorStandings";
import DriverStandings from "./componets/pages/DriverStandings";
import PracticeResults from "./componets/pages/PracticeResults";
import TeamPage from './componets/pages/TeamPage';
import RaceInfo from './componets/pages/RaceInfo';
import Home from './componets/pages/Home';
import DriverStats from './componets/pages/DriverStats';
import AdminHome from './componets/pages/AdminHome';
import './index.css';
function App() {
  
  return (
    <Router>
      <div>
        <NavTabs />
        {/* <Route exact path="/" component={Home}/> */}
        <Route exact path="/adminHome" component={AdminHome}/>
        <Route exact path="/practiceResults" component={PracticeResults} />
        <Route exact path="" path='/driverStandings' component={DriverStandings} />
        <Route exact path="/constructorStandings" component={ConstructorStandings} />
        {/* <Route exact path="/raceInformation" component={RaceInfo} /> */}
        {/* <Route path="/teams" component={TeamPage}/> */}
        {/* <Route exact path="/driverStats" component={DriverStats} /> */}
      </div>
    </Router>
  );
}

export default App;
