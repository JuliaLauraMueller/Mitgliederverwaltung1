import React, { Component } from 'react';
import MemberCard from '../components/MemberCard';
import SearchFieldMember from '../components/SearchFieldMember';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchMembers } from '../redux/actions/memberActions';

import '../css/Member.css';

class MemberPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchMembers());
    this.props.dispatch(setNavVisible());
  }

  render() {
    if (this.props.isLoading) {
      return (
        <Container className='member-page-container'>
          <Row>
            <Col xs='12'>
              <Helmet>
                <style>
                  {'body { background-color: rgb(15, 25, 41, 10%); }'}
                </style>
              </Helmet>

              <SearchFieldMember />
              <img
                src={require('../img/LoadingIcon.gif')}
                alt='loading-icon'
                className='loading-icon'
              />
            </Col>
          </Row>
        </Container>
      );
    }
    {
      let memberCards = this.props.members.map(member => {
        return <MemberCard key={member._id} member={member} />;
      });
      return (
        <Container className='loading-icon-container'>
          <Row>
            <Col xs='12'>
              <Helmet>
                <style>
                  {'body { background-color: rgb(15, 25, 41, 10%); }'}
                </style>
              </Helmet>

              <SearchFieldMember />
              <Row className='member-cards-row' key={memberCards}>
                {memberCards}
              </Row>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    members: state.member.filteredMembers,
    isLoading: state.loading.isLoading
  };
}

export default connect(mapStateToProps)(MemberPage);
