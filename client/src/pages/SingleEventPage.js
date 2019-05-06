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
    const event = this.props.event;
    this.state = {
      imageTag: event.imageTag,
      image: event.image
    };

    this.props.dispatch(setNavVisible());
  }

  componentDidMount() {
    this.loadEvent(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    // switch between two events (when already on event page)
    this.loadEvent(nextProps.match.params.id);
  }

  loadEvent(eventId) {
    this.props.dispatch(fetchEvent(eventId));
  }

  render() {
    return (
      <Container className='event-page-container'>
        <Row>
          <Col>
            <Helmet>
              <style>
                {'body { background-color: rgb(15, 25, 41, 10%); }'}
              </style>
            </Helmet>
            <SingleEventImage
              imageB64={
                this.state.image
                  ? this.state.imageTag + ',' + this.state.image
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

function mapStateToProps(state) {
  return {
    event: state.event.fetchedEvent
  };
}

export default connect(mapStateToProps)(SingleEventPage);
