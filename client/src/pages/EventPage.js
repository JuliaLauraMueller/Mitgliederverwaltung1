import React, { Component } from 'react';
import EventCard from '../components/EventCard';
import SearchFieldEvent from '../components/SearchFieldEvent';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchEvents } from '../redux/actions/eventActions';
import store from '../helpers/store';
import classnames from 'classnames';

import '../css/EventPage.css';

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchEvents());
    this.props.dispatch(setNavVisible());
    this.state = {
      prevScrollpos: window.pageYOffset,
      visible: true
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };

  render() {
    let searchField = <div />;
    if (window.innerWidth <= 1200 || window.innerHeight <= 740) {
      searchField = (
        <div
          className={classnames('search-container', {
            'search-container--hidden': !this.state.visible
          })}
        >
          <SearchFieldEvent />
        </div>
      );
    } else {
      searchField = (
        <div
          className={classnames('search-container-full', {
            'search-container--hidden': !this.state.visible
          })}
        >
          <SearchFieldEvent />
        </div>
      );
    }
    let eventCards = <p className="no-data-found">Keine Events gefunden</p>;
    if (this.props.events && this.props.events.length > 0) {
      eventCards = this.props.events
        .filter(event =>
          event.permittedRoles.includes(store.getState().auth.user.role)
        )
        .map(event => <EventCard key={event._id} event={event} />);
    }
    let content = <div />;
    if (this.props.isLoading) {
      content = (
        <div>
          <img
            src={require('../img/LoadingIcon.gif')}
            alt='loading-icon'
            className='loading-icon'
          />
        </div>
      );
    } else {
      content = (
        <Row className='member-cards-row' key={eventCards}>
          {eventCards}
        </Row>
      );
    }
    return (
      <Container className='member-page-container'>
        <Row>
          <Col>
            <h1 className='title'>Events</h1>
            <Helmet>
              <style>
                {'body { background-color: rgb(15, 25, 41, 10%); }'}
              </style>
            </Helmet>
            {searchField}

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
    events: state.event.filteredEvents,
    isLoading: state.loading.isLoading
  };
}

export default connect(mapStateToProps)(EventPage);
