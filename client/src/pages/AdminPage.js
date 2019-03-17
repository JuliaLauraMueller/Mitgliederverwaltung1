import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import classnames from 'classnames';
import {
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Collapse,
  Button,
  Card,
  CardBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchMembers } from '../redux/actions/memberActions';
import { fetchCircles } from '../redux/actions/circleActions';

import '../css/AdminPage.css';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setNavVisible());

    this.getMemberRows = this.getMemberRows.bind(this);
    this.getCityRows = this.getCityRows.bind(this);

    this.state = {
      searchText: '',
      activeTab: '1',
      collapseMember: false,
      collapseCircle: false
    };
    this.toggle = this.toggle.bind(this);
    this.collapseCircle = this.collapseCircle.bind(this);
    this.collapseMember = this.collapseMember.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  collapseMember() {
    this.setState(state => ({ collapseMember: !state.collapseMember }));
  }

  collapseCircle() {
    this.setState(state => ({ collapseCircle: !state.collapseCircle }));
  }

  handleChange(event) {
    this.setState({ searchText: event.target.value });
  }

  componentDidMount() {
    this.props.dispatch(fetchMembers());
    this.props.dispatch(fetchCircles());
  }

  render() {
    return (
      <div>
        <h1>Administration</h1>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              Mitglieder
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              Cities
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Row className="top-area">
                  <Col sm="12">
                    <input
                      type="text"
                      name="search"
                      placeholder="Mitglied suchen"
                      className="form-control"
                      value={this.state.searchText}
                      onChange={this.handleChange.bind(this)}
                    />
                    <div>
                      <Button
                        color="primary"
                        onClick={this.collapseMember}
                        style={{ marginBottom: '1rem' }}
                        className="create-button"
                      >
                        Mitglied hinzufügen
                      </Button>
                      <Collapse isOpen={this.state.collapseMember}>
                        <Card>
                          <CardBody>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
                          </CardBody>
                        </Card>
                      </Collapse>
                    </div>
                  </Col>
                </Row>
                <Table hover className="adminTable">
                  <thead>
                    <tr>
                      <th className="d-none d-md-table-cell">Nr.</th>
                      <th>Vorname</th>
                      <th>Nachname</th>
                      <th className="d-none d-md-table-cell">E-Mail</th>
                      <th className="d-none d-sm-table-cell">City</th>
                      <th>Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>{this.getMemberRows(this.props.members)}</tbody>
                </Table>
              </Col>
            </Row>
          </TabPane>
          <div className="top-area">
            <Button
              color="primary"
              onClick={this.collapseCircle}
              style={{ marginBottom: '1rem' }}
              className="create-button"
            >
              City hinzufügen
            </Button>
            <Collapse isOpen={this.state.collapseCircle}>
              <Card>
                <CardBody>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </CardBody>
              </Card>
            </Collapse>
          </div>
          <Table hover className="adminTable">
            <thead>
              <tr>
                <th>City</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody>{this.getCityRows(this.props.circles)}</tbody>
          </Table>
          <TabPane tabId="2" />
        </TabContent>
      </div>
    );
  }

  getCityRows(circles) {
    return (
      circles
        // TODO: maybe reuse logic from member page search here (extract to helper function)
        .filter(circle => circle.name.startsWith(this.state.searchText))
        .map(circle => {
          return (
            <tr key={circle._id}>
              <td className="d-none d-sm-table-cell">{circle.name}</td>
              <td>
                <Link
                  className="admin-link admin-link-small"
                  to={'/circle/' + circle._id}
                >
                  Bearbeiten
                </Link>
                <br />
                <Link
                  className="admin-link admin-link-small"
                  to={'/circles/delete/' + circle._id}
                >
                  Löschen
                </Link>
              </td>
            </tr>
          );
        })
    );
  }

  getMemberRows(members) {
    return (
      members
        // TODO: maybe reuse logic from member page search here (extract to helper function)
        .filter(member => member.firstname.startsWith(this.state.searchText))
        .map(member => {
          return (
            <tr key={member._id}>
              <td className="d-none d-md-table-cell">{member.membernumber}</td>
              <td>{member.firstname}</td>
              <td>{member.surname}</td>
              <td className="d-none d-md-table-cell">{member.privateEmail}</td>
              <td className="d-none d-sm-table-cell">{member.circle}</td>
              <td>
                <Link
                  className="admin-link admin-link-small"
                  to={'/member/' + member._id}
                >
                  Bearbeiten
                </Link>
                <br />
                <Link
                  className="admin-link admin-link-small"
                  to={'/members/changeRole/' + member._id}
                >
                  Rolle ändern
                </Link>
                <br />
                <Link
                  className="admin-link admin-link-small"
                  to={'/members/delete/' + member._id}
                >
                  Löschen
                </Link>
              </td>
            </tr>
          );
        })
    );
  }
}
function mapStateToProps(state) {
  return {
    members: state.member.members,
    circles: state.circle.circles
  };
}

export default connect(mapStateToProps)(AdminPage);
