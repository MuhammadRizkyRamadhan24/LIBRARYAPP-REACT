import React, { Component } from 'react';
import { Link } from "react-router-dom";
import  '../styles/Navbar.css';
import logo from '../assets/logo.png';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Input,
    FormGroup,
    Col,
    Container
  } from 'reactstrap';

class NavBar extends Component{
    render () {
        return (
            <>
            <Navbar light expand="md" className='nav'>
              <Container fluid>
                <Col md='2'>
                  <Collapse navbar>
                    <Nav className="mr-auto" navbar>
                      <UncontrolledDropdown className='dropdown' nav inNavbar>
                        <DropdownToggle nav caret>
                          All Categories
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>
                            Genre
                          </DropdownItem>
                          <DropdownItem>
                            Author
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                          All Time
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>
                            New Book
                          </DropdownItem>
                          <DropdownItem>
                            Popular Book
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Nav>
                  </Collapse>
                </Col>

                <Col md='4'>
                  <div className="content-search">
                    <Nav className="mr-auto" navbar>
                        <FormGroup className='form'>
                          <Input
                            type='text'
                            name='search'
                            placeholder='Search Book'
                            className='input-search'
                          />
                        </FormGroup>
                    </Nav>
                  </div> 
                </Col>

                <Col md='3'>
                  <div className='content-logo'>
                    <Nav className="mr-auto" navbar>
                        <NavbarBrand href="/login" className='nav-logo'><img className='logo' src={logo}/></NavbarBrand>
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