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
                            <img className="card-image" src={this.props.member.profilepic} alt="Card i cap"/>
                            <CardTitle className="card-name">{this.props.member.prename} <br></br>{this.props.member.lastname}</CardTitle>
                        </Container>
                        <Container>
                            <img className="mail-icon" src={require('../img/mail.png')} alt="Card i cap" />
                            <CardText className="card-text-mail">{this.props.member.mail}</CardText>   
                        </Container>
                        <Container>
                            <img className="phone-icon" src={require('../img/phone.png')} alt="Card i cap" />
                            <CardTitle className="card-text-phone">{this.props.member.phone}</CardTitle>
                        </Container>
                        <Container className="profile-link">
                            <div className="profile-div">
                                <Link className="profile-text" to="/login">Profil 
                                    
                                    <img className="profile-arrow"src={require('../img/arrow.svg')} alt="Card i cap" ></img>
                                    
                                </Link>
                            </div> 
                        </Container>
                    </CardBody>
                </Card>

            </div>
        );
    };
}

export default MemberCard;
