import React, { Component } from 'react';
import { Col, Container ,Button, Form, FormGroup, Label, Input, FormText, FormFeedback, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import imageBackground from '../assets/backgroundImage.png';
import LeftLoginRegister from '../components/LeftLoginRegister';
import RightLoginRegister from '../components/RightLoginRegister';
import logo from '../assets/logo.png';
import '../styles/coba.css'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            text : {
                title : 'Login',
                paragraph : 'Welcome Back, Please Login to your account'
            },
            username: '',
            password: ''
        }
    }

    handleLogin = (event) => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: 'http://localhost:3000/auth/login',
            data: {
                username: this.state.username,
                password: this.state.password
            }
        })
        .then((response)=>{
            console.log(response)
            let data = response.data.data[0];

            console.log(data)
            if(data.role === 1) {
                localStorage.setItem('token', data.token);
                return this.goToHome();
            } else {
                localStorage.setItem('token', data.token);
                return this.goToHome();
            }
        })
        .catch((error)=>{
            console.log(error);
            alert('Username Dan Password Salah!')
        })
    }

    goToRegister = () =>{
        this.props.history.push('/register')
    }

    goToHome = () =>{
        document.location.href='/';
    }

    render(){
        return(
            <div className='login-area'>
            <Container fluid>
                <Row>
                    <Col md='7' className='header-login'>
                            <LeftLoginRegister />
                    </Col>
                    <Col md='5' className='md-5'>
                        <div className='content-login'>
                                <RightLoginRegister title={this.state.text.title} paragraph={this.state.text.paragraph}/>
                            <Form onSubmit={this.handleLogin}>
                                <FormGroup>
                                    <Input
                                        type='text'
                                        name='username'
                                        id='exampleUsername'
                                        placeholder='username'
                                        className='input-login login-username'
                                        value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}
                                    />
                                    <FormFeedback valid>Correct username!</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type='password'
                                        name='password'
                                        id='examplePassword'
                                        placeholder='********'
                                        className='input-login login-password'
                                        value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}
                                    />
                                    <FormFeedback valid>Correct password!</FormFeedback>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check className='login-checkbox'>
                                        <Input
                                        type='checkbox'
                                        />
                                        Remember me
                                    </Label>
                                </FormGroup>
                                <Button type='submit' value='login' className='btn btn-login'>Login</Button>
                                <Button outline className='btn btn-signup' onClick={this.goToRegister} >Sign Up</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }
}

export default Login;