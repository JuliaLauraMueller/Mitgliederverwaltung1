import React, { Component } from 'react'
import '../../css/ProfileCSS.css'
import { InputGroup, Input } from 'reactstrap'


class ProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            salutation: '',
            title: '',
            firstname: '',
            surename: '',
            alias: ''
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div id="profilePic">
                <img style={{ width: '180px' }} src={require('../../img/marc_zimmermann.jpg')} />
                <InputGroup>
                    <Input type="text" name="salutation" onChange={this.onChange} value={this.state.salutation} />
                    <Input type="text" name="title" onChange={this.onChange} value={this.state.title} />
                    <Input type="text" name="firstname" onChange={this.onChange} value={this.state.firstname} />
                    <Input type="text" name="surename" onChange={this.onChange} value={this.state.surename} />
                    <br />
                    <h2><Input type="text" name="alias" onChange={this.onChange} value={this.state.alias} /></h2>
                </InputGroup>
            </div>
        );
    }
}

export default ProfilePic;