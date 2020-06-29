import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import BookDetail from './pages/BookDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/about' component={About} />
        <Route path='/product/:productName' component={ProductDetail}/>
        <Route path='/login' exact component={Login} />
        <Route path='/' exact component={Home} />
        <Route path='/register' exact component={Register} />
        <Route path='/bookdetail' exact component={BookDetail} />
      </Switch>
    </Router>
  );
}

export default App;
