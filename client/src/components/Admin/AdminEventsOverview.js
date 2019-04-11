import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Row,
  Col,
  Collapse,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalFooter,
  Label,
  ModalBody,
  FormGroup,
  Input,
  Form
} from 'reactstrap';
//import { filterEvents, ownCircleEvents } from '../../helpers/eventsSearch';
//mport store from '../../helpers/store';
//import { connect } from 'react-redux';
import AdminCreateEvent from './AdminCreateEvent';

class AdminEventsOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      collapseEvent: false,
      eventToDelete: {},
      eventToEdit: {},
      editModal: false
    };
    //this.getEventRows = this.getEventRows.bind(this);
    this.collapseEvent = this.collapseEvent.bind(this);
    //this.deleteEvent = this.deleteEvent.bind(this);
    this.toggleEventDeleteModal = this.toggleEventDeleteModal.bind(this);
    this.createEventDeleteModal = this.createEventDeleteModal.bind(this);
    this.createEventEditModal = this.createEventEditModal.bind(this);
    this.toggleEventEditModal = this.toggleEventEditModal.bind(this);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        {this.createEventDeleteModal()}
        {this.createEventEditModal()}
        <Row>
          <Col sm="12">
            <Row className="top-area">
              <Col sm="12">
                <input
                  type="text"
                  name="search"
                  placeholder="suchen..."
                  className="form-control form-control-admin"
                  value={this.state.searchText}
                  onChange={this.handleSearchChange.bind(this)}
                />
                <div>
                  <input
                    type="submit"
                    style={{ marginBottom: '1rem' }}
                    className="create-button"
                    color="primary"
                    onClick={this.collapseEvent}
                    value="Event hinzufügen"
                  />

                  <Collapse isOpen={this.state.collapseEvent}>
                    <Card>
                      <CardBody />
                    </Card>
                  </Collapse>
                </div>
              </Col>
            </Row>
            <Table hover className="adminTable">
              <thead>
                <tr>
                  <th> Titel</th>
                  <th>Datum</th>
                  <th className="d-none d-md-table-cell">Ort</th>
                  <th className="d-none d-md-table-cell">Rollen</th>
                </tr>
              </thead>
              <tbody />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }

  handleSearchChange(event) {
    this.setState({ searchText: event.target.value });
  }

  //deleteEvent(id) {
  //this.props.dispatch(deleteEvent(id));
  //}

  collapseEvent() {
    this.setState(state => ({ collapseEvent: !state.collapseEvent }));
  }

  toggleEventDeleteModal(event) {
    this.setState(prevState => ({
      eventDeleteModal: !prevState.eventDeleteModal,
      eventToDelete: event
    }));
  }

  toggleEventEditModal(event) {
    this.setState(prevState => ({
      editModal: !prevState.editModal,
      eventToEdit: event
    }));
  }

  /*async onEventSave(event) {
    event.preventDefault();
    await this.props
      .dispatch(putEvent(this.state.eventToEdit))
      .then(res => {
        this.toggleEventEditModal({});
      })
      .catch(errorMessages => {
        this.props.dispatch(alertError(errorMessages.join('\n')));
      });
  }*/

  handleChange(event) {
    let attr = 'eventToEdit.' + event.target.name;
    this.setState({ attr: event.target.value });
  }

  /*getEventRows(events) {
    return filterEvents(
      ownCircleEvents(
        members,
        [store.getState().auth.user.circle],
        store.getState().auth.user.role
      ),
      this.state.searchText,
      true
    ).map(event => {
      let EditButton = {};
      let DeleteButton = {};
      EditButton = (
        <span
          className="admin-link admin-link-small admin-cursor"
          onClick={() => this.toggleEventEditModal(event)}
          data-toggle="tooltip"
          title="Event bearbeiten"
        >
          <svg
            width="26"
            height="25"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.163 15.4171V15.2921H17.162V8.46425H17.977V15.4171C17.977 16.7418 16.8431 17.8534 15.44 17.8534H2.662C1.25889 17.8534 0.125 16.7428 0.125 15.4171V3.24147C0.125 1.91888 1.25564 0.854736 2.662 0.854736H9.991V1.61858H2.662C1.72047 1.61858 0.94 2.3238 0.94 3.24051V15.4171C0.94 16.3285 1.71495 17.0895 2.662 17.0895H15.441C16.388 17.0895 17.163 16.3285 17.163 15.4171Z"
              fill="#E1993D"
              stroke="#E1993D"
              strokeWidth="0.25"
            />
            <path
              d="M18.1517 0.66573L18.1519 0.66589C18.5307 1.02595 18.737 1.50229 18.737 2.00934C18.737 2.51631 18.5297 2.99369 18.1518 3.35384L11.0088 10.1601C10.9567 10.2097 10.8916 10.2455 10.8196 10.2623L10.819 10.2624L7.80703 10.9799L7.80639 10.9801C7.77368 10.988 7.74066 10.9917 7.707 10.9917C7.59904 10.9917 7.49436 10.951 7.41745 10.8778C7.31721 10.7815 7.27875 10.6448 7.31193 10.5176C7.31194 10.5176 7.31194 10.5175 7.31195 10.5175L8.06391 7.6486L8.06399 7.64831C8.0809 7.58315 8.1174 7.52142 8.16923 7.47204L15.3122 0.665783C16.069 -0.0552897 17.396 -0.0552146 18.1517 0.66573ZM10.476 9.5556L10.5088 9.54778L10.5332 9.5245L16.4422 3.89406L16.5372 3.80357L16.4422 3.71307L14.9362 2.27807L14.85 2.1959L14.7638 2.27807L8.85477 7.9085L8.82909 7.93297L8.82009 7.96728L8.31809 9.88061L8.26519 10.0822L8.46796 10.0339L10.476 9.5556ZM17.0228 3.17561L17.109 3.25777L17.1952 3.17561L17.5712 2.81733C17.7962 2.60294 17.922 2.31613 17.922 2.00934C17.922 1.70254 17.7962 1.41573 17.5712 1.20134C17.1209 0.772286 16.3431 0.772286 15.8928 1.20134L15.5168 1.55961L15.4218 1.65011L15.5168 1.74061L17.0228 3.17561Z"
              fill="#E1993D"
              stroke="#E1993D"
              strokeWidth="0.25"
            />
          </svg>
        </span>
      );

      DeleteButton = (
        <span
          className="admin-link admin-link-small admin-cursor"
          onClick={() => this.toggleEventDeleteModal(event)}
        >
          <svg
            width="27"
            height="27"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5556 3.17778H17.7556H14.6667V1.51111C14.6667 0.688889 14.0444 0 13.2667 0H6.73333C5.95556 0 5.33333 0.688889 5.33333 1.51111V3.17778H2.24444H0.444444C0.2 3.17778 0 3.37778 0 3.62222C0 3.86667 0.2 4.06667 0.444444 4.06667H2.24444V17.3333C2.24444 18.8 3.44444 20 4.91111 20H15.0889C16.5556 20 17.7556 18.8 17.7556 17.3333V4.06667H19.5556C19.8 4.06667 20 3.86667 20 3.62222C20 3.37778 19.8 3.17778 19.5556 3.17778ZM6.22222 1.51111C6.22222 1.17778 6.44444 0.888889 6.71111 0.888889H13.2667C13.5556 0.888889 13.7778 1.17778 13.7778 1.51111V3.17778H6.22222V1.51111ZM16.8667 17.3333C16.8667 18.3111 16.0667 19.1111 15.0889 19.1111H4.91111C3.93333 19.1111 3.13333 18.3111 3.13333 17.3333V4.06667H16.8667V17.3333Z"
              fill="#E1993D"
            />
            <path
              d="M7.46667 16.0222C7.71111 16.0222 7.91111 15.8222 7.91111 15.5777V7.59996C7.91111 7.35552 7.71111 7.15552 7.46667 7.15552C7.22222 7.15552 7.02222 7.35552 7.02222 7.59996V15.5555C7.02222 15.8222 7.22222 16.0222 7.46667 16.0222Z"
              fill="#E1993D"
            />
            <path
              d="M12.5333 16.0222C12.7778 16.0222 12.9778 15.8222 12.9778 15.5777V7.59996C12.9778 7.35552 12.7778 7.15552 12.5333 7.15552C12.2889 7.15552 12.0889 7.35552 12.0889 7.59996V15.5555C12.0889 15.8222 12.2889 16.0222 12.5333 16.0222Z"
              fill="#E1993D"
            />
          </svg>
        </span>
      );
      return (
        <tr key={event._id}>
          <td className="d-none d-md-table-cell">{event.title}</td>
          <td className="d-none d-md-table-cell">{event.date}</td>
          <td className="d-none d-md-table-cell">{event.location}</td>
          <td className="d-none d-md-table-cell">{event.permittedRoles}</td>
          <td>
            {EditButton}
            {DeleteButton}
          </td>
        </tr>
      );
    });
  }*/
  createEventDeleteModal() {
    return (
      <Modal
        isOpen={this.state.eventDeleteModal}
        toggle={() => this.createEventDeleteModal({})}
      >
        <ModalHeader toggle={() => this.createEventDeleteModal({})}>
          Event wirklich löschen?
        </ModalHeader>
        <ModalFooter>
          <input
            type="submit"
            className="admin-button"
            color="primary"
            onClick={() => {
              this.deleteEvent(this.state.eventToDelete._id);
              this.createEventDeleteModal({});
            }}
            value="Löschen"
          />
          <input
            type="submit"
            className="admin-button"
            color="primary"
            onClick={() => {
              this.createEventDeleteModal({});
            }}
            value="Abbrechen"
          />
        </ModalFooter>
      </Modal>
    );
  }

  createEventEditModal() {
    return (
      <Modal
        isOpen={this.state.editModal}
        toggle={() => this.toggleEventEditModal({})}
      >
        <ModalHeader toggle={() => this.toggleEventEditModal({})}>
          Event editieren
        </ModalHeader>
        <Form onSubmit={this.onEventSave}>
          <ModalBody>
            <FormGroup row>
              <Label className="city-name-label">Titel:</Label>
              <Col>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  className="admin-form-control"
                  onChange={this.handleChange}
                  value={this.state.eventToEdit.title}
                />
              </Col>
              <Label className="city-name-label">Beschreibung:</Label>
              <Col>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  className="admin-form-control"
                  onChange={this.handleChange}
                  value={this.state.eventToEdit.description}
                />
              </Col>
              <Label className="city-name-label">Teilnehmende Cities:</Label>
              <Col>
                <Input
                  type="text"
                  id="cities"
                  name="cities"
                  className="admin-form-control"
                  onChange={this.handleChange}
                  value={this.state.eventToEdit.cities}
                />
              </Col>
              <Label className="city-name-label">Datum:</Label>
              <Col>
                <Input
                  type="text"
                  id="date"
                  name="date"
                  className="admin-form-control"
                  onChange={this.handleChange}
                  value={this.state.eventToEdit.date}
                />
              </Col>
              <Label className="city-name-label">Beginn:</Label>
              <Col>
                <Input
                  type="text"
                  id="startTime"
                  name="startTime"
                  className="admin-form-control"
                  onChange={this.handleChange}
                  value={this.state.eventToEdit.startTime}
                />
              </Col>
              <Label className="city-name-label">Ende:</Label>
              <Col>
                <Input
                  type="text"
                  id="endTime"
                  name="endTime"
                  className="admin-form-control"
                  onChange={this.handleChange}
                  value={this.state.eventToEdit.endTime}
                />
              </Col>
              <Label className="city-name-label">Ort:</Label>
              <Col>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  className="admin-form-control"
                  onChange={this.handleChange}
                  value={this.state.eventToEdit.location}
                />
              </Col>
              <Label className="city-name-label">Organisation:</Label>
              <Col>
                <Input
                  type="text"
                  id="organisationTeam"
                  name="organisationTeam"
                  className="admin-form-control"
                  onChange={this.handleChange}
                  value={this.state.eventToEdit.organisationTeam}
                />
              </Col>
              <Label className="city-name-label">Anmeldeschluss:</Label>
              <Col>
                <Input
                  type="text"
                  id="registrationEndDate"
                  name="registrationEndDate"
                  className="admin-form-control"
                  onChange={this.handleChange}
                  value={this.state.eventToEdit.registrationEndDate}
                />
              </Col>
              <Label className="city-name-label">Rollen:</Label>
              <Col>
                <Input
                  type="text"
                  id="permittedRoles"
                  name="permittedRoles"
                  className="admin-form-control"
                  onChange={this.handleChange}
                  value={this.state.eventToEdit.permittedRoles}
                />
              </Col>
              <Label className="city-name-label">Bild:</Label>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <input
              type="submit"
              className="admin-button"
              color="primary"
              onClick={this.onEventSave}
              value="Speichern"
            />

            <input
              type="button"
              className="admin-button"
              color="secondary"
              onClick={() => {
                this.toggleEventEditModal({});
              }}
              value="Abbrechen"
            />
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    //events: state.event.events
  };
}

export default connect(mapStateToProps)(AdminEventsOverview);
