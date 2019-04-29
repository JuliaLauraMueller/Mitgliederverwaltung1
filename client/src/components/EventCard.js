import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class EventCard extends Component {
  render() {
    return (
      <Card className="event-card" style={{ border: '1px solid white' }}>
        <CardBody>
          <Row>
            <Col xs="auto" sm={{ size: 'auto', offset: 1 }}>
              <div className="event-card-date">
                <CardText className="event-card-month">
                  {this.props.event.month}
                </CardText>
                <CardText className="event-card-day">
                  {this.props.event.day}
                </CardText>
                <CardText className="event-card-weekDay">
                  {this.props.event.weekDay}
                </CardText>
              </div>{' '}
            </Col>
            <Col>
              {' '}
              <div>
                <CardTitle className="event-card-title">
                  {this.props.event.title} <br />
                  {this.props.event.location}
                </CardTitle>
              </div>
              <div>
                <CardText className="event-card-time">
                  {this.props.event.startTime}
                </CardText>
              </div>
              <div>
                <CardText className="event-card-time">
                  {this.props.event.endTime}
                </CardText>
              </div>
              <div className="profile-link">
                <Link
                  className="profile-text"
                  to={`/event/${this.props.event._id}`}
                >
                  Weiterlesen
                  <svg
                    className="profile-arrow"
                    viewBox="0 0 7 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0.177999 1.02741L4.45449 5.91771L4.52644 6L4.45449 6.08229L0.177999 10.9726L1.19532 11.8255L5.9171 6.42454L5.91709 6.42454L5.91775 6.4238L6.29423 6L5.91775 5.5762L5.91775 5.57621L5.9171 5.57546L1.19532 0.174456L0.177999 1.02741Z" />
                  </svg>
                </Link>
              </div>{' '}
            </Col>
          </Row>

          <Col />
          <Col />
        </CardBody>
      </Card>
    );
  }
}

export default EventCard;
