import React, { Component } from 'react'
import axios from 'axios'

const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = { isAuth: false, token: null }

  constructor() {
    super();

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(token) {
    axios.get('/api/sessions/auth', { headers: {'Authorization': token} })
         .then(response => this.setState({isAuth: true, token: token}))
         .catch(error => console.log(error));
  }

  logout() {
    this.setState({isAuth: false})
  }

  render() {
    return (
      <AuthContext.Provider value={{
        isAuth: this.state.isAuth,
        login: this.login,
        logout: this.logout,
        token: this.state.token
      }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext }
