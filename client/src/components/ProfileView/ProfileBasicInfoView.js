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
            <Col xs="9">
              <div>
                <p className="main-title title-maininfo">Kurzprofil</p>
                <div>
                  <label>Mitglieder Nr.:</label>
                  <label className="value-label">{profile.memberNumber}</label>
                </div>
                <div>
                  <label>Eintrittsdatum:</label>
                  <label className="value-label">{profile.entryDate}</label>
                </div>
                <div>
                  <label>Geburtsdatum:</label>
                  <label className="value-label">{profile.birthdate}</label>
                </div>
                <div>
                  <label>Status:</label>
                  <label className="value-label">{profile.status}</label>
                </div>
                <div>
                  <label>City:</label>
                  <label className="value-label">{profile.city}</label>
                </div>
                <div>
                  <label className="godfather-label">Götti:</label>
                  <label className="value-label">{profile.godfather}</label>
                </div>
              </div>
            </Col>
            <Col xs={{ size: 9, offset: 0 }}>
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
