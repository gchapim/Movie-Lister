import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const MoviePersonItem = (props) => {
  let movie = props.movie

  return (
    <List.Item>
      <List.Content>
        <List.Header as={Link} to={'/movie/' + movie.id}>{movie.title} ({movie.release_year})</List.Header>
        <List.Description>{props.title}</List.Description>
      </List.Content>
    </List.Item>
  );
}

MoviePersonItem.propTypes = {
  movie: PropTypes.object.isRequired,
  title: PropTypes.string
}

export default MoviePersonItem;
