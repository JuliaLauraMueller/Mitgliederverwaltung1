import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../redux/actions/profileActions';
import { putProfile } from '../../redux/actions/profileActions';

import '../../css/ProfilePage.css';

class ProfileBasicInfoEDIT extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  constructor(props) {
    super(props);
    const profile = this.props.profile;
    this.state = {
      salutation: profile.salutation,
      title: profile.title,
      firstname: profile.firstname,
      surename: profile.surename,
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

  onSave(e) {
    const basicInformationUpdate = {
      salutation: this.state.salutation,
      title: this.state.title,
      firstname: this.state.firstname,
      surename: this.state.surename,
      alias: this.state.alias,
      status: this.state.status,
      memberNumber: this.state.memberNumber,
      entryDate: this.state.entryDate,
      city: this.state.city,
      godfather: this.state.godfather,
      birthdate: this.state.birthdate
    };
    this.props.putProfile(basicInformationUpdate);
  }

  render() {
    return (
      <div id="basicInformationEdit">
        <InputGroup>
          <InputGroupAddon id="salutation-group-addon" addonType="prepend">
            Anrede:
          </InputGroupAddon>
          <fieldset>
            <div class="input-field-radio">
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
              name="surename"
              onChange={this.onChange}
              value={this.state.surename}
            />
          </form>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Spitzname:</InputGroupAddon>
          <form className="input-field">
            <Input
              type="text"
              name="alias"
              onChange={this.onChange}
              value={this.state.alias}
            />
          </form>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Mitglieder Nr.:</InputGroupAddon>
          <form className="input-field">
            <Input
              type="text"
              name="memberNumber"
              onChange={this.onChange}
              value={this.state.memberNumber}
            />
          </form>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Eintrittsdatum:</InputGroupAddon>
          <form className="input-field">
            <Input
              type="text"
              name="entryDate"
              onChange={this.onChange}
              value={this.state.entryDate}
            />
          </form>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Geburtsdatum:</InputGroupAddon>
          <form className="input-field">
            <Input
              type="text"
              name="birthdate"
              onChange={this.onChange}
              value={this.state.birthdate}
            />
          </form>
        </InputGroup>
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
      </div>
    );
  }
}

ProfileBasicInfoEDIT.propTypes = {
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
)(ProfileBasicInfoEDIT);
