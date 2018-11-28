import React, { Component } from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import '../../css/ProfileCSS.css'

class ProfileMainInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            
            sector: '',
            job: '',
            function: '',
            company: '',
            companyTel: '',
            companyMobile: '',
            companyEmail: '',
            companyStreet: '',
            companyStreetNr: '',
            companyZip: '',
            companyCity: '',
            companyURL: '',

            privateTel: '',
            privateMobile: '',
            privateEmail: '',
            privateStreet: '',
            privateStreetNr: '',
            privateZip: '',
            privateCity: '',

        };

        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div id="mainInformation">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            //className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Geschäftlich
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            // className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Privat
            </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Branche</InputGroupAddon>
                            <Input type="text" name="sector" onChange={this.onChange} value={this.state.sector} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Beruf</InputGroupAddon>
                            <Input type="text" name="job" onChange={this.onChange} value={this.state.job} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Funktion</InputGroupAddon>
                            <Input type="text" name="function" onChange={this.onChange} value={this.state.function} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Firma</InputGroupAddon>
                            <Input type="text" name="company" onChange={this.onChange} value={this.state.company} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Tel</InputGroupAddon>
                            <Input type="text" name="companyTel" onChange={this.onChange} value={this.state.companyTel} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Mobile</InputGroupAddon>
                            <Input type="text" name="companyMobile" onChange={this.onChange} value={this.state.companyMobile} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">E-Mail</InputGroupAddon>
                            <Input type="text" name="companyEmail" onChange={this.onChange} value={this.state.companyEmail} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Strasse / Nr</InputGroupAddon>
                            <Input type="text" name="companyStreet" onChange={this.onChange} value={this.state.companyStreet} />
                            <Input type="text" name="companyStreetNr" onChange={this.onChange} value={this.state.companyStreetNr} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">PLZ / Ort</InputGroupAddon>
                            <Input type="text" name="companyZip" onChange={this.onChange} value={this.state.companyZip} />
                            <Input type="text" name="companyCity" onChange={this.onChange} value={this.state.companyCity} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">URL Firma</InputGroupAddon>
                            <Input type="text" name="companyURL" onChange={this.onChange} value={this.state.companyURL} />
                        </InputGroup>
                        <br />
                    </TabPane>

                    <TabPane tabId="2">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Tel</InputGroupAddon>
                            <Input type="text" name="privateTel" onChange={this.onChange} value={this.state.privateTel} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Mobile</InputGroupAddon>
                            <Input type="text" name="privateMobile" onChange={this.onChange} value={this.state.privateMobile} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">E-Mail</InputGroupAddon>
                            <Input type="text" name="privateEmail" onChange={this.onChange} value={this.state.privateEmail} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Strasse / Nr</InputGroupAddon>
                            <Input type="text" name="privateStreet" onChange={this.onChange} value={this.state.privateStreet} />
                            <Input type="text" name="privateStreetNr" onChange={this.onChange} value={this.state.privateStreetNr} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">PLZ / Ort</InputGroupAddon>
                            <Input type="text" name="privateZip" onChange={this.onChange} value={this.state.privateZip} />
                            <Input type="text" name="privateCity" onChange={this.onChange} value={this.state.privateCity} />
                        </InputGroup>
                        <br />
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default ProfileMainInformation;
