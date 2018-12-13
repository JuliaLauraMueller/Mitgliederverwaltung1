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
        <div>
          <label className="salutation-label">{profile.salutation}</label>
          <label className="salutation-label">{profile.title}</label>
          <br />
          <label className="name-label">{profile.firstname}</label>
          <label className="name-label">{profile.surename}</label>
          <br />
          <label className="salutation-label">({profile.alias})</label>
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
          <label>Götti:</label>
          <label className="value-label">{profile.godfather}</label>
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
