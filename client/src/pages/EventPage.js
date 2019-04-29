import React, { Component } from 'react';
import MemberCard from '../components/MemberCard';
import EventCard from '../components/EventCard';
import SearchFieldMember from '../components/SearchFieldMember';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchMembers } from '../redux/actions/memberActions';

import '../css/Member.css';
import '../css/EventPage.css';

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchMembers());
    this.props.dispatch(setNavVisible());
    this.state = {
      events: [
        {
          _id: 1,
          title: 'Bierevent',
          describtion:
            'Dieser Bierevent ist dafür da, dass wir uns auch mal entspannen können und zusammen Freedom geniessen',
          circles: ['Bern'],
          date: '21.02.2019',
          startTime: '18:00',
          endTime: '20:00',
          location: 'Berner Resti',
          organisationTeam: 'Marc Zimmermann',
          registrationEndDate: '10.02.2019',
          permittedRoles: [2, 3, 4],
          month: 'Okt',
          weekDay: 'Sonntag',
          day: 13
        }
      ]
    };
  }

  render() {
    console.log(this.state.events);
    let eventCards = this.state.events.map(event => {
      return <EventCard key={event._id} event={event} />;
    });
    return (
      <Container className="member-page-container">
        <Row>
          <Col>
            <Helmet>
              <style>
                {'body { background-color: rgb(15, 25, 41, 10%); }'}
              </style>
            </Helmet>

            <SearchFieldMember />
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
    members: state.member.filteredMembers
  };
}

export default connect(mapStateToProps)(EventPage);
