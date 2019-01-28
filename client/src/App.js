import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './components/contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Home from './components/Home'
import HomePeople from './components/HomePeople'
import MovieInfo from './components/MovieInfo'
import MovieEdit from './components/MovieEdit'
import MovieDelete from './components/MovieDelete'
import MovieNew from './components/MovieNew'
import PersonNew from './components/PersonNew'
import PersonInfo from './components/PersonInfo'
import PersonEdit from './components/PersonEdit'
import PersonDelete from './components/PersonDelete'
import Login from './components/Login'

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
            <ProtectedRoute path='/movie/new' exact component={MovieNew} />
            <ProtectedRoute path='/person/new' exact component={PersonNew} />
            <Route path='/movie/:id' exact component={MovieInfo} />
            <Route path='/person/:id' exact component={PersonInfo} />
            <ProtectedRoute path='/person/:id/edit' exact component={PersonEdit} />
            <ProtectedRoute path='/person/:id/delete' exact component={PersonDelete} />
            <ProtectedRoute path='/people' exact component={HomePeople} />
            <ProtectedRoute path='/movie/:id/edit' exact component={MovieEdit} />
            <ProtectedRoute path='/movie/:id/delete' exact component={MovieDelete} />
          </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
