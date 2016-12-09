import React from 'react';
import Button from 'react-bootstrap/lib/Button';

var MINIMUM_PLAYERS = 3;

class StartGame extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.disabled = true;
    this.text = this.props.translator('lobby.start_game_disabled');
  }

  onClick () {
    var message = {"typ": "ini", "par": {}}
    this.props.conn.send(
        JSON.stringify(message)
    );
  }

  updateButtonState() {
    var neededPlayers = MINIMUM_PLAYERS-this.props.players.length;
    this.disabled = true;
    this.text = this.props.translator('lobby.start_game_disabled', {'number': neededPlayers});
    if (this.props.players.length > 2) {
      this.disabled = false;
      this.text = this.props.translator('lobby.start_game');
    }
  }

  render() {
    this.updateButtonState();
    return (
      <Button onClick={this.onClick} bsStyle="primary" bsSize="lg" disabled={this.disabled}>{this.text}</Button>
    );
  }

}

export default StartGame;