import React from 'react';
import {render} from 'react-dom';
import Home from './screens/home.jsx';
import Lobby from './screens/lobby.jsx';
import Game from './screens/game.jsx';
import {en} from './languages/en.js';
import {es} from './languages/es.js';
import Polyglot from 'node-polyglot';
import ReconnectingWebSocket from 'reconnecting-websocket';
import config from './config.js';

require('../css/display.scss');

const HOME = 0
const LOBBY = 1
const GAME = 2

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        screen: HOME,
        game: '',
        gameID: '',
        players: [],
        status: null,
        rooms: [],
        error: '',
      };

      this.initLanguages();
      sessionStorage.setItem('info', '');
      this.conn = new ReconnectingWebSocket(config.wsServer);

      this.conn.onmessage = (e) => {
        this.parseMessage(e.data);
      }

      this.conn.onclose = (e) => {
        sessionStorage.setItem('info', this.t("connection_lost"));
        this.setState({
          screen: HOME
        });
      }

      this.conn.onopen = () => {
        sessionStorage.setItem('info', '');
        this.setState({
          screen: HOME
        });
      }

      this.t = this.t.bind(this);
    }

    initLanguages() {
      if (!localStorage.getItem('language')) {
        localStorage.setItem('language', 'en');
      }
      this.polyglot = new Polyglot();
      this.polyglot.extend(en);
      this.polyglot.extend(es);
      return localStorage.getItem('language');
    }

    // Return the translation for the passed key in the current language
    t(key, values) {
      return this.polyglot.t(localStorage.getItem('language') + "." + key, values);
    }

    parseMessage(data) {
      var msg = JSON.parse(data);
      switch (msg.typ) {
        case "out":
          if (msg.rea == 'ter') {
            sessionStorage.setItem('info', this.t("game_terminated"));
          }
          if (msg.rea == 'kck') {
            sessionStorage.setItem('info', this.t("kicked"));
          }
          if (msg.rea == 'tim') {
            sessionStorage.setItem('info', this.t("room_timed_out"));
          }
          if (msg.rea == 'ptm') {
            sessionStorage.setItem('info', this.t("player_timeout"));
          }
          if (msg.rea == 'pan') {
            sessionStorage.setItem('info', this.t("game_panicked"));
          }
         sessionStorage.setItem('role', '');
          this.setState({
            screen: HOME,
            error: ''
          });
          break;

        case "err":
          this.setState({
            error: msg.cnt,
          });
          break;

        case "rms":
          this.setState({
            rooms: msg.val
          })
          break;

        case "pls":
          if (this.state.screen == HOME || this.state.screen == LOBBY) {
            this.setState({
              screen: LOBBY,
              players: msg.val
            });
          }
          break;

        case "joi":
          if (msg.own) {
            sessionStorage.setItem('role', 'mng');
          }
          sessionStorage.setItem('clientNumber', msg.num);
          if (localStorage.getItem('clientName') == "") {
            localStorage.setItem('clientName', 'Player '+msg.num);
          }
          this.setState({
            screen: LOBBY,
            gameID: msg.id
          });          
          break;

        case "upd":
          this.setState({
            screen: GAME,
            game: 'acquire',
            status: msg,
            error: '',
          });
          break;
      }
    }

  render() {
    switch (this.state.screen) {
      case HOME:
        return (<Home conn={this.conn} translator={this.t} language={localStorage.getItem('language')} rooms={this.state.rooms} />);
      case LOBBY:
        return (<Lobby gameID={this.state.gameID} players={this.state.players} conn={this.conn} translator={this.t} />);
      case GAME:
        return (<Game conn={this.conn} status={this.state.status} error={this.state.error} translator={this.t} />);
    }
  }

}

render(<App/>, document.getElementById('root'));
