import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../actions/profileActions';
import '../../css/ProfileCSS.css';

class ProfilePic extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  render() {
    const profile = this.props.profile;
    return (
      <div id="profilePic">
        <img
          style={{ width: '180px' }}
          src={require('../../img/marc_zimmermann.jpg')}
        />
        <div>
          <label>{profile.salutation}</label>
          <label>{profile.title}</label>
          <label>{profile.firstname}</label>
          <label>{profile.surename}</label>
        </div>
        <div>
          <label>{profile.alias}</label>
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
