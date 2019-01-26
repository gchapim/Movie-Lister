import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class MovieRequest extends Component {
  componentDidMount() {
    axios.get('/api/movies/' + this.props.movieId)
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

MovieRequest.propTypes = {
  handler: PropTypes.func.isRequired,
  movieId: PropTypes.string.isRequired
}

export default MovieRequest;
