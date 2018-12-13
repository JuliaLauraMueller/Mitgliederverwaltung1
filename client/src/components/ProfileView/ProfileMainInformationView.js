import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../redux/actions/profileActions';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import '../../css/ProfilePage.css';

class ProfileMainInformation extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }
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
      <div id="mainInformation">
        <div className="business-info">
          <div>
            <label>Branche:</label>
            <label className="value-label">{profile.sector}</label>
          </div>
          <div>
            <label>Beruf:</label>
            <label className="value-label">{profile.job}</label>
          </div>
          <div>
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
          <div>
            <label>E-Mail:</label>
            <label className="value-label">{profile.companyEmail}</label>
          </div>
          <div>
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
          <div>
            <label>URL Firma:</label>
            <label className="value-label">{profile.companyURL}</label>
          </div>
        </div>

        <div className="private-info">
          <div>
            <label>Tel:</label>
            <label className="value-label">{profile.privateTel}</label>
          </div>
          <div>
            <label>Mobile:</label>
            <label className="value-label">{profile.privateMobile}</label>
          </div>
          <div>
            <label>E-Mail:</label>
            <label className="value-label">{profile.privateEmail}</label>
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
        </div>
      </div>
    );
  }
}

ProfileMainInformation.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.member
});
export default connect(
  mapStateToProps,
  { fetchProfile }
)(ProfileMainInformation);
