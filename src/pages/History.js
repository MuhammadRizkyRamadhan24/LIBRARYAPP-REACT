import React, { Component , useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Side';
import { Container, Row, Col, Table} from 'reactstrap';
import style from '../styles/Home.module.css';
import Style from '../styles/Search.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { connect } from 'react-redux';
import { getAllHistory } from '../redux/actions/getHistory';

class History extends Component{
    constructor(props) {
        super(props)
        this.state ={
            history: [],
            isLoading: true
        }
    }

    getHistory = () => {
        const token = this.props.auth.data.token;
        const Username = this.props.auth.data.username;
        this.props.getAllHistory(token, Username)
    }


    componentDidMount(){
        this.getHistory();
    }

    componentDidUpdate(){
        
    }

    render () {
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
                            <Row style={{top: '15vh', position: 'relative',width: '100%'}}>
                                <Table className={Style.tableWrapper}>
                                    <thead>
                                        <tr>
                                        <th>id</th>
                                        <th>Username</th>
                                        <th>Book</th>
                                        <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.getHistory.data.map((value)=>{
                                            return(
                                            <tr key={value.id_borrow} data={value}>
                                            <th scope="row">{value.id_borrow}</th>
                                            <td>{value.username}</td>
                                            <td>{value.title}</td>
                                            <td>{value.status}</td>
                                            </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
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
    getHistory: state.getHistory
});

const mapDispatchToProps = { getAllHistory }

export default connect(mapStateToProps,mapDispatchToProps)(History);