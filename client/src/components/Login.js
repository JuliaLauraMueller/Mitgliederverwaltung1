import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap';
import { login, logout } from '../redux/actions/authActions';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(logout());

    this.state = {
      privateEmail: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    if (this.state.privateEmail && this.state.password) {
      dispatch(login(this.state.privateEmail, this.state.password));
    }
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-middle">
          <div className="login-inner">
            <img
              src={require('../img/logo_with_font_small.png')}
              alt="logo"
              className="login-logo"
            />
            <Form name="loginForm">
              <div className="input-container">
                <img
                  src={require('../img/mail.png')}
                  alt="mail"
                  className="input-icon"
                />
                <Input
                  type="email"
                  name="privateEmail"
                  placeholder="E-Mail"
                  id="emailInp"
                  className="icon-input"
                  autoComplete="username"
                  value={this.state.privateEmail}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-container">
                <img
                  src={require('../img/Lock.png')}
                  alt="password"
                  className="input-icon"
                />
                <Input
                  type="password"
                  name="password"
                  id="passwordInp"
                  placeholder="Passwort"
                  className="icon-input"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <Button
                className="login-button"
                onClick={this.handleSubmit}
                type="submit"
              >
                Login
              </Button>
              <div className="additional-login-box">
                <a
                  className="login-button-additional"
                  href="mailto:mz@youngleader.ch"
                >
                  Passwort vergessen?
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="login-button-additional"
                  id="login-member"
                  href="https://www.youngleaders.ch/leaderwerden/"
                >
                  Leader werden
                </a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Login);
