import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { searchMembers } from "../redux/actions/memberActions";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class SearchFieldMember extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.props.dispatch(searchMembers(""));
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  handleInputChange = () => {
    this.props.dispatch(searchMembers(this.search.value));
  };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Container className="search-field-member">
        <Row>
          <Col>
            <form className="search-form">
              <img
                className="search-icon"
                src={require("../../public/img/search-grey.png")}
                alt="Card i cap"
              />
              <input
                className="search-input"
                style={{ background: "none", border: "none" }}
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
                  color={"rgb(15, 25, 41, 40%)"}
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

                  <div className="drop-down-filter">
                    <input type="checkbox" />

                    <label className="filter-cities"> Bern</label>
                  </div>

                  <div className="drop-down-filter">
                    <input type="checkbox" />

                    <label className="filter-cities">Zürich</label>
                  </div>

                  <div className="drop-down-filter">
                    <input type="checkbox" />

                    <label className="filter-cities">St.Gallen</label>
                  </div>
                </DropdownMenu>
              </ButtonDropdown>
              <hr />
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(SearchFieldMember);
