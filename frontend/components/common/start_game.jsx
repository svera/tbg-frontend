import React from 'react';

class StartGame extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick () {
    var message = {"typ": "ini", "rom": this.props.gameID, "par": {}}
    console.log(JSON.stringify(message))
    this.props.conn.send(
        JSON.stringify(message)
    );
  }

  render() {
    return (
      <button onClick={this.onClick} className="btn btn-default">Start game</button>
    );
  }

}

export default StartGame;
