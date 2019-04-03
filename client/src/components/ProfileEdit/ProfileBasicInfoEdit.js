import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { putProfile } from '../../redux/actions/profileActions';

import '../../css/ProfilePage.css';

class ProfileBasicInfoEDIT extends Component {
  constructor(props) {
    super(props);
    const profile = this.props.profile;
    this.state = {
      xingLink: profile.xingLink,
      linkedinLink: profile.linkedinLink,
      facebookLink: profile.facebookLink,
      instagramLink: profile.instagramLink,
      offerings: profile.offerings,
      salutation: profile.salutation,
      title: profile.title,
      firstname: profile.firstname,
      surname: profile.surname,
      alias: profile.alias,
      status: profile.status,
      memberNumber: profile.memberNumber,
      entryDate: profile.entryDate,
      city: profile.city,
      godfather: profile.godfather,
      birthdate: profile.birthdate
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSave() {
    const basicInformationUpdate = {
      _id: this.props.profile._id,
      xingLink: this.state.xingLink,
      linkedinLink: this.state.linkedinLink,
      facebookLink: this.state.facebookLink,
      instagramLink: this.state.instagramLink,
      offerings: this.state.offerings,
      salutation: this.state.salutation,
      title: this.state.title,
      firstname: this.state.firstname,
      surname: this.state.surname,
      alias: this.state.alias,
      status: this.state.status,
      //memberNumber: this.state.memberNumber,
      entryDate: this.state.entryDate,
      //city: this.state.city,
      //godfather: this.state.godfather,
      birthdate: this.state.birthdate
    };
    return basicInformationUpdate;
  }

  render() {
    return (
      <Row>
        <Col md={{ offset: 0, size: 6 }} xs={{ offset: 1 }}>
          <Row>
            <Col>
              <InputGroup>
                <form className="input-field">
                  <img
                    className="profile-image-edit"
                    style={{ width: '147px' }}
                    src={require('../../../public/img/marc_zimmermann.jpg')}
                    alt="profile"
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <p className="main-title title-maininfo space-top">
                Anrede und Social Media
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon
                  id="salutation-group-addon"
                  addonType="prepend"
                >
                  Anrede:
                </InputGroupAddon>
                <fieldset>
                  <div className="input-field-radio">
                    <input
                      type="radio"
                      className="radio"
                      name="salutation"
                      value="Frau"
                      checked={this.state.salutation === 'Frau'}
                      onChange={this.onChange}
                    />
                    <label className="radio-label">Frau</label>
                    <input
                      type="radio"
                      className="radio"
                      name="salutation"
                      value="Herr"
                      checked={this.state.salutation === 'Herr'}
                      onChange={this.onChange}
                    />
                    <label className="radio-label">Herr</label>
                  </div>
                </fieldset>
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Titel:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="title"
                    onChange={this.onChange}
                    value={this.state.title}
                  />
                </form>
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Vorname:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="firstname"
                    onChange={this.onChange}
                    value={this.state.firstname}
                  />
                </form>
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Nachname:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="surname"
                    onChange={this.onChange}
                    value={this.state.surname}
                  />
                </form>
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Spitzname:
                </InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="alias"
                    onChange={this.onChange}
                    value={this.state.alias}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Xing:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="xingLink"
                    onChange={this.onChange}
                    value={this.state.xingLink}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Linkedin:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="linkedinLink"
                    onChange={this.onChange}
                    value={this.state.linkedinLink}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Facebook:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="facebookLink"
                    onChange={this.onChange}
                    value={this.state.facebookLink}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Instagram:
                </InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="instagramLink"
                    onChange={this.onChange}
                    value={this.state.instagramLink}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>
        </Col>

        <Col md={{ offset: 0, size: 6 }} xs={{ offset: 1 }}>
          <Row className="basic-info">
            <Col>
              <p className="main-title title-maininfo space-top">Kurzprofil</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Mitglied:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="memberNumber"
                    onChange={this.onChange}
                    value={this.state.memberNumber}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Beitritt:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="entryDate"
                    onChange={this.onChange}
                    value={this.state.entryDate}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Geburtstag:
                </InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="birthdate"
                    onChange={this.onChange}
                    value={this.state.birthdate}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Status:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="status"
                    onChange={this.onChange}
                    value={this.state.status}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">City:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="city"
                    onChange={this.onChange}
                    value={this.state.city}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Götti:</InputGroupAddon>
                <form className="input-field">
                  <Input
                    type="text"
                    name="godfather"
                    onChange={this.onChange}
                    value={this.state.godfather}
                  />
                </form>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Angebot:</InputGroupAddon>
                <form className="input-field" id="text-area-offers">
                  <Input
                    type="textarea"
                    name="offerings"
                    rows="3"
                    onChange={this.onChange}
                    value={this.state.offerings}
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

ProfileBasicInfoEDIT.propTypes = {
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
)(ProfileBasicInfoEDIT);
