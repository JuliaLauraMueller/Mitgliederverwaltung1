import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

/*
TODO: 
-Fix Link
-make a mobile version
*/

class MemberCard extends Component {
  render() {
    return (
      <div>
        <Card className="member-card" style={{ border: '1px solid white' }}>
          <CardBody>
            <Container>
              <img
                className="card-image"
                src={this.props.member.profilepic}
                alt="Card i cap"
              />
              <CardTitle className="card-name">
                {this.props.member.prename} <br />
                {this.props.member.lastname}
              </CardTitle>
            </Container>
            <Container>
              <img
                className="mail-icon"
                src={'./img/mail.png'}
                alt="Card i cap"
              />
              <CardText className="card-text-mail">
                {this.props.member.mail}
              </CardText>
            </Container>
            <Container>
              <img
                className="phone-icon"
                src={'./img/phone.png'}
                alt="Card i cap"
              />
              <CardTitle className="card-text-phone">
                {this.props.member.phone}
              </CardTitle>
            </Container>
            <Container className="profile-link">
              <div>
                <Link className="profile-text" to="/login">
                  Profil
                  <svg
                    className="profile-arrow"
                    viewBox="0 0 7 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0.177999 1.02741L4.45449 5.91771L4.52644 6L4.45449 6.08229L0.177999 10.9726L1.19532 11.8255L5.9171 6.42454L5.91709 6.42454L5.91775 6.4238L6.29423 6L5.91775 5.5762L5.91775 5.57621L5.9171 5.57546L1.19532 0.174456L0.177999 1.02741Z" />
                  </svg>
                </Link>
              </div>
            </Container>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default MemberCard;
