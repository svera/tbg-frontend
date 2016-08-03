import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

class AddBot extends React.Component {

  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event) {
    console.log("entra");
    var message = {"typ": "bot", "par": {"lvl": event.target.value}}
    this.props.conn.send(
        JSON.stringify(message)
    );
  }

  render() {
    return (
      <Form inline>
        <FormGroup>
          <DropdownButton bsStyle="default" bsSize="xsmall" title={this.props.text} id="add-bot">
            <MenuItem value="random" onClick={this.onChangeHandler}>Random</MenuItem>
          </DropdownButton>
          &nbsp;
        </FormGroup>
      </Form>
    );
  }

}

export default AddBot;
