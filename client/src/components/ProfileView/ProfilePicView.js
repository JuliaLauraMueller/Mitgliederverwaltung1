import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../redux/actions/profileActions';
import { Button, Row, Container } from 'reactstrap';

import '../../css/ProfilePage.css';

class ProfilePic extends Component {
  render() {
    const profile = this.props.profile;
    return (
      <Container id="profilePic">
        <Row className="profile-pic__image">
          <img
            id="profile-image"
            style={{ width: '180px' }}
            src={require('../../../public/img/marc_zimmermann.jpg')}
            alt="profile"
          />
        </Row>
        <Row>
          <br />
          <Button
            className="icon-button"
            id="xing-button"
            href={profile.xingLink}
          >
            <img
              className="icons"
              alt="xing-icon"
              src={require('../../../public/img/xing.svg')}
            />
          </Button>
          <Button className="icon-button" href={profile.linkedinLink}>
            <img
              className="icons"
              alt="linkedin-icon"
              src={require('../../../public/img/linkedin.svg')}
            />
          </Button>
          <Button className="icon-button" href={profile.facebookLink}>
            <img
              className="icons"
              alt="fb-icon"
              src={require('../../../public/img/facebook.svg')}
            />
          </Button>
          <Button className="icon-button" href={profile.instagramLink}>
            <img
              className="icons"
              alt="instagramm-icon"
              src={require('../../../public/img/instagram.svg')}
            />
          </Button>
          <Button className="icon-button">
            <img
              className="icons"
              alt="mail-icon"
              src={require('../../../public/img/mail-profile.svg')}
            />
          </Button>

          <div className="offerings">
            <label className="main-title" id="offerings-label">
              Was biete ich an?
            </label>
            <br />
            <label className="information">{profile.offerings}</label>
          </div>
        </Row>
      </Container>
    );
  }
}

ProfilePic.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.member
});
export default connect(
  mapStateToProps,
  { fetchProfile }
)(ProfilePic);
