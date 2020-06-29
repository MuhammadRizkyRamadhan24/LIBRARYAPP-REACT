import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: this.props.data.status,
            title: this.props.data.title,
        }
        console.log(this.props.data)
    }

    render() {
        return(
            <div>
                <h3>{this}</h3>
                <h3>{}</h3>

                {/* <h4><Link to={`/product/${this.state.name}`}>{this.state.name}</Link></h4>
                <span>{this.state.price}</span> */}
            </div>
        )
    }
}

export default Product