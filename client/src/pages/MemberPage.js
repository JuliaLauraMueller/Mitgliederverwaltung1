import React, { Component } from "react";
import MemberCard from "../components/MemberCard";
import SearchFieldMember from "../components/SearchFieldMember";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "reactstrap";
import memberService from "../services/memberService";

import { connect } from "react-redux";

import { setNavVisible } from "../redux/actions/navigationActions";

import "../css/Member.css";

class MemberPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setNavVisible());
  }

  render() {
    let memberCards = this.props.members.map(member => {
      return <MemberCard key={member._id} member={member} />;
    });
    return (
      <Container class="member-page-container">
        <Row>
          <Col sx="12" md="12">
            <div>
              <div>
                <Helmet>
                  <style>
                    {"body { background-color: rgb(15, 25, 41, 10%); }"}
                  </style>
                </Helmet>
              </div>

              <div className="bodyMember">
                <SearchFieldMember />
                <Row key={memberCards}>{memberCards}</Row>
              </div>
            </div>
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

export default connect(mapStateToProps)(MemberPage);
