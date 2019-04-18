import React, { Component } from 'react';
import '../../css/EventPage.css';
import { Row, Col, Button } from 'reactstrap';
import '../../pages/EventPage';

class SingleEventImage extends Component {
  render() {
    return (
      <Row>
        <Col md="6" align="center">
          <Row>
            <Col>
              <img
                id="event-image"
                style={{ width: '600px' }}
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
