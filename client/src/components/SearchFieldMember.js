import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { searchMembers } from '../redux/actions/memberActions';

class SearchFieldMember extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.props.dispatch(searchMembers(''));
  }

  handleInputChange = () => {
    this.props.dispatch(searchMembers(this.search.value));
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
              onChange={this.handleInputChange}
            />
            <hr />
          </form>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(SearchFieldMember);
