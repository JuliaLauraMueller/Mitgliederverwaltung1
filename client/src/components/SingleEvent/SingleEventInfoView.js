import React, { Component } from 'react';
import '../../css/EventPage.css';
import { Row, Col } from 'reactstrap';

class SingleEventInfoView extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Col>
            <img
              id="event-image"
              style={{ width: '180px' }}
              src={require('../../img/event_default_image.png')}
              alt="event"
            />
          </Col>
        </Col>
      </Row>
    );
  }
}

export default SingleEventInfoView;
