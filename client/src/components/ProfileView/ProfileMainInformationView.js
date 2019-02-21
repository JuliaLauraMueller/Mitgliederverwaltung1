import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../redux/actions/profileActions';

import { Col, Row, Container } from 'reactstrap';

import '../../css/ProfilePage.css';

class ProfileMainInformation extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const profile = this.props.profile;
    return (
      <Row id="mainInformation">
        <Col xs="7" md="6">
          <Row className="business-info">
            <Col>
              <p className="main-title title-maininfo">
                Geschäftliche Informationen
              </p>
            </Col>
          </Row>

          <Row className="overflow">
            <Col>
              <label>Branche:</label>
              <label className="value-label">{profile.sector}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Beruf:</label>
              <label className="value-label">{profile.job}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Funktion:</label>
              <label className="value-label">{profile.function}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Firma:</label>
              <label className="value-label">{profile.company}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Tel:</label>
              <label className="value-label">{profile.companyTel}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Mobile:</label>
              <label className="value-label">{profile.companyMobile}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Strasse:</label>
              <label className="value-label">{profile.companyStreet}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Nr:</label>
              <label className="value-label">{profile.companyStreetNr}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>PLZ:</label>
              <label className="value-label">{profile.companyZip}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Ort:</label>
              <label className="value-label">{profile.companyCity}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>E-Mail:</label>
              <label className="value-label">{profile.companyEmail}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>URL Firma:</label>
              <label className="value-label">{profile.companyURL}</label>
            </Col>
          </Row>
        </Col>

        <Col xs="7" md="6">
          <Row className="private-info">
            <Col>
              <p className="main-title title-maininfo">Private Informationen</p>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Tel:</label>
              <label className="value-label">{profile.privateTel}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Mobile:</label>
              <label className="value-label">{profile.privateMobile}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Strasse:</label>
              <label className="value-label">{profile.privateStreet}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Nr:</label>
              <label className="value-label">{profile.privateStreetNr}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>PLZ:</label>
              <label className="value-label">{profile.privateZip}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Ort:</label>
              <label className="value-label">{profile.privateCity}</label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>Rechnung: </label>
              <label className="value-label">
                {profile.invoiceAddress === '1' ? 'privat' : 'geschäftlich'}
              </label>
            </Col>
          </Row>
          <Row className="overflow">
            <Col>
              <label>E-Mail:</label>
              <label className="value-label">{profile.privateEmail}</label>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

ProfileMainInformation.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.member
});
export default connect(
  mapStateToProps,
  { fetchProfile }
)(ProfileMainInformation);
