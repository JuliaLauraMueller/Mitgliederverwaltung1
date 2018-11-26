import React, { Component } from 'react';
import {
Form,
Input,
FormGroup,
Col,
Label,
Button
} from 'reactstrap';


class Login extends Component{

    submit = () => {
        alert('You have logged in :)');
    }

    render() {
        return (
            <div>
                <Form className="form">
                    <Col>
                        <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="myemail@email.com"
                        />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="********"
                        />
                        </FormGroup>
                    </Col>
                    <Button color="primary" className="float-right" onClick={this.submit}>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default Login;