import React, { Component, Text } from 'react';
import { Card, CardImg, CardText, CardBody, 
    CardTitle, Container, Row, Col, CardColumns } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../cssx/MemberCSS.css';

/*
TODO: 
-Fix Link
-make a mobile version
*/
  
class MemberCard extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {

        return (   
            <div>
                <style>
                @import url('https://fonts.googleapis.com/css?family=Roboto:100,300');
                </style> 
                <Card className="member-card" style={{ border: "1px solid white" }}>
                    <CardBody>
                        <Container>
                            <Row className="row-title">
                                <Col xs="auto"><img className="card-image" src={this.props.member.profilepic} alt="Card i cap"/></Col>
                                <Col><CardTitle className="card-name">{this.props.member.prename} <br></br>{this.props.member.lastname}</CardTitle></Col>
                            </Row>
                            <Row className="row-text">
                                <Col><img className="mail-icon" src={require('../img/mail.png')} alt="Card i cap" />
                                <CardTitle className="card-text-mail">{this.props.member.mail}</CardTitle></Col>

                            </Row>
                            <Row>
                                <Col><img className="phone-icon" src={require('../img/phone.png')} alt="Card i cap" />
                                <CardTitle className="card-text-phone">{this.props.member.phone}</CardTitle></Col>
                            </Row>
                            <Row>
                                
                                    <Link className="profile-text" to="/login">Profil></Link>    
                                
                            </Row>
                        </Container>
                    </CardBody>
                </Card>

            </div>
        );
    };
}

export default MemberCard;