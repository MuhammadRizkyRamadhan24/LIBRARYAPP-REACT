import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import LoginRegister from '../components/LoginRegister';
import styles from '../styles/Login.module.css'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            text : {
                title : 'Register',
                paragraph : 'Welcome Back, Please Register to create account'
            }
        }
    }

    render(){
        return(
            <div>
                <div className={styles.username}>
                    <Form>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input type="text" name="text" placeholder="username" />
                        </FormGroup>
                    </Form>
                </div>
                <div className={styles.password}>
                    <Form>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input type="password" name="password" placeholder="********" />
                        </FormGroup>
                    </Form>
                </div>
                <LoginRegister title={this.state.text.title} paragraph={this.state.text.paragraph}/>
            </div>
        )
    }
}

export default Login;