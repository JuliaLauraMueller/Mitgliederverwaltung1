import React, { Component } from 'react';


class ProfilePic extends Component{

    render() {
        return (
            <div id="profilePic">
                <img style={{width: '180px'}} src={ require('../img/marc_zimmermann.jpg') } />
          </div>
        );
    }
}

export default ProfilePic;