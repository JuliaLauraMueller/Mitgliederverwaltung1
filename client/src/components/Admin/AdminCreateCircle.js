import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Col } from 'reactstrap';

import { connect } from 'react-redux';

const initialState = {
  name: ''
};

class AdminCreateCircle extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.createCircle = this.createCircle.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  cancel(event) {
    event.preventDefault();
    this.setState(initialState);
    this.props.close();
  }

  createCircle(event) {
    event.preventDefault();
    this.setState(initialState);
    console.log('circle create');
    // TODO: add logic
    this.props.close();
  }

  render() {
    return (
      <div>
        <h4>Neue City</h4>
        <Form onSubmit={this.createCircle}>
          <FormGroup row>
            <Label for="name" sm={2}>
              Name
            </Label>
            <Col>
              <Input
                type="text"
                id="name"
                name="name"
                className="admin-form-control"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <input
            type="button"
            className="admin-button"
            onClick={this.cancel}
            value="Abbrechen"
          />
          <input
            type="submit"
            className="admin-button"
            onClick={this.createCircle}
            value="Speichern"
          />
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AdminCreateCircle);
