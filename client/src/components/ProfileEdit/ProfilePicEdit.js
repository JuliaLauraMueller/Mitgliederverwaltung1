import React, { Component } from 'react';
import { InputGroup, Input, InputGroupAddon } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../redux/actions/profileActions';
import { putProfile } from '../../redux/actions/profileActions';

import '../../css/ProfilePage.css';

class ProfilePicEDIT extends Component {
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
      alias: profile.alias
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSave() {
    const profilePicUpdate = {
      salutation: this.state.salutation,
      title: this.state.title,
      firstname: this.state.firstname,
      surename: this.state.surename,
      alias: this.state.alias
    };

    this.props.putProfile(profilePicUpdate);
  }

  render() {
    return (
      <div id="profilePic">
        <img
          class="profile-image"
          style={{ width: '180px' }}
          src={'./img/marc_zimmermann.jpg'}
          alt="profile"
        />

        <InputGroup>
          <InputGroup>
            <InputGroupAddon id="salutation-group-addon" addonType="prepend">
              Anrede:
            </InputGroupAddon>
            <fieldset>
              <div class="input-field-salutation">
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
        </InputGroup>
      </div>
    );
  }
}

ProfilePicEDIT.propTypes = {
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
)(ProfilePicEDIT);
