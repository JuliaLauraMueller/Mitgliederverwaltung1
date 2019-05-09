import React, { Component } from 'react';
import '../../css/EventPage.css';
import { Row, Col } from 'reactstrap';
import '../../pages/EventPage';

class SingleEventImage extends Component {
  render() {
    return (
      <Row>
        <Col align='center'>
          <Row>
            <Col md='12'>
              <div className='event-image'>
                <img
                  id='event-image'
                  src={
                    this.props.imageB64 === ''
                      ? require('../../img/event_default_image.png')
                      : this.props.imageB64
                  }
                  alt='event'
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
