import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/Side.css';
import style from '../styles/bookdetail.module.css';
import Popup from "reactjs-popup";
import Swal from 'sweetalert2';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import BurgerMenu from '../assets/icons8-menu-64.png';
import avatar from '../assets/avatar.png';

import { connect } from 'react-redux';
import { addBook } from '../redux/actions/books';
import { getAllGenre } from '../redux/actions/getGenre';
import { getAllAuthor } from '../redux/actions/getAuthor';
import { returnBook } from '../redux/actions/borrowBook';
import { logout } from '../redux/actions/logout';
import localStorage from 'redux-persist/es/storage';
import Skeleton from 'react-loading-skeleton';

function Profile(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [author, setAuthor] =useState('');
  const [genre, setGenre] =useState('');
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  const [authors, setAuthors] =useState('');

  const [genres, setGenres] =useState([]);

  const [active, setInactive] = useState(false);
  const toggleNavbar = () => {
    setInactive(!active);
  };

  const postData = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const token = props.auth.data.token
    console.log(props.auth)
    const status = 'ada';
    formData.append('title', title);
    formData.append('description', description);
    formData.append('bookImage', bookImage[0]);
    formData.append('id_author', author);
    formData.append('id_genre', genre);
    formData.append('status', status);
    props.addBook(token, formData).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Add book success',
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
          text: 'Add Book Error',
          confirmButtonColor: '#000000',
      })
    })
  }

  const returnBook = (event) => {
    event.preventDefault();
    const token = props.auth.data.token
    const Username = props.auth.data.username
    const data = {
      title: title,
      username: Username
  }
    props.returnBook(token, data).then(() =>{
      Swal.fire({
        icon: 'success',
        title: 'Book return success',
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
          text: 'Return Book Error',
          confirmButtonColor: '#000000',
      })
    })
  }

  const getDataAuthor = () => {
    const token = props.auth.data.token
    props.getAllAuthor(token).then(() => {
        setAuthors(props.getAuthor.data);
    })
   }
   
  const getDataGenre = () => {
    const token = props.auth.data.token
    props.getAllGenre(token).then(() => {
        setGenres(props.getGenre.data)
    })
   }

  const logout = () => {
    props.logout();
    props.history.push("/login");
  };

useEffect (()=>{
  getDataAuthor();
  getDataGenre();
},[])

  return(
    <>
    <div className={active ? 'sidebar-container active' : 'sidebar-container inactive'}>
      <div className='hamburger'>
          <div>
                <img src={BurgerMenu} className='icon' aria-hidden="true" onClick={toggleNavbar} style={{cursor: 'pointer'}}/>
          </div>
      </div>
      <div className={active ? 'content-link' : 'content-link content-none'}>
          <ul className='avatar'>
              <img src={avatar}/>
              <li>{props.username}</li>
          </ul>
          <ul className='navigator'>
            <Link className='li' to={'/history'}>History</Link>
            <Popup className={style.popup} modal trigger={<li>Return Book</li>}>
              <div className={style.modal}>
               <div className={style.headeredit}>Return Book</div>
                <div className={style.contentedit}>
                 <Form onSubmit={returnBook}>
                  <FormGroup>
                   <Label className={style.titlelable}>Title</Label>
                   <Input name='title' onChange={(e) => setTitle(e.target.value)} className={style.edittitle} type="text" placeholder="Title Book" />
                  </FormGroup>
                  <Button onClick={returnBook} className={style.submit}>Save</Button>
                   </Form>
                  </div>
              </div>
            </Popup>
            {props.auth.data.role === 0 ? '' : <Popup className={style.popup} modal trigger={<li>Add books</li>}>
              <div className={style.modal}>
               <div className={style.headeredit}>Add Data</div>
                <div className={style.contentedit}>
                 <Form onSubmit={postData}>
                  <FormGroup>
                   <Label className={style.titlelable}>Title</Label>
                   <Input name='title' onChange={(e) => setTitle(e.target.value)} className={style.edittitle} type="text" placeholder="Title Book" />
                  </FormGroup>
                  <FormGroup>
                   <Label className={style.titlelable}>Description</Label>
                   <Input name='description' onChange={(e) => setDescription(e.target.value)} className={style.editdescription} type="textarea" placeholder="Description Books" />
                  </FormGroup>
                  <FormGroup className={style.author}>
                    <Label className={style.titlelable}>Author</Label>
                    <Input type="select" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} >
                        <option value="0">Pilih Author</option>
                        {props.getAuthor.data.map((value) => {
                            return <option key={value.id_author} value={value.id_author}>{value.author}</option>
                          })}
                    </Input>  
                    </FormGroup>
                    <FormGroup className={style.genre}>
                    <Label className={style.titlelable}>Genre</Label>
                    <Input type="select" name="genre" value={genre} onChange={(e) => setGenre(e.target.value)} >
                      <option value="0">Pilih Genre</option>
                        {props.getGenre.data.map((value) => {
                            return <option key={value.id_genre} value={value.id_genre}>{value.genre}</option>
                          })}
                    </Input>
                    </FormGroup>
                  <FormGroup style={{
                    position: 'relative',
                    top: '-90px'
                  }}>
                   <Label className={style.titlelable}>Photo Book</Label>
                   <Input name='bookImage' onChange={(e) => setBookImage(e.target.files)}type="file" accept="image/x-png,image/gif,image/jpeg"/>
                  </FormGroup>
                  <Button onClick={postData} className={style.submit}>Save</Button>
                   </Form>
                  </div>
              </div>
            </Popup> }           
            <li onClick={logout}>Logout</li>
          </ul>
      </div>
    </div>
    </>
  )
}


const mapStateToProps = state =>({
  auth: state.auth,
  book: state.book,
  getGenre: state.getGenre,
  getAuthor: state.getAuthor,
  borrow: state.borrow,
  logOut: state.logOut
});

const mapDispatchToProps = { addBook, getAllGenre , getAllAuthor, returnBook, logout };
const pushRoute = withRouter(Profile)

export default connect(mapStateToProps,mapDispatchToProps)(pushRoute);