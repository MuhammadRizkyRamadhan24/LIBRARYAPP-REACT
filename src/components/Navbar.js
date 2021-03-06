import React, { Component } from 'react';
import  '../styles/Navbar.css';
import logo from '../assets/logo.png';
import {
    Navbar,
    NavbarBrand,
    Nav,
    Input,
    FormGroup,
    Col,
    Container
  } from 'reactstrap';

class NavBar extends Component{
  constructor(props){
    super(props);
    this.state={
      search:'',
    }
    // console.log(this.props);
  }

  goToHome = () =>{
    document.location.href='/';
  }

  redirect=(event)=> {
    if (event.keyCode === 13) {
     this.props.history.push(`/search?search=${this.state.search}`);
    }
  }

    render () {
        return (
            <>
            <Navbar light expand="md" className='nav'>
              <Container fluid>
                <Col md='4'>
                </Col>

                <Col md='4'>
                  <div className="content-search">
                    <Nav className="mr-auto" navbar>
                        <FormGroup className='form'>
                          <Input
                            value={this.state.search}
                            onKeyDown={(e) => this.redirect(e)}
                            onChange={(e) => this.setState({search: e.target.value})}

                            type='text'
                            name='search'
                            placeholder='Search Book'
                            className='input-search'
                          />
                        </FormGroup>
                    </Nav>
                  </div> 
                </Col>

                <Col md='4'>
                  <div className='content-logo'>
                    <Nav navbar>
                        <NavbarBrand onClick={this.goToHome} ><img src={logo}/></NavbarBrand>
                    </Nav>
                  </div>
                </Col>
              </Container>
            </Navbar>
          </>
        )
    }
}

export default NavBar;