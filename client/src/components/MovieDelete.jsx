import React, { Component } from 'react'
import { Loader } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import MovieDeleteRequest from './requests/movieDeleteRequest'
import { AuthContext } from './contexts/AuthContext'

class MovieDelete extends Component {
  constructor(props) {
    super(props);

    this.state = { success: false, error: null }
    this.setSuccess = this.setSuccess.bind(this);
    this.setError = this.setError.bind(this);
  }

  deleteMovie() {
    MovieDeleteRequest.delete(this.props.match.params.id, null, this.setSuccess, this.setError, this.context.token);
  }

  setSuccess() {
    this.setState({ success: true })
  }

  setError(error) {
    console.log(error)
    this.setState({ error: error })
  }

  componentDidMount() {
    this.deleteMovie();
  }

  render() {
    if(this.state.success || this.state.error) {
      return <Redirect to='/' />
    } else {
      return <Loader content="Loading..." />
    }
  }
}

MovieDelete.contextType = AuthContext;

export default MovieDelete;
