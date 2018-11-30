import React, { Component } from 'react';
import { InputGroup, Input, Label, InputGroupAddon } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../actions/profileActions';
import { putProfile } from '../../actions/profileActions';
import '../../css/ProfilePage.css';

class ProfileSocialMediaEDIT extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  constructor(props) {
    super(props);
    const profile = this.props.profile;
    this.state = {
      xingLink: profile.xingLink,
      linkedinLink: profile.linkedinLink,
      facebookLink: profile.facebookLink,
      instagramLink: profile.instagramLink,
      offerings: profile.offerings
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSave() {
    const socialMediaUpdate = {
      xingLink: this.state.xingLink,
      linkedinLink: this.state.linkedinLink,
      facebookLink: this.state.facebookLink,
      instagramLink: this.state.instagramLink,
      offerings: this.state.offerings
    };

    this.props.putProfile(socialMediaUpdate);
  }

  render() {
    return (
      <div id="socialMedia">
        <InputGroup>
          <InputGroupAddon addonType="prepend">Xing</InputGroupAddon>
          <Input
            type="text"
            name="xingLink"
            onChange={this.onChange}
            value={this.state.xingLink}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">Linkedin</InputGroupAddon>
          <Input
            type="text"
            name="linkedinLink"
            onChange={this.onChange}
            value={this.state.linkedinLink}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">Facebook</InputGroupAddon>
          <Input
            type="text"
            name="facebookLink"
            onChange={this.onChange}
            value={this.state.facebookLink}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">Instagram</InputGroupAddon>
          <Input
            type="text"
            name="instagramLink"
            onChange={this.onChange}
            value={this.state.instagramLink}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <Label>Was biete ich an?</Label>
          <Input
            type="textarea"
            name="offerings"
            onChange={this.onChange}
            value={this.state.offerings}
          />
        </InputGroup>
        <br />
      </div>
    );
  }
}

ProfileSocialMediaEDIT.propTypes = {
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
)(ProfileSocialMediaEDIT);
