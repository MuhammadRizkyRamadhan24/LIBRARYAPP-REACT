import React, { Component } from 'react';
import { Col, Container ,Button, Form, FormGroup, Label, Input, FormFeedback, Row } from 'reactstrap';
import axios from 'axios';
import LeftLoginRegister from '../components/LeftLoginRegister';
import RightLoginRegister from '../components/RightLoginRegister';
import Swal from 'sweetalert2';
import '../styles/coba.css';

import { connect } from 'react-redux';
import { register } from '../redux/actions/auth'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            text : {
                title : 'Register',
                paragraph : 'Welcome Back, Please Register to create account'
            },
            username: '',
            password: '',
            role:'0'
        }
    }

    handleRegister = (event) => {
        event.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        }
        this.props.register(data).then(() => {
            this.props.history.push('/login');
        });

        // axios({
        //     method: 'POST',
        //     url: 'http://localhost:3000/auth/register',
        //     data: {
        //         username: this.state.username,
        //         password: this.state.password,
        //         role: this.state.role
        //     }
        // })
        // .then((response)=>{
        //     console.log(response)
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'Register success',
        //         showConfirmButton: false,
        //         timer: 1500
        //     })
        //       .then(()=>{
        //         document.location.href='/login'
        //     })
        // })
        // .catch((error)=>{
        //     console.log(error);
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Oops...',
        //         text: 'Register error',
        //         confirmButtonColor: '#000000',
        //     })
        // })
    }


    goToLogin = () =>{
        this.props.history.push('/login')
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
                            <Form onSubmit={this.handleRegister}>
                                <FormGroup>
                                    <Input
                                        type='text'
                                        name='username'
                                        placeholder='username'
                                        className='input-login login-username'
                                        value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type='password'
                                        name='password'
                                        placeholder='********'
                                        className='input-login login-password'
                                        value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}
                                    />
                                </FormGroup>
                                {/* <FormGroup>
                                    <Input
                                        type='text'
                                        name='role'
                                        placeholder='1=Admin 0=User'
                                        className='input-login login-password'
                                        value={this.state.role} onChange={(e) => this.setState({role: e.target.value})}
                                    />
                                </FormGroup> */}
                                <FormGroup check>
                                    <Label check className='login-checkbox'>
                                        <Input
                                        type='checkbox'
                                        />
                                        Remember me
                                    </Label>
                                </FormGroup>
                                <Button onClick={this.handleRegister} className='btn btn-login' >Sign Up</Button>
                                <Button onClick={this.goToLogin} outline className='btn btn-signup'>Login</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = {register}

export default connect(mapStateToProps,mapDispatchToProps)(Register);

// export default Register;