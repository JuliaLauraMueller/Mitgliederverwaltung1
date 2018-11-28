import React, { Component } from 'react';
import ProfilePic from '../components/ProfileView/ProfilePic.js';
import ProfileBasicInfo from '../components/ProfileView/ProfileBasicInfo.js';
import ProfileSocialMedia from '../components/ProfileView/ProfileSocialMedia.js';
import ProfileMainInformation from '../components/ProfileView/ProfileMainInformation.js';
import ProfilePicEDIT from '../components/ProfileEdit/ProfilePicEDIT.js';
import ProfileBasicInfoEDIT from '../components/ProfileEdit/ProfileBasicInfoEDIT.js';
import ProfileSocialMediaEDIT from '../components/ProfileEdit/ProfileSocialMediaEDIT.js';
import ProfileMainInformationEDIT from '../components/ProfileEdit/ProfileMainInformationEDIT.js';
import '../css/ProfileCSS.css';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
      //member: this.props.member
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleClick(e) {
    e.preventDefault();
    //this.profilePic.onSave();
    this.basicInfo.getWrappedInstance().onSave();
    this.toggleEdit();
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div id="bodyProfile">
          <ProfilePicEDIT />
          <ProfileBasicInfoEDIT
            ref={basicInfo => {
              this.basicInfo = basicInfo;
            }}
          />
          <ProfileSocialMediaEDIT />
          <ProfileMainInformationEDIT />
          <button onClick={this.handleClick}>save</button>
        </div>
      );
    } else {
      return (
        <div id="bodyProfile">
          <ProfilePic />
          <ProfileBasicInfo />
          <ProfileSocialMedia />
          <ProfileMainInformation />
          <button onClick={this.toggleEdit}>edit</button>
        </div>
      );
    }
  }
}

export default ProfilePage;
