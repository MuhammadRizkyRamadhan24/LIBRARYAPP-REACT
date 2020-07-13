import React, { Component } from 'react';
import { Col, Container ,Button, Form, FormGroup, Label, Input, Row, Jumbotron } from 'reactstrap';
import Popup from "reactjs-popup";
import Swal from 'sweetalert2';
import style from '../styles/bookdetail.module.css';
import Skeleton from 'react-loading-skeleton';
import Back from '../assets/back.png';

import { connect } from 'react-redux';
import { editBook } from '../redux/actions/books';
import { getAllGenre } from '../redux/actions/getGenre';
import { getAllAuthor } from '../redux/actions/getAuthor';
import { borrowBook } from '../redux/actions/borrowBook';
import { getBookById } from '../redux/actions/books';
import { deleteDataById } from '../redux/actions/books';


class BookDetail extends Component{
    constructor(props) {
        super(props)
        this.state = {
            books:[],
            title:'',
            description:'',
            bookImage:'',
            username:'',
            author : '',
            genre : '',
            authors : [],
            genres : [],
            isLoading: true,
            isLoadingContent: true
        }
        console.log(this.props.match.params.id);
        this.goBack = this.goBack.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    putData = (event) => {
        event.preventDefault();
        console.log(this.state);
        const formData = new FormData();
        const token = this.props.auth.data.token
        const id = this.props.match.params.id;
        const status = 'ada';
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('bookImage', this.state.bookImage[0]);
        formData.append('id_author', this.state.author);
        formData.append('id_genre', this.state.genre);
        formData.append('status', status);
        this.props.editBook(token, formData, id).then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Edit book success',
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
                text: 'Edit Book Error',
                confirmButtonColor: '#000000',
            })
          })


        // axios({
        //     method: 'PUT',
        //     url: `http://localhost:3000/books/${id}`,
        //     data: formData,
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //       Authorization: token
        //     }
        // })
        // .then((response)=>{
            
        //     let data = response.data.data[0];
        //     console.log(response)
        //     console.log(data)
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'Book has been update',
        //         showConfirmButton: false,
        //         timer: 1500
        //       })
        //       .then(()=>{
        //           window.location.reload();
        //       })
        // })
        // .catch((error)=>{
        //     console.log(error);
        //     console.log(error);
        //     Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Update Book Error',
        //     confirmButtonColor: '#000000',
        // })
        // })
      }
    
      getAuthor = () => {
        // const token = localStorage.getItem('token')
        const token = this.props.auth.data.token;
        this.props.getAllAuthor(token).then(() => {
            this.setState({
                authors: this.props.getAuthor.data
            })
            console.log(this.state.authors);
        })
        //   axios({
        //     method : "GET",
        //     url : 'http://localhost:3000/authors',
        //     headers : {
        //       Authorization : token
        //     }
        //   })
        //   .then((res) => {
        //     this.setState({
        //       authors : res.data.data
        //     })
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //   })
       }
       
       getGenre = () => {
        const token = this.props.auth.data.token;
        this.props.getAllGenre(token).then(() => {
            this.setState({
                genres: this.props.getGenre.data
            })
            console.log(this.state.genres);
        })
        // axios({
        //   method : "GET",
        //   url : 'http://localhost:3000/genres',
        //   headers : {
        //     Authorization : token
        //   }
        // })
        // .then((res) => {
        //   this.setState({
        //     genres : res.data.data
        //   })
        // })
        // .catch((err) => {
        //   console.log(err)
        // })
       }

    borrowBook = () => {
        const title = this.state.books[0].title
        // console.log(title);
        const token = this.props.auth.data.token
        const username = this.props.auth.data.username
        console.log(this.state.books[0].title,['data'])
        const data = {
            title: title,
            username: username
        }
        this.props.borrowBook(token, data).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Book borrow success',
                showConfirmButton: false,
                timer: 1500
            })
              .then(()=>{
                  window.location.reload();
                })
        });

        // axios({
        //     method: 'POST',
        //     url: `http://localhost:3000/books/borrow`,
        //     data: {
        //         title: this.state.title,
        //         username: username,
        //     },
        //     headers: {
        //       Authorization: token
        //     }
        // })
        // .then((response)=>{
        //     console.log(response);
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'Book borrow success',
        //         showConfirmButton: false,
        //         timer: 1500
        //     })
        //       .then(()=>{
        //           window.location.reload();
        //         })
        // })
        // .catch((error)=>{
        //     console.log(error);
        //     Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Borrow Book Error',
        //     confirmButtonColor: '#000000',
        //     })
        // })
    }

    getBookById = () => {
        // const token = localStorage.getItem('token');
        const token = this.props.auth.data.token;
        const id = this.props.match.params.id;
        this.props.getBookById(token, id)
        .then(() => {
            this.setState({
                isLoadingContent: this.props.book.isLoading,
                books: this.props.book.data
            })
        })
        // axios({
        //     method: 'GET',
        //     url:`http://localhost:3000/books/${id}`,
        //     headers: {
        //         Authorization: token
        //     }
        // })
        // .then((response)=>{
        //     console.log(response);
        //     this.setState({
        //         books: response.data.data,
        //         isLoading: false
        //     });

        //     console.log(this.state.books)
        // })
        // .catch((error)=>{
        //     console.log(error);
        // })
    }

    deleteData = () =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
               const token = this.props.auth.data.token;
               const id = this.props.match.params.id;
               this.props.deleteDataById(token, id)
              .then((res)=>{
                Swal.fire(
                    'Deleted!',
                    `The Book deleted.`,
                    'success'
                )
                this.props.history.push('/')
              }).catch((err)=> {
                  console.log(err)
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong'
                  })
              })
            }
          })
    }

    goBack(){
        this.props.history.goBack();
    }

    componentDidMount(){
        this.getBookById();
        this.getAuthor();
        this.getGenre();
    }

    render(){
        return(
            <>
            {this.state.isLoadingContent ? <Skeleton /> : 
                    <Container fluid>
                    <Row style={{height: '65vh'}}>
                        <Col className={style.headline}>
                            <div className={style.buttonadmin}>
                                    <img src={Back} onClick={this.goBack} className={style.buttonBack}/>
                                    {this.props.auth.data.role === 0 ? '' : <Popup modal trigger={<Button className={style.button}>Edit</Button>}>
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
                                                    <FormGroup className={style.author}>
                                                    <Label>Author</Label>
                                                    <Input type="select" name="author" value={this.state.author} onChange={(e) => this.setState({author : e.target.value})} >
                                                        <option value="0">Pilih Author</option>
                                                        {this.props.getAuthor.data.map((author) => {
                                                            return <option key={author.id_author} value={author.id_author}>{author.author}</option>
                                                        })}
                                                    </Input>
                                                    </FormGroup>
                                                    <FormGroup className={style.genre}>
                                                    <Label>Genre</Label>
                                                    <Input type="select" name="genre" value={this.state.author} onChange={(e) => this.setState({genre : e.target.value})} >
                                                        <option value="0">Pilih Genre</option>
                                                        {this.props.getGenre.data.map((value) => {
                                                            return <option key={value.id_genre} value={value.id_genre}>{value.genre}</option>
                                                        })}
                                                    </Input>
                                                    </FormGroup>
                                                    <FormGroup style={{
                                                        position: 'relative',
                                                        top: '-90px'
                                                    }}>
                                                        <Label className={style.titlelable}>Photo Book</Label>
                                                        <Input name='bookImage' onChange={(e) => this.setState({bookImage :e.target.files})} type="file"/>
                                                    </FormGroup>
                                                    <Button onClick={this.putData} className={style.submit}>Save</Button>
                                                </Form>
                                            </div>
                                        </div>
                                    </Popup>}
                                    
                                    {this.props.auth.data.role === 0 ? '' : <Button onClick={this.deleteData} className={style.button}>Delete</Button>}
                                    
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
                            <Button onClick={this.borrowBook} className={style.button}>Borrow</Button>
                            </Row>
                        </Col>
                    </Row>
                </Container>
        }
            </>
        )
    }
}

const mapStateToProps = state =>({
    auth: state.auth,
    getGenre: state.getGenre,
    getAuthor: state.getAuthor,
    borrow: state.borrow,
    book: state.book
});

const mapDispatchToProps = { editBook, getAllGenre , getAllAuthor, borrowBook, getBookById, deleteDataById };

export default connect(mapStateToProps,mapDispatchToProps)(BookDetail);