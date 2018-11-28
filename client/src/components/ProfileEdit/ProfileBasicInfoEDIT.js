import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Label, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../actions/profileActions';
import '../../css/ProfileCSS.css';

class ProfileBasicInfoEDIT extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  constructor(props) {
    super(props);
    const profile = this.props.profile;
    this.state = {
      status: '',
      memberNumber: profile.memberNumber,
      entryDate: '',
      city: '',
      godfather: '',
      birthdate: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.props.fetchProfile();
  }

  render() {
    const profile = this.props.profile;
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
          {profile.entryDate}
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
          {profile.city}
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
          {profile.godfather}
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
          {profile.birthdate}
        </InputGroup>
      </div>
    );
  }
}

ProfileBasicInfoEDIT.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.member
});
export default connect(
  mapStateToProps,
  { fetchProfile }
)(ProfileBasicInfoEDIT);
