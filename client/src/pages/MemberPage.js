import React, { Component } from 'react';
import MemberCard from '../components/MemberCard';
import '../cssx/MemberCSS.css';

class MemberPage extends Component {
    render() {
        return (   
                <div>
                <h1>Members</h1>
                <MemberCard></MemberCard>
                </div>
        );
    }
}

export default MemberPage;