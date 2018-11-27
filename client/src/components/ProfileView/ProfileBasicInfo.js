import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Label, Button } from 'reactstrap'
import '../../css/ProfileCSS.css'



class ProfileBasicInfo extends Component {

    render() {
        return (
            <div id="basicInformation">
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Status</InputGroupAddon>
                    <Input placeholder="Junior" />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Mitglieder Nr.</InputGroupAddon>
                    <Input placeholder="056" />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Eintrittsdatum</InputGroupAddon>
                    <Input placeholder="2015" />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">City</InputGroupAddon>
                    <Input placeholder="Bern" />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Götti</InputGroupAddon>
                    <Input placeholder="Samuel Müller" />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Geburtsdatum</InputGroupAddon>
                    <Input placeholder="30.12.1990" />
                </InputGroup>
                <br />
            </div>
        );
    }
}

export default ProfileBasicInfo;