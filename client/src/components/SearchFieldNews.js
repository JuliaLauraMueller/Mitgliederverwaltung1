import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { searchNewsArticles } from '../redux/actions/newsArticleActions';

class SearchFieldNews extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(searchNewsArticles('', false));
  }

  handleInputChange() {
    this.props.dispatch(searchNewsArticles(this.search.value, false));
  }

  render() {
    return (
      <Row className="search-field-member">
        <Col md="12">
          <div className="search-form">
            <div className="testerSearch">
              <img
                className="search-icon"
                src={require('../img/search-grey.png')}
                alt="Card i cap"
              />
              <input
                className="search-input"
                style={{ background: 'none', border: 'none' }}
                placeholder="suchen..."
                ref={input => (this.search = input)}
                onChange={this.handleInputChange}
              />
              <hr />
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(SearchFieldNews);
