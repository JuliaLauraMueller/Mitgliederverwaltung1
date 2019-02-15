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
      <Container>
        <Row id="mainInformation">
          <Col
            xs={{ size: 7, offset: 0 }}
            md={{ size: 6, offset: 0 }}
            className="business-info"
          >
            <p className="main-title title-maininfo">
              Geschäftliche Informationen
            </p>
            <Col className="overflow">
              <label>Branche:</label>
              <label className="value-label">{profile.sector}</label>
            </Col>
            <Col className="overflow">
              <label>Beruf:</label>
              <label className="value-label">{profile.job}</label>
            </Col>
            <Col className="overflow">
              <label>Funktion:</label>
              <label className="value-label">{profile.function}</label>
            </Col>
            <Col className="overflow">
              <label>Firma:</label>
              <label className="value-label">{profile.company}</label>
            </Col>
            <Col className="overflow">
              <label>Tel:</label>
              <label className="value-label">{profile.companyTel}</label>
            </Col>
            <Col className="overflow">
              <label>Mobile:</label>
              <label className="value-label">{profile.companyMobile}</label>
            </Col>
            <Col className="overflow">
              <label>Strasse:</label>
              <label className="value-label">{profile.companyStreet}</label>
            </Col>
            <Col className="overflow">
              <label>Nr:</label>
              <label className="value-label">{profile.companyStreetNr}</label>
            </Col>
            <Col className="overflow">
              <label>PLZ:</label>
              <label className="value-label">{profile.companyZip}</label>
            </Col>
            <Col className="overflow">
              <label>Ort:</label>
              <label className="value-label">{profile.companyCity}</label>
            </Col>
            <Col className="overflow">
              <label>E-Mail:</label>
              <label className="value-label">{profile.companyEmail}</label>
            </Col>
            <Col className="overflow">
              <label>URL Firma:</label>
              <label className="value-label">{profile.companyURL}</label>
            </Col>
          </Col>
          <Col
            xs={{ size: 7, offset: 0 }}
            md={{ size: 6, offset: 0 }}
            className="private-info"
          >
            <p className="main-title title-maininfo">Private Informationen</p>
            <Col className="overflow">
              <label>Tel:</label>
              <label className="value-label">{profile.privateTel}</label>
            </Col>
            <Col className="overflow">
              <label>Mobile:</label>
              <label className="value-label">{profile.privateMobile}</label>
            </Col>
            <Col className="overflow">
              <label>Strasse:</label>
              <label className="value-label">{profile.privateStreet}</label>
            </Col>
            <Col className="overflow">
              <label>Nr:</label>
              <label className="value-label">{profile.privateStreetNr}</label>
            </Col>
            <Col className="overflow">
              <label>PLZ:</label>
              <label className="value-label">{profile.privateZip}</label>
            </Col>
            <Col className="overflow">
              <label>Ort:</label>
              <label className="value-label">{profile.privateCity}</label>
            </Col>
            <Col className="overflow">
              <label>Rechnungsadresse: </label>
              <label className="value-label">
                {profile.invoiceAddress === '1' ? 'privat' : 'geschäftlich'}
              </label>
            </Col>
            <Col className="overflow">
              <label>E-Mail:</label>
              <label className="value-label">{profile.privateEmail}</label>
            </Col>
          </Col>
        </Row>
      </Container>
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
