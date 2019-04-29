import React, { Component } from 'react';
import MemberCard from '../components/MemberCard';
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
    const events = [
      {
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
        permittedRoles: [2, 3, 4]
      }
    ];
  }

  render() {
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
