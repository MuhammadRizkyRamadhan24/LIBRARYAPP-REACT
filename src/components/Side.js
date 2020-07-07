import React, { useState, useEffect } from 'react';
import '../styles/Side.css';
import style from '../styles/bookdetail.module.css';
import Popup from "reactjs-popup";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import BurgerMenu from '../assets/icons8-menu-64.png';
import avatar from '../assets/avatar.png';

import { connect } from 'react-redux';
import { addBook } from '../redux/actions/addData';

function Profile(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [author, setAuthor] =useState('');
  const [genre, setGenre] =useState('');
  const [genres, setGenres] =useState([]);
  const [authors, setAuthors] =useState([]);

  const [active, setInactive] = useState(false);
  const toggleNavbar = () => {
    setInactive(!active);
  };

  const postData = (event) => {
    event.preventDefault();
    // console.log(bookImage)
    const formData = new FormData();
    // const token = localStorage.getItem('token');
    const token = props.auth.data.token
    console.log(token,)
    const status = 'ada';
    formData.append('title', title);
    formData.append('description', description);
    formData.append('bookImage', bookImage[0]);
    formData.append('id_author', author);
    formData.append('id_genre', genre);
    formData.append('status', status);
    props.addBook(formData,token).then(() => {
      props.history.push('/');
  });
    
    // axios({
    //     method: 'POST',
    //     url: 'http://localhost:3000/books',
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
    //       icon: 'success',
    //       title: 'Add book success',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //     .then(()=>{
    //       window.location.reload();
    //   })
    // })
    // .catch((error)=>{
    //     console.log(error);
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'Add Book Error',
    //       confirmButtonColor: '#000000',
    //   })
    // })
  }

  const returnBook = (event) => {
    event.preventDefault();
    const token = props.auth.data.token
    const Username = props.auth.data.username
    axios({
        method: 'PATCH',
        url: 'http://localhost:3000/books/return',
        data: {
          username: Username,
          title: title
        },
        headers: {
          Authorization: token
        }
    })
    .then((response)=>{
      console.log(response);
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
      axios({
        method : "GET",
        url : 'http://localhost:3000/authors',
        headers : {
          Authorization : token
        }
      })
      .then((res) => {
        setAuthors(res.data.data);
        // console.log(authors);
      })
      .catch((err) => {
        console.log(err)
      })
   }
   
  const getDataGenre = () => {
    const token = props.auth.data.token
    axios({
      method : "GET",
      url : 'http://localhost:3000/genres',
      headers : {
        Authorization : token
      }
    })
    .then((res) => {
      setGenres(res.data.data);
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log(err)
    })
   }

  const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    return document.location.href='/login';
  }

useEffect (()=>{
  getDataAuthor();
  getDataGenre();
  // console.log(setDescription,setTitle,setBookImage,setUsername,setGenres,setAuthors,setGenre,setAuthor);
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
            <Popup className={style.popup} modal trigger={<li>Return Book</li>}>
              <div className={style.modal}>
               <div className={style.headeredit}>Return Book</div>
                <div className={style.contentedit}>
                 <Form onSubmit={returnBook}>
                 {/* <FormGroup>
                   <Label className={style.titlelable}>Username</Label>
                   <Input name='username' onChange={(e) => setUsername(e.target.value)} className={style.edittitle} type="text" placeholder="Username" />
                  </FormGroup> */}
                  <FormGroup>
                   <Label className={style.titlelable}>Title</Label>
                   <Input name='title' onChange={(e) => setTitle(e.target.value)} className={style.edittitle} type="text" placeholder="Title Book" />
                  </FormGroup>
                  <Button onClick={returnBook} className={style.submit}>Save</Button>
                   </Form>
                  </div>
              </div>
            </Popup>
            <Popup className={style.popup} modal trigger={<li>Add books</li>}>
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
                  <FormGroup>
                    <Label>Author</Label>
                    <Input type="select" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} >
                        <option value="0">Pilih Author</option>
                        {authors.map((value) => {
                            return <option key={value.id_author} value={value.id_author}>{value.author}</option>
                          })}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                    <Label>Genre</Label>
                      <Input type="select" name="genre" value={genre} onChange={(e) => setGenre(e.target.value)} >
                      <option value="0">Pilih Genre</option>
                        {genres.map((value) => {
                            return <option key={value.id_genre} value={value.id_genre}>{value.genre}</option>
                          })}
                      </Input>
                    </FormGroup>
                  <FormGroup>
                   <Label className={style.titlelable}>Photo Book</Label>
                   <Input name='bookImage' onChange={(e) => setBookImage(e.target.files)}type="file" accept="image/x-png,image/gif,image/jpeg"/>
                  </FormGroup>
                  <Button onClick={postData} className={style.submit}>Save</Button>
                   </Form>
                  </div>
              </div>
            </Popup>
            <li onClick={logout}>Logout</li>
          </ul>
      </div>
    </div>
    </>
  )
}


const mapStateToProps = state =>({
  auth: state.auth,
  addData: state.addData
});

const mapDispatchToProps = { addBook };

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
// export default Profile;