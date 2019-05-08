import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';

import '../../css/ProfilePage.css';

class ProfileBasicInfoEDIT extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    const profile = this.props.profile;
    this.state = {
      xingLink: profile.xingLink,
      linkedinLink: profile.linkedinLink,
      facebookLink: profile.facebookLink,
      instagramLink: profile.instagramLink,
      offerings: profile.offerings,
      salutation: profile.salutation,
      title: profile.title,
      firstname: profile.firstname,
      surname: profile.surname,
      alias: profile.alias,
      status: profile.status,
      memberNumber: profile.memberNumber,
      entryDate: profile.entryDate,
      city: profile.city,
      godfather: profile.godfather,
      birthdate: profile.birthdate,
      avatar: profile.avatar,
      avatarTag: profile.avatarTag
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.getBase64 = this.getBase64.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onChange(e) {
    if (this._isMounted) {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  onSave() {
    let canv = this.editor.getImage();
    let pictureB64 = canv.toDataURL('image/jpeg', 1);
    let quality = 0.9;
    while ((pictureB64.length * 3) / 4 > 500 * 1024 && quality > 0) {
      pictureB64 = canv.toDataURL('image/jpeg', quality);
      quality -= 0.1;
    }
    let splitArr = pictureB64.split(',');

    const basicInformationUpdate = {
      _id: this.props.profile._id,
      xingLink: this.state.xingLink,
      linkedinLink: this.state.linkedinLink,
      facebookLink: this.state.facebookLink,
      instagramLink: this.state.instagramLink,
      offerings: this.state.offerings,
      salutation: this.state.salutation,
      title: this.state.title,
      firstname: this.state.firstname,
      surname: this.state.surname,
      alias: this.state.alias,
      status: this.state.status,
      //memberNumber: this.state.memberNumber,
      entryDate: this.state.entryDate,
      //city: this.state.city,
      //godfather: this.state.godfather,
      birthdate: this.state.birthdate,
      avatar: splitArr[1],
      avatarTag: splitArr[0]
    };
    return basicInformationUpdate;
  }

  async fileSelectedHandler(event) {
    var something = event.target.files[0];

    let fileInB64 = await this.getBase64(something);
    let splitArr = fileInB64.split(',');
    if (this._isMounted) {
      this.setState({
        avatarTag: splitArr[0],
        avatar: splitArr[1]
      });
    }
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  setEditorRef = editor => (this.editor = editor);

  render() {
    return (
      <Row>
        <Col md={{ offset: 0, size: 6 }} xs={{ offset: 1 }}>
          <Row>
            <Col>
              <InputGroup>
                <div className="input-field">
                  <AvatarEditor
                    image={
                      this.state.avatar
                        ? this.state.avatarTag + ',' + this.state.avatar
                        : require('../../img/Profile_Placeholder.png')
                    }
                    ref={this.setEditorRef}
                    width={147}
                    height={147}
                    border={0}
                    color={[0, 0, 0, 0.6]} // RGBA
                    scale={1.0}
                    rotate={0}
                    borderRadius={180}
                  />
                </div>
              </InputGroup>
              <input
                type="file"
                id="pictureUpload"
                onChange={this.fileSelectedHandler}
                className="hidden"
              />
              <label htmlFor="pictureUpload" className="picture-button">
                Neues Profilbild
              </label>
            </Col>
          </Row>

          <Row>
            <Col>
              <p className="main-title title-maininfo space-top">
                Anrede und Social Media
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon
                  id="salutation-group-addon"
                  addonType="prepend"
                >
                  Anrede
                </InputGroupAddon>
                <fieldset>
                  <div className="input-field-radio">
                    <input
                      type="radio"
                      className="radio"
                      name="salutation"
                      value="Frau"
                      checked={this.state.salutation === 'Frau'}
                      onChange={this.onChange}
                    />
                    <label className="radio-label">Frau</label>
                    <input
                      type="radio"
                      className="radio"
                      name="salutation"
                      value="Herr"
                      checked={this.state.salutation === 'Herr'}
                      onChange={this.onChange}
                    />
                    <label className="radio-label">Herr</label>
                  </div>
                </fieldset>
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Titel</InputGroupAddon>
                <div className="input-field">
                  <Input
                    type="text"
                    name="title"
                    onChange={this.onChange}
                    value={this.state.title || ''}
                  />
                </div>
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <p className="input-group-text">Vorname</p>
                  <pre className="required-field">*</pre>
                </InputGroupAddon>

                <div className="input-field">
                  <Input
                    type="text"
                    name="firstname"
                    onChange={this.onChange}
                    value={this.state.firstname || ''}
                  />
                </div>
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <p className="input-group-text">Nachname</p>
                  <pre className="required-field">*</pre>
                </InputGroupAddon>
                <div className="input-field">
                  <Input
                    type="text"
                    name="surname"
                    onChange={this.onChange}
                    value={this.state.surname}
                  />
                </div>
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Spitzname</InputGroupAddon>
                <div className="input-field">
                  <Input
                    type="text"
                    name="alias"
                    onChange={this.onChange}
                    value={this.state.alias || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Xing</InputGroupAddon>
                <div className="input-field">
                  <Input
                    type="text"
                    name="xingLink"
                    onChange={this.onChange}
                    value={this.state.xingLink || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Linkedin</InputGroupAddon>
                <div className="input-field">
                  <Input
                    type="text"
                    name="linkedinLink"
                    onChange={this.onChange}
                    value={this.state.linkedinLink || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Facebook</InputGroupAddon>
                <div className="input-field">
                  <Input
                    type="text"
                    name="facebookLink"
                    onChange={this.onChange}
                    value={this.state.facebookLink || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Instagram</InputGroupAddon>
                <div className="input-field">
                  <Input
                    type="text"
                    name="instagramLink"
                    onChange={this.onChange}
                    value={this.state.instagramLink || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>
        </Col>

        <Col md={{ offset: 0, size: 6 }} xs={{ offset: 1 }}>
          <Row className="basic-info">
            <Col>
              <p className="main-title title-maininfo space-top">Kurzprofil</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Geburtstag
                </InputGroupAddon>
                <div className="input-field">
                  <Input
                    type="date"
                    name="birthdate"
                    onChange={this.onChange}
                    value={this.state.birthdate || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Status</InputGroupAddon>
                <div className="input-field">
                  <Input
                    type="text"
                    name="status"
                    onChange={this.onChange}
                    value={this.state.status || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Angebot</InputGroupAddon>
                <div className="input-field" id="text-area-offers">
                  <Input
                    type="textarea"
                    name="offerings"
                    rows="3"
                    onChange={this.onChange}
                    value={this.state.offerings || ''}
                  />
                </div>
              </InputGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

ProfileBasicInfoEDIT.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.member
});

export default connect(
  mapStateToProps,
  null,
  null,
  { withRef: true }
)(ProfileBasicInfoEDIT);
