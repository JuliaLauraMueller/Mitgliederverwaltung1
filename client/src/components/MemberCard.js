import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Container, Row, Col, CardColumns } from 'reactstrap';
import '../cssx/MemberCSS.css';
  
class MemberCard extends Component{
    render() {
        return (
        <div>
            <CardColumns>
                <Card className="member-card" style={{ border: "1px solid white" }}>
                <CardBody>
                    <Container>
                        <Row className="row-title">
                            <Col sm="5"><img className="card-image" src={ require('../img/marc_zimmermann.jpg') } alt="Card i cap" /></Col>
                            <Col><CardTitle className="card-name">Marc <br></br>Zimmermann</CardTitle></Col>
                        </Row>
                        <Row className="row-text"> 
                            <Col sm="2"><CardImg src={ require('../img/marc_zimmermann.jpg') } alt="Card image cap" /><CardText className="card-text">test@mail.ch</CardText></Col>
                    
                        </Row>
                        <Row>
                            <Col sm="2"><CardImg src={ require('../img/marc_zimmermann.jpg') } alt="Card image cap" /><CardText className="card-text">0791234567</CardText></Col>
                        </Row>
                        <Row>
                            <Col><CardText className="profile-text">Profil></CardText></Col>
                        </Row>
                    </Container>
                </CardBody>
                </Card>

                <Card className="member-card" style={{ border: "1px solid white" }}>
                <CardBody>
                    <Container>
                        <Row className="row-title">
                            <Col sm="5"><img className="card-image" src={ require('../img/marc_zimmermann.jpg') } alt="Card i cap" /></Col>
                            <Col><CardTitle className="card-name">Marc <br></br>Zimmermann</CardTitle></Col>
                        </Row>
                        <Row className="row-text"> 
                            <Col sm="2"><CardImg src={ require('../img/marc_zimmermann.jpg') } alt="Card image cap" /><CardText className="card-text">test@mail.ch</CardText></Col>
                    
                        </Row>
                        <Row>
                            <Col sm="2"><CardImg src={ require('../img/marc_zimmermann.jpg') } alt="Card image cap" /><CardText className="card-text">0791234567</CardText></Col>
                        </Row>
                        <Row>
                            <Col><CardText className="profile-text">Profil></CardText></Col>
                        </Row>
                    </Container>
                </CardBody>
                </Card>
        </CardColumns>
        </div>
        );
    };
}

export default MemberCard;