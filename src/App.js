import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetail from './pages/BookDetail';
import Search from './pages/Search';
import History from './pages/History'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login'component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/bookdetail/:id' component={BookDetail} />
        <Route path='/search' component={Search} />
        <Route path='/history' component={History} />
      </Switch>
    </Router>
  );
}

export default App;
