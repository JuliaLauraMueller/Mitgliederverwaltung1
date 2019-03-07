import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { searchMembers } from '../redux/actions/memberActions';
import { filterCircles } from '../redux/actions/memberActions';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class SearchFieldMember extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.props.dispatch(searchMembers(''));
    this.toggle = this.toggle.bind(this);
    this.state = {
      checkedCircles: [],
      dropdownOpen: false
    };
  }

  handleInputChange() {
    this.props.dispatch(searchMembers(this.search.value));
  }

  handleCheckboxChange(event) {
    if (event.target.checked) {
      this.state.checkedCircles.push(event.target.id);
    } else {
      this.state.checkedCircles.splice(
        this.state.checkedCircles.indexOf(event.target.id),
        1
      );
    }
    this.props.dispatch(filterCircles(this.state.checkedCircles));
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    let circles = [
      {
        _id: '5bfe74a07d3e650398e3e6c7',
        name: 'Bern'
      },
      {
        _id: '5bfe74b70108860398a4339b',
        name: 'Zürich'
      },
      {
        _id: '5bfe74b87d3e650398e3e6c8',
        name: 'St. Gallen'
      }
    ];

    let circleLabels = circles.map(circle => {
      return (
        <div className="drop-down-filter" key={circle._id}>
          <input
            type="checkbox"
            id={circle._id}
            onClick={this.handleCheckboxChange.bind(this)}
            defaultChecked={this.state.checkedCircles.includes(circle._id)}
          />

          <label htmlFor={circle._id} className="filter-cities">
            {circle.name}
          </label>
        </div>
      );
    });

    return (
      <Row className="search-field-member">
        <Col md="12">
          <form className="search-form">
            <div className="testerSearch">
              <img
                className="search-icon"
                src={require('../../public/img/search-grey.png')}
                alt="Card i cap"
              />
              <input
                className="search-input"
                style={{ background: 'none', border: 'none' }}
                placeholder="suchen..."
                ref={input => (this.search = input)}
                onChange={this.handleInputChange}
              />
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle
                  caret
                  className="filter-button"
                  color={'rgb(15, 25, 41, 40%)'}
                >
                  <svg
                    className="filter-icon"
                    viewBox="0 0 30 27"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                  >
                    <path d="M17.5 12.0001L28 1.40341H15L2 1.40332L13 12.0001V26L17.5 23.0001V18.0001V12.0001Z" />
                  </svg>
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem header>Standorte filtern</DropdownItem>
                  {circleLabels}
                </DropdownMenu>
              </ButtonDropdown>
              <hr />
            </div>
          </form>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(SearchFieldMember);
