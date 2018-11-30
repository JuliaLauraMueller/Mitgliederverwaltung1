import React, { Component } from 'react';
import { InputGroup, Input, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../actions/profileActions';
import { putProfile } from '../../actions/profileActions';
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
          src={require('../../img/marc_zimmermann.jpg')}
          alt="profile"
        />
        <br />
        <InputGroup>
        <InputGroup>
          <FormGroup tag="fieldset">
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="salutation"
                  value="Frau"
                  checked={this.state.salutation === 'Frau'}
                  onChange={this.onChange}
                />{' '}
                Frau
            </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="salutation"
                  value="Herr"
                  checked={this.state.salutation === 'Herr'}
                  onChange={this.onChange}
                />{' '}
                Herr
            </Label>
            </FormGroup>
          </FormGroup>
          </InputGroup>

          <InputGroup>
            <Input
              type="text"
              name="title"
              onChange={this.onChange}
              value={this.state.title}
            />
          </InputGroup>

          <InputGroup>
            <Input
              type="text"
              name="firstname"
              onChange={this.onChange}
              value={this.state.firstname}
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="text"
              name="surename"
              onChange={this.onChange}
              value={this.state.surename}
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="text"
              name="alias"
              onChange={this.onChange}
              value={this.state.alias}
            />
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