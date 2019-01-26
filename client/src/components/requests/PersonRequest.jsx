import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class PersonRequest extends Component {
  componentDidMount() {
    axios.get('/api/people/' + this.props.personId)
    .then(response => {
      console.log(response.data)
      this.props.handler(response.data)}
    )
    .catch(error => console.log(error));
  }

  render() {
    return(null);
  }
}

PersonRequest.propTypes = {
  handler: PropTypes.func.isRequired,
  personId: PropTypes.string.isRequired
}

export default PersonRequest;
