import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminCreateCircle from './AdminCreateCircle';
import { alertError } from '../../redux/actions/alertActions';
import {
  Table,
  Col,
  Collapse,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledTooltip
} from 'reactstrap';
import {
  fetchCircles,
  putCircle,
  deleteCircle
} from '../../redux/actions/circleActions';

class AdminCirclesOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapseCircle: false,
      circleToEdit: { name: '' },
      circleToDelete: {},
      editModal: false
    };

    this.toggleCircleDeleteModal = this.toggleCircleDeleteModal.bind(this);
    this.toggleCircleEditModal = this.toggleCircleEditModal.bind(this);
    this.collapseCircle = this.collapseCircle.bind(this);
    this.createCircleDeleteModal = this.createCircleDeleteModal.bind(this);
    this.createCircleEditModal = this.createCircleEditModal.bind(this);
    this.onCircleSave = this.onCircleSave.bind(this);
    this.handleCircleNameChange = this.handleCircleNameChange.bind(this);
    this.getCircleRows = this.getCircleRows.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchCircles());
  }

  render() {
    return (
      <div>
        {this.createCircleDeleteModal()}
        {this.createCircleEditModal()}
        <div className="top-area">
          <input
            type="submit"
            style={{ marginBottom: '1rem' }}
            className="create-button"
            color="primary"
            onClick={this.collapseCircle}
            value="City hinzufügen"
          />
          <Collapse isOpen={this.state.collapseCircle}>
            <Card>
              <CardBody>
                <AdminCreateCircle close={this.collapseCircle} />
              </CardBody>
            </Card>
          </Collapse>
        </div>
        <Table hover className="adminTable">
          <thead>
            <tr>
              <th>City</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>{this.getCircleRows(this.props.circles)}</tbody>
        </Table>
      </div>
    );
  }

  async onCircleSave(event) {
    event.preventDefault();
    await this.props
      .dispatch(putCircle(this.state.circleToEdit))
      .then(res => {
        this.toggleCircleEditModal({ name: '' });
      })
      .catch(errorMessages => {
        if (Array.isArray(errorMessages)) {
          this.props.dispatch(alertError(errorMessages.join('\n')));
        } else {
          this.props.dispatch(alertError('Es ist ein Fehler aufgetreten'));
        }
      });
  }

  handleCircleNameChange(e) {
    e.persist();
    this.setState(prevState => ({
      circleToEdit: {
        _id: prevState.circleToEdit._id,
        name: e.target.value
      }
    }));
  }

  toggleCircleEditModal(circle) {
    this.setState(prevState => ({
      editModal: !prevState.editModal,
      circleToEdit: circle
    }));
  }

  toggleCircleDeleteModal(circle) {
    this.setState(prevState => ({
      circleDeleteModal: !prevState.circleDeleteModal,
      circleToDelete: circle
    }));
  }

  collapseCircle() {
    this.setState(state => ({ collapseCircle: !state.collapseCircle }));
  }

  deleteCircle(id) {
    this.props.dispatch(deleteCircle(id));
  }

  getCircleRows(circles) {
    return circles.map(circle => {
      var tooltipIdEdit = 'tooltip-edit-' + circle._id;
      var tooltipIdDelete = 'tooltip-delete-' + circle._id;
      return (
        <tr key={circle._id}>
          <td>{circle.name}</td>
          <td>
            <span
              id={tooltipIdEdit}
              className="admin-link admin-link-small admin-cursor"
              onClick={() => this.toggleCircleEditModal(circle)}
            >
              <UncontrolledTooltip
                placement="bottom-start"
                target={tooltipIdEdit}
              >
                City bearbeiten
              </UncontrolledTooltip>
              <svg
                width="24"
                height="23"
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
            <span
              id={tooltipIdDelete}
              className="admin-link admin-link-small admin-cursor"
              onClick={() => this.toggleCircleDeleteModal(circle)}
            >
              <UncontrolledTooltip
                placement="bottom-start"
                target={tooltipIdDelete}
              >
                City löschen
              </UncontrolledTooltip>
              <svg
                width="25"
                height="25"
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
          </td>
        </tr>
      );
    });
  }

  createCircleEditModal() {
    return (
      <Modal
        isOpen={this.state.editModal}
        toggle={() => this.toggleCircleEditModal({ name: '' })}
      >
        <ModalHeader toggle={() => this.toggleCircleEditModal({ name: '' })}>
          City editieren
        </ModalHeader>
        <Form onSubmit={this.onCircleSave}>
          <ModalBody>
            <FormGroup row>
              <Label className="city-name-label">
                Name<pre className="required-field">*</pre>
              </Label>
              <Col>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  className="admin-form-control"
                  onChange={this.handleCircleNameChange}
                  value={this.state.circleToEdit.name}
                />
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <input
              type="submit"
              className="admin-button"
              color="primary"
              onClick={this.onCircleSave}
              value="Speichern"
            />

            <input
              type="button"
              className="admin-button"
              color="secondary"
              onClick={() => {
                this.toggleCircleEditModal({ name: '' });
              }}
              value="Abbrechen"
            />
          </ModalFooter>
        </Form>
      </Modal>
    );
  }

  createCircleDeleteModal() {
    return (
      <Modal
        isOpen={this.state.circleDeleteModal}
        toggle={() => this.toggleCircleDeleteModal({})}
      >
        <ModalHeader toggle={() => this.toggleCircleDeleteModal({})}>
          City '{this.state.circleToDelete.name}' wirklich löschen?
        </ModalHeader>
        <ModalFooter>
          <input
            type="submit"
            className="admin-button"
            color="primary"
            onClick={() => {
              this.deleteCircle(this.state.circleToDelete._id);
              this.toggleCircleDeleteModal({});
            }}
            value="Löschen"
          />

          <input
            type="button"
            className="admin-button"
            color="primary"
            onClick={() => {
              this.toggleCircleDeleteModal({});
            }}
            value="Abbrechen"
          />
        </ModalFooter>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    circles: state.circle.circles
  };
}

export default connect(mapStateToProps)(AdminCirclesOverview);
