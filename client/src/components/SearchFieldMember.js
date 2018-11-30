import React, { Component } from 'react';
import { Container } from 'reactstrap';

class SearchFieldMember extends Component {
  state = {
    query: ''
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    });
  };

  render() {
    return (
      <div>
        <Container className="search-field-member">
          <form className="search-form">
            <img
              className="search-icon"
              src={'./img/search-grey.png'}
              alt="Card i cap"
            />
            <input
              className="search-input"
              style={{ background: 'none', border: 'none' }}
              placeholder="suchen..."
              ref={input => (this.search = input)}
            />
            <hr />
          </form>
        </Container>
      </div>
    );
  }
}

export default SearchFieldMember;
