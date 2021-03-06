import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import GlobalNavbar from "./components/GlobalNavBar";
import AboutCard from "./components/AboutCard";

class AboutPage extends React.Component {
  constructor() {
    super();
    this.state = {
      statMiguel: 0,
      statIshraq: 0,
      statErick: 0,
      statFrank: 0,
      statAllen: 0,
      statKayvan: 0,
      totalCommits: 0,
      totalIssues: 0,
      responsibilities: "Front-End, Back-End",
      junitTest: 0,
      mochaTest: 0
    };
    this.getGithubStats = this.getGithubStats.bind(this);
  }

  componentDidMount() {
    this.getGithubStats();

    this.timer = setInterval(() => this.getGithubStats(), 10000);
  }

  getGithubStats() {
    fetch(
      "https://api.github.com/repos/garzarobm/Vermillion_LineDriveBetting/stats/contributors"
    )
      .then(res => res.json())
      .then(result => {
        if (result !== {}) {
          for (let contributor of result) {
            if (contributor.author.login === "mih475") {
              this.setState({
                statIshraq: contributor.total
              });
            } else if (contributor.author.login === "daxlar") {
              this.setState({
                statAllen: contributor.total
              });
            } else if (contributor.author.login === "erickli42") {
              this.setState({
                statErick: contributor.total
              });
            } else if (contributor.author.login === "Frankutexas") {
              this.setState({
                statFrank: contributor.total
              });
            } else if (contributor.author.login === "kayvan61") {
              this.setState({
                statKayvan: contributor.total
              });
            } else {
              this.setState({
                statMiguel: contributor.total
              });
            }
          }
        }
      })
      .then(() => {
        this.setState({
          totalCommits:
            this.state.statAllen +
            this.state.statErick +
            this.state.statFrank +
            this.state.statIshraq +
            this.state.statKayvan +
            this.state.statMiguel
        });
      })
      .catch(error => {
        console.log(error);
      });

    fetch(
      "https://api.github.com/repos/garzarobm/Vermillion_LineDriveBetting/issues"
    )
      .then(res => res.json())
      .then(result => {
        if (result !== {}) {
          this.setState({
            totalIssues: result.length,
            junitTest: 7,
            mochaTest: 4
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const aboutInfo =
      // eslint-disable-next-line
      "LineDriveBetting is a website that will provide people with aggregate  \
      information on football betting lines and game predictions and allow    \
      users to share and discuss their own personal thoughts or predictions   \
      in the comments section for each game. The website will have coverage   \
      of the NFL games happening every week. This website is intended for     \
      those who are interested in or involved with sports betting or those    \
      who are sports fans that want to know the chances that their team will  \
      win. Our website will be a single destination that will give these      \
      people the opportunity to see what a variety of different sources are   \
      predicting for games they follow and give them the opportunity to       \
      discuss their feelings with others in the sports community.";
    const bios = {
      bioMiguel:
        "I am a Senior in Electrical and Engineering at the University of Texas at Austin. My initial interest in computers and technology had originated in High School, when my geometry teacher, after seeing my performance in class, referred me to the GRHS Engineering club when I was a sophomore.",
      bioIshraq:
        "I am a Senior in Electrical and Computer Engineering at the University of Texas at Austin. I am focusing on software development and minoring in business. I want to help or consult with people solving their problems. My recent favorite movie is Joker.",
      bioErick:
        "I am a Junior in Electrical and Computer Engineering at the University of Texas at Austin. Computers have been a big part of my life since forever, so it kinda makes sense that I ended up being a software developer. Outside of school or work I enjoy watching football and playing League.",
      bioFrank:
        "I am a Senior in Electrical and Computer Engineering at the University of Texas at Austin. I have always enjoyed solving puzzles, physics, and math so taking Electrical Engineering as well as Actuarial Science classes seemed logical.",
      bioAllen:
        "I am a senior at UT ECE. Computers are friends, not enemies. I like circuits and code.",
      bioKayvan:
        "I am a senior at UT ECE. I was promised there would be more C. Javascript is not to be trusted"
    };

    return (
      <div style={{ textAlign: "center" }}>
        <GlobalNavbar
          username={this.props.username}
          checkToken={this.props.checkToken}
        />

        {/* About */}
        <h1>ABOUT</h1>
        <p style={{ marginLeft: "60px", marginRight: "60px" }}>{aboutInfo}</p>

        {/* Team Members */}
        <div style={{ marginTop: 50 }}>
          <h1>Team Vermillion</h1>
        </div>
        <Container style={{ marginTop: 20, marginBottom: 20 }}>
          <Row>
            <Col>
              <AboutCard
                src={require("./static/images/Miguel.jpg")}
                name="Miguel"
                bio={bios.bioMiguel}
                stat={this.state.statMiguel}
                responsibilities={this.state.responsibilities}
              />
            </Col>
            <Col>
              <AboutCard
                src={require("./static/images/Ishraq.jpg")}
                name="Ishraq"
                bio={bios.bioIshraq}
                stat={this.state.statIshraq}
                responsibilities={this.state.responsibilities}
              />
            </Col>
            <Col>
              <AboutCard
                src={require("./static/images/Erick.jpg")}
                name="Erick"
                bio={bios.bioErick}
                stat={this.state.statErick}
                responsibilities={this.state.responsibilities}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col>
              <AboutCard
                src={require("./static/images/Frank.jpg")}
                name="Frank"
                bio={bios.bioFrank}
                stat={this.state.statFrank}
                responsibilities={this.state.responsibilities}
              />
            </Col>
            <Col>
              <AboutCard
                src={require("./static/images/Allen.jpeg")}
                name="Allen"
                bio={bios.bioAllen}
                stat={this.state.statAllen}
                responsibilities={this.state.responsibilities}
              />
            </Col>
            <Col>
              <AboutCard
                src={require("./static/images/Ali.jpg")}
                name="Kayvan"
                bio={bios.bioKayvan}
                stat={this.state.statKayvan}
                responsibilities={this.state.responsibilities}
              />
            </Col>
          </Row>
        </Container>

        {/* Stats */}
        <h2>Github Stats</h2>
        <p>
          Commits: {this.state.totalCommits}, Unit Tests: {this.state.junitTest}
          , Mocha Tests: {this.state.mochaTest}, Issues:{" "}
          {this.state.totalIssues}
        </p>

        <h2>Data</h2>
        <p>
          1. Github Repo Statistics taken from Github API (api.github.com)
          <br />
          2. Sports Betting Statistics taken from the-odds-api
          (the-odds-api.com)
        </p>

        {/* Tools */}
        <h2>Tools</h2>
        <p>
          <b>React:</b> Front-end web framework for building the user interface
          of our website, <b>MongoDB:</b> document-based open source database we
          will use to store user data and betting/win prediction data,
          <b>Express/Node.js:</b>
          Server-side web application framework for building our backend/API,
          <b>React Router:</b> Routing library for React,
          <b>React Bootstrap:</b> Front-end framework for React that will
          provide UI components, <b>Create React App:</b> Allow for easy
          creation of React app without having to individually set up tools like
          Babel and Webpack, <b>Balsamiq:</b> Create mockup designs for our user
          interface,<b>Draw.io:</b> Build UML diagrams,
          <b>Selenium WebDriver:</b>
          Used for automated testing of our web application, <b>Mocha:</b>
          JavaScript test framework to test Node.js programs
        </p>

        {/* Github repo */}
        <h2>
          GitHub Repository:
          <a href="https://github.com/garzarobm/Vermillion_LineDriveBetting.git">
            LineDriveBetting
          </a>
        </h2>
      </div>
    );
  }
}

export default AboutPage;
