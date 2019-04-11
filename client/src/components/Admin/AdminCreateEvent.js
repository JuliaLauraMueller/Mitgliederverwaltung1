import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';

import { fetchCircles } from '../../redux/actions/circleActions';
//import { fetchEvents } from '../../redux/actions/eventActions';
//import { fetchEvents, createEvent } from '../../redux/actions/eventActions';

import { alertError } from '../../redux/actions/alertActions';

import { connect } from 'react-redux';

const initialState = {
  title: '',
  description: '',
  cities: '',
  date: '',
  startTime: '',
  endTime: '',
  location: '',
  organisationTeam: '',
  registrationEndDate: '',
  permittedRoles: '',
  img: ''
};

class AdminCreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.submitEvent = this.submitEvent.bind(this);
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

  async submitEvent(event) {
    event.preventDefault();
    if (this.state.event === '' && this.props.circles[0]) {
      this.state.event = this.props.events[0]._id; // set default value
    }
    await this.props
      .dispatch(createEvent(this.state))
      .then(res => {
        this.setState(initialState);
        this.props.close();
        this.props.dispatch(fetchEvents());
      })
      .catch(errorMessages => {
        this.props.dispatch(alertError(errorMessages.join('\n')));
      });
  }

  render() {
    return (
      <div>
        <h4>Neues Event</h4>
        <Form onSubmit={this.submitEvent}>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="title">Titel</Label>
              </Col>
              <Col xs="9">
                <Input
                  type="text"
                  name="title"
                  id="title"
                  className="admin-form-control"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="description">Beschreibung</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  className="admin-form-control"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="cities">Cities</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type="select"
                  name="cities"
                  id="cities"
                  value={this.state.cities}
                  onChange={this.handleChange}
                >
                  {this.getCircleSelectOptions()}
                </Input>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="date">Datum</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  className="admin-form-control"
                  autoComplete="off"
                  value={this.state.date}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="startTime">Beginn</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type="text"
                  name="startTime"
                  id="startTime"
                  className="admin-form-control"
                  autoComplete="new-password"
                  value={this.state.startTime}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="endTime">Ende</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type="text"
                  name="endTime"
                  id="endTime"
                  className="admin-form-control"
                  autoComplete="new-password"
                  value={this.state.endTime}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="location">Ort</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  className="admin-form-control"
                  value={this.state.location}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="organisationTeam">Organisation</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type="text"
                  name="organisationTeam"
                  id="organisationTeam"
                  className="admin-form-control"
                  value={this.state.organisationTeam}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="registrationEndDate">Anmeldeschluss</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type="text"
                  name="registrationEndDate"
                  id="registrationEndDate"
                  className="admin-form-control"
                  value={this.state.registrationEndDate}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="permittedRoles">Rollen</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type="select"
                  name="permittedRoles"
                  id="permittedRoles"
                  value={this.state.cities}
                  onChange={this.handleChange}
                >
                  {this.getCircleSelectOptions()}
                </Input>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="img">Bild</Label>
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
            onClick={this.submitEvent}
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
