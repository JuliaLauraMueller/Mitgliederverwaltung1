import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Row,
  } from 'reactstrap';

  const initialState = {
    title: '',
    article: '',
    author: {},
    date: ''
  };

  class AdminCreateEvent extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        ...initialState,
      };

      this.handleChange = this.handleChange.bind(this);
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

    render() {
    return (
        <div>
          <h4>Neuer News-Beitrag</h4>
          <Form> //todo on submit
            <FormGroup>
              <Row>
                <Col xs="3">
                  <Label for="title">Titel</Label>
                </Col>
                <Col xs="9">
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    className="admin-form-control"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="3">
                  <Label for="description">Article</Label>
                </Col>
                <Col xs={9}>
                  <Input
                    type="text"
                    name="article"
                    id="article"
                    className="admin-form-control"
                    value={this.state.article}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="3">
                  <Label for="date">Datum</Label>
                </Col>
                <Col xs={9}>
                  <Input
                    type="date"
                    name="date"
                    id="date"
                    className="admin-form-control"
                    autoComplete="off"
                    value={this.state.date}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
            </FormGroup>
            <input
              type="button"
              className="admin-button"
              onClick={this.cancel}
              value="Abbrechen"
            />
            <input
              type="submit"
              className="admin-button"
              onClick={this.submitEvent}
              value="Speichern"
            />
          </Form>
        </div>
      );
    }
}