import React, { Component } from 'react';
import MemberCard from '../components/MemberCard';
import SearchFieldMember from '../components/SearchFieldMember';
import { Helmet } from 'react-helmet';
import { Container, Row } from 'reactstrap';
import memberService from '../services/memberService';

import '../css/Member.css';

class MemberPage extends Component {
  constructor() {
    super();
    this.state = { members: [] };
  }

  render() {
    let memberCards = this.state.members.map(member => {
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
          <h1>
            <img
              className="member-logo"
              src={'./img/logo.png'}
              alt="Card i cap"
            />
          </h1>
          <Container fluid>
            <SearchFieldMember />
            <Row>{memberCards}</Row>
          </Container>
        </div>
      </div>
    );
  }
  componentWillMount() {
    var self = this;
    memberService.getUserBody().then(resp => {
      self.state.members = resp.members;
      self.setState({ members: resp.members });
    });
  }
}

export default MemberPage;
