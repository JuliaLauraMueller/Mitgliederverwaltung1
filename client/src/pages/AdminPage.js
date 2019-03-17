import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { setNavVisible } from '../redux/actions/navigationActions';
import { fetchMembers } from '../redux/actions/memberActions';

import '../css/AdminPage.css';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setNavVisible());

    this.getMemberRows = this.getMemberRows.bind(this);

    this.state = {
      searchText: ''
    };
  }

  handleChange(event) {
    this.setState({ searchText: event.target.value });
  }

  componentDidMount() {
    this.props.dispatch(fetchMembers());
  }

  render() {
    return (
      <div>
        <h1>Administration</h1>
        <Link className="admin-link admin-link-large" to="/cities">
          Cities
        </Link>
        <Link
          className="admin-link admin-link-large admin-link-right"
          to="/members/create"
        >
          Neuer Benutzer
        </Link>
        <input
          type="text"
          name="search"
          placeholder="Mitglied suchen"
          className="form-control"
          value={this.state.searchText}
          onChange={this.handleChange.bind(this)}
        />
        <Table hover className="adminTable">
          <thead>
            <tr>
              <th className="d-none d-md-table-cell">Nr.</th>
              <th>Vorname</th>
              <th>Nachname</th>
              <th className="d-none d-md-table-cell">E-Mail</th>
              <th className="d-none d-sm-table-cell">City</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>{this.getMemberRows(this.props.members)}</tbody>
        </Table>
      </div>
    );
  }

  getMemberRows(members) {
    return (
      members
        // TODO: maybe reuse logic from member page search here (extract to helper function)
        .filter(member => member.firstname.startsWith(this.state.searchText))
        .map(member => {
          return (
            <tr key={member._id}>
              <td className="d-none d-md-table-cell">{member.membernumber}</td>
              <td>{member.firstname}</td>
              <td>{member.surname}</td>
              <td className="d-none d-md-table-cell">{member.privateEmail}</td>
              <td className="d-none d-sm-table-cell">{member.circle}</td>
              <td>
                <Link
                  className="admin-link admin-link-small"
                  to={'/member/' + member._id}
                >
                  Bearbeiten
                </Link>
                <br />
                <Link
                  className="admin-link admin-link-small"
                  to={'/members/changeRole/' + member._id}
                >
                  Rolle ändern
                </Link>
                <br />
                <Link
                  className="admin-link admin-link-small"
                  to={'/members/delete/' + member._id}
                >
                  Löschen
                </Link>
              </td>
            </tr>
          );
        })
    );
  }
}
function mapStateToProps(state) {
  return {
    members: state.member.members
  };
}

export default connect(mapStateToProps)(AdminPage);
