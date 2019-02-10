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
        <Col xs={{ size: 10, offset: 1 }} md={{ size: 6, offset: 0 }} className="business-info">
            <p className="main-title title-maininfo">
              Geschäftliche Informationen
            </p>
            <div className="overflow">
              <label>Branche:</label>
              <label className="value-label">{profile.sector}</label>
            </div>
            <div className="overflow">
              <label>Beruf:</label>
              <label className="value-label">{profile.job}</label>
            </div>
            <div className="overflow">
              <label>Funktion:</label>
              <label className="value-label">{profile.function}</label>
            </div>
            <div>
              <label>Firma:</label>
              <label className="value-label">{profile.company}</label>
            </div>
            <div>
              <label>Tel:</label>
              <label className="value-label">{profile.companyTel}</label>
            </div>
            <div>
              <label>Mobile:</label>
              <label className="value-label">{profile.companyMobile}</label>
            </div>
            <div className="overflow">
              <label>Strasse:</label>
              <label className="value-label">{profile.companyStreet}</label>
            </div>
            <div>
              <label>Nr:</label>
              <label className="value-label">{profile.companyStreetNr}</label>
            </div>
            <div>
              <label>PLZ:</label>
              <label className="value-label">{profile.companyZip}</label>
            </div>
            <div>
              <label>Ort:</label>
              <label className="value-label">{profile.companyCity}</label>
            </div>
            <div className="overflow">
              <label>E-Mail:</label>
              <label className="value-label">{profile.companyEmail}</label>
            </div>
            <div className="overflow">
              <label>URL Firma:</label>
              <label className="value-label">{profile.companyURL}</label>
            </div>
          </Col>
          <Col xs={{ size: 10, offset: 1 }} md={{ size: 6, offset: 0 }} className="private-info">
            <p className="main-title title-maininfo">Private Informationen</p>
            <div>
              <label>Tel:</label>
              <label className="value-label">{profile.privateTel}</label>
            </div>
            <div>
              <label>Mobile:</label>
              <label className="value-label">{profile.privateMobile}</label>
            </div>
            <div>
              <label>Strasse:</label>
              <label className="value-label">{profile.privateStreet}</label>
            </div>
            <div>
              <label>Nr:</label>
              <label className="value-label">{profile.privateStreetNr}</label>
            </div>
            <div>
              <label>PLZ:</label>
              <label className="value-label">{profile.privateZip}</label>
            </div>
            <div>
              <label>Ort:</label>
              <label className="value-label">{profile.privateCity}</label>
            </div>
            <div>
              <label>Rechnungsadresse: </label>
              <label className="value-label">
                {profile.invoiceAddress === '1' ? 'privat' : 'geschäftlich'}
              </label>
            </div>
            <div className="overflow">
              <label>E-Mail:</label>
              <label className="value-label">{profile.privateEmail}</label>
            </div>
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
