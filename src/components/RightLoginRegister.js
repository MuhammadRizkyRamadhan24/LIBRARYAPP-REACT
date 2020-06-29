import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../styles/coba.css';
import imageBackground from '../assets/backgroundImage.png';
import logo from '../assets/logo.png';


class RightLoginRegister extends Component{
    constructor(props) {
        super(props)
        this.state = {
            title : this.props.title,
            paragraph : this.props.paragraph
        }
        console.log(this.props);
    }
    render () {
        return (
            <>
                <img className='logo' src={logo} />
                <h2>{this.state.title}</h2>
                <p>{this.state.paragraph}</p>
            </>
        )
    }
}

export default RightLoginRegister;