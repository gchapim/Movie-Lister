import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class PeopleRequest extends Component {
  componentDidMount() {
    axios.get('/api/people')
    .then(response => this.props.handler(response.data))
    .catch(error => console.log(error));
  }

  render() {
    return(null);
  }
}

PeopleRequest.propTypes = {
  handler: PropTypes.func.isRequired
}

export default PeopleRequest;
