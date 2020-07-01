import React, { Component , useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Side';
import { Container, Row, Col, Card, CardText, CardBody} from 'reactstrap';
import { Link } from 'react-router-dom'
import axios from 'axios';
import style from '../styles/Home.module.css';
import Style from '../styles/Search.module.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton';

class Search extends Component{
    constructor(props) {
        super(props)
        this.state ={
            books: [],
            isLoading: true,
        }
        console.log(this.props)
    }

    getSearchBooks = () => {
        const token = localStorage.getItem('token');
        const query =(this.props.location.search);
        axios({
            method: 'GET',
            url: `http://localhost:3000/books/search${query}&order=&sort=&limit=&page=`,
            headers: {
                Authorization: token
            }
        })
        .then((response)=>{
            this.setState({
                books: response.data.data,
                isLoading: false
            });

            console.log(this.state.books);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    getDataLogin = () =>{
        return localStorage.getItem('username');
    }

    componentDidMount(){
        this.getSearchBooks();
    }

    componentDidUpdate(prevProps){
        if(prevProps.location.search !== this.props.location.search){
            this.getSearchBooks();    
        }
    }

    render () {
        return (
            <div>
                <Container fluid>
                    <Row className={style.homeWrapper}>
                        <Col md='12' style={{padding: '0px 0px'}}>
                            <Row className={style.header}>
                                <Sidebar username={this.getDataLogin()} />
                                <Col style={{padding: '0px 0px'}}>
                                <Navbar history={this.props.history} />
                                </Col>
                            </Row>
                            {this.state.isLoading ? 
                            <Row className={Style.content}><Skeleton/></Row>
                             : <Row className={Style.content}>
                                    {this.state.books.map((value)=>{
                                        return (
                                        <Col md="3" sm="4" xs="6">
                                        <Card key={value.id} className={style.sizeCard}>
                                            <div className={style.imgWrapper}>
                                                <img src={`http://localhost:3000/static/images/${value.bookImage}`}/>
                                            </div> 
                                            <CardBody className={style.cardBody}>
                                                <Link to={`/bookdetail/${value.id}`} className={style.cardTitle}>{value.title}</Link>
                                                <CardText className={style.cardText}>Ketersediaan: {value.status}</CardText>
                                            </CardBody>
                                        </Card>
                                        </Col>
                                        )
                                    })}
                            </Row>}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Search