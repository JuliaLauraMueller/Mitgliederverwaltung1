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
import classnames from 'classnames';

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
        <div className="business-info">
        <Label className="main-title">Geschäftlich</Label>
          <InputGroup>
            <InputGroupAddon addonType="prepend">Branche</InputGroupAddon>
            <form className="input-field">
              <Input
                className="value-label"
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
                className="value-label"
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
                className="value-label"
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
                className="value-label"
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
                className="value-label"
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
                className="value-label"
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
                className="value-label"
                type="text"
                name="companyEmail"
                onChange={this.onChange}
                value={this.state.companyEmail}
              />
            </form>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">Strasse</InputGroupAddon>
            <form id="input-field">
              <Input
                className="value-label"
                type="text"
                name="companyStreet"
                onChange={this.onChange}
                value={this.state.companyStreet}
              />
            </form>
          </InputGroup>

          <InputGroup>
            <InputGroupAddon addonType="prepend">Strassen-Nr.</InputGroupAddon>
            <form id="input-field">
              <Input
                className="value-label"
                type="text"
                name="companyStreetNr"
                onChange={this.onChange}
                value={this.state.companyStreetNr}
              />
            </form>
          </InputGroup>

          <InputGroup>
            <InputGroupAddon addonType="prepend">PLZ</InputGroupAddon>
            <form id="input-field">
              <Input
                className="value-label"
                type="text"
                name="companyZip"
                onChange={this.onChange}
                value={this.state.companyZip}
              />
            </form>
          </InputGroup>

          <InputGroup>
            <InputGroupAddon addonType="prepend">Ort</InputGroupAddon>
            <form id="input-field">
              <Input
                className="value-label"
                type="text"
                name="companyCity"
                onChange={this.onChange}
                value={this.state.companyCity}
              />
            </form>
          </InputGroup>

          <InputGroup>
            <InputGroupAddon addonType="prepend">URL Firma</InputGroupAddon>
            <form className="input-field">
              <Input
                className="value-label"
                type="text"
                name="companyURL"
                onChange={this.onChange}
                value={this.state.companyURL}
              />
            </form>
          </InputGroup>
        </div>

        <div className="private-info">
        <Label className="main-title">Privat</Label>
          <InputGroup>
            <InputGroupAddon addonType="prepend">Tel</InputGroupAddon>
            <form className="input-field">
              <Input
                className="value-label"
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
                className="value-label"
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
                className="value-label"
                type="text"
                name="privateEmail"
                onChange={this.onChange}
                value={this.state.privateEmail}
              />
            </form>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">Strasse</InputGroupAddon>
            <form id="input-field">
              <Input
                className="value-label"
                type="text"
                name="privateStreet"
                onChange={this.onChange}
                value={this.state.privateStreet}
              />
            </form>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">Strassen-Nr.</InputGroupAddon>
            <form id="input-field">
              <Input
                className="value-label"
                type="text"
                name="privateStreetNr"
                onChange={this.onChange}
                value={this.state.privateStreetNr}
              />
            </form>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">PLZ</InputGroupAddon>
            <form id="input-field">
              <Input
                className="value-label"
                type="text"
                name="privateZip"
                onChange={this.onChange}
                value={this.state.privateZip}
              />
            </form>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">Ort</InputGroupAddon>
            <form id="input-field">
              <Input
                className="value-label"
                type="text"
                name="privateCity"
                onChange={this.onChange}
                value={this.state.privateCity}
              />
            </form>
          </InputGroup>
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
