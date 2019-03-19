import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { putProfile, putCompany } from '../../redux/actions/profileActions';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Label,
  FormGroup,
  Row,
  Col
} from 'reactstrap';

import '../../css/ProfilePage.css';

class ProfileMainInformationEDIT extends Component {
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
      _id: this.props.profile._id,
      sector: this.state.sector,
      job: this.state.job,
      function: this.state.function,
      companyTel: this.state.companyTel,
      companyMobile: this.state.companyMobile,
      companyEmail: this.state.companyEmail,
      privateTel: this.state.privateTel,
      privateMobile: this.state.privateMobile,
      privateEmail: this.state.privateEmail,
      privateStreet: this.state.privateStreet,
      privateStreetNr: this.state.privateStreetNr,
      privateZip: this.state.privateZip,
      privateCity: this.state.privateCity,
      invoiceAddress: this.state.invoiceAddress
    };
    const companyUpdate = {
      _id: this.props.profile.company_id,
      companyName: this.state.company,
      companyStreet: this.state.companyStreet,
      companyStreetNr: this.state.companyStreetNr,
      companyZip: this.state.companyZip,
      companyCity: this.state.companyCity,
      companyURL: this.state.companyURL
    };

    //TODO: Find a way to update all info or none at all (Together with BasicInfo)
    this.props.dispatch(putProfile(mainInfoUpdate));
    this.props.dispatch(putCompany(companyUpdate));
  }

  render() {
    return (
      <Row id="mainInformation">
        <Col md={{ offset: 0, size: 6 }} xs={{ offset: 1 }}>
          <Row>
            <Col>
              <p className="main-title title-maininfo space-top">
                Geschäftliche Informationen
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Branche:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="sector"
                    onChange={this.onChange}
                    value={this.state.sector}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Beruf:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    
                    type="text"
                    name="job"
                    onChange={this.onChange}
                    value={this.state.job}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Funktion:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="function"
                    onChange={this.onChange}
                    value={this.state.function}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Firma:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="company"
                    onChange={this.onChange}
                    value={this.state.company}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Tel:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="companyTel"
                    onChange={this.onChange}
                    value={this.state.companyTel}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Mobile:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="companyMobile"
                    onChange={this.onChange}
                    value={this.state.companyMobile}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Strasse:</InputGroupAddon>
                <form id="input-field">
                  <Input
                    type="text"
                    name="companyStreet"
                    onChange={this.onChange}
                    value={this.state.companyStreet}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Nr.:
                </InputGroupAddon>
                <form id="input-field">
                  <Input
                    type="text"
                    name="companyStreetNr"
                    onChange={this.onChange}
                    value={this.state.companyStreetNr}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">PLZ:</InputGroupAddon>
                <form id="input-field">
                  <Input
                    type="text"
                    name="companyZip"
                    onChange={this.onChange}
                    value={this.state.companyZip}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Ort:</InputGroupAddon>
                <form id="input-field">
                  <Input
                    type="text"
                    name="companyCity"
                    onChange={this.onChange}
                    value={this.state.companyCity}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">E-Mail:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="companyEmail"
                    onChange={this.onChange}
                    value={this.state.companyEmail}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  URL Firma:
                </InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="companyURL"
                    onChange={this.onChange}
                    value={this.state.companyURL}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>
        </Col>

        <Col md={{ offset: 0, size: 6 }} xs={{ offset: 1 }}>
          <Row>
            <Col>
              <p className="main-title title-maininfo space-top">
                Private Informationen
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
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
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Mobile:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="privateMobile"
                    onChange={this.onChange}
                    value={this.state.privateMobile}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Strasse:</InputGroupAddon>
                <form id="input-field">
                  <Input
                    type="text"
                    name="privateStreet"
                    onChange={this.onChange}
                    value={this.state.privateStreet}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Nr.:
                </InputGroupAddon>
                <form id="input-field">
                  <Input
                    type="text"
                    name="privateStreetNr"
                    onChange={this.onChange}
                    value={this.state.privateStreetNr}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">PLZ:</InputGroupAddon>
                <form id="input-field">
                  <Input
                    type="text"
                    name="privateZip"
                    onChange={this.onChange}
                    value={this.state.privateZip}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Ort:</InputGroupAddon>
                <form id="input-field">
                  <Input
                    type="text"
                    name="privateCity"
                    onChange={this.onChange}
                    value={this.state.privateCity}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Rechnung:</InputGroupAddon>
                <FormGroup
                  tag="fieldset"
                  className="input-field-radio"
                  id="radio-invoice"
                >
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="invoiceAddress"
                        value="1"
                        checked={this.state.invoiceAddress === '1'}
                        onChange={this.onChange}
                      />{' '}
                      privat
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
                      geschäftlich
                    </Label>
                  </FormGroup>
                </FormGroup>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">E-Mail:</InputGroupAddon>
                <form className="input-field space">
                  <Input
                    type="text"
                    name="privateEmail"
                    onChange={this.onChange}
                    value={this.state.privateEmail}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

ProfileMainInformationEDIT.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.member
});

export default connect(
  mapStateToProps,
  null,
  null,
  { withRef: true }
)(ProfileMainInformationEDIT);
