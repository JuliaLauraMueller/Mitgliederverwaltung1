import React, { Component } from 'react';
import '../../css/EventPage.css';
import { Row, Col } from 'reactstrap';
import '../../pages/EventPage';

class SingleEventImage extends Component {
  render() {
    return (
      <Row>
        <Col align="center">
          <Row>
            <Col xs="12">
              <div className="single-event-image">
                <img
                  id="single-event-image"
                  src={require('../../img/event_default_image.png')}
                  alt="event"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default SingleEventImage;
