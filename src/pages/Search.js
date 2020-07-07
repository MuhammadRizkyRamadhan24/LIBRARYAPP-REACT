import React, { Component , useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Side';
import { Button, Container, Row, Col, Card, CardText, CardBody, Form, Input} from 'reactstrap';
import { Link } from 'react-router-dom'
import axios from 'axios';
import style from '../styles/Home.module.css';
import Style from '../styles/Search.module.css'
import Swal from 'sweetalert2';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton';
import QueryString from "query-string"

class Search extends Component{
    constructor(props) {
        super(props)
        this.state ={
            books: [],
            isLoading: true,
            page:'',
            order:'',
            sort:'',
        }
        // console.log(this.state);
    }

    getSearchBooks = () => {
        let qs = QueryString.parse(this.props.location.search);
        console.log(qs,['sdj  sd']);
        let search = qs.search || ""
        let limit = qs.limit || "20"
        let page = qs.page || ""
        let order = qs.order || "added_at"
        let sort = qs.sort || "ASC"
        const token = localStorage.getItem('token');
        // const query = this.props.location.search;
        // console.log(query);
        axios({
            method: 'GET',
            url: `http://localhost:3000/books/search?search=${search}&order=${order}&sort=${sort}&limit=${limit}&page=${page}`,
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
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Buku tidak ada!',
                confirmButtonColor: '#000000',
            })
            // .then(()=>{
            //     this.props.history.push('/');
            // })
        })
    }

    getDataLogin = () =>{
        return localStorage.getItem('username');
    }

    // pagination = (e) =>{
    //     this.setState({page: e.target.id}, () => {
    //             this.props.history.push(`${this.props.location.search}&page=${this.state.page}`)
    //     });
    // }

    nextPage = (e) =>{
        let qs = QueryString.parse(this.props.location.search) 
        if(qs.page){
            const url = this.props.location.search.replace(`page=${qs.page}`, `page=${parseInt(qs.page)+1}`)
            this.props.history.push(url);
        } else {
            qs.page = qs.page ||  1
            const page = parseInt(qs.page)
            this.props.history.push(`${this.props.location.search}&page=${parseInt(page)+1}`)
        }
        
    }

    prevPage = (e) =>{
        let qs = QueryString.parse(this.props.location.search) 
        if(qs.page){
            const url = this.props.location.search.replace(`page=${qs.page}`, `page=${parseInt(qs.page)-1}`)
            this.props.history.push(url);
        } else {
            qs.page = qs.page ||  1
            const page = parseInt(qs.page)
            this.props.history.push(`${this.props.location.search}&page=${parseInt(page)-1}`)
        }
        
    }

    sortOrder = (e) =>{
        let qs = QueryString.parse(this.props.location.search)
        if(qs.order){
            const url = this.props.location.search.replace(`order=${qs.order}`, `order=${this.state.order}`)
            this.props.history.push(url);
        } else {
            this.props.history.push(`${this.props.location.search}&order=${this.state.order}`)
        }
        // this.props.history.push(`${this.props.location.search}&order=${this.state.order}&sort=${this.state.sort}`)
        // const url = this.props.location.search.replace()
    }

    sort = (e) =>{
        let qs = QueryString.parse(this.props.location.search)
        if(qs.sort){
            const url = this.props.location.search.replace(`sort=${qs.sort}`, `sort=${this.state.sort}`)
            this.props.history.push(url);
        } else {
            this.props.history.push(`${this.props.location.search}&sort=${this.state.sort}`)
        }
        // this.props.history.push(`${this.props.location.search}&order=${this.state.order}&sort=${this.state.sort}`)
        // const url = this.props.location.search.replace()
    }

    // prevPage = (e) =>{
    //     let qs = QueryString.parse(this.props.location.search)
    //     qs.page = qs.page ||  1
    //     this.props.history.push(`${this.props.location.search}&page=${qs.page-1}`)
    // }



    componentDidMount(){
        this.getSearchBooks();
    }

    componentDidUpdate(prevProps){
        if(prevProps.location.search !== this.props.location.search){
            this.getSearchBooks();
        }
    }

    render () {
        let qs = QueryString.parse(this.props.location.search)
        qs.page = qs.page ||  1
        let disableButton = qs.page == 1 ? true : false
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
                            <Row className={style.sortWrapper}>
                                <Form onSubmit={this.sortOrder}>
                                    <Input type='select' onChange={(e) => this.setState({order: e.target.value})} value={this.state.order}>
                                        <option value="">Urutkan</option>
                                        <option value="title">Judul</option>
                                        <option value="description">Deskripsi</option>
                                        <option value="genre">Genre</option>
                                        <option value="author">Penulis</option>
                                        <option value="added_at">Ditambahan</option>
                                    </Input>
                                    {/* <Input type='select' onChange={(e) => this.setState({sort: e.target.value})} value={this.state.sort}>
                                        <option value="">Sort</option>
                                        <option value="asc">ASC</option>
                                        <option value="desc">DESC</option>
                                    </Input> */}
                                    <Button color="warning" /*onClick={()=> this.props.history.push(`${this.props.location.search}&order=${this.state.order}&sort=${this.state.sort}`)}*/ onClick={this.sortOrder}>Urutkan</Button>
                                </Form>
                                <Form onSubmit={this.sort}>
                                    <Input type='select' onChange={(e) => this.setState({sort: e.target.value})} value={this.state.sort}>
                                        <option value="">Sort</option>
                                        <option value="asc">ASC</option>
                                        <option value="desc">DESC</option>
                                    </Input>
                                    <Button color="warning" /*onClick={()=> this.props.history.push(`${this.props.location.search}&order=${this.state.order}&sort=${this.state.sort}`)}*/ onClick={this.sort}>Urutkan</Button>
                                </Form>
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
                            <Row>
                                <Col md={12}>
                                <Button color="warning" disabled={disableButton} className="mr-auto" onClick={this.prevPage}>Prev</Button>{"  "}
                                <Button color="warning" className="ml-auto" onClick={this.nextPage}> Next</Button>
                                </Col> 
                            </Row>
                            {/* <Row className={Style.pagination}>
                                <Pagination aria-label="Page navigation example">
                                    <PaginationItem>
                                        <PaginationLink id='1' value={this.state.page} onClick={this.pagination}>
                                        1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink id='2' value={this.state.page} onClick={this.pagination}>
                                        2
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink value={3}>
                                        3
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink value={4}>
                                        4
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink value={5}>
                                        5
                                        </PaginationLink>
                                    </PaginationItem>
                                </Pagination>
                            </Row> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Search