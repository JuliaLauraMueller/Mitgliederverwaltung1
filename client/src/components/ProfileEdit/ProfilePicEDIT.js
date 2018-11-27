import React, { Component } from 'react'
import '../../css/ProfileCSS.css'
import { InputGroup, Input } from 'reactstrap'


class ProfilePic extends Component {

    render() {
        return (
            <div id="profilePic">
                <img style={{ width: '180px' }} src={require('../../img/marc_zimmermann.jpg')} />
                <InputGroup>
                    <Input placeholder=" Hr." />
                    <Input placeholder=" Dr." />
                    <Input placeholder="Marc Zimmermann" />
                    <br />
                    <h2><Input placeholder="Alias: Marci" /></h2>
                </InputGroup>
            </div>
        );
    }
}

export default ProfilePic;