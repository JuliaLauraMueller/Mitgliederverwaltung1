import React, { Component, View } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Container, Row, Col, CardColumns } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../cssx/MemberCSS.css';
  
class MemberCard extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {

        return (
            <div>
                <Card className="member-card" style={{ border: "1px solid white" }}>
                    <CardBody>
                        <Container>
                            <Row className="row-title">
                                <Col sm="5"><img className="card-image" src={this.props.member.profilepic} alt="Card i cap"/></Col>
                                <Col><CardTitle className="card-name">{this.props.member.prename} <br></br>{this.props.member.lastname}</CardTitle></Col>
                            </Row>
                            <Row className="row-text">
                                <Col sm="2"><img className="mail-icon" src={require('../img/mail.png')} alt="Card i cap" /><CardText className="card-text">{this.props.member.mail}</CardText></Col>

                            </Row>
                            <Row>
                                <Col sm="2"><img className="phone-icon" src={require('../img/phone.png')} alt="Card i cap" /><CardText className="card-text">{this.props.member.phone}</CardText></Col>
                            </Row>
                            <Row>
                                <Col><CardText><Link className="profile-text" to="/login">Profil></Link></CardText></Col>
                            </Row>
                        </Container>
                    </CardBody>
                </Card>

            </div>
        );
    };
}

export default MemberCard;