import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class MoviesRequest extends Component {
  componentDidMount() {
    axios.get('/api/movies')
    .then(response => this.props.handler(response.data))
    .catch(error => console.log(error));
  }

  render() {
    return(null);
  }
}

MoviesRequest.propTypes = {
  handler: PropTypes.func.isRequired
}

export default MoviesRequest;
