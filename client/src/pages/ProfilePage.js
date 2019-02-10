import React, { Component } from 'react';

import ProfilePic from '../components/ProfileView/ProfilePicView.js';
import ProfileBasicInfo from '../components/ProfileView/ProfileBasicInfoView.js';
import ProfileMainInformation from '../components/ProfileView/ProfileMainInformationView.js';

import ProfilePicEDIT from '../components/ProfileEdit/ProfilePicEdit.js';
import ProfileBasicInfoEDIT from '../components/ProfileEdit/ProfileBasicInfoEdit.js';
import ProfileMainInformationEDIT from '../components/ProfileEdit/ProfileMainInformationEdit.js';

import { connect } from 'react-redux';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchProfile } from '../redux/actions/profileActions';

import '../css/ProfilePage.css';

import { Container, Row, Col } from 'reactstrap';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setNavVisible());
    this.state = {
      isEditing: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchProfile(this.props.match.params.id));
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleClick(e) {
    e.preventDefault();
    this.basicInfo.getWrappedInstance().onSave();
    this.profilePic.getWrappedInstance().onSave();
    this.mainInfo.getWrappedInstance().onSave();
    this.toggleEdit();
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div className="bodyProfile">
          <button className="button-save-edit" onClick={this.handleClick}>
            Speichern
          </button>
          <div id="top-container">
            <ProfilePicEDIT
              ref={profilePic => {
                this.profilePic = profilePic;
              }}
            />
            <ProfileBasicInfoEDIT
              ref={basicInfo => {
                this.basicInfo = basicInfo;
              }}
            />
          </div>
          <ProfileMainInformationEDIT
            ref={mainInfo => {
              this.mainInfo = mainInfo;
            }}
          />
        </div>
      );
    } else {
      return (
        <Container className="profile-page__container">
          <Row>
            <Col>
              <button className="button-save-edit" onClick={this.toggleEdit}>
                edit
              </button>
            </Col>
          </Row>
          <Row>
            <Col xs={{ size: 10, offset: 1 }} md={{ size: 4, offset: 0 }}>
              <ProfilePic />
            </Col>
            <Col xs={{ size: 10, offset: 1 }} md={{ size: 6, offset: 2 }}>
              <ProfileBasicInfo />
            </Col>
            <Col xs={12} md={12}>
              <ProfileMainInformation />
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

/**
        <div id="bodyProfile">
          <button className="button-save-edit" onClick={this.toggleEdit}>
            Bearbeiten
          </button>
          <div id="top-container">
          <ProfilePic  />
          <ProfileBasicInfo />
          </div>
          <ProfileMainInformation />
        </div>*/

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(ProfilePage);
