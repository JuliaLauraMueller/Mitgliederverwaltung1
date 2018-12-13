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
          <InputGroupAddon addonType="prepend">Status</InputGroupAddon>
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
          <InputGroupAddon addonType="prepend">Mitglieder Nr.</InputGroupAddon>
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
          <InputGroupAddon addonType="prepend">Eintrittsdatum</InputGroupAddon>
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
          <InputGroupAddon addonType="prepend">City</InputGroupAddon>
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
          <InputGroupAddon addonType="prepend">Götti</InputGroupAddon>
          <form className="input-field">
            <Input
              type="text"
              name="godfather"
              onChange={this.onChange}
              value={this.state.godfather}
            />
          </form>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Geburtsdatum</InputGroupAddon>
          <form className="input-field">
            <Input
              type="text"
              name="birthdate"
              onChange={this.onChange}
              value={this.state.birthdate}
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
