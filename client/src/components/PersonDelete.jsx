import React, { Component } from 'react'
import { Loader } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import PersonDeleteRequest from './requests/personDeleteRequest'
import { AuthContext } from './contexts/AuthContext'

class PersonDelete extends Component {
  constructor(props) {
    super(props);

    this.state = { success: false, error: null }
    this.setSuccess = this.setSuccess.bind(this);
    this.setError = this.setError.bind(this);
  }

  deletePerson() {
    PersonDeleteRequest.delete(this.props.match.params.id, null, this.setSuccess, this.setError, this.context.token);
  }

  setSuccess() {
    this.setState({ success: true })
  }

  setError(error) {
    console.log(error)
    this.setState({ error: error })
  }

  componentDidMount() {
    this.deletePerson();
  }

  render() {
    if(this.state.success || this.state.error) {
      return <Redirect to='/' />
    } else {
      return <Loader content="Loading..." />
    }
  }
}

PersonDelete.contextType = AuthContext;

export default PersonDelete;
