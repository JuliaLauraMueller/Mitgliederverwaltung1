import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  _isMounted = false;
  constructor(props) {
    super(props);
    const profile = this.props.profile;
    this.state = {
      activeTab: '1',

      invoiceAddress: profile.invoiceAddress === false ? '0' : '1',

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
    if (this._isMounted) {
      this.setState({ [e.target.name]: e.target.value });
    }
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
      invoiceAddress: this.state.invoiceAddress === '0' ? false : true
    };
    const companyUpdate = {
      company_id: this.props.profile.company_id,
      companyName: this.state.company,
      companyStreet: this.state.companyStreet,
      companyStreetNr: this.state.companyStreetNr,
      companyZip: this.state.companyZip,
      companyCity: this.state.companyCity,
      companyURL: this.state.companyURL
    };

    return { mainInfoUpdate: mainInfoUpdate, companyUpdate: companyUpdate };
  }

  render() {
    return (
      <Row id='mainInformation'>
        <Col md={{ offset: 0, size: 6 }} xs={{ offset: 1 }}>
          <Row>
            <Col>
              <p className='main-title title-maininfo space-top'>
                Geschäftliche Informationen
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>Branche:</InputGroupAddon>
                <div className='input-field'>
                  <Input
                    type='text'
                    name='sector'
                    onChange={this.onChange}
                    value={this.state.sector || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>Beruf:</InputGroupAddon>
                <div className='input-field'>
                  <Input
                    type='text'
                    name='job'
                    onChange={this.onChange}
                    value={this.state.job || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>Funktion:</InputGroupAddon>
                <div className='input-field'>
                  <Input
                    type='text'
                    name='function'
                    onChange={this.onChange}
                    value={this.state.function || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>Firma:</InputGroupAddon>
                <div className='input-field'>
                  <Input
                    type='text'
                    name='company'
                    onChange={this.onChange}
                    value={this.state.company || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>Tel:</InputGroupAddon>
                <div className='input-field'>
                  <Input
                    type='text'
                    name='companyTel'
                    onChange={this.onChange}
                    value={this.state.companyTel || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>Mobile:</InputGroupAddon>
                <div className='input-field'>
                  <Input
                    type='text'
                    name='companyMobile'
                    onChange={this.onChange}
                    value={this.state.companyMobile || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>Strasse:</InputGroupAddon>
                <div id='input-field'>
                  <Input
                    type='text'
                    name='companyStreet'
                    onChange={this.onChange}
                    value={this.state.companyStreet || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>Nr.:</InputGroupAddon>
                <div id='input-field'>
                  <Input
                    type='text'
                    name='companyStreetNr'
                    onChange={this.onChange}
                    value={this.state.companyStreetNr || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>PLZ:</InputGroupAddon>
                <div id='input-field'>
                  <Input
                    type='text'
                    name='companyZip'
                    onChange={this.onChange}
                    value={this.state.companyZip || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>Ort:</InputGroupAddon>
                <div id='input-field'>
                  <Input
                    type='text'
                    name='companyCity'
                    onChange={this.onChange}
                    value={this.state.companyCity || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>E-Mail:</InputGroupAddon>
                <div className='input-field'>
                  <Input
                    type='text'
                    name='companyEmail'
                    onChange={this.onChange}
                    value={this.state.companyEmail || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>
                  URL Firma:
                </InputGroupAddon>
                <div className='input-field'>
                  <Input
                    type='text'
                    name='companyURL'
                    onChange={this.onChange}
                    value={this.state.companyURL || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>
        </Col>

        <Col md={{ offset: 0, size: 6 }} xs={{ offset: 1 }}>
          <Row>
            <Col>
              <p className='main-title title-maininfo space-top'>
                Private Informationen
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>Tel</InputGroupAddon>
                <div className='input-field'>
                  <Input
                    type='text'
                    name='privateTel'
                    onChange={this.onChange}
                    value={this.state.privateTel || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>Mobile:</InputGroupAddon>
                <div className='input-field'>
                  <Input
                    type='text'
                    name='privateMobile'
                    onChange={this.onChange}
                    value={this.state.privateMobile || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>Strasse:</InputGroupAddon>
                <div id='input-field'>
                  <Input
                    type='text'
                    name='privateStreet'
                    onChange={this.onChange}
                    value={this.state.privateStreet || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>Nr.:</InputGroupAddon>
                <div id='input-field'>
                  <Input
                    type='text'
                    name='privateStreetNr'
                    onChange={this.onChange}
                    value={this.state.privateStreetNr || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>PLZ:</InputGroupAddon>
                <div id='input-field'>
                  <Input
                    type='text'
                    name='privateZip'
                    onChange={this.onChange}
                    value={this.state.privateZip || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>Ort:</InputGroupAddon>
                <div id='input-field'>
                  <Input
                    type='text'
                    name='privateCity'
                    onChange={this.onChange}
                    value={this.state.privateCity || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>Rechnung:</InputGroupAddon>
                <FormGroup
                  tag='fieldset'
                  className='input-field-radio'
                  id='radio-invoice'
                >
                  <FormGroup check>
                    <Label check>
                      <Input
                        type='radio'
                        name='invoiceAddress'
                        value='1'
                        checked={this.state.invoiceAddress === '1'}
                        onChange={this.onChange}
                      />{' '}
                      privat
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type='radio'
                        name='invoiceAddress'
                        value='0'
                        checked={this.state.invoiceAddress === '0'}
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
                <InputGroupAddon addonType='prepend'>E-Mail:</InputGroupAddon>
                <div className='input-field space'>
                  <Input
                    type='text'
                    name='privateEmail'
                    onChange={this.onChange}
                    value={this.state.privateEmail || ''}
                  />
                </div>
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
