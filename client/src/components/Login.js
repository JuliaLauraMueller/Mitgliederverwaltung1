import React, { Component } from 'react';
import { Form, Input, FormGroup, Label, Button } from 'reactstrap';
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
      <Form name="loginForm">
        <FormGroup>
          <Label for="emailInp">E-Mail</Label>
          <Input
            type="email"
            name="email"
            placeholder="email@company.com"
            id="emailInp"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="passwordInp">Password</Label>
          <Input
            type="password"
            name="password"
            id="passwordInp"
            placeholder="********"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button
          color="primary"
          className="float-right btn-default"
          onClick={this.handleSubmit}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Login);
