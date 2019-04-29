import React, { Component } from 'react';
import '../../css/EventPage.css';
import { Row, Col, Button } from 'reactstrap';
import '../../pages/EventPage';

class SingleEventInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        title: 'Bier-Event',
        describtion:
          'Dieser Bierevent ist dafür da, dass wir uns auch mal entspannen können und zusammen Freedom geniessen. Wir wollen gemeinsam auf unseren Erfolg anstossen. Essen wird zur Verfügung stehen aber wir wären froh wenn Ihr selbst Getränke mitnehmt, damit es sicher genug hat. Weiter wird es später Live-Musik geben von der Jazz-Band "Jazz-Musiker" und sie wären froh um eine Collecte für den Support. Endlich ist es so weit: Wir haben Sie in unserem Save-the-Date-Mail schon vorab informiert! Sie und Ihre Begleitung sind herzlich zur Weihnachtsfeier der Company.com GmbH eingeladen! Wir verwöhnen Sie dort mit köstlichen Schmankerln und werden im atemberaubenden Ambiente des Schloss Schönbrunn in Wien eine großartige Party feiern.  Wir verwöhnen Sie dort mit köstlichen Schmankerln und werden im atemberaubenden Ambiente des Schloss Schönbrunn in Wien eine großartige Party feiern.',
        circles: ['Bern'],
        dateMonth: 'Okt',
        dateDay: '13',
        dateWeekday: 'Sonntag',
        startTime: '18:00',
        endTime: '20:00',
        location: 'Berner Resti',
        organisationTeam: 'Marc Zimmermann',
        registrationEndDate: '10.02.2019',
        permittedRoles: [2, 3, 4]
      }
    };
  }

  render() {
    return (
      <Row>
        <Col md="6" align="center">
          <Row className="overflow">
            <Col>
              <label className="event-card-month">
                {' '}
                {this.state.event.dateMonth}{' '}
              </label>
            </Col>
          </Row>

          <Row className="overflow">
            <Col>
              <label className="event-card-day">
                {this.state.event.dateDay}{' '}
              </label>
            </Col>
          </Row>

          <Row className="overflow">
            <Col>
              <label className="event-card-weekDay">
                {this.state.event.dateWeekday}{' '}
              </label>
            </Col>
          </Row>
        </Col>

        <Col md="4" align="center">
          <Row className="overflow">
            <Col className="event-title-infos">
              <label className="event-title">{this.state.event.title} </label>
            </Col>
          </Row>

          <Row className="overflow">
            <Col className="event-title-infos">
              <label className="event-location">
                {this.state.event.location}{' '}
              </label>
            </Col>
          </Row>

          <Row className="overflow">
            <Col className="event-title-infos">
              <label className="event-time">{this.state.event.startTime}</label>
              <label className="event-time"> - </label>
              <label className="event-time">{this.state.event.endTime} </label>
            </Col>
          </Row>
        </Col>

        <Col md="12">
          <Row className="event-infos">
            <Col>
              <label className="event-description-title"> Infos </label>
            </Col>
          </Row>

          <Row className="event-infos">
            <Col>
              <label className="event-description">
                {this.state.event.describtion}{' '}
              </label>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default SingleEventInfoView;
