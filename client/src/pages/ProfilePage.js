import React, { Component } from 'react';
import ProfileBasicInfo from '../components/ProfileView/ProfileBasicInfoView.js';
import ProfileMainInformation from '../components/ProfileView/ProfileMainInformationView.js';

import ProfileBasicInfoEDIT from '../components/ProfileEdit/ProfileBasicInfoEdit.js';
import ProfileMainInformationEDIT from '../components/ProfileEdit/ProfileMainInformationEdit.js';

import { connect } from 'react-redux';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchProfile } from '../redux/actions/profileActions';

import {
  personalAccessCheck,
  roleAccessCheck
} from '../../../server/helpers/roleHelper';

import '../css/ProfilePage.css';

import { Container, Row, Col, Form, FormGroup } from 'reactstrap';

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
      personalAccessCheck(this.props._id, this.props.user._id) ||
      roleAccessCheck(
        3,
        this.props.circle,
        this.props.user.role,
        this.props.user.circle
      )
    ) {
      EditButton = (
        <button className="button-save-edit" onClick={() => this.toggleEdit}>
          Editieren
        </button>
      );
    } else {
      EditButton = <div />;
    }

    if (this.state.isEditing) {
      return (
        <Container className="profile-page__container">
          <Form onSubmit={this.handleClick}>
            <Row>
              <Col md="12">
                <input
                  type="submit"
                  className="button-save-edit"
                  value="Speichern"
                  onClick={this.handleClick}
                />
              </Col>
            </Row>
            <FormGroup row>
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
            </FormGroup>
          </Form>
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
  return {
    user: state.auth.user,
    _id: state.profile.member._id,
    circle: state.profile.member.city_id
  };
}

export default connect(mapStateToProps)(ProfilePage);
