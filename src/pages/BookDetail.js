import React, { Component } from 'react';
import { Col, Container ,Button, Form, FormGroup, Label, Input, FormText, FormFeedback, Row, Jumbotron,  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Overlay } from 'react-portal-overlay';
import Popup from "reactjs-popup";
import BookImage from '../assets/bookImage.png';
import BookCover from '../assets/bookCover.png';
import style from '../styles/bookdetail.module.css';

class BookDetail extends Component{
    render(){
        return(
            <>
            <Container fluid>
                
                <Row style={{height: '65vh'}}>
                    
                    <Col className={style.headline}>
                        <div className={style.buttonadmin}>
                            <Popup modal trigger={<Button className={style.button}>Edit</Button>}>
                                <div className={style.modal}>
                                    <div className={style.headeredit}>Edit Data</div>
                                    <div className={style.contentedit}>
                                        <Form>
                                            <FormGroup>
                                                <Label className={style.titlelable}>Title</Label>
                                                <Input className={style.edittitle} type="text" placeholder="Title Book" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className={style.titlelable}>Description</Label>
                                                <Input className={style.editdescription} type="textarea" placeholder="Description Books" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className={style.titlelable}>Photo Book</Label>
                                                <Input type="file"/>
                                            </FormGroup>
                                            <Button className={style.submit}>Save</Button>
                                        </Form>
                                    </div>
                                </div>
                            </Popup>
                            <Popup modal trigger={<Button className={style.button}>Delete</Button>}>
                                <Input></Input>
                            </Popup>
                        </div>
                        <Jumbotron fluid className={style.jumbotron} style={{height: 'inherit'}}>
                            <img src={BookCover} className={style.cover}/>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row style={{height: '35vh'}}>
                    <Col md='8' className={style.description}>
                        <Row>
                            <Col className={style.title}>
                                <span>Novel</span>
                                <h1>DILAN 1990</h1>
                                <small>30 Juni 2019</small>
                            </Col>
                            <Col className={style.status}>
                                <p>Availeble</p>
                            </Col>
                        </Row>
                        <Row style={{height: '35vh'}} >
                            <Col className={style.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam eget est rutrum ultrices. Donec laoreet enim a massa dapibus, cursus egestas dui pulvinar. Proin sit amet accumsan lectus. Nullam auctor auctor consequat. Donec semper magna erat, sed fringilla lacus pretium eget. Cras porttitor, nibh sit amet interdum bibendum, nibh velit accumsan tellus, vel vehicula tellus leo vitae ipsum. Praesent sit amet libero sed orci ullamcorper efficitur. Pellentesque in euismod purus, sit amet ultrices tortor. Vestibulum ante dui, tempor at dui id, tincidunt euismod diam. Integer pellentesque massa nibh, ac eleifend odio malesuada sed. Phasellus orci sem, cursus nec orci ut, accumsan facilisis lacus. Nullam at elementum nibh, ac gravida felis. In sagittis rhoncus nisi tempus dignissim. Sed fringilla consequat ante vitae lobortis. Cras posuere ligula vel enim suscipit malesuada. Vivamus non nulla ut ante imperdiet euismod quis nec massa.
                            </Col>
                        </Row>
                    </Col>
                    <Col Col md='4' className={style.borrow}>
                        <Row>
                            <img src={BookImage}className={style.image} />
                        </Row>
                        <Row className={style.buttonWrapper}>
                            <Button color="warning" className={style.button}>Borrow</Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}

export default BookDetail;