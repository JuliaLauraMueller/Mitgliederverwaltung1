import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { alertError } from '../../redux/actions/alertActions';
import {
  createNewsArticle,
  fetchNewsArticles
} from '../../redux/actions/newsArticleActions';
import TextEditor from './AdminNewsTextEditor.js';

let initialState = {
  newsArticleTitle: '',
  article: '',
  author: '',
  newsArticleDate: ''
};

class AdminCreateNewsArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
    this.handleChange = this.handleChange.bind(this);
    this.cancel = this.cancel.bind(this);
    this.submitNewsArticle = this.submitNewsArticle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    initialState.author = nextProps.initialAuthor;
    this.setState({
      ...initialState
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  cancel(event) {
    event.preventDefault();
    this.setState(initialState);
    this.props.close();
  }

  async submitNewsArticle(newsArticle) {
    newsArticle.preventDefault();
    await this.props
      .dispatch(
        createNewsArticle({
          title: this.state.newsArticleTitle,
          article: this.refs.texteditor.getRawContent(),
          author: this.state.author,
          date: this.state.newsArticleDate
        })
      )
      .then(res => {
        this.setState(initialState);
        this.props.close();
        this.props.dispatch(fetchNewsArticles());
      })
      .catch(errorMessages => {
        this.props.dispatch(alertError(errorMessages.join('\n')));
      });
  }

  render() {
    return (
      <div>
        <h4>Neuer News-Beitrag</h4>
        <Form onSubmit={this.submitNewsArticle}>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="newsArticleTitle">
                  Titel<pre className="required-field">*</pre>
                </Label>
              </Col>
              <Col xs="9">
                <Input
                  type="text"
                  name="newsArticleTitle"
                  id="newsArticleTitle"
                  className="admin-form-control-create-news"
                  value={this.state.newsArticleTitle}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="author">
                  Autor <pre className="required-field">*</pre>
                </Label>
              </Col>
              <Col xs={9}>
                <Input
                  type="text"
                  name="author"
                  id="author"
                  className="admin-form-control-create-news"
                  value={this.state.author}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="article">
                  Inhalt<pre className="required-field">*</pre>
                </Label>
              </Col>
              <Col xs={12} md={9}>
                <TextEditor
                  className="admin-form-control-create-news"
                  ref="texteditor"
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="3">
                <Label for="newsArticleDate">
                  Datum<pre className="required-field">*</pre>
                </Label>
              </Col>
              <Col xs={9}>
                <Input
                  type="date"
                  name="newsArticleDate"
                  id="newsArticleDate"
                  className="admin-form-control-create-news"
                  autoComplete="off"
                  value={this.state.newsArticleDate}
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
            onClick={this.submitNewsArticle}
            value="Speichern"
          />
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AdminCreateNewsArticle);
