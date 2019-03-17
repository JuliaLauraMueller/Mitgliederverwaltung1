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
  CardBody,
  Modal,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import { connect } from 'react-redux';
import AdminCreateUser from '../components/Admin/AdminCreateUser';
import AdminCreateCircle from '../components/Admin/AdminCreateCircle';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchMembers, deleteMember } from '../redux/actions/memberActions';
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
      collapseCircle: false,
      memberToDelete: {}
    };
    this.toggle = this.toggle.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.collapseCircle = this.collapseCircle.bind(this);
    this.collapseMember = this.collapseMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.createMemberDeleteModal = this.createMemberDeleteModal.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleDeleteModal(member) {
    console.log('Member: ', member);
    this.setState(prevState => ({
      deleteModal: !prevState.deleteModal,
      memberToDelete: member
    }));
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

  deleteMember(id) {
    this.props.dispatch(deleteMember(id));
  }

  render() {
    return (
      <div>
        {this.createMemberDeleteModal()}
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
                            <AdminCreateUser close={this.collapseMember} />
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
          <TabPane tabId="2">
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
                    <AdminCreateCircle close={this.collapseCircle} />
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
          </TabPane>
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
                <span
                  className="admin-link admin-link-small"
                  to=""
                  onClick={() => this.toggleDeleteModal(member)}
                >
                  Löschen
                </span>
              </td>
            </tr>
          );
        })
    );
  }

  createMemberDeleteModal() {
    return (
      <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
        <ModalHeader toggle={this.toggleDeleteModal}>
          Mitglied '{this.state.memberToDelete.firstname}{' '}
          {this.state.memberToDelete.surname}' wirklich löschen?
        </ModalHeader>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.deleteMember(this.state.memberToDelete._id);
              this.toggleDeleteModal({});
            }}
          >
            Löschen
          </Button>{' '}
          <Button
            color="secondary"
            onClick={() => {
              this.toggleDeleteModal({});
            }}
          >
            Abbrechen
          </Button>
        </ModalFooter>
      </Modal>
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
