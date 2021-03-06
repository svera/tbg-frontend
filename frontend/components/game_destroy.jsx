import React from 'react';
import NavItem from 'react-bootstrap/lib/NavItem';

class GameDestroy extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    var message = {"typ": "ter", "cnt": {}}
    this.props.conn.send(
        JSON.stringify(message)
    );
  }

  render() {
    if (sessionStorage.getItem('role') == 'mng') {
      return (
        <NavItem onClick={this.handleClick}>{this.props.text}</NavItem>
      );
    }
    return null;
  }

}

export default GameDestroy;
