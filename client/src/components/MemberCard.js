import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Container, Row, Col } from 'reactstrap';
  
class MemberCard extends Component{
    render() {
        return (
        <div>
            <Card>
            <CardBody>
                <Container>
                    <Row>
                        <Col><CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /></Col>
                        <Col><CardTitle>Card title</CardTitle></Col>
                    </Row>
                </Container>
                <CardText>test@mail.ch</CardText>
                <CardText>079 123 45 67</CardText>
            </CardBody>
            </Card>
        </div>
        );
    };
}

export default MemberCard;