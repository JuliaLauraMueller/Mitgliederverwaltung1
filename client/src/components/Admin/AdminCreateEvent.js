import React, { Component } from 'react';

import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { fetchCircles } from '../../redux/actions/circleActions';
import { fetchEvents, createEvent } from '../../redux/actions/eventActions';
import { alertError } from '../../redux/actions/alertActions';
import { connect } from 'react-redux';

const initialState = {
  title: '',
  description: '',
  date: '',
  startTime: '',
  endTime: '',
  location: '',
  organisationTeam: '',
  registrationEndDate: '',
  image: '',
  imageTag: '',
  circles: [],
  permittedRoles: []
};

class AdminCreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
      citiesDropdownOpen: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitEvent = this.submitEvent.bind(this);
    this.cancel = this.cancel.bind(this);
    this.props.dispatch(fetchCircles());
    this.handleCitiesSelection = this.handleCitiesSelection.bind(this);
    this.handleRoleSelection = this.handleRoleSelection.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleFileSelection = this.handleFileSelection.bind(this);
    this.getBase64 = this.getBase64.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  cancel(event) {
    event.preventDefault();
    this.setState(initialState);
    this.props.close();
  }

  handleCitiesSelection(event) {
    event.persist();
    if (event.target.checked) {
      this.setState({ circles: [...this.state.circles, event.target.id] });
    } else {
      let newCircles = this.state.circles;
      newCircles.splice(newCircles.indexOf(event.target.id), 1);
      this.setState({
        circles: newCircles
      });
    }
  }

  handleRoleSelection(event) {
    event.persist();
    if (event.target.checked) {
      this.setState({
        permittedRoles: [
          ...this.state.permittedRoles,
          Number(event.target.value)
        ]
      });
    } else {
      let newPermittedRoles = [...this.state.permittedRoles];
      newPermittedRoles.splice(
        newPermittedRoles.indexOf(Number(event.target.value)),
        1
      );
      this.setState({
        permittedRoles: newPermittedRoles
      });
    }
  }

  toggle() {
    this.setState({
      citiesDropdownOpen: !this.state.citiesDropdownOpen
    });
  }

  async submitEvent(event) {
    event.preventDefault();
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

  async handleFileSelection(event) {
    var something = event.target.files[0];

    let fileInB64 = await this.getBase64(something);
    let splitArr = fileInB64.split(',');
    console.log(splitArr[0] + ',' + splitArr[1]);
    this.setState({
      imageTag: splitArr[0],
      image: splitArr[1]
    });
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  render() {
    let circleLabels = this.props.circles.map(circle => {
      return (
        <div className='checkbox-container' key={circle._id}>
          <input
            type='checkbox'
            id={circle._id}
            onClick={this.handleCitiesSelection.bind(this)}
            defaultChecked={this.state.circles.includes(circle._id)}
          />

          <label htmlFor={circle._id} className='filter-cities'>
            {circle.name}
          </label>
        </div>
      );
    });

    return (
      <div>
        <h4>Neuer Event</h4>
        <Form onSubmit={this.submitEvent}>
          <FormGroup>
            <Row>
              <Col xs='3'>
                <Label for='image'>Eventbild</Label>
              </Col>
              <Col xs='9'>
                <img
                  src={
                    this.state.image !== ''
                      ? this.state.imageTag + ',' + this.state.image
                      : require('../../img/event_default_image.png')
                  }
                  alt='event-picture'
                  style={{ width: '100%', height: 'auto' }}
                />
                <Col>
                  <input
                    type='file'
                    id='pictureUpload'
                    onChange={this.handleFileSelection}
                    className='hidden'
                  />
                  <label htmlFor='pictureUpload' className='picture-button'>
                    Neues Eventbild
                  </label>
                </Col>
              </Col>
            </Row>
            <Row>
              <Col xs='3'>
                <Label for='title'>Titel</Label>
              </Col>
              <Col xs='9'>
                <Input
                  type='text'
                  name='title'
                  id='title'
                  className='admin-form-control'
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs='3'>
                <Label for='description'>Beschreibung</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type='text'
                  name='description'
                  id='description'
                  className='admin-form-control'
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs='3'>
                <Label for='description'>Cities</Label>
              </Col>
              <ButtonDropdown
                isOpen={this.state.citiesDropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle
                  caret
                  className='filter-button'
                  color={'rgb(15, 25, 41, 40%)'}
                />

                <DropdownMenu>
                  <DropdownItem header>Cities wählen</DropdownItem>
                  {circleLabels}
                </DropdownMenu>
              </ButtonDropdown>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs='3'>
                <Label for='date'>Datum</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type='date'
                  name='date'
                  id='date'
                  className='admin-form-control'
                  autoComplete='off'
                  value={this.state.date}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs='3'>
                <Label for='startTime'>Beginn</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type='text'
                  name='startTime'
                  id='startTime'
                  className='admin-form-control'
                  autoComplete='new-password'
                  value={this.state.startTime}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs='3'>
                <Label for='endTime'>Ende</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type='text'
                  name='endTime'
                  id='endTime'
                  className='admin-form-control'
                  autoComplete='new-password'
                  value={this.state.endTime}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs='3'>
                <Label for='location'>Ort</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type='text'
                  name='location'
                  id='location'
                  className='admin-form-control'
                  value={this.state.location}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs='3'>
                <Label for='organisationTeam'>Organisation</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type='text'
                  name='organisationTeam'
                  id='organisationTeam'
                  className='admin-form-control'
                  value={this.state.organisationTeam}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs='3'>
                <Label for='registrationEndDate'>Anmeldefrist</Label>
              </Col>
              <Col xs={9}>
                <Input
                  type='date'
                  name='registrationEndDate'
                  id='registrationEndDate'
                  className='admin-form-control'
                  value={this.state.registrationEndDate}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs='3'>
                <Label for='permittedRoles'>Rollen</Label>
              </Col>
              <Col xs={9}>
                <div className='checkbox-container' key='0'>
                  <input
                    type='checkbox'
                    id='mitglied'
                    value='0'
                    onChange={this.handleRoleSelection.bind(this)}
                    checked={this.state.permittedRoles.includes(0)}
                  />
                  <label htmlFor='mitglied' className='filter-cities'>
                    Mitglied
                  </label>
                </div>
                <div className='checkbox-container' key='1'>
                  <input
                    type='checkbox'
                    id='newsadministrator'
                    value='1'
                    onChange={this.handleRoleSelection.bind(this)}
                    checked={this.state.permittedRoles.includes(1)}
                  />
                  <label htmlFor='newsadministrator' className='filter-cities'>
                    Newsadministrator
                  </label>
                </div>
                <div className='checkbox-container' key='2'>
                  <input
                    type='checkbox'
                    id='eventadministrator'
                    value='2'
                    onChange={this.handleRoleSelection.bind(this)}
                    checked={this.state.permittedRoles.includes(2)}
                  />
                  <label htmlFor='eventadministrator' className='filter-cities'>
                    Eventadministrator
                  </label>
                </div>
                <div className='checkbox-container' key='3'>
                  <input
                    type='checkbox'
                    id='personaladministrator'
                    value='3'
                    onChange={this.handleRoleSelection.bind(this)}
                    checked={this.state.permittedRoles.includes(3)}
                  />
                  <label
                    htmlFor='personaladministrator'
                    className='filter-cities'
                  >
                    Personaladministrator
                  </label>
                </div>
                <div className='checkbox-container' key='4'>
                  <input
                    type='checkbox'
                    id='cityadministrator'
                    value='4'
                    onChange={this.handleRoleSelection.bind(this)}
                    checked={this.state.permittedRoles.includes(4)}
                  />
                  <label htmlFor='cityadministrator' className='filter-cities'>
                    Cityadministrator
                  </label>
                </div>
                <div className='checkbox-container' key={5}>
                  <input
                    type='checkbox'
                    id='federationsadministrator'
                    value='5'
                    onChange={this.handleRoleSelection.bind(this)}
                    checked={this.state.permittedRoles.includes(5)}
                  />
                  <label
                    htmlFor='federationsadministrator'
                    className='filter-cities'
                  >
                    Federationsadministrator
                  </label>
                </div>
              </Col>
            </Row>
          </FormGroup>
          <input
            type='button'
            className='admin-button'
            onClick={this.cancel}
            value='Abbrechen'
          />
          <input
            type='submit'
            className='admin-button'
            onClick={this.submitEvent}
            value='Speichern'
          />
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    circles: state.circle.circles
  };
}

export default connect(mapStateToProps)(AdminCreateEvent);
