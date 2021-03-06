import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class PlayTile extends React.Component {

  showErrors() {
    if (this.props.error != '') {
      return this.props.translator("game."+this.props.error);
    }
    return '';
  }

  showSuccess() {
    if (this.props.success != '') {
      return this.props.translator("game."+this.props.success);
    }
    return '';
  }

  render() {
      return (
        <div>
          <Row>
            <Col xs={12}>
              <p>{this.props.translator("game.play_tile")}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p className="text-danger">{this.showErrors()}</p>
              <p className="text-success">{this.showSuccess()}</p>
            </Col>
          </Row>
        </div>
      );
  }

}

export default PlayTile;
