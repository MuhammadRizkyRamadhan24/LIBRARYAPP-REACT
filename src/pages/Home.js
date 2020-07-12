import React, { Component , useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Side';
import Cards from '../components/card';
import Carousel from '../components/carousel';
import { Container, Row, Col, Card, CardText, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import style from '../styles/Home.module.css'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton';

import { connect } from 'react-redux';
import { getAllBook } from '../redux/actions/books';

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
            isLoadingSlider : true,
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        console.log(props);
    }

    getAllBooks = () => {
        const token = this.props.auth.data.token
        console.log(this.props.auth,'auth')
        this.props.getAllBook(token)
        .then(()=>{
            this.setState({
                isLoadingSlider: this.props.book.isLoading,
                books : this.props.book.data
            })
            console.log(this.props.book.data)
        });
    }

    goToLogin = () =>{
        document.location.href='/login';
    }

    componentDidMount(){
        if (this.props.auth.data.token === null){
            return this.goToLogin();
        } else {
            this.getAllBooks();
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
                                <Sidebar username={this.props.auth.data.username} />
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
                                                        <Carousel data={value}/>
                                                    </div>
                                                )
                                            })}
                                        </Slider>
                                    </Col>
                                    
                                </Col>
                            </Row>
                            
                            <Row className={style.wrapper}>
                                <Col className={style.cards}>
                                    {this.state.isLoadingSlider ? <Skeleton/> :
                                    <Slider {...settingsCard}>
                                        <Cards data={this.state.books[0]}/>
                                        <Cards data={this.state.books[1]}/>
                                        <Cards data={this.state.books[2]}/>
                                        <Cards data={this.state.books[3]}/>
                                        <Cards data={this.state.books[4]}/>
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

const mapStateToProps = state =>({
    auth: state.auth,
    book: state.book
});

const mapDispatchToProps = { getAllBook };

export default connect(mapStateToProps,mapDispatchToProps)(Home);