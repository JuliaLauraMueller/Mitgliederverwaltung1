import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../css/ProfilePage.css';
import { Row, Col, Button } from 'reactstrap';

class ProfileBasicInfo extends Component {
  render() {
    const profile = this.props.profile;
    return (
      <Row>
        <Col md="6" align="center">
          <Row>
            <Col>
              <img
                id="profile-image"
                style={{ width: '180px' }}
                src={require('../../../public/img/marc_zimmermann.jpg')}
                alt="profile"
              />
            </Col>
          </Row>
          <Row className="profile-pic__image">
            <Col>
              <label className="salutation-label">{profile.title}</label>
              <label className="name-label">{profile.firstname}</label>
              <label className="name-label">{profile.surename}</label>
            </Col>
          </Row>
          <Row className="profile-pic__image">
            <Col>
              <label className="alias-label">({profile.alias})</label>
            </Col>
          </Row>
          <Row className="profile-pic__icons">
            <Col>
              <Button
                className="icon-button"
                id="xing-button"
                href={profile.xingLink}
                disabled={!profile.xingLink}
              >
                <img
                  className="icons"
                  alt="xing-icon"
                  src={require('../../../public/img/xing.svg')}
                />
              </Button>
              <Button
                className="icon-button"
                href={profile.linkedinLink}
                disabled={!profile.linkedinLink}
              >
                <img
                  className="icons"
                  alt="linkedin-icon"
                  src={require('../../../public/img/linkedin.svg')}
                />
              </Button>
              <Button
                className="icon-button"
                href={profile.facebookLink}
                disabled={!profile.facebookLink}
              >
                <img
                  className="icons"
                  alt="fb-icon"
                  src={require('../../../public/img/facebook.svg')}
                />
              </Button>
              <Button
                className="icon-button"
                href={profile.instagramLink}
                disabled={!profile.instagramLink}
              >
                <img
                  className="icons"
                  alt="instagramm-icon"
                  src={require('../../../public/img/instagram.svg')}
                />
              </Button>
              <Button className="icon-button" id="mail-button">
                <img
                  className="icons"
                  alt="mail-icon"
                  src={require('../../../public/img/mail-profile.svg')}
                />
              </Button>
            </Col>
          </Row>
        </Col>

        <Col md={{ offset: 0, size: 6 }} sm={{ offset: 1 }}>
          <Row>
            <Col>
              <p className="main-title title-maininfo">Kurzprofil</p>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Mitglied:</label>
              <label className="value-label">{profile.memberNumber}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Beitritt:</label>
              <label className="value-label">{profile.entryDate}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Geburtstag:</label>
              <label className="value-label">{profile.birthdate}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Status:</label>
              <label className="value-label">{profile.status}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>City:</label>
              <label className="value-label">{profile.city}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label className="godfather-label">Götti:</label>
              <label className="value-label">{profile.godfather}</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="offerings overflow">
                <label className="main-title" id="offerings-label">
                  Was biete ich an?
                </label>
                <br />
                <label className="information">{profile.offerings}</label>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
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
