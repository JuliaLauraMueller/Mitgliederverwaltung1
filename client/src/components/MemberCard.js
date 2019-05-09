import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class MemberCard extends Component {
  render() {
    let trimmedEmail = this.props.member.privateEmail.substring(0, 22);
    if (this.props.member.privateEmail.length > 22)
      trimmedEmail = trimmedEmail + '...';
    console.log(this.props.member.privateEmail);

    let privateTelefon = this.props.member.privateTel;
    console.log(privateTelefon);

    return (
      <Row className="member-card-row">
        <Col className="member-card-col">
          <Card className="member-card" style={{ border: '1px solid white' }}>
            <CardBody>
              <div>
                <img
                  className="card-image"
                  src={
                    this.props.member.avatar
                      ? this.props.member.avatarTag +
                        ',' +
                        this.props.member.avatar
                      : require('../img/Profile_Placeholder.png')
                  }
                  alt="Card i cap"
                />

                <CardTitle className="card-name">
                  {this.props.member.firstname} <br />
                  {this.props.member.surname}
                </CardTitle>
              </div>
              <div>
                <img
                  className="mail-icon"
                  src={require('../img/mail.png')}
                  alt="Card i cap"
                />
              </div>
              <div>
                <CardText className="card-text-mail">
                  <a href={'mailto:' + this.props.member.privateEmail}>
                    {trimmedEmail}
                  </a>
                </CardText>
              </div>
              <div>
                <img
                  className="phone-icon"
                  src={require('../img/phone.png')}
                  alt="Card i cap"
                />
              </div>
              <div>
                <CardTitle className="card-text-phone">
                  <a href={'tel:' + privateTelefon}>{privateTelefon}</a>
                </CardTitle>
              </div>
              <div className="profile-link">
                <Link
                  className="profile-text"
                  to={`/member/${this.props.member._id}`}
                >
                  <svg
                    className="profile-arrow"
                    viewBox="0 0 10 10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0.177999 1.02741L4.45449 5.91771L4.52644 6L4.45449 6.08229L0.177999 10.9726L1.19532 11.8255L5.9171 6.42454L5.91709 6.42454L5.91775 6.4238L6.29423 6L5.91775 5.5762L5.91775 5.57621L5.9171 5.57546L1.19532 0.174456L0.177999 1.02741Z" />
                  </svg>
                </Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default MemberCard;
