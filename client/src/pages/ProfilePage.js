import React, { Component } from 'react';

import ProfilePic from '../components/ProfileView/ProfilePicView.js';
import ProfileBasicInfo from '../components/ProfileView/ProfileBasicInfoView.js';
import ProfileMainInformation from '../components/ProfileView/ProfileMainInformationView.js';

import ProfilePicEDIT from '../components/ProfileEdit/ProfilePicEdit.js';
import ProfileBasicInfoEDIT from '../components/ProfileEdit/ProfileBasicInfoEdit.js';
import ProfileMainInformationEDIT from '../components/ProfileEdit/ProfileMainInformationEdit.js';

import { connect } from 'react-redux';
import { setNavVisible } from '../redux/actions/navigationActions';

import '../css/ProfilePage.css';

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
            save
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
          </div >
          <ProfileMainInformationEDIT
            ref={mainInfo => {
              this.mainInfo = mainInfo;
            }}
          />
        </div>
      );
    } else {
      return (
        <div id="bodyProfile">
        <button className="button-save-edit" onClick={this.toggleEdit}>
                  edit
                </button>
          <div id="top-container">
          <ProfilePic />
          <ProfileBasicInfo />
          </div>
          <ProfileMainInformation />
        </div>
        
      );
    }
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(ProfilePage);
