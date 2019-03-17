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
import { fetchCircles, deleteCircle } from '../redux/actions/circleActions';
import filterMembers from '../helpers/memberSearch';

import '../css/AdminPage.css';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setNavVisible());

    this.getMemberRows = this.getMemberRows.bind(this);
    this.getCircleRows = this.getCircleRows.bind(this);

    this.state = {
      searchText: '',
      activeTab: '1',
      collapseMember: false,
      collapseCircle: false,
      memberToDelete: {},
      circleToDelete: {}
    };
    this.toggle = this.toggle.bind(this);
    this.toggleMemberDeleteModal = this.toggleMemberDeleteModal.bind(this);
    this.toggleCircleDeleteModal = this.toggleCircleDeleteModal.bind(this);
    this.collapseCircle = this.collapseCircle.bind(this);
    this.collapseMember = this.collapseMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.createMemberDeleteModal = this.createMemberDeleteModal.bind(this);
    this.createCircleDeleteModal = this.createCircleDeleteModal.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleMemberDeleteModal(member) {
    this.setState(prevState => ({
      memberDeleteModal: !prevState.memberDeleteModal,
      memberToDelete: member
    }));
  }

  toggleCircleDeleteModal(circle) {
    this.setState(prevState => ({
      circleDeleteModal: !prevState.circleDeleteModal,
      circleToDelete: circle
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

  deleteCircle(id) {
    this.props.dispatch(deleteCircle(id));
  }

  render() {
    return (
      <div>
        {this.createMemberDeleteModal()}
        {this.createCircleDeleteModal()}
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
                      placeholder="Nach Name, City, Firma oder Funktion suchen..."
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
              <tbody>{this.getCircleRows(this.props.circles)}</tbody>
            </Table>
          </TabPane>
        </TabContent>
      </div>
    );
  }

  getCircleRows(circles) {
    return circles.map(circle => {
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
            <span
              className="admin-link admin-link-small"
              onClick={() => this.toggleCircleDeleteModal(circle)}
            >
              Löschen
            </span>
          </td>
        </tr>
      );
    });
  }

  getMemberRows(members) {
    return filterMembers(members, this.state.searchText, true).map(member => {
      return (
        <tr key={member._id}>
          <td className="d-none d-md-table-cell">{member.membernumber}</td>
          <td>{member.firstname}</td>
          <td>{member.surname}</td>
          <td className="d-none d-md-table-cell">{member.privateEmail}</td>
          <td className="d-none d-sm-table-cell">
            {member.circle ? member.circle.name : ''}
          </td>
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
              onClick={() => this.toggleMemberDeleteModal(member)}
            >
              Löschen
            </span>
          </td>
        </tr>
      );
    });
  }

  createMemberDeleteModal() {
    return (
      <Modal
        isOpen={this.state.memberDeleteModal}
        toggle={() => this.toggleMemberDeleteModal({})}
      >
        <ModalHeader toggle={() => this.toggleMemberDeleteModal({})}>
          Mitglied '{this.state.memberToDelete.firstname}{' '}
          {this.state.memberToDelete.surname}' wirklich löschen?
        </ModalHeader>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.deleteMember(this.state.memberToDelete._id);
              this.toggleMemberDeleteModal({});
            }}
          >
            Löschen
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              this.toggleMemberDeleteModal({});
            }}
          >
            Abbrechen
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  createCircleDeleteModal() {
    return (
      <Modal
        isOpen={this.state.circleDeleteModal}
        toggle={() => this.toggleCircleDeleteModal({})}
      >
        <ModalHeader toggle={() => this.toggleCircleDeleteModal({})}>
          City '{this.state.circleToDelete.name}' wirklich löschen?
        </ModalHeader>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.deleteCircle(this.state.circleToDelete._id);
              this.toggleCircleDeleteModal({});
            }}
          >
            Löschen
          </Button>{' '}
          <Button
            color="secondary"
            onClick={() => {
              this.toggleCircleDeleteModal({});
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
