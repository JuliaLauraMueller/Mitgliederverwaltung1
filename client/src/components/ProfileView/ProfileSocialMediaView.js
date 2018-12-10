import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../redux/actions/profileActions';

import '../../css/ProfilePage.css';

class ProfileSocialMedia extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }
  render() {
    const profile = this.props.profile;
    return (
      <div id="socialMedia">
        <Button className="icon-button" href={profile.xingLink}>
        <img
            className="icons"
            alt="xing-icon"
            src={'./img/xing.svg'}
          />
        </Button>
        <Button className="icon-button" href={profile.linkedinLink}>         
        <img
            className="icons"
            alt="linkedin-icon"
            src={'./img/linkedin.svg'}
          />
          </Button>
        <Button className="icon-button" href={profile.facebookLink}>
          <img
            className="icons"
            alt="fb-icon"
            src={'./img/facebook.svg'}
          />
        </Button>
        <Button className="icon-button" href={profile.instagramLink}>
        <img
            className="icons"
            alt="fb-icon"
            src={'./img/instagram.svg'}
          />
        </Button>
        <div className="offerings">
          <label className="main-title" id="offerings-label">Was biete ich an?</label>
          <br></br>
          <label className="information">{profile.offerings}</label>
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
