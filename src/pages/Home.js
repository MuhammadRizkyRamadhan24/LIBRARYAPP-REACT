import React, { Component , useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Side';
import { Container, Row, Col, Card, CardText, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom'
import axios from 'axios';
import style from '../styles/Home.module.css'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black",borderRadius : "600px" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black", borderRadius : "600px" }}
        onClick={onClick}
      />
    );
  }
  

class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            books:[],
            isLoading: true,
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        console.log(props);
    }

    getAllBooks = () => {
        const token = localStorage.getItem('token')
        axios({
            method: 'GET',
            url: 'http://localhost:3000/books',
            headers: {
                Authorization: token
            }
        })
        .then((response)=>{
            // console.log(response);
            this.setState({
                books: response.data.data,
                isLoading: false
            });

            // console.log(this.state.books);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    getDataLogin = () =>{
        return localStorage.getItem('username');
    }
    

    goToLogin = () =>{
        document.location.href='/login';
    }

    componentDidMount(){
        if (localStorage.getItem('token') === null){
            return this.goToLogin();
        } else {
            this.getAllBooks();
            this.getDataLogin();
        }
    }


    render () {
        const settings = {
            className: "center",
            dots: true,
            centerMode: true,
			infinite: true,
            speed: 1000,
            slidesToShow: 1,
            centerPadding: "350px",
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
        };
        
        const settingsCard = {
			dots: false,
			infinite: true,
			speed: 1000,
			slidesToShow: 3,
            slidesToScroll: 1,
            nextArrow: false,
            prevArrow: false,
		};
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
                            <Row className={style.slick}>
                                <Col className={style.content}>
                                    <Col className={style.slider}>
                                        <Slider {...settings}>
                                            {this.state.books.map((value) => {
                                                return(
                                                        <div key={value.id}>
                                                            <Link className={style.p} to={`/bookdetail/${value.id}`}>{value.title}</Link>
                                                            <img src={`http://localhost:3000/static/images/${value.bookImage}`}/>
                                                        </div>
                                                )
                                            })}
                                        </Slider>
                                    </Col>
                                    
                                </Col>
                            </Row>
                            
                            <Row className={style.wrapper}>
                                <Col className={style.cards}>
                                    {this.state.isLoading ? <Skeleton /> :
                                    <Slider {...settingsCard}>
                                    <Card className={style.sizeCard}>
                                        <div className={style.imgWrapper}>
                                            <img src={`http://localhost:3000/static/images/${this.state.books[0].bookImage}`}/>
                                        </div> 
                                        <CardBody className={style.cardBody}>
                                            <Link to={`/bookdetail/${this.state.books[0].id}`} className={style.cardTitle}>{this.state.books[0].title}</Link>
                                            <CardText className={style.cardText}>Ketersediaan: {this.state.books[0].status}</CardText>
                                        </CardBody>
                                    </Card>
                                        
                                    <Card className={style.sizeCard}>
                                        <div className={style.imgWrapper}>
                                            <img src={`http://localhost:3000/static/images/${this.state.books[1].bookImage}`}/>
                                        </div>
                                        <CardBody className={style.cardBody}>
                                            <Link to={`/bookdetail/${this.state.books[1].id}`} className={style.cardTitle}>{this.state.books[1].title}</Link>
                                            <CardText className={style.cardText}>Ketersediaan: {this.state.books[1].status}</CardText>
                                        </CardBody>
                                    </Card>
                                    
                                    <Card className={style.sizeCard}>
                                        <div className={style.imgWrapper}>
                                            <img src={`http://localhost:3000/static/images/${this.state.books[2].bookImage}`}/>
                                        </div>
                                        <CardBody className={style.cardBody}>
                                            <Link to={`/bookdetail/${this.state.books[2].id}`} className={style.cardTitle}>{this.state.books[2].title}</Link>
                                            <CardText className={style.cardText}>Ketersediaan: {this.state.books[2].status}</CardText>
                                        </CardBody>
                                    </Card>
                                    

                                    <Card className={style.sizeCard}>
                                        <div className={style.imgWrapper}>
                                            <img src={`http://localhost:3000/static/images/${this.state.books[0].bookImage}`}/>
                                        </div>
                                        <CardBody className={style.cardBody}>
                                            <Link to={`/bookdetail/${this.state.books[3].id}`} className={style.cardTitle}>{this.state.books[3].title}</Link>
                                            <CardText className={style.cardText}>Ketersediaan: {this.state.books[3].status}</CardText>
                                        </CardBody>
                                    </Card>

                                    <Card className={style.sizeCard}>
                                        <div className={style.imgWrapper}>
                                            <img src={`http://localhost:3000/static/images/${this.state.books[4].bookImage}`}/>
                                        </div>
                                        <CardBody className={style.cardBody}>
                                            <Link to={`/bookdetail/${this.state.books[4].id}`} className={style.cardTitle}>{this.state.books[4].title}</Link>
                                            <CardText className={style.cardText}>Ketersediaan: {this.state.books[4].status}</CardText>
                                        </CardBody>
                                    </Card>

                                    <Card className={style.sizeCard}>
                                        <div className={style.imgWrapper}>
                                            <img src={`http://localhost:3000/static/images/${this.state.books[5].bookImage}`}/>
                                        </div>
                                        <CardBody className={style.cardBody}>
                                            <Link to={`/bookdetail/${this.state.books[5].id}`} className={style.cardTitle}>{this.state.books[5].title}</Link>
                                            <CardText className={style.cardText}>Ketersediaan: {this.state.books[5].status}</CardText>
                                        </CardBody>
                                    </Card>                     
                                </Slider> 
                                }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home