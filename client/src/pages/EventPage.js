import React, { Component } from 'react';
import EventCard from '../components/EventCard';
import SearchFieldEvent from '../components/SearchFieldEvent';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchEvents } from '../redux/actions/eventActions';
import store from '../helpers/store';

import '../css/EventPage.css';

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchEvents());
    this.props.dispatch(setNavVisible());
  }

  render() {
    let eventCards = <p className="no-data-found">Keine Events gefunden</p>;
    if (this.props.events && this.props.events.length > 0) {
      eventCards = this.props.events
        .filter(event =>
          event.permittedRoles.includes(store.getState().auth.user.role)
        )
        .map(event => <EventCard key={event._id} event={event} />);
    }
    return (
      <Container className="member-page-container">
        <Row>
          <Col>
            <h1 className="title">Events</h1>
            <Helmet>
              <style>
                {'body { background-color: rgb(15, 25, 41, 10%); }'}
              </style>
            </Helmet>

            <SearchFieldEvent />
            <Row className="member-cards-row" key={eventCards}>
              {eventCards}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.event.filteredEvents
  };
}

export default connect(mapStateToProps)(EventPage);
