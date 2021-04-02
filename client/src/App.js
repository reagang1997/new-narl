import axios from "axios";
import React, {useState, useEffect} from "react";
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

  const [loggedIn, setLoggedIn] = useState(false);

  
  return (
    <Router>
      <div>
        <NavTabs />
        {/* <Route exact path="/" component={Home}/> */}
        <Route exact path="/adminHome">
          <AdminHome loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        </Route>
        <Route exact path="/practiceResults" component={PracticeResults} />
        <Route exact path="" path='/driverStandings' component={DriverStandings}>
          <DriverStandings loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        </Route>
        <Route exact path="/constructorStandings" component={ConstructorStandings}>
          <ConstructorStandings loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        </Route>
        {/* <Route exact path="/raceInformation" component={RaceInfo} /> */}
        {/* <Route path="/teams" component={TeamPage}/> */}
        {/* <Route exact path="/driverStats" component={DriverStats} /> */}
      </div>
    </Router>
  );
}

export default App;
