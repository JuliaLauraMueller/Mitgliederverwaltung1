import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';

import { fetchCircles } from '../../redux/actions/circleActions';
import { fetchMembers, createMember } from '../../redux/actions/memberActions';

import { alertError } from '../../redux/actions/alertActions';

import { connect } from 'react-redux';

const initialState = {
  firstname: '',
  surname: '',
  privateEmail: '',
  password: '',
  circle: '',
  godfather: ''
};

class AdminCreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.submitMember = this.submitMember.bind(this);
    this.cancel = this.cancel.bind(this);
    this.getCircleSelectOptions = this.getCircleSelectOptions.bind(this);
    this.props.dispatch(fetchCircles());
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  cancel(event) {
    event.preventDefault();
    this.setState(initialState);
    this.props.close();
  }

  async submitMember(event) {
    event.preventDefault();
    if (this.state.circle === '' && this.props.circles[0]) {
      this.state.circle = this.props.circles[0]._id; // set default value
    }
    await this.props
      .dispatch(createMember(this.state))
      .then(res => {
        this.setState(initialState);
        this.props.close();
        this.props.dispatch(fetchMembers());
      })
      .catch(errorMessages => {
        this.props.dispatch(alertError(errorMessages.join('\n')));
      });
  }

  render() {
    return (
      <div>
        <h4>Neues Mitglied</h4>
        <Form onSubmit={this.submitMember}>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="firstname">
                  Vorname
                  <pre className="required-field">*</pre>
                </Label>
              </Col>
              <Col xs="9">
                <Input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="admin-form-control"
                  value={this.state.firstname}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="surname">
                  Nachname<pre className="required-field">*</pre>
                </Label>
              </Col>
              <Col xs={9}>
                <Input
                  type="text"
                  name="surname"
                  id="surname"
                  className="admin-form-control"
                  value={this.state.surname}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="privateEmail">
                  <pre className="pre-mail">
                    E-Mail
                    <pre className="required-field">*</pre>
                  </pre>
                </Label>
              </Col>
              <Col xs={9}>
                <Input
                  type="email"
                  name="privateEmail"
                  id="privateEmail"
                  className="admin-form-control"
                  autoComplete="off"
                  value={this.state.privateEmail}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="password">
                  Passwort<pre className="required-field">*</pre>
                </Label>
              </Col>
              <Col xs={9}>
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
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="godfather">Götti</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type="text"
                  name="godfather"
                  id="godfather"
                  className="admin-form-control"
                  autoComplete="off"
                  value={this.state.godfather}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="circle">
                  City<pre className="required-field">*</pre>
                </Label>
              </Col>
              <Col xs={9}>
                <Input
                  type="select"
                  name="circle"
                  id="circle"
                  value={this.state.circle}
                  onChange={this.handleChange}
                >
                  {this.getCircleSelectOptions()}
                </Input>
              </Col>
            </Row>
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
            onClick={this.submitMember}
            value="Speichern"
          />
        </Form>
      </div>
    );
  }

  getCircleSelectOptions() {
    return this.props.circles.map(circle => {
      return (
        <option key={circle._id} value={circle._id}>
          {circle.name}
        </option>
      );
    });
  }
}

function mapStateToProps(state) {
  return {
    circles: state.circle.circles
  };
}

export default connect(mapStateToProps)(AdminCreateUser);
