import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'reactstrap';
import { setNavVisible } from '../redux/actions/navigationActions';
import SingleEventInfo from '../components/SingleEvent/SingleEventInfoView.js';

import '../css/EventPage.css';

class SingleEventPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setNavVisible());
  }

  render() {
    return (
      <Container className="event-page-container">
        <Row>
          <Col>
            <Helmet>
              <style>
                {'body { background-color: rgb(15, 25, 41, 10%); }'}
              </style>
            </Helmet>
            <SingleEventInfo />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SingleEventPage;
