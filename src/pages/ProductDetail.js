import React, { Component } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'

class ProductDetail extends Component{
    constructor(props) {
        super(props)
        console.log(props)
    }
    
    render(){
        return(
            <div>
                <Navbar />
                Product detail with {this.props.match.params.productName}
                <Footer />
            </div>
        )
    }
}

export default ProductDetail;