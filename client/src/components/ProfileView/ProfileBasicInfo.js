import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../actions/profileActions';
import '../../css/ProfileCSS.css';

class ProfileBasicInfo extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  render() {
    const profile = this.props.profile;
    return (
      <div id="basicInformation">
        <div>
          <label>Status</label>
          <label>{profile.status}</label>
        </div>
        <div>
          <label>Mitglieder Nr.</label>
          <label>{profile.memberNumber}</label>
        </div>
        <div>
          <label>Eintrittsdatum</label>
          <label>{profile.entryDate}</label>
        </div>
        <div>
          <label>City</label>
          <label>{profile.city}</label>
        </div>
        <div>
          <label>Götti</label>
          <label>{profile.godfather}</label>
        </div>
        <div>
          <label>Geburtsdatum</label>
          <label>{profile.birthdate}</label>
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
