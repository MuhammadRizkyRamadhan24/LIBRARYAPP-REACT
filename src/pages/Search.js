import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Side';
import Cards from '../components/card';
import { Button, Container, Row, Col, Form, Input} from 'reactstrap';
import style from '../styles/Home.module.css';
import Style from '../styles/Search.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton';
import QueryString from "query-string";

import { connect } from 'react-redux';
import { getSearch } from '../redux/actions/books';

class Search extends Component{
    constructor(props) {
        super(props)
        this.state ={
            books: [],
            isLoading: true,
            isLoadingCard: true,
            page:'',
            order:'',
            sort:'',
        }
    }

    getSearchBooks = () => {
        const qs = QueryString.parse(this.props.location.search);
        const search = qs.search || ""
        const limit = qs.limit || "3"
        const page = qs.page || ""
        const order = qs.order || "added_at"
        const sort = qs.sort || "ASC"
        const token = this.props.auth.data.token;
        this.props.getSearch(token, search, order, sort, limit, page)
        .then(()=>{
            this.setState({
                isLoadingCard: this.props.book.isLoading,
                books: this.props.book.data
            })
        });
    }

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
    }

    sort = (e) =>{
        let qs = QueryString.parse(this.props.location.search)
        if(qs.sort){
            const url = this.props.location.search.replace(`sort=${qs.sort}`, `sort=${this.state.sort}`)
            this.props.history.push(url);
        } else {
            this.props.history.push(`${this.props.location.search}&sort=${this.state.sort}`)
        }
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
        let qs = QueryString.parse(this.props.location.search)
        qs.page = qs.page ||  1
        let disableButton = qs.page == 1 ? true : false
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
                            <Row className={style.sortWrapper}>
                                <Form onSubmit={this.sortOrder}>
                                    <Input type='select' onChange={(e) => this.setState({order: e.target.value})} value={this.state.order}>
                                        <option >Order</option>
                                        <option value="title">Judul</option>
                                        <option value="description">Deskripsi</option>
                                        <option value="genre">Genre</option>
                                        <option value="author">Penulis</option>
                                        <option value="added_at">Ditambakan</option>
                                    </Input>
                                    <Button color="warning" /*onClick={()=> this.props.history.push(`${this.props.location.search}&order=${this.state.order}&sort=${this.state.sort}`)}*/ onClick={this.sortOrder}>Urutkan</Button>
                                </Form>
                                <Form onSubmit={this.sort}>
                                    <Input type='select' onChange={(e) => this.setState({sort: e.target.value})} value={this.state.sort}>
                                        <option >Sort</option>
                                        <option value="asc">A - Z</option>
                                        <option value="desc">Z - A</option>
                                    </Input>
                                    <Button color="warning" /*onClick={()=> this.props.history.push(`${this.props.location.search}&order=${this.state.order}&sort=${this.state.sort}`)}*/ onClick={this.sort}>Urutkan</Button>
                                </Form>
                            </Row>
                            {this.state.isLoadingCard ? 
                            <Row className={Style.content}><Skeleton/></Row>
                             : <Row className={Style.content}>
                                    {this.state.books.map((value)=>{
                                        return (
                                        <div key={value.id}>
                                            <Cards data={value} />
                                        </div>
                                        )
                                    })}
                            </Row>}
                            <Row>
                                <Col md={12}>
                                    <Button className={style.buttonPrev} color="warning" disabled={disableButton} onClick={this.prevPage}>Prev</Button>
                                    <Button className={style.buttonNext} color="warning" onClick={this.nextPage}> Next</Button>
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

const mapDispatchToProps = { getSearch };

export default connect(mapStateToProps,mapDispatchToProps)(Search);