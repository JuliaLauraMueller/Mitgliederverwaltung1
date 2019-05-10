import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'reactstrap';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchEvent } from '../redux/actions/eventActions';
import { connect } from 'react-redux';

import SingleEventInfo from '../components/SingleEvent/SingleEventInfoView.js';
import SingleEventImage from '../components/SingleEvent/SingleEventImage.js';

import '../css/EventPage.css';

class SingleEventPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setNavVisible());
    this.loadEvent(this.props.match.params.id);
  }

  loadEvent(eventId) {
    this.props.dispatch(fetchEvent(eventId));
  }

  render() {
    if (this.props.isLoading) {
      return (
        <Container className="loading-icon-container">
          <Row>
            <Col xs="12">
              <Col md="12" />
              <div className="search-form" />
              <img
                src={require('../img/LoadingIcon.gif')}
                alt="loading-icon"
                className="loading-icon"
              />
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container className="event-page-container">
          <Row>
            <Col>
              <Helmet>
                <style>
                  {'body { background-color: rgb(15, 25, 41, 10%); }'}
                </style>
              </Helmet>
              <SingleEventImage
                imageB64={
                  this.props.image
                    ? this.props.imageTag + ',' + this.props.image
                    : ''
                }
              />
              <SingleEventInfo />
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    imageTag: state.event.fetchedEvent.imageTag,
    image: state.event.fetchedEvent.image,
    isLoading: state.loading.isLoading
  };
}

export default connect(mapStateToProps)(SingleEventPage);
