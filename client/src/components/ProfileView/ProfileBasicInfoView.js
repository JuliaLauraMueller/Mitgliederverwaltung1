import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../../css/ProfilePage.css';
import { Row, Col, Container } from 'reactstrap';

class ProfileBasicInfo extends Component {
  render() {
    const profile = this.props.profile;
    return (
      <Container>
        <Row id="basicInformation">
          <Col xs="12">
            <Col xs="7" md="9">
              <p className="main-title title-maininfo">Kurzprofil</p>
              <Col className="overflow">
                <label>Mitglieder Nr.:</label>
                <label className="value-label">{profile.memberNumber}</label>
              </Col>
              <Col className="overflow">
                <label>Eintrittsdatum:</label>
                <label className="value-label">{profile.entryDate}</label>
              </Col>
              <Col className="overflow">
                <label>Geburtsdatum:</label>
                <label className="value-label">{profile.birthdate}</label>
              </Col>
              <Col className="overflow">
                <label>Status:</label>
                <label className="value-label">{profile.status}</label>
              </Col>
              <Col className="overflow">
                <label>City:</label>
                <label className="value-label">{profile.city}</label>
              </Col>
              <Col className="overflow">
                <label className="godfather-label">Götti:</label>
                <label className="value-label">{profile.godfather}</label>
              </Col>
            </Col>
            <Col xs="7" md="9">
              <div className="offerings">
                <label className="main-title" id="offerings-label">
                  Was biete ich an?
                </label>
                <br />
                <label className="information">{profile.offerings}</label>
              </div>
            </Col>
          </Col>
        </Row>
      </Container>
    );
  }
}

ProfileBasicInfo.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.member
});

export default connect(mapStateToProps)(ProfileBasicInfo);
