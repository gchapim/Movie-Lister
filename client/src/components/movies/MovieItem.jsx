import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const MovieItem = ({movie}) => {
  return (
    <List.Item>
      <List.Content>
        <List.Header as={Link} to={'/movie/' + movie.id}>{movie.title}</List.Header>
        <List.Description>Year: {movie.roman_release_year}</List.Description>
      </List.Content>
    </List.Item>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired
}

export default MovieItem;
