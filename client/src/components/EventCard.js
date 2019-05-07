import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class EventCard extends Component {
  constructor(props) {
    super(props);
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
  }
  render() {
    let date = new Date(this.props.event.date);
    let weekday = this.days[date.getDay()];
    let month = this.months[date.getMonth()];
    let trimmedDescription = this.props.event.description.substring(0, 75);
    if (this.props.event.description.length > 75)
      trimmedDescription = trimmedDescription + '...';
    let trimmedLocation = this.props.event.location.substring(0, 14);
    if (this.props.event.location.length > 14)
      trimmedLocation = trimmedLocation + '...';
    return (
      <Row>
        <Col md={{ offset: 0, size: 4 }} xs={{ offset: 0 }}>
          <Card className="event-card" style={{ border: '1px solid white' }}>
            <CardBody>
              <Row>
                <Col xs="auto" sm={{ size: 'auto' }}>
                  <div className="event-card-date">
                    <CardText className="event-card-month">{month}</CardText>
                    <CardText className="event-card-day">
                      {date.getDate()}
                    </CardText>
                    <CardText className="event-card-weekDay">
                      {weekday}
                    </CardText>
                  </div>{' '}
                </Col>
                <Col>
                  {' '}
                  <div className="event-card-content">
                    <div>
                      <CardTitle className="event-card-title">
                        {this.props.event.title} <br />
                      </CardTitle>
                    </div>
                    <div>
                      <CardText className="event-card-location">
                        <span className="event-card-location-icon">
                          <svg
                            width="20"
                            height="30"
                            viewBox="0 0 20 30"
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
                        {trimmedLocation}
                      </CardText>
                    </div>
                    <div>
                      <CardText className="event-card-time">
                        {this.props.event.startTime}-{this.props.event.endTime}
                      </CardText>
                    </div>
                    <div>
                      <CardText className="event-card-description">
                        {trimmedDescription}
                      </CardText>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="event-card-link">
                    <Link
                      className="profile-text"
                      to={`/event/${this.props.event._id}`}
                    >
                      Mehr
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
        </Col>
      </Row>
    );
  }
}

export default EventCard;
