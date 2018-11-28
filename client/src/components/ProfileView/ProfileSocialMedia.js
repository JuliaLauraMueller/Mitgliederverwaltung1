import React, { Component } from 'react';
import { InputGroup, Input, Label, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../actions/profileActions';
import '../../css/ProfileCSS.css';

class ProfileSocialMedia extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }
  render() {
    const profile = this.props.profile;
    return (
      <div id="socialMedia">
        <Button href={profile.xingLink}>Xing</Button>
        <Button href={profile.linkedinLink}>LinkedIn</Button>
        <Button href={profile.facebookLink}>Facebook</Button>
        <Button href={profile.instagramLink}>Instagram</Button>
        <div>
          <label>Was biete ich an?</label>
          <label>{profile.offerings}</label>
        </div>
      </div>
    );
  }
}

ProfileSocialMedia.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.member
});
export default connect(
  mapStateToProps,
  { fetchProfile }
)(ProfileSocialMedia);
