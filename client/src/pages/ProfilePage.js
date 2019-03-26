import React, { Component } from 'react';
import ProfileBasicInfo from '../components/ProfileView/ProfileBasicInfoView.js';
import ProfileMainInformation from '../components/ProfileView/ProfileMainInformationView.js';

import ProfileBasicInfoEDIT from '../components/ProfileEdit/ProfileBasicInfoEdit.js';
import ProfileMainInformationEDIT from '../components/ProfileEdit/ProfileMainInformationEdit.js';

import { connect } from 'react-redux';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchProfile } from '../redux/actions/profileActions';
import store from '../helpers/store';

import jwtToken from '../helpers/jwtAccessor';

import {
  personalAccessCheck,
  roleAccessCheck
} from '../../../server/services/roleService';

import '../css/ProfilePage.css';

import { Container, Row, Col } from 'reactstrap';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setNavVisible());
    const profile = this.props.profile;
    this.state = {
      isEditing: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loadMember = this.loadMember.bind(this);

    store.subscribe(() => {
      this.setState({
        _id: store.getState().profile.member._id,
        circle: store.getState().profile.member.city_id
      });
    });
  }

  componentDidMount() {
    // first time profile page is loaded
    this.loadMember(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    // switch between two profiles (when already on profile page)
    this.loadMember(nextProps.match.params.id);
  }

  loadMember(memberId) {
    this.props.dispatch(fetchProfile(memberId));
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleClick(e) {
    e.preventDefault();
    this.basicInfo.getWrappedInstance().onSave();
    this.mainInfo.getWrappedInstance().onSave();
    this.toggleEdit();
  }

  render() {
    let EditButton = {};
    if (
      personalAccessCheck(this.state._id, jwtToken._id) ||
      roleAccessCheck(3, this.state.circle, jwtToken.role, jwtToken.circle)
    ) {
      EditButton = (
        <button className="button-save-edit" onClick={this.toggleEdit}>
          Editieren
        </button>
      );
    } else {
      EditButton = <div />;
    }

    if (this.state.isEditing) {
      return (
        <Container className="profile-page__container">
          <Row>
            <Col md="12">
              <button className="button-save-edit" onClick={this.handleClick}>
                Speichern
              </button>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12">
              <ProfileBasicInfoEDIT
                ref={basicInfo => {
                  this.basicInfo = basicInfo;
                }}
              />
            </Col>
            <Col xs="12" md="12">
              <ProfileMainInformationEDIT
                ref={mainInfo => {
                  this.mainInfo = mainInfo;
                }}
              />
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container className="profile-page__container">
          <Row>
            <Col md="12" className="button-container">
              {EditButton}
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12">
              <ProfileBasicInfo />
            </Col>
            <Col xs="12" md="12">
              <ProfileMainInformation />
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(ProfilePage);
