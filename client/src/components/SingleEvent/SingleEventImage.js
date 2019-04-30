import React, { Component } from 'react';
import '../../css/EventPage.css';
import { Row, Col } from 'reactstrap';
import '../../pages/EventPage';

class SingleEventImage extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Row className="event-image">
            <Col md="12" align="center">
              <img
                id="event-image"
                style={{ width: '800px' }}
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
