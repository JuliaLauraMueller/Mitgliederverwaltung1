import React, { Component } from 'react';
import '../../css/EventPage.css';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  CardText
} from 'reactstrap';
import '../../pages/EventPage';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAttendee, removeAttendee } from '../../redux/actions/eventActions';
import store from '../../helpers/store';

class SingleEventInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attendeeModal: false,
      attendee: { accompaniments: 0 },
      isAttending: false
    };

    this.days = [
      'Sonntag',
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag'
    ];
    this.months = [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember'
    ];

    this.addAttendee = this.addAttendee.bind(this);
    this.removeAttendee = this.removeAttendee.bind(this);
    this.createAttendeeModal = this.createAttendeeModal.bind(this);
    this.toggleAttendeeModal = this.toggleAttendeeModal.bind(this);
    this.attendeeButtons = this.attendeeButtons.bind(this);
    this.attendingCount = this.attendingCount.bind(this);
  }

  render() {
    const event = this.props.event;
    let date = new Date(event.date);
    let registrationEndDate = new Date(event.registrationEndDate);
    let weekday = this.days[date.getDay()];
    let month = this.months[date.getMonth()];
    let circlesText = '';
    if (event.circles) {
      circlesText = event.circles.map(c => c.name).join(', ');
    }

    let attendee = { user: store.getState().auth.user._id, accompaniments: 0 };
    if (event.attendees) {
      const attendeesWithId = event.attendees.filter(
        att => att.user === store.getState().auth.user._id
      );

      if (attendeesWithId[0]) {
        attendee.user = attendeesWithId[0].user;
        attendee.accompaniments = attendeesWithId[0].accompaniments;
        attendee.isAttending = true;
      }
    }

    return (
      <div>
        {this.createAttendeeModal(attendee)}
        <Row>
          <Col md={{ offset: 0, size: 3 }} xs={{ offset: 0 }}>
            <Row className="date">
              <Col>
                <div className="event-date">
                  <CardText className="event-month">{month}</CardText>
                  <CardText className="event-day">{date.getDate()}</CardText>
                  <CardText className="event-weekDay">{weekday}</CardText>
                </div>{' '}
              </Col>
            </Row>
          </Col>

          <Col md={{ offset: 0, size: 5 }}>
            <Row className="overflow">
              <Col>
                <label className="event-title">{event.title} </label>
              </Col>
            </Row>
            <Row className="overflow">
              <Col>
                <span className="event-card-location-icon">
                  <svg
                    width="24"
                    height="35"
                    viewBox="0 0 24 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.89286 0C3.55734 0 0 3.34976 0 7.43229C0 11.3752 7.1888 24.0066 7.48524 24.53C7.55936 24.6696 7.70758 24.7743 7.89286 24.7743C8.07813 24.7743 8.22636 24.6696 8.30047 24.53C8.59691 24.0066 15.7857 11.3752 15.7857 7.43229C15.7857 3.34976 12.2284 0 7.89286 0ZM7.89286 23.4134C6.33652 20.622 0.926392 10.6425 0.926392 7.46718C0.926392 3.83827 4.03907 0.872334 7.89286 0.872334C11.7466 0.872334 14.8593 3.80338 14.8593 7.43229C14.8593 10.6425 9.44919 20.622 7.89286 23.4134Z"
                      fill="black"
                    />
                    <path
                      d="M7.8929 5.37378C6.2254 5.37378 4.85434 6.66483 4.85434 8.23503C4.85434 9.80524 6.2254 11.0963 7.8929 11.0963C9.56041 11.0963 10.9315 9.80524 10.9315 8.23503C10.9315 6.66483 9.56041 5.37378 7.8929 5.37378ZM7.8929 10.1891C6.74418 10.1891 5.78073 9.31673 5.78073 8.20014C5.78073 7.08355 6.70712 6.21122 7.8929 6.21122C9.07869 6.21122 10.0051 7.08355 10.0051 8.20014C10.0051 9.31673 9.04163 10.1891 7.8929 10.1891Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <label className="event-location">{event.location} </label>
              </Col>
            </Row>
            <Row className="overflow">
              <Col>
                <label className="event-time">{event.startTime}</label>
                <label className="event-time"> - </label>
                <label className="event-time">{event.endTime} </label>
              </Col>
            </Row>
          </Col>

          <Col md={{ offset: 0, size: 4 }} align="right">
            <Row className="event-anmeldung">
              <Col>{this.attendeeButtons(attendee.isAttending)}</Col>
            </Row>
            <Row className="event-anmeldung">
              <Col>{this.attendingCount()}</Col>
            </Row>
          </Col>

          <Col md={{ offset: 0, size: 12 }} xs={{ offset: 0 }}>
            <Row className="event-infos">
              <Col>
                <label className="event-description-title"> Infos </label>
              </Col>
            </Row>
            <Row className="event-infos">
              <Col>
                <label className="event-description-additional">
                  Cities: {circlesText}
                </label>
              </Col>
            </Row>
            <Row className="event-infos">
              <Col>
                <label className="event-description-additional">
                  Organisator: {event.organisationTeam}
                </label>
              </Col>
            </Row>
            <Row className="event-infos">
              <Col>
                <label className="event-description-additional">
                  Anmeldefrist bis: {registrationEndDate.getDate()}.{' '}
                  {this.months[registrationEndDate.getMonth()]}{' '}
                  {registrationEndDate.getFullYear()}
                </label>
              </Col>
            </Row>
            <Row className="event-infos">
              <Col>
                <label className="event-description">{event.description}</label>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

  attendingCount() {
    const amountAtt = this.props.event.attendees
      ? this.props.event.attendees.length
      : 0;
    let amountAcc = 0;
    if (amountAtt > 0) {
      this.props.event.attendees.forEach(attendee => {
        amountAcc += attendee.accompaniments;
      });
    }

    return (
      <label className="event-amount-attendence">
        {' '}
        Zusagen: {amountAtt} Begleitungen: {amountAcc}{' '}
      </label>
    );
  }

  attendeeButtons(isAttending) {
    let Buttons = {};

    if (isAttending) {
      Buttons = (
        <div>
          <Button
            className="button-attending"
            onClick={() => this.removeAttendee()}
          >
            Absagen
          </Button>
          <Button
            className="button-attending"
            onClick={() => this.toggleAttendeeModal()}
          >
            Begleitungen
          </Button>
        </div>
      );
    } else {
      Buttons = (
        <div>
          <Button
            className="button-attending"
            onClick={() => this.toggleAttendeeModal()}
          >
            Zusagen
          </Button>
        </div>
      );
    }

    return <div>{Buttons}</div>;
  }

  addAttendee(amount) {
    this.props.dispatch(
      addAttendee(this.props.event._id, { accompaniments: amount })
    );

    this.setState({ isAttending: true });
  }

  removeAttendee() {
    this.props.dispatch(removeAttendee(this.props.event._id));
    this.setState({ isAttending: false });
  }

  toggleAttendeeModal() {
    this.setState(prevState => ({
      attendeeModal: !prevState.attendeeModal
    }));
  }

  createAttendeeModal(attendee) {
    return (
      <Modal
        isOpen={this.state.attendeeModal}
        toggle={() => this.toggleAttendeeModal({})}
      >
        <ModalHeader>Begleitungen</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="accompaniments">Anzahl Begleitungen</Label>
              <Input
                type="select"
                name="accompaniments"
                id="accompaniments"
                defaultValue={attendee.accompaniments}
                onChange={e => (attendee.accompaniments = e.target.value)}
              >
                <option key="0" value="0">
                  0
                </option>
                <option key="1" value="1">
                  1
                </option>
                <option key="2" value="2">
                  2
                </option>
                <option key="3" value="3">
                  3
                </option>
                <option key="4" value="4">
                  4
                </option>
                <option key="5" value="5">
                  5
                </option>
                <option key="6" value="6">
                  6
                </option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <input
            type="submit"
            className="admin-button"
            color="primary"
            onClick={() => {
              this.addAttendee(attendee.accompaniments);
              this.toggleAttendeeModal({});
            }}
            value="Speichern"
          />
          <input
            type="button"
            className="admin-button"
            color="primary"
            onClick={() => {
              this.toggleAttendeeModal({});
            }}
            value="Abbrechen"
          />
        </ModalFooter>
      </Modal>
    );
  }
}

SingleEventInfo.propTypes = {
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event.fetchedEvent
});
export default connect(mapStateToProps)(SingleEventInfo);
