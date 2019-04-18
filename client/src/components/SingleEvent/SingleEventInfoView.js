import React, { Component } from 'react';
import '../../css/EventPage.css';
import { Row, Col, Button } from 'reactstrap';

class SingleEventInfoView extends Component {
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

            <Col className="event-date" />
          </Row>
        </Col>
      </Row>
    );
  }
}

export default SingleEventInfoView;
