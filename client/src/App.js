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
// import AdminHome from './componets/pages/AdminHome';
import LoginSignup from './componets/pages/LoginSignup';
import './index.css';
import DriverHome from "./componets/pages/DriverHome";
import ForgotPassword from "./componets/pages/ForgotPassword";
import PasswordReset from "./componets/pages/PasswordReset";
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [driver, setDriver] = useState({});
  const [guid, setGuid] = useState("");

  useEffect(() => {
    getDriver();
  }, [guid])


  const getDriver = async () => {
    const foundDriver = await axios.get(`/api/driver/${guid}`);
    console.log(foundDriver);
    setDriver(foundDriver.data);
  }

  const getGuid = async () => {
    let url = window.location.href.split('/');
    const guidTmp = url[url.length - 1];
    setGuid(guidTmp);

    
}


  return (
    <Router>
      <div>
        <NavTabs loggedIn={loggedIn} guid={guid}/>
        <Route exact path="/" component={Home}/>
        <Route path='/driverHome' component={DriverHome}>
          <DriverHome loggedIn={loggedIn} driver={driver} setDriver={setDriver} getGuid={getGuid} guid={guid} setGuid={setGuid}/>
        </Route>
        <Route path='/passwordReset'>
          <PasswordReset/>
        </Route>
        <Route exact path="/loginSignup" component={LoginSignup}>
          <LoginSignup loggedIn={loggedIn} setLoggedIn={setLoggedIn} guid={guid} setGuid={setGuid} driver={driver} setDriver={setDriver}></LoginSignup>
        </Route>
        <Route exact path="/forgotPassword" >
          <ForgotPassword></ForgotPassword>
        </Route>
        <Route exact path="/practiceResults" component={PracticeResults} >
            <PracticeResults loggedIn={loggedIn} setLoggedIn={setLoggedIn}></PracticeResults>
        </Route>
        <Route exact path="" path='/driverStandings' component={DriverStandings} >
            <DriverStandings loggedIn={loggedIn} setLoggedIn={setLoggedIn}></DriverStandings>
        </Route>
        <Route exact path="/constructorStandings" component={ConstructorStandings} >
            <ConstructorStandings loggedIn={loggedIn} setLoggedIn={setLoggedIn}></ConstructorStandings>
        </Route>
        <Route exact path="/raceInformation" component={RaceInfo} />
        <Route path="/teams" component={TeamPage}/>
        <Route exact path="/driverStats" component={DriverStats} />
      </div>
    </Router>
  );
}

export default App;
