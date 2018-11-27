import React, { Component } from 'react';
import MemberCard from '../components/MemberCard';
import '../cssx/MemberCSS.css';
import {Helmet} from "react-helmet";
import { Container, Row } from 'reactstrap';


class MemberPage extends Component {
    constructor() {
        super();
        this.state = {
            members: [
                {
                prename: "Steven",
                lastname: "Wüthrich",
                mail: "sw@fatpanda.io",
                phone: "07923456789",
                profilepic: require('../img/marc_zimmermann.jpg')
                },
                
                {
                prename: "Marc",
                lastname: "Zimmermann",
                mail: "mz@fatpanda.io",
                phone: "07925456789",
                profilepic: require('../img/marc_zimmermann.jpg')
                },

                {
                prename: "Renato",
                lastname: "Gnocchi",
                mail: "rg@fatpanda.io",
                phone: "07923692789",
                profilepic: require('../img/marc_zimmermann.jpg')
                },

                {
                prename: "Steven",
                lastname: "Wüthrich",
                mail: "sw@fatpanda.io",
                phone: "07923456789",
                profilepic: require('../img/marc_zimmermann.jpg')
                },
                
                {
                prename: "Marc",
                lastname: "Zimmermann",
                mail: "mz@fatpanda.io",
                phone: "07925456789",
                profilepic: require('../img/marc_zimmermann.jpg')
                }
            ]
        }
    }
    render() {
        let memberCards = this.state.members.map(member => {
            return (
                <MemberCard member={member}></MemberCard>
            )
        })
        return (
        <div>
            <div>
                <Helmet>
                    <style>{'body { background-color: rgb(15, 25, 41, 10%); }'}</style>
                </Helmet>
            </div>

            <div>             
                <h1>Members</h1>
                <Container fluid>
                    <Row>
                        {memberCards}
                    </Row>
                </Container>
            </div>
        </div>
              
                
        );
    }
}

export default MemberPage;