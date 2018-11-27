import React, { Component } from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import '../../css/ProfileCSS.css'

class ProfileMainInformation extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
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
                            <Input placeholder="IT" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Beruf</InputGroupAddon>
                            <Input placeholder="Informatikerin" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Funktion</InputGroupAddon>
                            <Input placeholder="Geschäftsleiterin" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Firma</InputGroupAddon>
                            <Input placeholder="Hannah_und_Tabea:IT" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Mobile</InputGroupAddon>
                            <Input placeholder="0799999933" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Tel</InputGroupAddon>
                            <Input placeholder="0627945500" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">E-Mail</InputGroupAddon>
                            <Input placeholder="hannahtabea@bluewin.ch" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Strasse / Nr</InputGroupAddon>
                            <Input placeholder="Blüemliweg" />
                            <Input placeholder="9" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">PLZ / Ort</InputGroupAddon>
                            <Input placeholder="5000" />
                            <Input placeholder="Blüemlihuse" />
                        </InputGroup>
                        <br />

                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <Input addon type="checkbox" aria-label="Checkbox for following text input" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Rechnungsadresse geschäftlich" />
                        </InputGroup>
                        <br />
                        <Button>URL Firma</Button>{' '}
                    </TabPane>

                    <TabPane tabId="2">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Mobile</InputGroupAddon>
                            <Input placeholder="0799305500" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Tel</InputGroupAddon>
                            <Input placeholder="0627890666" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">E-Mail</InputGroupAddon>
                            <Input placeholder="hannahtabealove@bluewin.ch" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Strasse / Nr</InputGroupAddon>
                            <Input placeholder="Sternstrasse" />
                            <Input placeholder="66" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">PLZ / Ort</InputGroupAddon>
                            <Input placeholder="5555" />
                            <Input placeholder="Sternebus" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <Input addon type="checkbox" aria-label="Checkbox for following text input" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Rechnungsadresse privat" />
                        </InputGroup>
                        <br />
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default ProfileMainInformation;
