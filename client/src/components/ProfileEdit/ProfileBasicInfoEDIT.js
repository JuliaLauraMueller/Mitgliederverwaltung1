import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../actions/profileActions';
import { putProfile } from '../../actions/profileActions';
import '../../css/ProfileCSS.css';

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

  onSave() {
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
      <div id="basicInformation">
        <InputGroup>
          <InputGroupAddon addonType="prepend">Status</InputGroupAddon>
          <Input
            type="text"
            name="status"
            onChange={this.onChange}
            value={this.state.status}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">Mitglieder Nr.</InputGroupAddon>
          <Input
            type="text"
            name="memberNumber"
            onChange={this.onChange}
            value={this.state.memberNumber}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">Eintrittsdatum</InputGroupAddon>
          <Input
            type="text"
            name="entryDate"
            onChange={this.onChange}
            value={this.state.entryDate}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">City</InputGroupAddon>
          <Input
            type="text"
            name="city"
            onChange={this.onChange}
            value={this.state.city}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">Götti</InputGroupAddon>
          <Input
            type="text"
            name="godfather"
            onChange={this.onChange}
            value={this.state.godfather}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">Geburtsdatum</InputGroupAddon>
          <Input
            type="text"
            name="birthdate"
            onChange={this.onChange}
            value={this.state.birthdate}
          />
        </InputGroup>
      </div>
    );
  }
}

ProfileBasicInfoEDIT.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  putProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
  //updatedProfile: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile.member
  // updatedProfile: state.profile.member
});

export default connect(
  mapStateToProps,
  { fetchProfile, putProfile },
  null,
  { withRef: true }
)(ProfileBasicInfoEDIT);
