import React, { Component } from 'react';

import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { setNavVisible } from '../redux/actions/navigationActions';
import AdminCirclesOverview from '../components/Admin/AdminCirclesOverview';
import AdminMembersOverview from '../components/Admin/AdminMembersOverview';
import AdminEventsOverview from '../components/Admin/AdminEventsOverview';
import store from '../helpers/store';

import '../css/AdminPage.css';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setNavVisible());

    this.state = {
      activeTab: '1'
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    let CitiesButton = {};
    if (
      store.getState().auth.user !== undefined &&
      store.getState().auth.user.role >= 5
    ) {
      CitiesButton = (
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '2' })}
            onClick={() => {
              this.toggle('2');
            }}
          >
            Cities
          </NavLink>
        </NavItem>
      );
    } else {
      CitiesButton = <div />;
    }
    let EventsButton = {};
    if (
      store.getState().auth.user !== undefined &&
      store.getState().auth.user.role >= 2
    ) {
      EventsButton = (
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '3' })}
            onClick={() => {
              this.toggle('3');
            }}
          >
            Events
          </NavLink>
        </NavItem>
      );
    } else {
      EventsButton = <div />;
    }

    return (
      <div>
        <h1>Administration</h1>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              Mitglieder
            </NavLink>
          </NavItem>
          {CitiesButton}
          {EventsButton}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <AdminMembersOverview />
          </TabPane>
          <TabPane tabId="2">
            <AdminCirclesOverview />
          </TabPane>
          <TabPane tabId="3">
            <AdminEventsOverview />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AdminPage);
