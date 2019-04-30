import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'reactstrap';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchEvent } from '../redux/actions/eventActions';
import { alertError } from '../redux/actions/alertActions';
import { connect } from 'react-redux';

import SingleEventInfo from '../components/SingleEvent/SingleEventInfoView.js';
import SingleEventImage from '../components/SingleEvent/SingleEventImage.js';
import store from '../helpers/store';

import '../css/EventPage.css';

class SingleEventPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setNavVisible());
    this.loadEvent = this.loadEvent.bind(this);
  }

  componentDidMount() {
    // first time profile page is loaded
    this.loadEvent(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    // switch between two profiles (when already on profile page)
    this.loadEvent(nextProps.match.params.id);
  }

  loadEvent(eventId) {
    this.props.dispatch(fetchEvent(eventId));
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
            <SingleEventImage />
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
