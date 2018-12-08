import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../redux/actions/profileActions';
import { putProfile } from '../../redux/actions/profileActions';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Label,
  FormGroup
} from 'reactstrap';

import '../../css/ProfilePage.css';

class ProfileMainInformationEDIT extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  constructor(props) {
    super(props);
    const profile = this.props.profile;
    this.state = {
      activeTab: '1',

      invoiceAddress: profile.invoiceAddress,

      sector: profile.sector,
      job: profile.job,
      function: profile.function,
      company: profile.company,
      companyTel: profile.companyTel,
      companyMobile: profile.companyMobile,
      companyEmail: profile.companyEmail,
      companyStreet: profile.companyStreet,
      companyStreetNr: profile.companyStreetNr,
      companyZip: profile.companyZip,
      companyCity: profile.companyCity,
      companyURL: profile.companyURL,

      privateTel: profile.privateTel,
      privateMobile: profile.privateMobile,
      privateEmail: profile.privateEmail,
      privateStreet: profile.privateStreet,
      privateStreetNr: profile.privateStreetNr,
      privateZip: profile.privateZip,
      privateCity: profile.privateCity
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSave() {
    const mainInfoUpdate = {
      sector: this.state.sector,
      job: this.state.job,
      function: this.state.function,
      company: this.state.company,
      companyTel: this.state.companyTel,
      companyMobile: this.state.companyMobile,
      companyEmail: this.state.companyEmail,
      companyStreet: this.state.companyStreet,
      companyStreetNr: this.state.companyStreetNr,
      companyZip: this.state.companyZip,
      companyCity: this.state.companyCity,
      companyURL: this.state.companyURL,
      privateTel: this.state.privateTel,
      privateMobile: this.state.privateMobile,
      privateEmail: this.state.privateEmail,
      privateStreet: this.state.privateStreet,
      privateStreetNr: this.state.privateStreetNr,
      privateZip: this.state.privateZip,
      privateCity: this.state.privateCity,
      invoiceAddress: this.state.invoiceAddress
    };

    this.props.putProfile(mainInfoUpdate);
  }

  render() {
    return (
      <div id="mainInformation">
        <Nav tabs className="toggle-nav-main">
          <NavItem className="toggle-nav">
            <NavLink
              onClick={() => {
                this.toggle('1');
              }}
            >
              Geschäftlich
            </NavLink>
          </NavItem>
          <NavItem className="toggle-nav">
            <NavLink
              onClick={() => {
                this.toggle('2');
              }}
            >
              Privat
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <InputGroup>
              <InputGroupAddon addonType="prepend">Branche</InputGroupAddon>
              <form className="input-field">
                <Input
                  type="text"
                  name="sector"
                  onChange={this.onChange}
                  value={this.state.sector}
                />
              </form>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Beruf</InputGroupAddon>
              <form className="input-field">
                <Input
                  type="text"
                  name="job"
                  onChange={this.onChange}
                  value={this.state.job}
                />
              </form>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Funktion</InputGroupAddon>
              <form className="input-field">
                <Input
                  type="text"
                  name="function"
                  onChange={this.onChange}
                  value={this.state.function}
                />
              </form>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Firma</InputGroupAddon>
              <form className="input-field">
                <Input
                  type="text"
                  name="company"
                  onChange={this.onChange}
                  value={this.state.company}
                />
              </form>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Tel</InputGroupAddon>
              <form className="input-field">
                <Input
                  type="text"
                  name="companyTel"
                  onChange={this.onChange}
                  value={this.state.companyTel}
                />
              </form>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Mobile</InputGroupAddon>
              <form className="input-field">
                <Input
                  type="text"
                  name="companyMobile"
                  onChange={this.onChange}
                  value={this.state.companyMobile}
                />
              </form>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">E-Mail</InputGroupAddon>
              <form className="input-field">
                <Input
                  type="text"
                  name="companyEmail"
                  onChange={this.onChange}
                  value={this.state.companyEmail}
                />
              </form>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                Strasse / Nr
              </InputGroupAddon>
              <Input
                type="text"
                name="companyStreet"
                onChange={this.onChange}
                value={this.state.companyStreet}
              />
              <Input
                type="text"
                name="companyStreetNr"
                onChange={this.onChange}
                value={this.state.companyStreetNr}
              />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">PLZ / Ort</InputGroupAddon>
              <form className="input-field">
                <Input
                  type="text"
                  name="companyZip"
                  onChange={this.onChange}
                  value={this.state.companyZip}
                />
              </form>
              <Input
                type="text"
                name="companyCity"
                onChange={this.onChange}
                value={this.state.companyCity}
              />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">URL Firma</InputGroupAddon>
              <form className="input-field">
                <Input
                  type="text"
                  name="companyURL"
                  onChange={this.onChange}
                  value={this.state.companyURL}
                />
              </form>
            </InputGroup>
          </TabPane>

          <TabPane tabId="2">
            <InputGroup>
              <InputGroupAddon addonType="prepend">Tel</InputGroupAddon>
              <form className="input-field">
                <Input
                  type="text"
                  name="privateTel"
                  onChange={this.onChange}
                  value={this.state.privateTel}
                />
              </form>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Mobile</InputGroupAddon>
              <form className="input-field">
                <Input
                  type="text"
                  name="privateMobile"
                  onChange={this.onChange}
                  value={this.state.privateMobile}
                />
              </form>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">E-Mail</InputGroupAddon>
              <form className="input-field">
                <Input
                  type="text"
                  name="privateEmail"
                  onChange={this.onChange}
                  value={this.state.privateEmail}
                />
              </form>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                Strasse / Nr
              </InputGroupAddon>
              <form className="input-field">
                <Input
                  type="text"
                  name="privateStreet"
                  onChange={this.onChange}
                  value={this.state.privateStreet}
                />
                <Input
                  type="text"
                  name="privateStreetNr"
                  onChange={this.onChange}
                  value={this.state.privateStreetNr}
                />
              </form>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">PLZ / Ort</InputGroupAddon>
              <form className="input-field">
                <Input
                  type="text"
                  name="privateZip"
                  onChange={this.onChange}
                  value={this.state.privateZip}
                />
                <Input
                  type="text"
                  name="privateCity"
                  onChange={this.onChange}
                  value={this.state.privateCity}
                />
              </form>
            </InputGroup>
          </TabPane>
        </TabContent>
        <FormGroup tag="fieldset">
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="invoiceAddress"
                value="1"
                checked={this.state.invoiceAddress === '1'}
                onChange={this.onChange}
              />{' '}
              Rechnungsadresse privat
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="invoiceAddress"
                value="2"
                checked={this.state.invoiceAddress === '2'}
                onChange={this.onChange}
              />{' '}
              Rechnungsadresse geschäftlich
            </Label>
          </FormGroup>
        </FormGroup>
      </div>
    );
  }
}

ProfileMainInformationEDIT.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  putProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.member
});

export default connect(
  mapStateToProps,
  { fetchProfile, putProfile },
  null,
  { withRef: true }
)(ProfileMainInformationEDIT);
