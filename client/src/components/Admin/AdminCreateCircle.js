import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';

import { connect } from 'react-redux';

import { createCircle } from '../../redux/actions/circleActions';
import { alertError } from '../../redux/actions/alertActions';

const initialState = {
  name: ''
};

class AdminCreateCircle extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.createCircle = this.createCircle.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  cancel(event) {
    event.preventDefault();
    this.setState(initialState);
    this.props.close();
  }

  async createCircle(event) {
    event.preventDefault();
    await this.props
      .dispatch(createCircle(this.state))
      .then(res => {
        this.setState(initialState);
        this.props.close();
      })
      .catch(errorMessages => {
        this.props.dispatch(alertError(errorMessages.join('\n')));
      });
  }

  render() {
    let content = <div />;
    if (this.props.isLoading) {
      content = (
        <div>
          <div className='page-wrap-loading-screen' />
          <img
            src={require('../../img/LoadingIcon.gif')}
            alt='loading-icon'
            className='modal-loading-screen'
          />
        </div>
      );
    } else {
      content = <div />;
    }
    return (
      <div>
        {content}
        <h4>Neue City</h4>
        <Form onSubmit={this.createCircle}>
          <FormGroup>
            <Row>
              <Col xs='2'>
                <Label for='name'>
                  Name<pre className='required-field'>*</pre>
                </Label>
              </Col>
              <Col xs='10'>
                <Input
                  type='text'
                  id='name'
                  name='name'
                  className='admin-form-control'
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <input
            type='button'
            className='admin-button'
            onClick={this.cancel}
            value='Abbrechen'
          />
          <input
            type='submit'
            className='admin-button'
            onClick={this.createCircle}
            value='Speichern'
          />
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AdminCreateCircle);
