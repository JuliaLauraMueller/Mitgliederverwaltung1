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
  ModalFooter,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import AdminCreateUser from '../components/Admin/AdminCreateUser';
import AdminCreateCircle from '../components/Admin/AdminCreateCircle';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchMembers, deleteMember } from '../redux/actions/memberActions';
import { alertError } from '../redux/actions/alertActions';
import {
  fetchCircles,
  putCircle,
  deleteCircle
} from '../redux/actions/circleActions';
import { filterMembers } from '../helpers/memberSearch';

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
      editModal: false,
      circleToEdit: { name: '' },
      circleToDelete: {}
    };

    this.toggle = this.toggle.bind(this);
    this.toggleMemberDeleteModal = this.toggleMemberDeleteModal.bind(this);
    this.toggleCircleDeleteModal = this.toggleCircleDeleteModal.bind(this);
    this.toggleCircleEditModal = this.toggleCircleEditModal.bind(this);
    this.collapseCircle = this.collapseCircle.bind(this);
    this.collapseMember = this.collapseMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.createMemberDeleteModal = this.createMemberDeleteModal.bind(this);
    this.createCircleDeleteModal = this.createCircleDeleteModal.bind(this);
    this.createCircleEditModal = this.createCircleEditModal.bind(this);
    this.onCircleSave = this.onCircleSave.bind(this);
    this.handleCircleNameChange = this.handleCircleNameChange.bind(this);
  }

  async onCircleSave(event) {
    event.preventDefault();
    await this.props
      .dispatch(putCircle(this.state.circleToEdit))
      .then(res => {
        this.toggleCircleEditModal({ name: '' });
      })
      .catch(errorMessages => {
        this.props.dispatch(alertError(errorMessages.join('\n')));
      });
  }

  handleCircleNameChange(e) {
    e.persist();
    this.setState(prevState => ({
      circleToEdit: {
        _id: prevState.circleToEdit._id,
        name: e.target.value
      }
    }));
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

  toggleCircleEditModal(circle) {
    this.setState(prevState => ({
      editModal: !prevState.editModal,
      circleToEdit: circle
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
                      <input
                        type="submit"
                        style={{ marginBottom: '1rem' }}
                        className="create-button"
                        color="primary"
                        onClick={this.collapseMember}
                        value="Mitglied hinzufügen"
                      />
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
                      <th className="d-none d-md-table-cell">City</th>
                      <th>Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>{this.getMemberRows(this.props.members)}</tbody>
                </Table>
              </Col>
            </Row>
          </TabPane>
          {this.createCircleEditModal()}
          <TabPane tabId="2">
            <div className="top-area">
              <input
                type="submit"
                style={{ marginBottom: '1rem' }}
                className="create-button"
                color="primary"
                onClick={this.collapseCircle}
                value="City hinzufügen"
              />
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
            <span
              className="admin-link admin-link-small admin-cursor"
              onClick={() => this.toggleCircleEditModal(circle)}
              data-toggle="tooltip"
              title="City bearbeiten"
            >
              <svg
                width="24"
                height="23"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.163 15.4171V15.2921H17.162V8.46425H17.977V15.4171C17.977 16.7418 16.8431 17.8534 15.44 17.8534H2.662C1.25889 17.8534 0.125 16.7428 0.125 15.4171V3.24147C0.125 1.91888 1.25564 0.854736 2.662 0.854736H9.991V1.61858H2.662C1.72047 1.61858 0.94 2.3238 0.94 3.24051V15.4171C0.94 16.3285 1.71495 17.0895 2.662 17.0895H15.441C16.388 17.0895 17.163 16.3285 17.163 15.4171Z"
                  fill="#E1993D"
                  stroke="#E1993D"
                  strokeWidth="0.25"
                />
                <path
                  d="M18.1517 0.66573L18.1519 0.66589C18.5307 1.02595 18.737 1.50229 18.737 2.00934C18.737 2.51631 18.5297 2.99369 18.1518 3.35384L11.0088 10.1601C10.9567 10.2097 10.8916 10.2455 10.8196 10.2623L10.819 10.2624L7.80703 10.9799L7.80639 10.9801C7.77368 10.988 7.74066 10.9917 7.707 10.9917C7.59904 10.9917 7.49436 10.951 7.41745 10.8778C7.31721 10.7815 7.27875 10.6448 7.31193 10.5176C7.31194 10.5176 7.31194 10.5175 7.31195 10.5175L8.06391 7.6486L8.06399 7.64831C8.0809 7.58315 8.1174 7.52142 8.16923 7.47204L15.3122 0.665783C16.069 -0.0552897 17.396 -0.0552146 18.1517 0.66573ZM10.476 9.5556L10.5088 9.54778L10.5332 9.5245L16.4422 3.89406L16.5372 3.80357L16.4422 3.71307L14.9362 2.27807L14.85 2.1959L14.7638 2.27807L8.85477 7.9085L8.82909 7.93297L8.82009 7.96728L8.31809 9.88061L8.26519 10.0822L8.46796 10.0339L10.476 9.5556ZM17.0228 3.17561L17.109 3.25777L17.1952 3.17561L17.5712 2.81733C17.7962 2.60294 17.922 2.31613 17.922 2.00934C17.922 1.70254 17.7962 1.41573 17.5712 1.20134C17.1209 0.772286 16.3431 0.772286 15.8928 1.20134L15.5168 1.55961L15.4218 1.65011L15.5168 1.74061L17.0228 3.17561Z"
                  fill="#E1993D"
                  stroke="#E1993D"
                  strokeWidth="0.25"
                />
              </svg>
            </span>
            <span
              className="admin-link admin-link-small admin-cursor"
              onClick={() => this.toggleCircleDeleteModal(circle)}
              data-toggle="tooltip"
              title="City löschen"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5556 3.17778H17.7556H14.6667V1.51111C14.6667 0.688889 14.0444 0 13.2667 0H6.73333C5.95556 0 5.33333 0.688889 5.33333 1.51111V3.17778H2.24444H0.444444C0.2 3.17778 0 3.37778 0 3.62222C0 3.86667 0.2 4.06667 0.444444 4.06667H2.24444V17.3333C2.24444 18.8 3.44444 20 4.91111 20H15.0889C16.5556 20 17.7556 18.8 17.7556 17.3333V4.06667H19.5556C19.8 4.06667 20 3.86667 20 3.62222C20 3.37778 19.8 3.17778 19.5556 3.17778ZM6.22222 1.51111C6.22222 1.17778 6.44444 0.888889 6.71111 0.888889H13.2667C13.5556 0.888889 13.7778 1.17778 13.7778 1.51111V3.17778H6.22222V1.51111ZM16.8667 17.3333C16.8667 18.3111 16.0667 19.1111 15.0889 19.1111H4.91111C3.93333 19.1111 3.13333 18.3111 3.13333 17.3333V4.06667H16.8667V17.3333Z"
                  fill="#E1993D"
                />
                <path
                  d="M7.46667 16.0222C7.71111 16.0222 7.91111 15.8222 7.91111 15.5777V7.59996C7.91111 7.35552 7.71111 7.15552 7.46667 7.15552C7.22222 7.15552 7.02222 7.35552 7.02222 7.59996V15.5555C7.02222 15.8222 7.22222 16.0222 7.46667 16.0222Z"
                  fill="#E1993D"
                />
                <path
                  d="M12.5333 16.0222C12.7778 16.0222 12.9778 15.8222 12.9778 15.5777V7.59996C12.9778 7.35552 12.7778 7.15552 12.5333 7.15552C12.2889 7.15552 12.0889 7.35552 12.0889 7.59996V15.5555C12.0889 15.8222 12.2889 16.0222 12.5333 16.0222Z"
                  fill="#E1993D"
                />
              </svg>
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
          <td className="d-none d-md-table-cell">{member.memberNumber}</td>
          <td>{member.firstname}</td>
          <td>{member.surname}</td>
          <td className="d-none d-md-table-cell">
            {member.circle ? member.circle.name : ''}
          </td>
          <td className="icon-row">
            <Link
              className="admin-link admin-link-small"
              to={'/member/' + member._id}
              data-toggle="tooltip"
              title="Mitglied bearbeiten"
            >
              <svg
                width="24"
                height="23"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.163 15.4171V15.2921H17.162V8.46425H17.977V15.4171C17.977 16.7418 16.8431 17.8534 15.44 17.8534H2.662C1.25889 17.8534 0.125 16.7428 0.125 15.4171V3.24147C0.125 1.91888 1.25564 0.854736 2.662 0.854736H9.991V1.61858H2.662C1.72047 1.61858 0.94 2.3238 0.94 3.24051V15.4171C0.94 16.3285 1.71495 17.0895 2.662 17.0895H15.441C16.388 17.0895 17.163 16.3285 17.163 15.4171Z"
                  fill="#E1993D"
                  stroke="#E1993D"
                  strokeWidth="0.25"
                />
                <path
                  d="M18.1517 0.66573L18.1519 0.66589C18.5307 1.02595 18.737 1.50229 18.737 2.00934C18.737 2.51631 18.5297 2.99369 18.1518 3.35384L11.0088 10.1601C10.9567 10.2097 10.8916 10.2455 10.8196 10.2623L10.819 10.2624L7.80703 10.9799L7.80639 10.9801C7.77368 10.988 7.74066 10.9917 7.707 10.9917C7.59904 10.9917 7.49436 10.951 7.41745 10.8778C7.31721 10.7815 7.27875 10.6448 7.31193 10.5176C7.31194 10.5176 7.31194 10.5175 7.31195 10.5175L8.06391 7.6486L8.06399 7.64831C8.0809 7.58315 8.1174 7.52142 8.16923 7.47204L15.3122 0.665783C16.069 -0.0552897 17.396 -0.0552146 18.1517 0.66573ZM10.476 9.5556L10.5088 9.54778L10.5332 9.5245L16.4422 3.89406L16.5372 3.80357L16.4422 3.71307L14.9362 2.27807L14.85 2.1959L14.7638 2.27807L8.85477 7.9085L8.82909 7.93297L8.82009 7.96728L8.31809 9.88061L8.26519 10.0822L8.46796 10.0339L10.476 9.5556ZM17.0228 3.17561L17.109 3.25777L17.1952 3.17561L17.5712 2.81733C17.7962 2.60294 17.922 2.31613 17.922 2.00934C17.922 1.70254 17.7962 1.41573 17.5712 1.20134C17.1209 0.772286 16.3431 0.772286 15.8928 1.20134L15.5168 1.55961L15.4218 1.65011L15.5168 1.74061L17.0228 3.17561Z"
                  fill="#E1993D"
                  stroke="#E1993D"
                  strokeWidth="0.25"
                />
              </svg>
            </Link>
            <Link
              className="admin-link admin-link-small admin-cursor"
              to={'/members/changeRole/' + member._id}
              data-toggle="tooltip"
              title="Rolle bearbeiten"
            >
              <svg
                width="23"
                height="32"
                viewBox="0 0 12 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.90789 2.43384C8.75421 2.43384 7.81579 3.37227 7.81579 4.52595C7.81579 5.3387 8.28253 6.04298 8.96122 6.38923C8.73222 7.04081 8.29786 7.59614 7.73285 7.97342C7.35635 7.41801 6.72016 7.05226 6 7.05226C5.27413 7.05226 4.63398 7.4241 4.25865 7.98699C3.68686 7.61187 3.2459 7.05619 3.0128 6.40172C3.70542 6.06037 4.18421 5.34896 4.18421 4.52595C4.18421 4.01429 3.999 3.54554 3.69293 3.18164C4.26882 2.57235 5.08195 2.1896 5.98458 2.1896C6.12442 2.1896 6.2634 2.20201 6.40135 2.22005L5.32741 3.28931C5.20405 3.41236 5.20343 3.6125 5.32648 3.73616C5.38816 3.79784 5.46926 3.82899 5.55037 3.82899C5.63086 3.82899 5.71166 3.79846 5.77333 3.73709L7.30171 2.21519C7.41026 2.10664 7.42537 1.93579 7.33748 1.81028L6.16437 0.134808C6.06445 -0.00828446 5.86678 -0.0428239 5.72461 0.0570938C5.58152 0.15732 5.54698 0.354072 5.6469 0.496855L6.40723 1.58292C6.26708 1.5675 6.12605 1.55802 5.98458 1.55802C4.89302 1.55802 3.91075 2.02476 3.21876 2.7659C2.89316 2.55673 2.50706 2.43384 2.09211 2.43384C0.938425 2.43384 0 3.37227 0 4.52595C0 5.67963 0.938425 6.61805 2.09211 6.61805C2.20056 6.61805 2.30628 6.60718 2.41034 6.59122C2.6982 7.41539 3.26188 8.10888 3.9918 8.5629C3.93817 8.74774 3.90789 8.94245 3.90789 9.14437C3.90789 10.298 4.84632 11.2365 6 11.2365C7.15368 11.2365 8.0921 10.298 8.0921 9.14437C8.0921 8.93667 8.06069 8.73637 8.00406 8.54679C8.72266 8.09172 9.2768 7.40302 9.56075 6.58683C9.67392 6.60583 9.7894 6.61805 9.90789 6.61805C11.0616 6.61805 12 5.67963 12 4.52595C12 3.37227 11.0616 2.43384 9.90789 2.43384ZM2.25189 5.97028C2.19871 5.97622 2.14682 5.98647 2.09211 5.98647C1.2869 5.98647 0.631579 5.33115 0.631579 4.52595C0.631579 3.72075 1.2869 3.06542 2.09211 3.06542C2.35865 3.06542 2.60546 3.14252 2.82083 3.2678C3.00873 3.37712 3.17266 3.52253 3.29547 3.70109C3.45711 3.93608 3.55263 4.21987 3.55263 4.52595C3.55263 5.04936 3.27339 5.5057 2.85843 5.76366C2.67839 5.87553 2.47256 5.94584 2.25189 5.97028ZM7.46053 9.14437C7.46053 9.94957 6.8052 10.6049 6 10.6049C5.1948 10.6049 4.53947 9.94957 4.53947 9.14437C4.53947 9.04638 4.54992 8.95085 4.56842 8.85818C4.61106 8.6447 4.70315 8.45049 4.82805 8.28142C5.09428 7.92099 5.51861 7.68384 6 7.68384C6.47737 7.68384 6.8981 7.91745 7.16478 8.27279C7.29112 8.44109 7.38565 8.63429 7.42988 8.84754C7.44977 8.94345 7.46053 9.04268 7.46053 9.14437ZM9.90789 5.98647C9.84288 5.98647 9.78084 5.97553 9.71804 5.96728C9.4976 5.93821 9.29166 5.86458 9.11337 5.74832C8.71345 5.48742 8.44737 5.03791 8.44737 4.52595C8.44737 3.72075 9.10269 3.06542 9.90789 3.06542C10.7131 3.06542 11.3684 3.72075 11.3684 4.52595C11.3684 5.33115 10.7131 5.98647 9.90789 5.98647Z"
                  fill="#E1993D"
                />
                <path
                  d="M6 11.947C3.74537 11.947 1.91108 13.7813 1.91108 16.0359V17.947C1.91108 18.1216 2.05232 18.2628 2.22687 18.2628H9.77313C9.94768 18.2628 10.0889 18.1216 10.0889 17.947V16.0359C10.0889 13.7813 8.25462 11.947 6 11.947ZM9.45734 17.6312H2.54266V16.0359C2.54266 14.1295 4.09354 12.5786 6 12.5786C7.90645 12.5786 9.45734 14.1295 9.45734 16.0359V17.6312V17.6312Z"
                  fill="#E1993D"
                />
              </svg>
            </Link>
            <span
              className="admin-link admin-link-small admin-cursor"
              onClick={() => this.toggleMemberDeleteModal(member)}
              data-toggle="tooltip"
              title="Mitglied löschen"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5556 3.17778H17.7556H14.6667V1.51111C14.6667 0.688889 14.0444 0 13.2667 0H6.73333C5.95556 0 5.33333 0.688889 5.33333 1.51111V3.17778H2.24444H0.444444C0.2 3.17778 0 3.37778 0 3.62222C0 3.86667 0.2 4.06667 0.444444 4.06667H2.24444V17.3333C2.24444 18.8 3.44444 20 4.91111 20H15.0889C16.5556 20 17.7556 18.8 17.7556 17.3333V4.06667H19.5556C19.8 4.06667 20 3.86667 20 3.62222C20 3.37778 19.8 3.17778 19.5556 3.17778ZM6.22222 1.51111C6.22222 1.17778 6.44444 0.888889 6.71111 0.888889H13.2667C13.5556 0.888889 13.7778 1.17778 13.7778 1.51111V3.17778H6.22222V1.51111ZM16.8667 17.3333C16.8667 18.3111 16.0667 19.1111 15.0889 19.1111H4.91111C3.93333 19.1111 3.13333 18.3111 3.13333 17.3333V4.06667H16.8667V17.3333Z"
                  fill="#E1993D"
                />
                <path
                  d="M7.46667 16.0222C7.71111 16.0222 7.91111 15.8222 7.91111 15.5777V7.59996C7.91111 7.35552 7.71111 7.15552 7.46667 7.15552C7.22222 7.15552 7.02222 7.35552 7.02222 7.59996V15.5555C7.02222 15.8222 7.22222 16.0222 7.46667 16.0222Z"
                  fill="#E1993D"
                />
                <path
                  d="M12.5333 16.0222C12.7778 16.0222 12.9778 15.8222 12.9778 15.5777V7.59996C12.9778 7.35552 12.7778 7.15552 12.5333 7.15552C12.2889 7.15552 12.0889 7.35552 12.0889 7.59996V15.5555C12.0889 15.8222 12.2889 16.0222 12.5333 16.0222Z"
                  fill="#E1993D"
                />
              </svg>
            </span>
          </td>
        </tr>
      );
    });
  }

  createCircleEditModal() {
    return (
      <Modal
        isOpen={this.state.editModal}
        toggle={() => this.toggleCircleEditModal({ name: '' })}
      >
        <ModalHeader toggle={() => this.toggleCircleEditModal({ name: '' })}>
          City editieren
        </ModalHeader>
        <Form onSubmit={this.onCircleSave}>
          <ModalBody>
            <FormGroup row>
              <Label>City-Name:</Label>
              <Col>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  className="admin-form-control"
                  onChange={this.handleCircleNameChange}
                  value={this.state.circleToEdit.name}
                />
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <input
              type="submit"
              className="admin-button"
              color="primary"
              onClick={this.onCircleSave}
              value="Speichern"
            />

            <input
              type="button"
              className="admin-button"
              color="secondary"
              onClick={() => {
                this.toggleCircleEditModal({ name: '' });
              }}
              value="Abbrechen"
            />
          </ModalFooter>
        </Form>
      </Modal>
    );
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
          <input
            type="submit"
            className="admin-button"
            color="primary"
            onClick={() => {
              this.deleteMember(this.state.memberToDelete._id);
              this.toggleMemberDeleteModal({});
            }}
            value="Löschen"
          />
          <input
            type="submit"
            className="admin-button"
            color="primary"
            onClick={() => {
              this.toggleMemberDeleteModal({});
            }}
            value="Abbrechen"
          />
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
          <input
            type="submit"
            className="admin-button"
            color="primary"
            onClick={() => {
              this.deleteCircle(this.state.circleToDelete._id);
              this.toggleCircleDeleteModal({});
            }}
            value="Löschen"
          />

          <input
            type="submit"
            className="admin-button"
            color="primary"
            onClick={() => {
              this.toggleCircleDeleteModal({});
            }}
            value="Abbrechen"
          />
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
