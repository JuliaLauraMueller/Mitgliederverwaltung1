import React, { Component } from 'react';
import { InputGroup, Input, InputGroupAddon } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { putProfile } from '../../redux/actions/profileActions';

import '../../css/ProfilePage.css';

class ProfilePicEDIT extends Component {
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
    const profilePicUpdate = {
      xingLink: this.state.xingLink,
      linkedinLink: this.state.linkedinLink,
      facebookLink: this.state.facebookLink,
      instagramLink: this.state.instagramLink,
      offerings: this.state.offerings
    };

    this.props.dispatch(putProfile(profilePicUpdate));
  }

  render() {
    return (
      <div id="profilePic">
        <InputGroup>
          <form className="input-field">
            <img
              className="profile-image-edit"
              style={{ width: '147px' }}
              src={'./img/marc_zimmermann.jpg'}
              alt="profile"
            />
          </form>
        </InputGroup>

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
        <InputGroup>
          <InputGroupAddon addonType="prepend">Instagram:</InputGroupAddon>
          <form className="input-field">
            <Input
              type="text"
              name="instagramLink"
              onChange={this.onChange}
              value={this.state.instagramLink}
            />
          </form>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">E-Mail:</InputGroupAddon>
          <form className="input-field">
            <Input type="text" />
          </form>
        </InputGroup>
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
      </div>
    );
  }
}

ProfilePicEDIT.propTypes = {
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
)(ProfilePicEDIT);
