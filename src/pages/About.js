import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'

class About extends Component{
    render() {
        return(
            <div>
                <Navbar />
                <h1>Ini About</h1>
                <Footer />
            </div>
        )
    }
}

export default About