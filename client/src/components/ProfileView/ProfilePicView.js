import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../redux/actions/profileActions';

import '../../css/ProfilePage.css';

class ProfilePic extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  render() {
    const profile = this.props.profile;
    return (
      <div id="profilePic">
        <img
          className="profile-image"
          style={{ width: '180px' }}
          src={'./img/marc_zimmermann.jpg'}
          alt="profile"
        />
        <div>
          <label className="salutation-label">{profile.salutation}</label>
          <label className="salutation-label">{profile.title}</label>
          <br />
          <label className="name-label">{profile.firstname}</label>
          <label className="name-label">{profile.surename}</label>
          <br />
          <label className="salutation-label">({profile.alias})</label>
        </div>
      </div>
    );
  }
}

ProfilePic.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.member
});
export default connect(
  mapStateToProps,
  { fetchProfile }
)(ProfilePic);
