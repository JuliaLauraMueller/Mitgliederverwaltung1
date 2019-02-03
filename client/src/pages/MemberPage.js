import React, { Component } from 'react';
import MemberCard from '../components/MemberCard';
import SearchFieldMember from '../components/SearchFieldMember';
import { Helmet } from 'react-helmet';
import { Container, Row } from 'reactstrap';
//import memberService from '../services/memberService';

import { connect } from 'react-redux';

import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchMembers } from '../redux/actions/memberActions';

import '../css/Member.css';

class MemberPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchMembers());
    this.props.dispatch(setNavVisible());
    console.log('MEMBERS:');
    console.log(props);
    //this.props.members = fetchMembers();
  }

  componentDidMount() {
    //this.props.fetchMembers();
    //var members = fetchMembers();
    //this.props.members.dispatch(memberService.getUserBody());
    //console.log('COMP DID MOUNT:');
    //console.log(members);
    //this.props.dispatch(memberService.getUserBody());
  }

  render() {
    console.log('RENDERING');
    //this.props.fetchMembers();
    console.log(this.props);
    let memberCards = this.props.members.map(member => {
      return <MemberCard member={member} />;
    });
    return (
      <div>
        <div>
          <Helmet>
            <style>{'body { background-color: rgb(15, 25, 41, 10%); }'}</style>
          </Helmet>
        </div>

        <div>
          <Container fluid>
            <SearchFieldMember />
            <Row>{memberCards}</Row>
          </Container>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    members: state.member.filteredMembers
  };
}

export default connect(mapStateToProps)(MemberPage);
