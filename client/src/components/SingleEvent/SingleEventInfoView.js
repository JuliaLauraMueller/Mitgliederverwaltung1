import React, { Component } from 'react';
import '../../css/EventPage.css';
import { Row, Col, Button } from 'reactstrap';
import '../../pages/EventPage';

class SingleEventInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        title: 'Bier-Treffen-Event',
        describtion:
          'Dieser Bierevent ist dafür da, dass wir uns auch mal entspannen können und zusammen Freedom geniessen. Wir wollen gemeinsam auf unseren Erfolg anstossen. Essen wird zur Verfügung stehen aber wir wären froh wenn Ihr selbst Getränke mitnehmt, damit es sicher genug hat. Weiter wird es später Live-Musik geben von der Jazz-Band "Jazz-Musiker" und sie wären froh um eine Collecte für den Support. Endlich ist es so weit: Wir haben Sie in unserem Save-the-Date-Mail schon vorab informiert! Sie und Ihre Begleitung sind herzlich zur Weihnachtsfeier der Company.com GmbH eingeladen! Wir verwöhnen Sie dort mit köstlichen Schmankerln und werden im atemberaubenden Ambiente des Schloss Schönbrunn in Wien eine großartige Party feiern.  Wir verwöhnen Sie dort mit köstlichen Schmankerln und werden im atemberaubenden Ambiente des Schloss Schönbrunn in Wien eine großartige Party feiern.',
        circles: ['Bern', , ',', ' ', 'Zürich'],
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
        <Col md={{ offset: 0, size: 4 }} xs={{ offset: 2 }} align="center">
          <Row className="date">
            <Col>
              <label className="event-month">
                {this.state.event.dateMonth}{' '}
              </label>
            </Col>
          </Row>
          <Row className="date">
            <Col>
              <label className="event-day">{this.state.event.dateDay} </label>
            </Col>
          </Row>
          <Row className="date">
            <Col>
              <label className="event-weekDay">
                {this.state.event.dateWeekday}
              </label>
            </Col>
          </Row>
        </Col>

        <Col md={{ offset: 0, size: 6 }} xs={{ offset: 6 }}>
          <Row className="overflow">
            <Col>
              <label className="event-title">{this.state.event.title} </label>
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
              <label className="event-location">
                {this.state.event.location}{' '}
              </label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label className="event-time">{this.state.event.startTime}</label>
              <label className="event-time"> - </label>
              <label className="event-time">{this.state.event.endTime} </label>
            </Col>
          </Row>
        </Col>

        <Col md={{ offset: 0, size: 12 }} xs={{ offset: 6 }} align="right">
          <Row className="event-anmeldung">
            <Col>
              <Button className="button-attending">Zusagen</Button>
              <Button className="button-accompaniments">+</Button>
            </Col>
          </Row>
          <Row className="event-anmeldung">
            <Col>
              <label className=""> Zusagen: 13 Begleitungen: 5 </label>
            </Col>
          </Row>
        </Col>

        <Col md={{ offset: 0, size: 12 }} xs={{ offset: 2 }}>
          <Row className="event-infos">
            <Col>
              <label className="event-description-title"> Infos </label>
            </Col>
          </Row>
          <Row className="event-infos">
            <Col>
              <label className="event-description-additional">
                Cities: {this.state.event.circles}
              </label>
            </Col>
          </Row>
          <Row className="event-infos">
            <Col>
              <label className="event-description-additional">
                Organisator: {this.state.event.organisationTeam}
              </label>
            </Col>
          </Row>
          <Row className="event-infos">
            <Col>
              <label className="event-description-additional">
                Anmeldefrist bis: {this.state.event.registrationEndDate}
              </label>
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
