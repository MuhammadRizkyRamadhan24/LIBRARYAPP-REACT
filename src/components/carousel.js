import React, { Component } from 'react';
import style from '../styles/Home.module.css';
import { Link } from 'react-router-dom';

export default class carousel extends Component {
    constructor(props){
        super(props)
        console.log(this.props,'carousel');
    }
    render() {
        return (
            <div>
                <Link className={style.p} to={`/bookdetail/${this.props.data.id}`}>{this.props.data.title}</Link>
                <img src={`http://localhost:3000/static/images/${this.props.data.bookImage}`}/>
            </div>
        )
    }
}
