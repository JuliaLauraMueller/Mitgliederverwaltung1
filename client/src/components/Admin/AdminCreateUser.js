import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Col } from 'reactstrap';

import { fetchCircles } from '../../redux/actions/circleActions';

import { connect } from 'react-redux';

class AdminCreateUser extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      firstname: '',
      surname: '',
      email: '',
      password: ''
    };

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.createUser = this.createUser.bind(this);
    this.getCircleSelectOptions = this.getCircleSelectOptions.bind(this);
    this.props.dispatch(fetchCircles());
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  cancel() {
    this.props.close();
    this.setState(this.initialState);
  }

  createUser(event) {
    event.preventDefault();
    this.setState(this.initialState);
    console.log('user create');
    // TODO: add logic
    this.props.close();
  }

  render() {
    return (
      <div>
        <h4>Neues Mitglied</h4>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for="firstname" sm={2}>
              Vorname
            </Label>
            <Col>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                className="admin-form-control"
                value={this.state.firstname}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="surname" sm={2}>
              Nachname
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="surname"
                id="surname"
                className="admin-form-control"
                value={this.state.surname}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={2}>
              E-Mail
            </Label>
            <Col sm={10}>
              <Input
                type="email"
                name="email"
                id="email"
                className="admin-form-control"
                autoComplete="off"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>
              Passwort
            </Label>
            <Col sm={10}>
              <Input
                type="password"
                name="password"
                id="password"
                className="admin-form-control"
                autoComplete="new-password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for="circle">City</Label>
            <Input type="select" name="circle" id="circle">
              {this.getCircleSelectOptions()}
            </Input>
          </FormGroup>
          <button className="admin-button" onClick={this.props.close}>
            Abbrechen
          </button>
          <button className="admin-button" onClick={this.createUser}>
            Speichern
          </button>
        </Form>
      </div>
    );
  }

  getCircleSelectOptions() {
    return this.props.circles.map(circle => {
      return <option key={circle._id}>{circle.name}</option>;
    });
  }
}

function mapStateToProps(state) {
  return {
    circles: state.circle.circles
  };
}

export default connect(mapStateToProps)(AdminCreateUser);
