import React, { Component } from 'react'
import { InputGroup, Input, Label, Button } from 'reactstrap'
import '../../css/ProfileCSS.css'


class ProfileSocialMedia extends Component{

    render() {
        return (
            <div id="socialMedia">
            <Button>Xing</Button>{' '}
            <Button>LinkedIn</Button>{' '}
            <Button>Facebook</Button>{' '}
            <Button>Instagram</Button>{' '}
            <br />
           <InputGroup>
             <Label>Was biete ich an?</Label>
             <Input type="textarea" placeholder="Ich bin stark und habe viel Geld und kann auch mega gut JavaSkript coden und natürlich jäison" />
           </InputGroup>
           <br />
         </div>
        );
    }
}

export default ProfileSocialMedia;