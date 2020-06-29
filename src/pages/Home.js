import React, { Component , useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Side';
import Product from '../components/Product';
import { Container, Row, Col, Card, CardText, CardBody, CardLink } from 'reactstrap';
import axios from 'axios';
import style from '../styles/Home.module.css'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookCover from '../assets/bookCover.png';

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
        }
        this.getAllBooks = this.getAllBooks.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    async getAllBooks(){
        const token = localStorage.getItem('token')
        await axios({
            method: 'GET',
            url: 'http://localhost:3000/books',
            headers: {
                Authorization: token
            }
        })
        .then((response)=>{
            console.log(response);
            this.setState({
                books: response.data.data
            });

            console.log(this.state.books[0].title)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    

    goToAbout= () => {
        this.props.history.push('/about')
    }

    componentDidMount(){
        this.getAllBooks();
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
                                <Sidebar />
                                <Col style={{padding: '0px 0px'}}>
                                <Navbar />
                                </Col>
                            </Row>
                            <Row className={style.slick}>
                                <Col className={style.content}>
                                    <Col className={style.slider}>
                                        <Slider {...settings}>
                                            {/* <div></div> */}
                                            {this.state.books.map((value, key) => {
                                                return(
                                                    <>
                                                        <div>
                                                            <p>{value.title}</p>
                                                            <img src={BookCover}/>
                                                        </div>
                                                    </>
                                                )
                                            })}
                                            {/* <div>
                                                <img src={BookCover}/>
                                            </div>
                                            <div>
                                                <img src={BookCover}/>
                                            </div>
                                            <div>
                                                <img src={BookCover}/>
                                            </div> */}
                                        </Slider>
                                    </Col>
                                    
                                </Col>
                            </Row>
                            
                            <Row className={style.wrapper}>
                                <Col className={style.cards}>
                                        <Slider {...settingsCard}>
                                            <Card className={style.sizeCard}>
                                                <div className={style.imgWrapper}>
                                                    <img src={BookCover}/>
                                                </div>
                                                <CardBody className={style.cardBody}>
                                                <CardLink href="#" className={style.cardTitle}>{this.state.books[0].title}</CardLink>
                                                    <CardText className={style.cardText}>Some quick example text to build on the...</CardText>
                                                </CardBody>
                                            </Card>
                                                
                                            <Card className={style.sizeCard}>
                                                <div className={style.imgWrapper}>
                                                </div>
                                                <CardBody className={style.cardBody}>
                                                    <CardLink href="#" className={style.cardTitle}>Card title</CardLink>
                                                    <CardText className={style.cardText}>Some quick example text to build on the...</CardText>
                                                </CardBody>
                                            </Card>
                                            
                                            <Card className={style.sizeCard}>
                                                <div className={style.imgWrapper}>
                                                </div>
                                                <CardBody className={style.cardBody}>
                                                    <CardLink href="#" className={style.cardTitle}>Card title</CardLink>
                                                    <CardText className={style.cardText}>Some quick example text to build on the...</CardText>
                                                </CardBody>
                                            </Card>
                                            

                                            <Card className={style.sizeCard}>
                                                <div className={style.imgWrapper}>
                                                </div>
                                                <CardBody className={style.cardBody}>
                                                    <CardLink href="#" className={style.cardTitle}>Card title</CardLink>
                                                    <CardText className={style.cardText}>Some quick example text to build on the...</CardText>
                                                </CardBody>
                                            </Card>                     
                                    </Slider>

                                    {/* <form onSubmit={this.handleLogin}>
                                        <div>
                                            <label>username</label>
                                            <input type='text' value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}></input>
                                            <label>password</label>
                                            <input type='text' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}></input>
                                            <input type='submit' value='login'></input>
                                        </div>
                                    </form>
                                    <ul>
                                        {this.state.books.map((data, index) => {
                                            return (
                                            <Product key={index} data={data} history={this.props.history}/>
                                            )
                                        })}
                                    </ul>
                                    <button onClick={this.goToAbout}>Click me</button>
                                    <Footer /> */}

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