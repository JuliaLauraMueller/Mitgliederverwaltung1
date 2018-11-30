import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../redux/actions/profileActions';

import '../../css/ProfilePage.css';

class ProfileBasicInfo extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  render() {
    const profile = this.props.profile;
    return (
      <div id="basicInformation">
        <label className="main-title">Hauptinformation</label>
        <div>
          <div className="title-label">
            <label>Mitglieder Nr.:</label>
          </div>
          <div className="value-label">
            <label>{profile.memberNumber}</label>
          </div>
        </div>

        <div>
          <div className="title-label">
            <label>Eintrittsdatum:</label>
          </div>
          <div className="value-label">
            <label>{profile.entryDate}</label>
          </div>
        </div>

        <div>
          <div className="title-label">
            <label>Geburtsdatum:</label>
          </div>
          <div className="value-label">
            <label>{profile.birthdate}</label>
          </div>
        </div>

        <div>
          <div className="title-label">
            <label>Status:</label>
          </div>
          <div className="value-label">
            <label>{profile.status}</label>
          </div>
        </div>

        <div>
          <div className="title-label">
            <label>City:</label>
          </div>
          <div className="value-label">
            <label>{profile.city}</label>
          </div>
        </div>

        <div>
          <div className="title-label">
            <label>Götti:</label>
          </div>
          <div className="value-label">
            <label>{profile.godfather}</label>
          </div>
        </div>
      </div>
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
