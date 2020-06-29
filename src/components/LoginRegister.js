import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import styles from '../styles/LoginRegister.module.css';
import imageBackground from '../assets/backgroundImage.png';
import logo from '../assets/logo.png';


class LoginRegister extends Component{
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
                <p className={styles.login}>{this.state.title}</p>
                <p className={styles.login2}>{this.state.paragraph}</p>
                <img className={styles.image} src={imageBackground} />
                <img className={styles.logo} src={logo} />
                <p className={styles.pbook}>Book is a window to the world</p>
                <p className={styles.punplash}>Photo by Mark Pan4ratte on Unsplash</p>
            </>
        )
    }
}

export default LoginRegister;