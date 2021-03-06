import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import AboutPage from "./AboutPage";
import BetNowPage from "./BetNowPage";
import GamePage from "./GamePage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";

import niners from "./static/images/nfl_team_logos/49ers-vector.jpg";
import cardinals from "./static/images/nfl_team_logos/arizona-cardinals-logo-vector.png";
import falcons from "./static/images/nfl_team_logos/atlanta-falcons-logo-vector.png";
import ravens from "./static/images/nfl_team_logos/baltimore-ravens-logo-vector-01.png";
import bills from "./static/images/nfl_team_logos/buffalo-bills-logo-vector-01.png";
import panthers from "./static/images/nfl_team_logos/carolina-panthers-logo-vector.png";
import bears from "./static/images/nfl_team_logos/chicago-bears-logo-vector.png";
import bengals from "./static/images/nfl_team_logos/cincinnati-bengals-logo-vector-01.png";
import browns from "./static/images/nfl_team_logos/cleveland-browns-vector-logo.png";
import cowboys from "./static/images/nfl_team_logos/dallas-cowboys-logo-vector.png";
import broncos from "./static/images/nfl_team_logos/denver-broncos-logo-vector.png";
import lions from "./static/images/nfl_team_logos/detroit-lions-logo-vector-01.png";
import packers from "./static/images/nfl_team_logos/green-bay-packers-logo-vector.png";
import texans from "./static/images/nfl_team_logos/houston-texans-logo-vector.png";
import colts from "./static/images/nfl_team_logos/indianapolis-colts-vector-logo.png";
import jaguars from "./static/images/nfl_team_logos/jacksonville-jaguars-vector-logo.png";
import chiefs from "./static/images/nfl_team_logos/kansas-city-chiefs-vector-logo.png";
import dolphins from "./static/images/nfl_team_logos/miami-dolphins-vector-logo.png";
import vikings from "./static/images/nfl_team_logos/minnesota-vikings-logo-vector.png";
import patriots from "./static/images/nfl_team_logos/new-england-patriots-logo-preview.png";
import saints from "./static/images/nfl_team_logos/new-orleans-saints-logo-vector.png";
import giants from "./static/images/nfl_team_logos/new-york-giants-logo-vector.png";
import jets from "./static/images/nfl_team_logos/new-york-jets-logo-vector-01.png";
import raiders from "./static/images/nfl_team_logos/oakland-raiders-logo-vector.png";
import eagles from "./static/images/nfl_team_logos/philadelphia-eagles-logo-vector.png";
import steelers from "./static/images/nfl_team_logos/pittsburgh-steelers-logo-vector-01.png";
import chargers from "./static/images/nfl_team_logos/san-diego-chargers-logo-vector.png";
import seahawks from "./static/images/nfl_team_logos/seattle-seahawks-logo-vector.png";
import rams from "./static/images/nfl_team_logos/st-louis-rams-vector-logo.png";
import buccaneers from "./static/images/nfl_team_logos/tampa-bay-buccaneers-logo-vector.png";
import titans from "./static/images/nfl_team_logos/tennessee-titans-vector-logo.png";
import redskins from "./static/images/nfl_team_logos/washington-redskins-logo-vector.png";

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor() {
    super();
    this.state = {
      teamOne: "",
      teamTwo: "",
      gameTime: 0,
      username: null
    };
    this.setTeamOne = this.setTeamOne.bind(this);
    this.setTeamTwo = this.setTeamTwo.bind(this);
    this.setGameTime = this.setGameTime.bind(this);
    this.checkToken = this.checkToken.bind(this);
  }

  componentDidMount() {
    this.checkToken();
  }

  checkToken() {
    const { cookies } = this.props;
    const sessionToken = cookies.get("sessionToken");

    if (sessionToken !== undefined) {
      fetch(
        "https://line-drive-server.appspot.com/Users/find?token=" + sessionToken
      )
        .then(res => res.json())
        .then(res => {
          this.setState({ username: res["userName"] });
        });
    } else {
      this.setState({ username: undefined });
    }
  }

  setTeamOne = team => {
    this.setState({ teamOne: team });
  };

  setTeamTwo = team => {
    this.setState({ teamTwo: team });
  };

  setGameTime = time => {
    this.setState({ gameTime: time });
  };

  render() {
    const logos = {
      "San Francisco 49ers": niners,
      "Arizona Cardinals": cardinals,
      "Atlanta Falcons": falcons,
      "Baltimore Ravens": ravens,
      "Buffalo Bills": bills,
      "Carolina Panthers": panthers,
      "Chicago Bears": bears,
      "Cincinnati Bengals": bengals,
      "Cleveland Browns": browns,
      "Dallas Cowboys": cowboys,
      "Denver Broncos": broncos,
      "Detroit Lions": lions,
      "Green Bay Packers": packers,
      "Houston Texans": texans,
      "Indianapolis Colts": colts,
      "Jacksonville Jaguars": jaguars,
      "Kansas City Chiefs": chiefs,
      "Miami Dolphins": dolphins,
      "Minnesota Vikings": vikings,
      "New England Patriots": patriots,
      "New Orleans Saints": saints,
      "New York Giants": giants,
      "New York Jets": jets,
      "Oakland Raiders": raiders,
      "Philadelphia Eagles": eagles,
      "Pittsburgh Steelers": steelers,
      "Los Angeles Chargers": chargers,
      "Seattle Seahawks": seahawks,
      "Los Angeles Rams": rams,
      "Tampa Bay Buccaneers": buccaneers,
      "Tennessee Titans": titans,
      "Washington Redskins": redskins
    };

    return (
      <Router>
        <CookiesProvider>
          <div>
            <Switch>
              <Route path="/login">
                <LoginPage checkToken={this.checkToken} />
              </Route>
              <Route
                path="/game"
                render={props => (
                  <GamePage
                    {...props}
                    logos={logos}
                    teamOne={this.state.teamOne}
                    teamTwo={this.state.teamTwo}
                    gameTime={this.state.gameTime}
                    username={this.state.username}
                    checkToken={this.checkToken}
                  />
                )}
              />
              <Route path="/betnow">
                <BetNowPage
                  username={this.state.username}
                  checkToken={this.checkToken}
                />
              </Route>
              <Route path="/about">
                <AboutPage
                  username={this.state.username}
                  checkToken={this.checkToken}
                />
              </Route>
              <Route
                path="/"
                render={props => (
                  <HomePage
                    {...props}
                    logos={logos}
                    setTeamOne={this.setTeamOne}
                    setTeamTwo={this.setTeamTwo}
                    setGameTime={this.setGameTime}
                    username={this.state.username}
                    checkToken={this.checkToken}
                  />
                )}
              />
            </Switch>
          </div>
        </CookiesProvider>
      </Router>
    );
  }
}

export default withCookies(App);
