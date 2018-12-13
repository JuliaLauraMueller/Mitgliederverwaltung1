import React, { Component } from 'react';

import ProfilePic from '../components/ProfileView/ProfilePicView.js';
import ProfileBasicInfo from '../components/ProfileView/ProfileBasicInfoView.js';
import ProfileSocialMedia from '../components/ProfileView/ProfileSocialMediaView.js';
import ProfileMainInformation from '../components/ProfileView/ProfileMainInformationView.js';

import ProfilePicEDIT from '../components/ProfileEdit/ProfilePicEdit.js';
import ProfileBasicInfoEDIT from '../components/ProfileEdit/ProfileBasicInfoEdit.js';
import ProfileSocialMediaEDIT from '../components/ProfileEdit/ProfileSocialMediaEdit.js';
import ProfileMainInformationEDIT from '../components/ProfileEdit/ProfileMainInformationEdit.js';

import '../css/ProfilePage.css';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleClick(e) {
    e.preventDefault();
    this.basicInfo.getWrappedInstance().onSave();
    this.profilePic.getWrappedInstance().onSave();
    this.mainInfo.getWrappedInstance().onSave();
    this.socialMedia.getWrappedInstance().onSave();
    this.toggleEdit();
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div id="bodyProfile">
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
          <ProfileSocialMediaEDIT
            ref={socialMedia => {
              this.socialMedia = socialMedia;
            }}
          />
          <ProfileMainInformationEDIT
            ref={mainInfo => {
              this.mainInfo = mainInfo;
            }}
          />
          <button className="button-save-edit" onClick={this.handleClick}>
            save
          </button>
        </div>
      );
    } else {
      return (
        <div id="bodyProfile">
          <ProfilePic />
          <ProfileBasicInfo />
          <ProfileSocialMedia />
          <ProfileMainInformation />
          <button className="button-save-edit" onClick={this.toggleEdit}>
            edit
          </button>
        </div>
      );
    }
  }
}

export default ProfilePage;
