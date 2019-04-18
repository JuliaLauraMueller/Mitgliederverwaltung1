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
          'Dieser Bierevent ist dafür da, dass wir uns auch mal entspannen können und zusammen Freedom geniessen',
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
          <Col className="event-dateMonth">
            <label> {this.state.event.dateMonth} </label>
          </Col>

          <Col>
            <label className="event-dateDay">{this.state.event.dateDay} </label>
          </Col>

          <Col className="event-dateweekday">
            <label> {this.state.event.dateWeekday} </label>
          </Col>
        </Col>

        <Col md={{ offset: 0, size: 6 }} xs={{ offset: 1 }}>
          <Col>
            <label className="event-title">{this.state.event.title} </label>
          </Col>

          <Col>
            <label className="">{this.state.event.location} </label>
          </Col>

          <Col>
            <label className="">{this.state.event.startTime}</label>
            <label className=""> - </label>
            <label className="">{this.state.event.endTime} </label>
          </Col>
        </Col>

        <Row>
          <Col>
            <Col className="event-dateweekday">
              <label> Infos </label>
              <label> {this.state.event.describtion} </label>
            </Col>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default SingleEventInfoView;
