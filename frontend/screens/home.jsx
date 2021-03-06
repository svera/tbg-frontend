import React from 'react';
import GameCreate from '../components/game_create.jsx';
import GameJoin from '../components/game_join.jsx';
import Instructions from '../components/instructions.jsx';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class Home extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        language: this.props.language,
      };
      this.onClickLanguage = this.onClickLanguage.bind(this);
  }

  onClickLanguage(eventKey) {
    localStorage.setItem('language', eventKey);
    this.setState({language: eventKey})
  }

  render() {
    var info = sessionStorage.getItem('info');
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Acquire</a> <small>BETA</small>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight onSelect={this.onClickLanguage}>
              <NavItem href="#" eventKey="en">English</NavItem>
              <NavItem href="#" eventKey="es">Español</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Grid>
            <div className={info ? 'alert alert-warning' : 'hide'}>
              {info}
            </div>
            <Row>
              <Col xs={12} sm={7}>
                <h2 className="cover-heading">{this.props.translator('home.header')}</h2>
                <p className="lead">{this.props.translator('home.subheader')}</p>
                <GameCreate conn={this.props.conn} gameName="acquire" translator={this.props.translator} />
              </Col>
              <Col xs={12} sm={5}>
                <h2>{this.props.translator('available_games')}</h2>
                <GameJoin conn={this.props.conn} rooms={this.props.rooms} translator={this.props.translator} />
              </Col>
            </Row>
        </Grid>
        <footer className="footer">
            <div className="container">
                  <p className="text-muted text-center">&copy; 2017 <a href="http://sergiovera.es">Sergio Vera</a></p>
            </div>
        </footer>        
      </div>
    );
  }

}

export default Home;
