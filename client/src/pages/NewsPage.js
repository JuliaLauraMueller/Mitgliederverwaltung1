import React, { Component } from 'react';
import NewsCard from '../components/NewsCard';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchNewsArticles } from '../redux/actions/newsArticleActions';

import '../css/Member.css';
import '../css/News.css';

class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchNewsArticles());
    this.props.dispatch(setNavVisible());
  }

  render() {
    let newsCards = [];
    if (this.props.news) {
      newsCards = this.props.news.map(newsArticle => (
        <NewsCard key={newsArticle._id} newsArticle={newsArticle} />
      ));
    }
    return (
      <Container className="news-page-container">
        <Row>
          <Col>
            <Helmet>
              <style>
                {'body { background-color: rgb(15, 25, 41, 10%); }'}
              </style>
            </Helmet>
            <Row className="member-cards-row" key={newsCards}>
              {newsCards}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    news: state.newsArticle.filteredNewsArticles
  };
}

export default connect(mapStateToProps)(NewsPage);
