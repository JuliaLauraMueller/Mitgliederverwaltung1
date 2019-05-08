import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Col,
  Label,
  ModalFooter
} from 'reactstrap';

import { connect } from 'react-redux';
import { changePassword } from '../../redux/actions/navigationActions';

import '../../css/SideDrawer.css';

import DrawerToggleButton from './DrawerToggleButton';
import { alertError, alertSuccess } from '../../redux/actions/alertActions';

class SideDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordChangeModal: false,
      passwordData: {
        oldPassword: '',
        newPassword1: '',
        newPassword2: ''
      }
    };

    this.togglePasswordChangeModal = this.togglePasswordChangeModal.bind(this);
    this.onPasswordChangeSave = this.onPasswordChangeSave.bind(this);
    this.createPasswordChangeModal = this.createPasswordChangeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  togglePasswordChangeModal() {
    this.setState(prevState => ({
      passwordChangeModal: !prevState.passwordChangeModal
    }));

    if (!this.state.passwordChangeModal) {
      this.setState({
        passwordData: {
          oldPassword: '',
          newPassword1: '',
          newPassword2: ''
        }
      });
    }
  }

  createPasswordChangeModal() {
    return (
      <Modal
        isOpen={this.state.passwordChangeModal}
        toggle={() => this.togglePasswordChangeModal()}
      >
        <ModalHeader toggle={() => this.togglePasswordChangeModal()}>
          Passwort ändern
        </ModalHeader>
        <Form onSubmit={this.onPasswordChangeSave}>
          <ModalBody>
            <FormGroup row>
              <Col className="password-edit-row">
                <Label className="password-edit-label">
                  Aktuelles Passwort:
                </Label>
                <Input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                  value={this.state.passwordData.oldPassword}
                  className="password-edit-txt"
                />
              </Col>
              <Col className="password-edit-row">
                <Label className="password-edit-label">Neues Passwort:</Label>
                <Input
                  type="password"
                  id="newPassword1"
                  name="newPassword1"
                  autoComplete="new-password"
                  onChange={this.handleChange}
                  value={this.state.passwordData.newPassword1}
                  className="password-edit-txt"
                />
              </Col>
              <Col className="password-edit-row">
                <Label className="password-edit-label">
                  Passwort erneut eingeben:
                </Label>
                <Input
                  type="password"
                  id="newPassword2"
                  name="newPassword2"
                  autoComplete="new-password"
                  onChange={this.handleChange}
                  value={this.state.passwordData.newPassword2}
                  className="password-edit-txt"
                />
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <input
              type="submit"
              className="password-change-button"
              onClick={this.onPasswordChangeSave}
              color="primary"
              value="Speichern"
            />
            <input
              type="button"
              className="password-change-button"
              color="secondary"
              onClick={() => {
                this.togglePasswordChangeModal();
              }}
              value="Abbrechen"
            />
          </ModalFooter>
        </Form>
      </Modal>
    );
  }

  async onPasswordChangeSave(event) {
    event.preventDefault();
    await this.props
      .dispatch(changePassword(this.state.passwordData))
      .then(res => {
        this.togglePasswordChangeModal();
        this.props.dispatch(alertSuccess('Das neue Passwort wurde gesetzt'));
        return res;
      })
      .catch(err => {
        this.props.dispatch(alertError(err));
      });
  }

  handleChange(data) {
    this.setState({
      passwordData: {
        ...this.state.passwordData,
        [data.target.name]: data.target.value
      }
    });
  }

  render() {
    let drawerClasses = 'side-drawer';
    if (this.props.show) {
      drawerClasses = 'side-drawer open';
    }
    if (!this.props.show) {
      drawerClasses = 'side-drawer close';
    }
    let userId = this.props.user ? this.props.user._id : '';
    let userFirstname = '';
    let userSurname = '';
    let userPic = require('../../img/Profile_Placeholder.png');
    if (this.props.userData) {
      userFirstname = this.props.userData.firstname;
      userSurname = this.props.userData.surname;
      if (this.props.userData.avatar && this.props.userData.avatarTag) {
        userPic =
          this.props.userData.avatarTag + ',' + this.props.userData.avatar;
      }
    }

    let AdminButton = {};
    if (this.props.user !== undefined && this.props.user.role >= 2) {
      AdminButton = (
        <Link to="/admin">
          <svg
            width="24"
            height="26"
            viewBox="0 0 24 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="navbar-desktop-extended-logo"
          >
            <path
              d="M3.9006 25.6C3.67347 25.6 3.50516 25.516 3.3884 25.3809C3.2671 25.2406 3.17673 25.015 3.17673 24.7V1.3C3.17673 0.984952 3.2671 0.759403 3.3884 0.6191C3.50516 0.484037 3.67347 0.4 3.9006 0.4C4.12774 0.4 4.29605 0.484037 4.41281 0.6191C4.53411 0.759403 4.62448 0.984952 4.62448 1.3V24.7C4.62448 25.015 4.53411 25.2406 4.41281 25.3809C4.29605 25.516 4.12774 25.6 3.9006 25.6Z"
              fill="white"
              stroke="#4D5460"
              strokeWidth="0.8"
            />
            <path
              d="M11.7677 25.6C11.5406 25.6 11.3723 25.5159 11.2555 25.3809C11.1342 25.2406 11.0439 25.015 11.0439 24.7V13.91C11.0439 13.5949 11.1342 13.3694 11.2555 13.2291C11.3723 13.094 11.5406 13.01 11.7677 13.01C11.9949 13.01 12.1632 13.094 12.2799 13.2291C12.4012 13.3694 12.4916 13.5949 12.4916 13.91V24.7C12.4916 25.015 12.4012 25.2406 12.2799 25.3809C12.1632 25.5159 11.9949 25.6 11.7677 25.6Z"
              fill="white"
              stroke="#4D5460"
              strokeWidth="0.8"
            />
            <path
              d="M11.7677 9.87C11.5406 9.87 11.3723 9.78596 11.2555 9.6509C11.1342 9.5106 11.0439 9.28505 11.0439 8.97V1.3C11.0439 0.984952 11.1342 0.759404 11.2555 0.6191C11.3723 0.484037 11.5406 0.4 11.7677 0.4C11.9949 0.4 12.1632 0.484037 12.2799 0.6191C12.4012 0.759404 12.4916 0.984952 12.4916 1.3V8.97C12.4916 9.48352 12.1453 9.87 11.7677 9.87Z"
              fill="white"
              stroke="#4D5460"
              strokeWidth="0.8"
            />
            <path
              d="M19.6349 25.6C19.4077 25.6 19.2394 25.516 19.1226 25.3809C19.0014 25.2406 18.911 25.015 18.911 24.7V1.3C18.911 0.984952 19.0014 0.759403 19.1226 0.6191C19.2394 0.484037 19.4077 0.4 19.6349 0.4C19.862 0.4 20.0303 0.484037 20.1471 0.6191C20.2684 0.759403 20.3587 0.984952 20.3587 1.3V24.7C20.3587 25.015 20.2684 25.2406 20.1471 25.3809C20.0303 25.516 19.862 25.6 19.6349 25.6Z"
              fill="white"
              stroke="#4D5460"
              strokeWidth="0.8"
            />
            <path
              d="M6.14841 7.00994H1.65292C1.42579 7.00994 1.25748 6.9259 1.14071 6.79084C1.01942 6.65053 0.929053 6.42498 0.929053 6.10994C0.929053 5.79489 1.01942 5.56934 1.14071 5.42904C1.25748 5.29397 1.42579 5.20994 1.65292 5.20994H6.14841C6.37554 5.20994 6.54385 5.29397 6.66062 5.42904C6.78191 5.56934 6.87228 5.79489 6.87228 6.10994C6.87228 6.42498 6.78191 6.65053 6.66062 6.79084C6.54385 6.9259 6.37554 7.00994 6.14841 7.00994Z"
              fill="white"
              stroke="#4D5460"
              strokeWidth="0.8"
            />
            <path
              d="M14.0155 14.29H9.51999C9.29286 14.29 9.12454 14.2059 9.00778 14.0709C8.88649 13.9306 8.79612 13.705 8.79612 13.39C8.79612 13.0749 8.88649 12.8494 9.00778 12.7091C9.12454 12.574 9.29286 12.49 9.51999 12.49H14.0155C14.2426 12.49 14.4109 12.574 14.5277 12.7091C14.649 12.8494 14.7393 13.0749 14.7393 13.39C14.7393 13.9785 14.3282 14.29 14.0155 14.29Z"
              fill="white"
              stroke="#4D5460"
              strokeWidth="0.8"
            />
            <path
              d="M21.8826 21.7H17.3871C17.16 21.7 16.9917 21.616 16.8749 21.4809C16.7536 21.3406 16.6632 21.115 16.6632 20.8C16.6632 20.485 16.7536 20.2594 16.8749 20.1191C16.9917 19.984 17.16 19.9 17.3871 19.9H21.8826C22.1097 19.9 22.278 19.984 22.3948 20.1191C22.5161 20.2594 22.6065 20.485 22.6065 20.8C22.6065 21.115 22.5161 21.3406 22.3948 21.4809C22.278 21.616 22.1097 21.7 21.8826 21.7Z"
              fill="white"
              stroke="#4D5460"
              strokeWidth="0.8"
            />
          </svg>
          &emsp;Administration
        </Link>
      );
    } else {
      AdminButton = <div />;
    }
    return (
      <nav className={drawerClasses}>
        {this.createPasswordChangeModal()}
        <div className="navigation">
          <div className="navigation-links-button">
            <DrawerToggleButton
              image="arrow"
              click={this.props.drawerClickHandler}
            />
          </div>
          <div className="navigation-user">
            <div className="navigation-user-picture">
              <Link to={`/member/${userId}`}>
                <img
                  id="navigation-user-picture-img"
                  src={userPic}
                  alt="Profilbild"
                />
              </Link>
            </div>
            <div className="navigation-user-name navigation-user-name-txt">
              {userFirstname} {userSurname}
            </div>
            <div id="profile-edit-text">
              <div>
                <Link to={`/member/${userId}`}>
                  <svg
                    className="profile-edit"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.163 16.3227V16.1977H17.162V9.36983H17.977V16.3227C17.977 17.6474 16.8431 18.7589 15.44 18.7589H2.662C1.25889 18.7589 0.125 17.6483 0.125 16.3227V4.14705C0.125 2.82446 1.25564 1.76031 2.662 1.76031H9.991V2.52415H2.662C1.72047 2.52415 0.94 3.22938 0.94 4.14609V16.3227C0.94 17.2341 1.71495 17.9951 2.662 17.9951H15.441C16.388 17.9951 17.163 17.2341 17.163 16.3227Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M18.1517 1.57143L18.1519 1.57159C18.5307 1.93165 18.737 2.40799 18.737 2.91504C18.737 3.42201 18.5297 3.89939 18.1518 4.25955L11.0088 11.0658C10.9567 11.1154 10.8916 11.1512 10.8196 11.168L10.819 11.1681L7.80703 11.8856L7.8064 11.8858C7.77368 11.8937 7.74066 11.8974 7.707 11.8974C7.59901 11.8974 7.49428 11.8567 7.41737 11.7834C7.31717 11.6871 7.27875 11.5505 7.31195 11.4232L8.06391 8.5543L8.06399 8.55401C8.0809 8.48885 8.1174 8.42712 8.16923 8.37774L8.083 8.28725L8.16923 8.37774L15.3122 1.57148C16.069 0.850411 17.396 0.850486 18.1517 1.57143ZM10.476 10.4613L10.5088 10.4535L10.5332 10.4302L16.4422 4.79976L16.5372 4.70927L16.4422 4.61877L14.9362 3.18377L14.85 3.10161L14.7638 3.18377L8.85477 8.8142L8.82909 8.83867L8.82009 8.87298L8.31809 10.7863L8.26519 10.9879L8.46796 10.9396L10.476 10.4613ZM17.0228 4.08131L17.109 4.16347L17.1952 4.08131L17.5712 3.72304C17.7962 3.50864 17.922 3.22183 17.922 2.91504C17.922 2.60824 17.7962 2.32144 17.5712 2.10704C17.1209 1.67799 16.3431 1.67799 15.8928 2.10704L15.5168 2.46532L15.4218 2.55581L15.5168 2.64631L17.0228 4.08131Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="0.25"
                    />
                  </svg>
                  Profil verwalten
                </Link>
              </div>
              <div>
                <span onClick={() => this.togglePasswordChangeModal()}>
                  <svg
                    className="profile-edit"
                    width="19"
                    height="19"
                    viewBox="0 0 25 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 6c0-3.311 2.689-6 6-6s6 2.688 6 6v4h3v14h-18v-14h3v-4zm14 5h-16v12h16v-12zm-13-5v4h10v-4c0-2.76-2.24-5-5-5s-5 2.24-5 5z"
                      fill="white"
                      stroke="white"
                      strokeWidth="0.25"
                    />
                  </svg>
                  Passwort ändern
                </span>
              </div>
              <div>
                <Link to="/login">
                  <svg
                    className="profile-edit"
                    height="17"
                    width="17"
                    fill="none"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m320.820312 371.792969h39.980469v79.957031c0 33.066406-26.902343 59.964844-59.96875 59.964844h-240.867187c-33.0625 0-59.964844-26.898438-59.964844-59.964844v-391.785156c0-33.0625 26.902344-59.964844 59.964844-59.964844h240.867187c33.066407 0 59.96875 26.902344 59.96875 59.964844v79.957031h-39.980469v-79.957031c0-11.019532-8.964843-19.988282-19.988281-19.988282h-240.867187c-11.019532 0-19.988282 8.96875-19.988282 19.988282v391.785156c0 11.019531 8.96875 19.988281 19.988282 19.988281h240.867187c11.023438 0 19.988281-8.96875 19.988281-19.988281zm96.949219-210.167969-28.269531 28.269531 45.972656 45.976563h-258.570312v39.976562h258.570312l-45.972656 45.972656 28.269531 28.269532 94.230469-94.230469zm0 0"
                      fill="white"
                      stroke="white"
                      strokeWidth="0.25"
                    />
                  </svg>
                  Abmelden
                </Link>
              </div>
            </div>
          </div>
          <div className="navigation-container">
            <div className="navigation-links">
              <div className="navigation-links-nav">
                <ul>
                  <li>
                    <Link to="/">
                      <svg
                        height="26"
                        width="18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="navbar-desktop-extended-logo"
                      >
                        <path
                          d="M1.2137 24.7619V24.8869H1.3387H16.4677H16.5927V24.7619V1.2381V1.1131H16.4677H1.3387H1.2137V1.2381V24.7619ZM17.0081 25.875H0.798379C0.670241 25.875 0.570265 25.8271 0.500819 25.7476C0.430034 25.6665 0.383057 25.5429 0.383057 25.381V0.619048C0.383057 0.457055 0.430033 0.333534 0.500819 0.252435C0.570265 0.17287 0.670241 0.125 0.798379 0.125H17.0081C17.1362 0.125 17.2362 0.172871 17.3056 0.252435C17.3764 0.333534 17.4234 0.457055 17.4234 0.619048V25.381C17.4234 25.6914 17.2014 25.875 17.0081 25.875Z"
                          fill="white"
                          stroke="#4D5460"
                          strokeWidth="0.25"
                        />
                        <path
                          d="M3.73309 13.9893V13.0012H14.2895V13.9893H3.73309Z"
                          fill="white"
                          stroke="#4D5460"
                          strokeWidth="0.25"
                        />
                        <path
                          d="M3.73309 17.7035V16.7155H14.2895V17.7035H3.73309Z"
                          fill="white"
                          stroke="#4D5460"
                          strokeWidth="0.25"
                        />
                        <path
                          d="M3.73309 21.4179V20.4298H14.2895V21.4179H3.73309Z"
                          fill="white"
                          stroke="#4D5460"
                          strokeWidth="0.25"
                        />
                        <path
                          d="M9.13629 6.56073V5.57263H14.2895V6.56073H9.13629Z"
                          fill="white"
                          stroke="#4D5460"
                          strokeWidth="0.25"
                        />
                        <path
                          d="M9.13629 10.275V9.28687H14.2895V10.275H9.13629Z"
                          fill="white"
                          stroke="#4D5460"
                          strokeWidth="0.25"
                        />
                        <path
                          d="M5.19815 9.2857C4.26924 9.2857 3.55145 8.42855 3.55145 7.42855C3.55145 6.38094 4.31147 5.57141 5.19815 5.57141C6.12706 5.57141 6.84485 6.42855 6.84485 7.42855C6.84485 8.47617 6.12706 9.2857 5.19815 9.2857Z"
                          fill="white"
                        />
                        <path
                          d="M5.19815 9.2857C4.26924 9.2857 3.55145 8.42855 3.55145 7.42855C3.55145 6.38094 4.31147 5.57141 5.19815 5.57141C6.12706 5.57141 6.84485 6.42855 6.84485 7.42855C6.84485 8.47617 6.12706 9.2857 5.19815 9.2857Z"
                          stroke="#EBECED"
                        />
                      </svg>
                      &emsp;News
                    </Link>
                  </li>
                  <li>
                    <Link to="/events">
                      <svg
                        width="14"
                        height="26"
                        viewBox="0 0 14 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="navbar-desktop-extended-logo"
                      >
                        <path
                          d="M6.94606 0C3.19794 0 0.122559 3.51549 0.122559 7.8C0.122559 11.938 6.33739 25.1944 6.59367 25.7437C6.65774 25.8901 6.78588 26 6.94606 26C7.10624 26 7.23438 25.8901 7.29845 25.7437C7.55473 25.1944 13.7696 11.938 13.7696 7.8C13.7696 3.51549 10.6942 0 6.94606 0ZM6.94606 24.5718C5.60058 21.6423 0.923439 11.169 0.923439 7.83662C0.923439 4.02817 3.6144 0.915493 6.94606 0.915493C10.2777 0.915493 12.9687 3.99155 12.9687 7.8C12.9687 11.169 8.29154 21.6423 6.94606 24.5718Z"
                          fill="white"
                        />
                        <path
                          d="M6.9461 5.63953C5.50452 5.63953 4.31921 6.99446 4.31921 8.64234C4.31921 10.2902 5.50452 11.6452 6.9461 11.6452C8.38769 11.6452 9.57299 10.2902 9.57299 8.64234C9.57299 6.99446 8.38769 5.63953 6.9461 5.63953ZM6.9461 10.693C5.95301 10.693 5.12009 9.77755 5.12009 8.60572C5.12009 7.43389 5.92098 6.5184 6.9461 6.5184C7.97123 6.5184 8.77211 7.43389 8.77211 8.60572C8.77211 9.77755 7.93919 10.693 6.9461 10.693Z"
                          fill="white"
                        />
                      </svg>
                      &emsp;Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/members">
                      <svg
                        width="22"
                        height="26"
                        viewBox="0 0 22 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="navbar-desktop-extended-logo"
                      >
                        <path
                          d="M19.6466 24.3722H19.7716V24.2472V23.2533C19.7716 20.2916 18.6765 18.2688 17.0576 16.9896C15.4433 15.714 13.3216 15.1879 11.2802 15.1879H10.2543C8.21294 15.1879 6.09118 15.714 4.47691 16.9896C2.85799 18.2688 1.76286 20.2916 1.76286 23.2533V24.2472V24.3722H1.88786H1.88836H19.6466ZM20.394 25.875H1.14096C0.815355 25.875 0.518555 25.5577 0.518555 25.1236V23.2533C0.518555 20.3372 1.47648 17.9478 3.16548 16.2877C4.85468 14.6273 7.28648 13.685 10.2548 13.685H11.2807C14.249 13.685 16.6808 14.6273 18.37 16.2877C20.059 17.9478 21.0169 20.3372 21.0169 23.2533V25.1234C21.0165 25.5577 20.7196 25.875 20.394 25.875ZM10.7675 12.6486C8.18075 12.6486 6.04385 10.1736 6.04385 7.08852V5.68624C6.04385 2.60059 8.18077 0.125 10.7675 0.125C13.3542 0.125 15.4911 2.60059 15.4911 5.68624V7.08852C15.4911 10.1736 13.3542 12.6486 10.7675 12.6486ZM10.7675 1.62726C8.83093 1.62726 7.28866 3.46779 7.28866 5.68566V7.08793C7.28866 9.30586 8.83148 11.1452 10.7675 11.1452C12.7035 11.1452 14.2463 9.30526 14.2463 7.08793V5.68566C14.2463 3.46779 12.7041 1.62726 10.7675 1.62726Z"
                          fill="white"
                          strokeWidth="0.25"
                        />
                      </svg>
                      &emsp;Mitglieder
                    </Link>
                  </li>
                  <li>{AdminButton}</li>
                </ul>
              </div>
              <div className="navigation-logo-container">
                <div className="navigation-logo">
                  <img
                    src={require('../../img/logo_black_small.png')}
                    alt="Logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.auth.user, userData: state.navigation.userData };
}

export default connect(mapStateToProps)(SideDrawer);
