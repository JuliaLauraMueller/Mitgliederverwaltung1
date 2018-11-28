import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfile } from '../../actions/profileActions';
import '../../css/ProfileCSS.css';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

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
        <Nav tabs>
          <NavItem>
            <NavLink
              //className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              Geschäftlich
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              // className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              Privat
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div>
              <label>Branche</label>
              <label>{profile.sector}</label>
            </div>
            <div>
              <label>Beruf</label>
              <label>{profile.job}</label>
            </div>
            <div>
              <label>Funktion</label>
              <label>{profile.function}</label>
            </div>
            <div>
              <label>Firma</label>
              <label>{profile.company}</label>
            </div>
            <div>
              <label>Branche</label>
              <label>{profile.sector}</label>
            </div>
            <div>
              <label>Tel</label>
              <label>{profile.companyTel}</label>
            </div>
            <div>
              <label>Mobile</label>
              <label>{profile.companyMobile}</label>
            </div>
            <div>
              <label>E-Mail</label>
              <label>{profile.companyEmail}</label>
            </div>
            <div>
              <label>Strasse / Nr</label>
              <label>{profile.companyStreet}</label>
              <label>{profile.companyStreetNr}</label>
            </div>
            <div>
              <label>PLZ / Ort</label>
              <label>{profile.companyZip}</label>
              <label>{profile.companyCity}</label>
            </div>
            <div>
              <label>URL Firma</label>
              <label>{profile.companyURL}</label>
            </div>
          </TabPane>

          <TabPane tabId="2">
            <div>
              <label>Tel</label>
              <label>{profile.privateTel}</label>
            </div>
            <div>
              <label>Mobile</label>
              <label>{profile.privateMobile}</label>
            </div>
            <div>
              <label>E-Mail</label>
              <label>{profile.privateEmail}</label>
            </div>
            <div>
              <label>Strasse / Nr</label>
              <label>{profile.privateStreet}</label>
              <label>{profile.privateStreetNr}</label>
            </div>
            <div>
              <label>PLZ / Ort</label>
              <label>{profile.privateZip}</label>
              <label>{profile.privateCity}</label>
            </div>
          </TabPane>
        </TabContent>
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
