import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class NewsCard extends Component {
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
    console.log(this.props);
    let trimmedcontent = this.props.newsArticle.content.substring(0, 80);
    if (this.props.newsArticle.content.length > 80)
      trimmedcontent = trimmedcontent + '...';
    return (
      <Card className="event-card" style={{ border: '1px solid white' }}>
        <CardBody>
          <Row>
            <Col>
              {' '}
              <div className="event-card-content">
                <div>
                  <CardTitle className="event-card-title">
                    {this.props.newsArticle.title} <br />
                  </CardTitle>
                </div>
                <div>
                  <CardText className="event-card-location">
                    {this.props.newsArticle.date}
                  </CardText>
                </div>
                <div>
                  <CardText className="event-card-time">
                    {this.props.newsArticle.author}
                  </CardText>
                </div>
                <div>
                  <CardText className="event-card-description">
                    {trimmedcontent}
                  </CardText>
                </div>
              </div>
            </Col>
            <Col>
              <div className="event-card-link">
                <Link
                  className="profile-text"
                  to={`/newsArticle/${this.props.newsArticle._id}`}
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
    );
  }
}

export default NewsCard;
