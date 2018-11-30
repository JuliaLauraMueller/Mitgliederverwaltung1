import React, { Component } from 'react';
import MemberCard from '../components/MemberCard';
import SearchFieldMember from '../components/SearchFieldMember';
import { Helmet } from 'react-helmet';
import { Container, Row } from 'reactstrap';

import '../css/Member.css';

class MemberPage extends Component {
  constructor() {
    super();
    this.state = {
      members: [
        {
          prename: 'Steven',
          lastname: 'Wüthrich',
          mail: 'steven.wuethrich@fatpanda.io',
          phone: '079 234 56 89',
          profilepic: './img/marc_zimmermann.jpg'
        },

        {
          prename: 'Marc',
          lastname: 'Zimmermann',
          mail: 'mz@fatpanda.io',
          phone: '079 254 56 89',
          profilepic: './img/marc_zimmermann.jpg'
        },

        {
          prename: 'Renato',
          lastname: 'Gnocchi',
          mail: 'rg@fatpanda.io',
          phone: '079 236 92 79',
          profilepic: './img/marc_zimmermann.jpg'
        },

        {
          prename: 'Steven',
          lastname: 'Wüthrich',
          mail: 'sw@fatpanda.io',
          phone: '079 234 56 89',
          profilepic: './img/marc_zimmermann.jpg'
        },

        {
          prename: 'Marc',
          lastname: 'Zimmermann',
          mail: 'mz@fatpanda.io',
          phone: '079 254 56 89',
          profilepic: './img/marc_zimmermann.jpg'
        }
      ]
    };
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
}

export default MemberPage;
