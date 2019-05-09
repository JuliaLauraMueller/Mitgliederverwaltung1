import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Row,
  Col,
  Collapse,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledTooltip
} from 'reactstrap';
import AdminCreateUser from './AdminCreateUser';
import {
  fetchMembers,
  deleteMember,
  changeRole
} from '../../redux/actions/memberActions';
import { filterMembers, ownCircleMembers } from '../../helpers/memberSearch';
import store from '../../helpers/store';
import { connect } from 'react-redux';
import { roleToString } from '../../helpers/roleHelper';

class AdminMembersOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      collapseMember: false,
      memberToDelete: {},
      changeRoleModal: false,
      memberToChangeRole: { role: 0 }
    };

    this.getMemberRows = this.getMemberRows.bind(this);
    this.toggleMemberDeleteModal = this.toggleMemberDeleteModal.bind(this);
    this.collapseMember = this.collapseMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.createMemberDeleteModal = this.createMemberDeleteModal.bind(this);
    // Change role modal
    this.createRoleChangeModal = this.createRoleChangeModal.bind(this);
    this.changeRole = this.changeRole.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchMembers());
  }

  render() {
    let content = <div />;
    if (this.props.memberLoading) {
      content = (
        <div>
          <div className='page-wrap-loading-screen' />
          <img
            src={require('../../img/LoadingIcon.gif')}
            alt='loading-icon'
            className='modal-loading-screen'
          />
        </div>
      );
    } else {
      content = <div />;
    }
    return (
      <div>
        {this.createMemberDeleteModal()}
        {this.createRoleChangeModal()}
        <Row>
          {content}
          <Col sm='12'>
            <Row className='top-area'>
              <Col sm='12'>
                <input
                  type='text'
                  name='search'
                  placeholder='suchen...'
                  className='form-control form-control-admin'
                  value={this.state.searchText}
                  onChange={this.handleSearchChange.bind(this)}
                />
                <div>
                  <input
                    type='submit'
                    style={{ marginBottom: '1rem' }}
                    className='create-button'
                    color='primary'
                    onClick={this.collapseMember}
                    value='Mitglied hinzufügen'
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
            <Table hover className='adminTable'>
              <thead>
                <tr>
                  <th className='d-none d-md-table-cell'>Nr.</th>
                  <th>Vorname</th>
                  <th>Nachname</th>
                  <th className='d-none d-md-table-cell'>City</th>
                  <th className='d-none d-md-table-cell'>Rolle</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>{this.getMemberRows(this.props.members)}</tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }

  handleRoleChange(e) {
    e.persist();
    this.setState(prevState => ({
      memberToChangeRole: {
        ...prevState.memberToChangeRole,
        role: e.target.value
      }
    }));
  }

  toggleMemberDeleteModal(member) {
    this.setState(prevState => ({
      memberDeleteModal: !prevState.memberDeleteModal,
      memberToDelete: member
    }));
  }

  toggleRoleChangeModal(member) {
    this.setState(prevState => ({
      changeRoleModal: !prevState.changeRoleModal,
      memberToChangeRole: member
    }));
  }

  collapseMember() {
    this.setState(state => ({ collapseMember: !state.collapseMember }));
  }

  handleSearchChange(event) {
    this.setState({ searchText: event.target.value });
  }

  deleteMember(id) {
    this.props.dispatch(deleteMember(id));
  }

  changeRole(member) {
    this.props.dispatch(changeRole(member));
  }

  getMemberRows(members) {
    return filterMembers(
      ownCircleMembers(
        members,
        [store.getState().auth.user.circle],
        store.getState().auth.user.role
      ),
      this.state.searchText,
      true
    ).map(member => {
      let EditButton = {};
      let DeleteButton = {};
      let RoleButton = {};
      let roleText = roleToString(member.role);
      var tooltipIdEdit = 'tooltip-edit-' + member._id;
      var tooltipIdDelete = 'tooltip-delete-' + member._id;
      var tooltipIdRoles = 'tooltip-roles-' + member._id;
      if (
        store.getState().auth.user !== undefined &&
        store.getState().auth.user.role >= 3
      ) {
        EditButton = (
          <Link
            className='admin-link admin-link-small admin-link-edit'
            to={'/member/' + member._id}
            id={tooltipIdEdit}
          >
            <UncontrolledTooltip
              placement='bottom-start'
              target={tooltipIdEdit}
            >
              Mitglied bearbeiten
            </UncontrolledTooltip>
            <svg
              width='26'
              height='25'
              viewBox='0 0 19 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M17.163 15.4171V15.2921H17.162V8.46425H17.977V15.4171C17.977 16.7418 16.8431 17.8534 15.44 17.8534H2.662C1.25889 17.8534 0.125 16.7428 0.125 15.4171V3.24147C0.125 1.91888 1.25564 0.854736 2.662 0.854736H9.991V1.61858H2.662C1.72047 1.61858 0.94 2.3238 0.94 3.24051V15.4171C0.94 16.3285 1.71495 17.0895 2.662 17.0895H15.441C16.388 17.0895 17.163 16.3285 17.163 15.4171Z'
                fill='#E1993D'
                stroke='#E1993D'
                strokeWidth='0.25'
              />
              <path
                d='M18.1517 0.66573L18.1519 0.66589C18.5307 1.02595 18.737 1.50229 18.737 2.00934C18.737 2.51631 18.5297 2.99369 18.1518 3.35384L11.0088 10.1601C10.9567 10.2097 10.8916 10.2455 10.8196 10.2623L10.819 10.2624L7.80703 10.9799L7.80639 10.9801C7.77368 10.988 7.74066 10.9917 7.707 10.9917C7.59904 10.9917 7.49436 10.951 7.41745 10.8778C7.31721 10.7815 7.27875 10.6448 7.31193 10.5176C7.31194 10.5176 7.31194 10.5175 7.31195 10.5175L8.06391 7.6486L8.06399 7.64831C8.0809 7.58315 8.1174 7.52142 8.16923 7.47204L15.3122 0.665783C16.069 -0.0552897 17.396 -0.0552146 18.1517 0.66573ZM10.476 9.5556L10.5088 9.54778L10.5332 9.5245L16.4422 3.89406L16.5372 3.80357L16.4422 3.71307L14.9362 2.27807L14.85 2.1959L14.7638 2.27807L8.85477 7.9085L8.82909 7.93297L8.82009 7.96728L8.31809 9.88061L8.26519 10.0822L8.46796 10.0339L10.476 9.5556ZM17.0228 3.17561L17.109 3.25777L17.1952 3.17561L17.5712 2.81733C17.7962 2.60294 17.922 2.31613 17.922 2.00934C17.922 1.70254 17.7962 1.41573 17.5712 1.20134C17.1209 0.772286 16.3431 0.772286 15.8928 1.20134L15.5168 1.55961L15.4218 1.65011L15.5168 1.74061L17.0228 3.17561Z'
                fill='#E1993D'
                stroke='#E1993D'
                strokeWidth='0.25'
              />
            </svg>
          </Link>
        );

        DeleteButton = (
          <span
            id={tooltipIdDelete}
            className='admin-link admin-link-small admin-link-delete admin-cursor'
            onClick={() => this.toggleMemberDeleteModal(member)}
          >
            <UncontrolledTooltip
              placement='bottom-start'
              target={tooltipIdDelete}
            >
              Mitglied löschen
            </UncontrolledTooltip>
            <svg
              width='27'
              height='27'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M19.5556 3.17778H17.7556H14.6667V1.51111C14.6667 0.688889 14.0444 0 13.2667 0H6.73333C5.95556 0 5.33333 0.688889 5.33333 1.51111V3.17778H2.24444H0.444444C0.2 3.17778 0 3.37778 0 3.62222C0 3.86667 0.2 4.06667 0.444444 4.06667H2.24444V17.3333C2.24444 18.8 3.44444 20 4.91111 20H15.0889C16.5556 20 17.7556 18.8 17.7556 17.3333V4.06667H19.5556C19.8 4.06667 20 3.86667 20 3.62222C20 3.37778 19.8 3.17778 19.5556 3.17778ZM6.22222 1.51111C6.22222 1.17778 6.44444 0.888889 6.71111 0.888889H13.2667C13.5556 0.888889 13.7778 1.17778 13.7778 1.51111V3.17778H6.22222V1.51111ZM16.8667 17.3333C16.8667 18.3111 16.0667 19.1111 15.0889 19.1111H4.91111C3.93333 19.1111 3.13333 18.3111 3.13333 17.3333V4.06667H16.8667V17.3333Z'
                fill='#E1993D'
              />
              <path
                d='M7.46667 16.0222C7.71111 16.0222 7.91111 15.8222 7.91111 15.5777V7.59996C7.91111 7.35552 7.71111 7.15552 7.46667 7.15552C7.22222 7.15552 7.02222 7.35552 7.02222 7.59996V15.5555C7.02222 15.8222 7.22222 16.0222 7.46667 16.0222Z'
                fill='#E1993D'
              />
              <path
                d='M12.5333 16.0222C12.7778 16.0222 12.9778 15.8222 12.9778 15.5777V7.59996C12.9778 7.35552 12.7778 7.15552 12.5333 7.15552C12.2889 7.15552 12.0889 7.35552 12.0889 7.59996V15.5555C12.0889 15.8222 12.2889 16.0222 12.5333 16.0222Z'
                fill='#E1993D'
              />
            </svg>
          </span>
        );
      } else {
        EditButton = <span />;
        DeleteButton = <span />;
      }

      if (
        store.getState().auth.user !== undefined &&
        store.getState().auth.user.role >= 4
      ) {
        RoleButton = (
          <span
            id={tooltipIdRoles}
            className='admin-link admin-link-small admin-link-role admin-cursor'
            onClick={() => this.toggleRoleChangeModal(member)}
          >
            <UncontrolledTooltip
              placement='bottom-start'
              target={tooltipIdRoles}
            >
              Rolle bearbeiten
            </UncontrolledTooltip>
            <svg
              width='25'
              height='34'
              viewBox='0 0 12 19'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9.90789 2.43384C8.75421 2.43384 7.81579 3.37227 7.81579 4.52595C7.81579 5.3387 8.28253 6.04298 8.96122 6.38923C8.73222 7.04081 8.29786 7.59614 7.73285 7.97342C7.35635 7.41801 6.72016 7.05226 6 7.05226C5.27413 7.05226 4.63398 7.4241 4.25865 7.98699C3.68686 7.61187 3.2459 7.05619 3.0128 6.40172C3.70542 6.06037 4.18421 5.34896 4.18421 4.52595C4.18421 4.01429 3.999 3.54554 3.69293 3.18164C4.26882 2.57235 5.08195 2.1896 5.98458 2.1896C6.12442 2.1896 6.2634 2.20201 6.40135 2.22005L5.32741 3.28931C5.20405 3.41236 5.20343 3.6125 5.32648 3.73616C5.38816 3.79784 5.46926 3.82899 5.55037 3.82899C5.63086 3.82899 5.71166 3.79846 5.77333 3.73709L7.30171 2.21519C7.41026 2.10664 7.42537 1.93579 7.33748 1.81028L6.16437 0.134808C6.06445 -0.00828446 5.86678 -0.0428239 5.72461 0.0570938C5.58152 0.15732 5.54698 0.354072 5.6469 0.496855L6.40723 1.58292C6.26708 1.5675 6.12605 1.55802 5.98458 1.55802C4.89302 1.55802 3.91075 2.02476 3.21876 2.7659C2.89316 2.55673 2.50706 2.43384 2.09211 2.43384C0.938425 2.43384 0 3.37227 0 4.52595C0 5.67963 0.938425 6.61805 2.09211 6.61805C2.20056 6.61805 2.30628 6.60718 2.41034 6.59122C2.6982 7.41539 3.26188 8.10888 3.9918 8.5629C3.93817 8.74774 3.90789 8.94245 3.90789 9.14437C3.90789 10.298 4.84632 11.2365 6 11.2365C7.15368 11.2365 8.0921 10.298 8.0921 9.14437C8.0921 8.93667 8.06069 8.73637 8.00406 8.54679C8.72266 8.09172 9.2768 7.40302 9.56075 6.58683C9.67392 6.60583 9.7894 6.61805 9.90789 6.61805C11.0616 6.61805 12 5.67963 12 4.52595C12 3.37227 11.0616 2.43384 9.90789 2.43384ZM2.25189 5.97028C2.19871 5.97622 2.14682 5.98647 2.09211 5.98647C1.2869 5.98647 0.631579 5.33115 0.631579 4.52595C0.631579 3.72075 1.2869 3.06542 2.09211 3.06542C2.35865 3.06542 2.60546 3.14252 2.82083 3.2678C3.00873 3.37712 3.17266 3.52253 3.29547 3.70109C3.45711 3.93608 3.55263 4.21987 3.55263 4.52595C3.55263 5.04936 3.27339 5.5057 2.85843 5.76366C2.67839 5.87553 2.47256 5.94584 2.25189 5.97028ZM7.46053 9.14437C7.46053 9.94957 6.8052 10.6049 6 10.6049C5.1948 10.6049 4.53947 9.94957 4.53947 9.14437C4.53947 9.04638 4.54992 8.95085 4.56842 8.85818C4.61106 8.6447 4.70315 8.45049 4.82805 8.28142C5.09428 7.92099 5.51861 7.68384 6 7.68384C6.47737 7.68384 6.8981 7.91745 7.16478 8.27279C7.29112 8.44109 7.38565 8.63429 7.42988 8.84754C7.44977 8.94345 7.46053 9.04268 7.46053 9.14437ZM9.90789 5.98647C9.84288 5.98647 9.78084 5.97553 9.71804 5.96728C9.4976 5.93821 9.29166 5.86458 9.11337 5.74832C8.71345 5.48742 8.44737 5.03791 8.44737 4.52595C8.44737 3.72075 9.10269 3.06542 9.90789 3.06542C10.7131 3.06542 11.3684 3.72075 11.3684 4.52595C11.3684 5.33115 10.7131 5.98647 9.90789 5.98647Z'
                fill='#E1993D'
              />
              <path
                d='M6 11.947C3.74537 11.947 1.91108 13.7813 1.91108 16.0359V17.947C1.91108 18.1216 2.05232 18.2628 2.22687 18.2628H9.77313C9.94768 18.2628 10.0889 18.1216 10.0889 17.947V16.0359C10.0889 13.7813 8.25462 11.947 6 11.947ZM9.45734 17.6312H2.54266V16.0359C2.54266 14.1295 4.09354 12.5786 6 12.5786C7.90645 12.5786 9.45734 14.1295 9.45734 16.0359V17.6312V17.6312Z'
                fill='#E1993D'
              />
            </svg>
          </span>
        );
      } else {
        RoleButton = <span />;
      }

      return (
        <tr key={member._id}>
          <td className='d-none d-md-table-cell'>{member.memberNumber}</td>
          <td>{member.firstname}</td>
          <td>{member.surname}</td>
          <td className='d-none d-md-table-cell'>
            {member.circle ? member.circle.name : ''}
          </td>
          <td className='d-none d-md-table-cell'>{roleText}</td>
          <td>
            {EditButton}
            {RoleButton}
            {DeleteButton}
          </td>
        </tr>
      );
    });
  }

  createMemberDeleteModal() {
    return (
      <div>
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
              type='submit'
              className='admin-button'
              color='primary'
              onClick={() => {
                this.deleteMember(this.state.memberToDelete._id);
                this.toggleMemberDeleteModal({});
              }}
              value='Löschen'
            />
            <input
              type='submit'
              className='admin-button'
              color='primary'
              onClick={() => {
                this.toggleMemberDeleteModal({});
              }}
              value='Abbrechen'
            />
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  createRoleChangeModal() {
    let FederationOption = {};

    if (
      store.getState().auth.user !== undefined &&
      store.getState().auth.user.role === 5
    ) {
      FederationOption = (
        <option key='5' value='5'>
          {roleToString(5)}
        </option>
      );
    } else {
      FederationOption = <div />;
    }

    return (
      <Modal
        isOpen={this.state.changeRoleModal}
        toggle={() => this.toggleRoleChangeModal({})}
      >
        <ModalHeader>
          Rolle von '{this.state.memberToChangeRole.firstname}{' '}
          {this.state.memberToChangeRole.surname}' ändern
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for='circle'>Rolle</Label>
              <Input
                type='select'
                name='role'
                id='role'
                value={this.state.memberToChangeRole.role}
                onChange={this.handleRoleChange}
              >
                <option key='0' value='0'>
                  {roleToString(0)}
                </option>
                <option key='1' value='1'>
                  {roleToString(1)}
                </option>
                <option key='2' value='2'>
                  {roleToString(2)}
                </option>
                <option key='3' value='3'>
                  {roleToString(3)}
                </option>
                <option key='4' value='4'>
                  {roleToString(4)}
                </option>
                {FederationOption}
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <input
            type='submit'
            className='admin-button'
            color='primary'
            onClick={() => {
              this.changeRole(this.state.memberToChangeRole);
              this.toggleRoleChangeModal({});
            }}
            value='Rolle ändern'
          />
          <input
            type='button'
            className='admin-button'
            color='primary'
            onClick={() => {
              this.toggleRoleChangeModal({});
            }}
            value='Abbrechen'
          />
        </ModalFooter>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    members: state.member.members,
    memberLoading: state.loading.memberLoading
  };
}

export default connect(mapStateToProps)(AdminMembersOverview);
