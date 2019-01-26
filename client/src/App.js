import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import MovieInfo from './components/MovieInfo'
import PersonInfo from './components/PersonInfo'

import axios from 'axios';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/movie/:id' exact component={MovieInfo} />
        <Route path='/person/:id' exact component={PersonInfo} />
      </Switch>
    </Router>
  );
}

export default App;
