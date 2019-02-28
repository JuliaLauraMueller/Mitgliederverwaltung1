import React, { Component } from 'react';
import MemberCard from '../components/MemberCard';
import SearchFieldMember from '../components/SearchFieldMember';
import { Helmet } from 'react-helmet';
import { Container, Row } from 'reactstrap';
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
    let memberCards = this.props.members.map(member => {
      return <MemberCard key={member._id} member={member} />;
    });
    return (
      <div>
        <div>
          <Helmet>
            <style>{'body { background-color: rgb(15, 25, 41, 10%); }'}</style>
          </Helmet>
        </div>

        <div className="bodyMember">
          <Container fluid>
            <SearchFieldMember />
            <Row key={memberCards}>{memberCards}</Row>
          </Container>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    members: state.member.members //filteredMembers
  };
}

export default connect(mapStateToProps)(MemberPage);
