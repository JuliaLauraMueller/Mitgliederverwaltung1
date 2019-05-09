import React, { Component } from 'react';
import NewsCard from '../components/NewsCard';
import SearchFieldNews from '../components/SearchFieldNews';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchNewsArticles } from '../redux/actions/newsArticleActions';
import classnames from 'classnames';

import '../css/Member.css';
import '../css/News.css';

class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchNewsArticles());
    this.props.dispatch(setNavVisible());
    this.state = {
      prevScrollpos: window.pageYOffset,
      visible: true
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };

  render() {
    let newsCards = <p className="no-data-found">Keine News gefunden</p>;
    if (this.props.news && this.props.news.length !== 0) {
      let currentNews = this.props.news.slice(0, 30);
      newsCards = currentNews.map(newsArticle => (
        <NewsCard key={newsArticle._id} newsArticle={newsArticle} />
      ));
    }
    return (
      <Container className="news-page-container">
        <Row>
          <Col>
            <h1 className="title">News</h1>
            <Helmet>
              <style>
                {'body { background-color: rgb(15, 25, 41, 10%); }'}
              </style>
            </Helmet>
            <div
              className={classnames('search-container', {
                'search-container--hidden': !this.state.visible
              })}
            >
              <SearchFieldNews />
            </div>

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
