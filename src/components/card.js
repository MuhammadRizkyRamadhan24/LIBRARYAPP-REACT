import React, { Component } from 'react';
import { Card, CardText, CardBody, Col } from 'reactstrap';
import style from '../styles/Home.module.css';
import { Link } from 'react-router-dom';


export default class card extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                <Col md="3" sm="4" xs="6">
                <Card className={style.sizeCard}>
                        <div className={style.imgWrapper}>
                                <img src={`http://localhost:3000/static/images/${this.props.data.bookImage}`}/>
                        </div> 
                        <CardBody className={style.cardBody}>
                        <Link to={`/bookdetail/${this.props.data.id}`} className={style.cardTitle}>{this.props.data.title}</Link>
                        <CardText className={style.cardText}>Ketersediaan: {this.props.data.status}</CardText>
                    </CardBody>
                </Card>
                </Col>
            </div>
        )
    }
}
