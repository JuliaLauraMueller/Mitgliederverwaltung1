import React, { Component } from 'react';
import NewsCard from '../components/NewsCard';
import SearchFieldEvent from '../components/SearchFieldEvent';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchEvents } from '../redux/actions/eventActions';
import store from '../helpers/store';

import '../css/Member.css';
import '../css/EventPage.css';

class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchEvents());
    this.props.dispatch(setNavVisible());
    this.state = {
      news: [
        {
          _id: '1',
          title: 'Breaking News',
          date: '12.05.2019',
          author: 'Petter Götti',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum lacus sem, quis sollicitudin neque congue ultrices. Integer eget magna efficitur, eleifend lorem nec, consequat quam. Vivamus hendrerit sem sit amet metus dignissim imperdiet. Vestibulum laoreet, justo sit amet laoreet posuere, tortor dolor cursus turpis, non consectetur diam libero eget orci. Aliquam vel velit maximus metus volutpat hendrerit ac facilisis erat. Cras odio arcu, interdum sit amet laoreet id, tincidunt ut massa. Duis sit amet laoreet elit. Donec ultrices neque dignissim, rhoncus lorem eget, ultricies risus.'
        },
        {
          _id: '2',
          title: 'Patrick hats geschafft',
          date: '16.07.2019',
          author: 'Marc Zimmermann',
          content:
            'Donec sed ullamcorper lectus. Nunc eleifend purus et libero finibus posuere. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam vitae nibh et tortor mattis dictum vitae id odio. Quisque cursus hendrerit ex, in lacinia mi dignissim quis. Sed euismod nec lacus eget faucibus. Aenean massa augue, convallis in nisl mollis, bibendum efficitur est.'
        }
      ]
    };
  }

  render() {
    console.log(this.state.news);
    let newsCards = [];
    if (this.state.news) {
      newsCards = this.state.news.map(newsArticle => (
        <NewsCard key={newsArticle._id} newsArticle={newsArticle} />
      ));
    }
    return (
      <Container className="member-page-container">
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
    newsArticle: state.newsArticle
  };
}

export default connect(mapStateToProps)(NewsPage);
