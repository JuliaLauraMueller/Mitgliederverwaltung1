import React, { Component } from 'react'
import { InputGroup, Input, Label, InputGroupAddon } from 'reactstrap'
import '../../css/ProfileCSS.css'



class ProfileSocialMedia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xingLink: '',
            linkedinLink: '',
            facebookLink: '',
            instagramLink: '',
            offerings: ''
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div id="socialMedia">
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Xing</InputGroupAddon>
                    <Input type="text" name="xingLink" onChange={this.onChange} value={this.state.xingLink} />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Linkedin</InputGroupAddon>
                    <Input type="text" name="linkedinLink" onChange={this.onChange} value={this.state.linkedinLink} />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Facebook</InputGroupAddon>
                    <Input type="text" name="facebookLink" onChange={this.onChange} value={this.state.facebookLink} />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Instagram</InputGroupAddon>
                    <Input type="text" name="instagramLink" onChange={this.onChange} value={this.state.instagramLink} />
                </InputGroup>
                <br />
                <InputGroup>
                    <Label>Was biete ich an?</Label>
                    <Input type="textarea" name="offerings" onChange={this.onChange} value={this.state.offerings} />
                </InputGroup>
                <br />
            </div>
        );
    }
}

export default ProfileSocialMedia;