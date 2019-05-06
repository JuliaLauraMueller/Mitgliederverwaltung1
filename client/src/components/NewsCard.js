import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Row, Col } from 'reactstrap';

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
    let previewContent = this.props.newsArticle.content.substring(0, 320);
    let wrappedContent = this.props.newsArticle.content.substring(320, 1000);
    if (this.props.newsArticle.content.length > 320)
      previewContent = previewContent + '...';
    return (
      <Card className="news-card" style={{ border: '1px solid white' }}>
        <CardBody>
          <Row>
            <Col>
              {' '}
              <div className="news-card-content">
                <div>
                  <CardTitle className="news-card-title">
                    {this.props.newsArticle.title} <br />
                  </CardTitle>
                </div>
                <div>
                  <CardText className="news-card-date">
                    {this.props.newsArticle.date}
                  </CardText>
                </div>
                <div>
                  <CardText className="news-card-author">
                    {this.props.newsArticle.author}
                  </CardText>
                </div>
                <div>
                  <div className="news-card-description">
                    <input
                      type="checkbox"
                      className="read-more-state"
                      id={this.props.newsArticle._id}
                    />
                    <CardText className="read-more-wrap">
                      {previewContent}{' '}
                      <span className="read-more-target">{wrappedContent}</span>
                    </CardText>

                    <label
                      htmlFor={this.props.newsArticle._id}
                      className="read-more-trigger"
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col />
          </Row>

          <Col />
          <Col />
        </CardBody>
      </Card>
    );
  }
}

export default NewsCard;
