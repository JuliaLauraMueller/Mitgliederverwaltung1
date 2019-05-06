import React, { Component } from 'react';
import '../../css/EventPage.css';
import { Row, Col } from 'reactstrap';
import '../../pages/EventPage';

class SingleEventImage extends Component {
  render() {
    return (
      <Row>
        <Col align="center">
          <Row className="event-image">
            <Col md="12">
              <img
                id="event-image"
                src={require('../../img/event_default_image.png')}
                alt="event"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default SingleEventImage;
