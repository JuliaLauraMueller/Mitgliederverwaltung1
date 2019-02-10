import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../redux/actions/profileActions';

import '../../css/ProfilePage.css';
import { Row, Col } from 'reactstrap';

class ProfileBasicInfo extends Component {
  componentWillMount() {
    this.props.fetchProfile('5bfe83680108860398a433a1');
  }
  np;

  render() {
    const profile = this.props.profile;
    return (
      <Row id="basicInformation">
        <div>
          <div>
            <label className="salutation-label">{profile.salutation}</label>
            <label className="salutation-label">{profile.title}</label>
            <br />
            <label className="name-label">{profile.firstname}</label>
            <label className="name-label">{profile.surename}</label>
            <br />
            <label className="alias-label">({profile.alias})</label>
            <br />
          </div>
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
      </Row>
    );
  }
}

ProfileBasicInfo.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.member
});
export default connect(
  mapStateToProps,
  { fetchProfile }
)(ProfileBasicInfo);
