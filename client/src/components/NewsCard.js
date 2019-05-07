import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { ContentState, EditorState, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';

class NewsCard extends Component {
  constructor(props) {
    super(props);
    this.days = [
      'Sonntag',
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag'
    ];
    this.months = [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember'
    ];
    this.state = {
      isChecked: false
    };

    this.truncate = this.truncate.bind(this);
  }

  handleCheckboxChange() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  truncate(editorState, charCount) {
    const contentState = editorState.getCurrentContent();
    const blocks = contentState.getBlockMap();

    let count = 0;
    let isTruncated = false;
    const truncatedBlocks = [];
    blocks.forEach(block => {
      if (!isTruncated) {
        const length = block.getLength();
        if (count + length > charCount) {
          isTruncated = true;
          const truncatedText = block.getText().slice(0, charCount - count);
          const state = ContentState.createFromText(`${truncatedText}...`);
          truncatedBlocks.push(state.getFirstBlock());
        } else {
          truncatedBlocks.push(block);
        }
        count += length + 1;
      }
    });

    if (isTruncated) {
      const state = ContentState.createFromBlockArray(truncatedBlocks);
      return EditorState.createWithContent(state);
    }

    return editorState;
  }

  render() {
    let articleContent = <div />;
    if (this.props.newsArticle.article.length !== 0) {
      let editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(this.props.newsArticle.article))
      );
      if (!this.state.isChecked) {
        articleContent = (
          <Editor
            editorState={this.truncate(editorState, 80)}
            onChange={() => {}}
            readOnly
          />
        );
      } else {
        articleContent = (
          <Editor editorState={editorState} onChange={() => {}} readOnly />
        );
      }
    }
    return (
      <Card className="news-card" style={{ border: '1px solid white' }}>
        <CardBody>
          <Row>
            <Col>
              {' '}
              <div className="news-card-content">
                <div>
                  <CardTitle className="news-card-title">
                    {this.props.newsArticle.title} <br />
                  </CardTitle>
                </div>
                <div>
                  <CardText className="news-card-date">
                    {this.props.newsArticle.date}
                  </CardText>
                </div>
                <div>
                  <CardText className="news-card-author">
                    {this.props.newsArticle.author}
                  </CardText>
                </div>
                <div>
                  <div className="news-card-description">
                    <input
                      type="checkbox"
                      className="read-more-state"
                      id={this.props.newsArticle._id}
                      onChange={this.handleCheckboxChange.bind(this)}
                    />
                    {articleContent}
                    <label
                      htmlFor={this.props.newsArticle._id}
                      className="read-more-trigger"
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col />
          </Row>

          <Col />
          <Col />
        </CardBody>
      </Card>
    );
  }
}

export default NewsCard;
