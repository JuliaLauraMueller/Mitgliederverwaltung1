import React, { Component } from 'react';
import ProfileBasicInfo from '../components/ProfileView/ProfileBasicInfoView.js';
import ProfileMainInformation from '../components/ProfileView/ProfileMainInformationView.js';

import ProfileBasicInfoEDIT from '../components/ProfileEdit/ProfileBasicInfoEdit.js';
import ProfileMainInformationEDIT from '../components/ProfileEdit/ProfileMainInformationEdit.js';

import { connect } from 'react-redux';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchProfile, putWholeData } from '../redux/actions/profileActions';
import { alertError } from '../redux/actions/alertActions';

import '../css/ProfilePage.css';

import { Container, Row, Col } from 'reactstrap';

class ProfilePage extends Component {
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

  async handleClick(e) {
    e.preventDefault();
    var newBasicInfo = this.basicInfo.getWrappedInstance().onSave();
    var newMainInfo = this.mainInfo.getWrappedInstance().onSave(); //newBasicInfo);
    await this.props.dispatch(
      putWholeData(
        newMainInfo.mainInfoUpdate,
        newBasicInfo,
        newMainInfo.companyUpdate
      )
        .then(res => {
          console.log('RES');
          console.log(res);
          this.toggleEdit();
          //return res;
          //this.props.dispatch({ type: PUT_PROFILE, payload: newBasicInfo });
        })
        .catch(err => {
          this.props.dispatch(alertError(err.join('\n')));
          this.toggleEdit();
        })
    );
  }

  render() {
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
              <button className="button-save-edit" onClick={this.toggleEdit}>
                Editieren
              </button>
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
