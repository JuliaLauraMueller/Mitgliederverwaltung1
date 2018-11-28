import React, { Component } from 'react';
import '../../css/ProfileCSS.css';
import { InputGroup, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../actions/profileActions';

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
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div id="profilePic">
        <img
          style={{ width: '180px' }}
          src={require('../../img/marc_zimmermann.jpg')}
          alt="profile"
        />
        <InputGroup>
          <Input
            type="text"
            name="salutation"
            onChange={this.onChange}
            value={this.state.salutation}
          />
          <Input
            type="text"
            name="title"
            onChange={this.onChange}
            value={this.state.title}
          />
          <Input
            type="text"
            name="firstname"
            onChange={this.onChange}
            value={this.state.firstname}
          />
          <Input
            type="text"
            name="surename"
            onChange={this.onChange}
            value={this.state.surename}
          />
          <br />
          <h2>
            <Input
              type="text"
              name="alias"
              onChange={this.onChange}
              value={this.state.alias}
            />
          </h2>
        </InputGroup>
      </div>
    );
  }
}

ProfilePicEDIT.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.member
});
export default connect(
  mapStateToProps,
  { fetchProfile }
)(ProfilePicEDIT);
