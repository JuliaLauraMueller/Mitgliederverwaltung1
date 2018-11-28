import React, { Component } from 'react';
import { Form, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { login, logout } from '../redux/actions/authActions';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(logout());

    this.state = {
      email: '',
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
    if (this.state.email && this.state.password) {
      dispatch(login(this.state.email, this.state.password));
    }
  }

  render() {
    return (
      <div class="login-container">
        <div class="login-child">
          <Form name="loginForm">
            <div class="input-container">
              <img src="./img/Mail.png" alt="mail" class="input-icon" />
              <Input
                type="email"
                name="email"
                placeholder="E-Mail"
                id="emailInp"
                className="custom-input-field icon-input"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div class="input-container">
              <img src="./img/Lock.png" alt="password" class="input-icon" />
              <Input
                type="password"
                name="password"
                id="passwordInp"
                placeholder="Passwort"
                className="custom-input-field icon-input"
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
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Login);
