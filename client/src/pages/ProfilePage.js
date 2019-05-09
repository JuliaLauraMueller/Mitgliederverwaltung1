import React, { Component } from 'react';
import ProfileBasicInfo from '../components/ProfileView/ProfileBasicInfoView.js';
import ProfileMainInformation from '../components/ProfileView/ProfileMainInformationView.js';

import ProfileBasicInfoEDIT from '../components/ProfileEdit/ProfileBasicInfoEdit.js';
import ProfileMainInformationEDIT from '../components/ProfileEdit/ProfileMainInformationEdit.js';

import { connect } from 'react-redux';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchProfile, putWholeData } from '../redux/actions/profileActions';
import { alertError } from '../redux/actions/alertActions';

import { personalAccessCheck, roleAccessCheck } from '../helpers/roleHelper';

import '../css/ProfilePage.css';

import { Container, Row, Col, Form, FormGroup } from 'reactstrap';

import store from '../helpers/store';

class ProfilePage extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.props.dispatch(setNavVisible());
    this.state = {
      isEditing: false
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loadMember = this.loadMember.bind(this);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    // first time profile page is loaded
    this._isMounted = true;
    this.loadMember(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    // switch between two profiles (when already on profile page)
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.loadMember(nextProps.match.params.id);
    }
  }

  loadMember(memberId) {
    if (this._isMounted) {
      this.props.dispatch(fetchProfile(memberId));
    }
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  async handleClick(e) {
    e.preventDefault();
    var newBasicInfo = this.basicInfo.getWrappedInstance().onSave();
    var newMainInfo = this.mainInfo.getWrappedInstance().onSave();
    var data = {
      profileMainData: newMainInfo.mainInfoUpdate,
      profileBasicData: newBasicInfo,
      companyData: newMainInfo.companyUpdate
    };
    await this.props
      .dispatch(putWholeData(data))
      .then(res => {
        this.toggleEdit();
      })
      .catch(err => {
        var msg = 'Folgende Felder sind nicht korrekt: \n' + err.join('\n');
        this.props.dispatch(alertError(msg));
      });
  }

  render() {
    let content = <div />;
    if (this.props.isLoading) {
      content = (
        <div>
          <div className='page-wrap-loading-screen' />
          <img
            src={require('../img/LoadingIcon.gif')}
            alt='loading-icon'
            className='modal-loading-screen'
          />
        </div>
      );
    } else {
      content = <div />;
    }
    let EditButton = {};
    if (
      personalAccessCheck(this.props._id, store.getState().auth.user._id) ||
      roleAccessCheck(
        3,
        this.props.circle,
        store.getState().auth.user.role,
        store.getState().auth.user.circle
      )
    ) {
      EditButton = (
        <button className='button-save-edit' onClick={this.toggleEdit}>
          Editieren
        </button>
      );
    } else {
      EditButton = <div />;
    }

    if (this.state.isEditing) {
      return (
        <Container className='profile-page__container'>
          {content}
          <Form onSubmit={this.handleClick}>
            <Row>
              <Col md='12'>
                <input
                  type='submit'
                  className='button-save-edit'
                  value='Speichern'
                  onClick={this.handleClick}
                />
              </Col>
            </Row>
            <FormGroup row>
              <Row>
                <Col xs='12' md='12'>
                  <ProfileBasicInfoEDIT
                    ref={basicInfo => {
                      this.basicInfo = basicInfo;
                    }}
                  />
                </Col>
                <Col xs='12' md='12'>
                  <ProfileMainInformationEDIT
                    ref={mainInfo => {
                      this.mainInfo = mainInfo;
                    }}
                  />
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </Container>
      );
    } else {
      return (
        <Container className='profile-page__container'>
          {content}
          <Row>
            <Col md='12' className='button-container'>
              {EditButton}
            </Col>
          </Row>
          <Row>
            <Col xs='12' md='12'>
              <ProfileBasicInfo />
            </Col>
            <Col xs='12' md='12'>
              <ProfileMainInformation />
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    _id: state.profile.member._id,
    circle: state.profile.member.city_id,
    isLoading: state.loading.isLoading
  };
}

export default connect(mapStateToProps)(ProfilePage);
