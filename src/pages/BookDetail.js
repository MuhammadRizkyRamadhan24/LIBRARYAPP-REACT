import React, { Component } from 'react';
import { Col, Container ,Button, Form, FormGroup, Label, Input, Row, Jumbotron } from 'reactstrap';
import Popup from "reactjs-popup";
import axios from 'axios';
import Swal from 'sweetalert2';
import style from '../styles/bookdetail.module.css';
import ClipLoader from "react-spinners/ClipLoader";
import Skeleton from 'react-loading-skeleton';
import Back from '../assets/back.png'


class BookDetail extends Component{
    constructor(props) {
        super(props)
        this.state = {
            books:[],
            title:'',
            description:'',
            bookImage:'',
            username:'',
            isLoading: true,
        }
        console.log(this.props.match.params.id);
        this.goBack = this.goBack.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    putData = (event) => {
        event.preventDefault();
        console.log(this.state);
        const formData = new FormData();
        const token = localStorage.getItem('token');
        const id = this.props.match.params.id;
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('bookImage', this.state.bookImage[0]);
        console.log(this.state);
        axios({
            method: 'PUT',
            url: `http://localhost:3000/books/${id}`,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: token
            }
        })
        .then((response)=>{
            
            let data = response.data.data[0];
            console.log(response)
            console.log(data)
            Swal.fire({
                icon: 'success',
                title: 'Book has been update',
                showConfirmButton: false,
                timer: 1500
              })
              .then(()=>{
                  window.location.reload();
              })
        })
        .catch((error)=>{
            console.log(error);
            console.log(error);
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Update Book Error',
            confirmButtonColor: '#000000',
        })
        })
      }
    
    borrowBook = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        console.log(this.state);
        axios({
            method: 'POST',
            url: `http://localhost:3000/books/borrow`,
            data: {
                title: this.state.title,
                username: this.state.username,
            },
            headers: {
              Authorization: token
            }
        })
        .then((response)=>{
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Book borrow success',
                showConfirmButton: false,
                timer: 1500
            })
              .then(()=>{
                  window.location.reload();
                })
        })
        .catch((error)=>{
            console.log(error);
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Borrow Book Error',
            confirmButtonColor: '#000000',
            })
        })
    }

    getBookById = () => {
        const token = localStorage.getItem('token');
        const id = this.props.match.params.id;
        axios({
            method: 'GET',
            url:`http://localhost:3000/books/${id}`,
            headers: {
                Authorization: token
            }
        })
        .then((response)=>{
            console.log(response);
            this.setState({
                books: response.data.data,
                isLoading: false
            });

            console.log(this.state.books)
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    deleteData = () =>{
        const token = localStorage.getItem('token');
        const id = this.props.match.params.id;
        axios({
            method: 'DELETE',
            url:`http://localhost:3000/books/${id}`,
            headers: {
                Authorization: token
            }
        })
        .then((response)=>{
            console.log(response)
            Swal.fire({
                icon: 'success',
                title: 'Book has been delete',
                showConfirmButton: false,
                timer: 1500
              })
              .then(()=>{
                document.location.href='/'
            })
        })
        .catch((error)=>{
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Delete Book Error',
                confirmButtonColor: '#000000',
            })
        })
    }

    goBack(){
        this.props.history.goBack();
    }

    componentDidMount(){
        this.getBookById();
    }

    render(){
        return(
            <>
            {this.state.isLoading ? <Skeleton /> : 
                    <Container fluid>
                    <Row style={{height: '65vh'}}>
                        <Col className={style.headline}>
                            <div className={style.buttonadmin}>
                                    <img src={Back} onClick={this.goBack} className={style.buttonBack}/>
                                    <Popup modal trigger={<Button className={style.button}>Edit</Button>}>
                                        <div className={style.modal}>
                                            <div className={style.headeredit}>Edit Data</div>
                                            <div className={style.contentedit}>
                                                <Form onSubmit={this.putData}>
                                                    <FormGroup>
                                                        <Label className={style.titlelable}>Title</Label>
                                                        <Input name='title' onChange={(e) => this.setState({title :e.target.value})} className={style.edittitle} type="text" placeholder="Title Book" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label className={style.titlelable}>Description</Label>
                                                        <Input name='description' onChange={(e) => this.setState({description :e.target.value})} className={style.editdescription} type="textarea" placeholder="Description Books" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label className={style.titlelable}>Photo Book</Label>
                                                        <Input name='bookImage' onChange={(e) => this.setState({bookImage :e.target.files})} type="file"/>
                                                    </FormGroup>
                                                    <Button onClick={this.putData} className={style.submit}>Save</Button>
                                                </Form>
                                            </div>
                                        </div>
                                    </Popup>
                                    <Button onClick={this.deleteData} className={style.button}>Delete</Button>
                            </div>
                            <Jumbotron fluid className={style.jumbotron} style={{height: 'inherit'}}>
                                <img src={`http://localhost:3000/static/images/${this.state.books[0].bookImage}`} className={style.cover}/>
                            </Jumbotron>
                        </Col>
                    </Row>
                    <Row style={{height: '35vh'}}>
                        <Col md='8' className={style.description}>
                            <Row>
                                <Col className={style.title}>
                                    <span>Novel</span>
                                    <h1>{this.state.books[0].title}</h1>
                                    <small>{this.state.books[0].added_at}</small>
                                </Col>
                                <Col className={style.status}>
                                    <p>{this.state.books[0].status}</p>
                                </Col>
                            </Row>
                            <Row style={{height: '35vh'}} >
                                <Col className={style.text}>
                                {this.state.books[0].description}
                                </Col>
                            </Row>
                        </Col>
                        <Col Col md='4' className={style.borrow}>
                            <Row>
                                <img src={`http://localhost:3000/static/images/${this.state.books[0].bookImage}`} className={style.image} />
                            </Row>
                            <Row className={style.buttonWrapper}>
                            <Popup modal trigger={<Button color="warning" className={style.button}>Borrow</Button>}>
                                        <div className={style.modal}>
                                            <div className={style.headeredit}>Borrow Book</div>
                                            <div className={style.contentedit}>
                                                <Form onSubmit={this.borrowBook}>
                                                    <FormGroup>
                                                        <Label className={style.titlelable}>Username</Label>
                                                        <Input onChange={(e) => this.setState({username : e.target.value})} name='username' className={style.edittitle} type="text" placeholder="Username" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label className={style.titlelable}>Title</Label>
                                                        <Input onChange={(e) => this.setState({title : e.target.value})} name='title' className={style.edittitle} type="text" placeholder="Title" />
                                                    </FormGroup>
                                                    <Button onClick={this.borrowBook} className={style.submit}>Borrow</Button>
                                                </Form>
                                            </div>
                                        </div>
                                    </Popup>
                            </Row>
                        </Col>
                    </Row>
                </Container>
        }
            </>
        )
    }
}

export default BookDetail;