import React, { Component } from 'react';
import ProfilePic from '../components/ProfilePic';
import ProfileBasicInfo from '../components/ProfileBasicInfo';
import ProfileSocialMedia from '../components/ProfileSocialMedia';
import ProfileMainInformation from '../components/ProfileMainInformation';

class ProfilePage extends Component{
    render() {
        return (
            <div>
                <ProfilePic />
                <ProfileBasicInfo />
                <ProfileSocialMedia />
                <ProfileMainInformation />
            </div>
        );
    }
}

export default ProfilePage;