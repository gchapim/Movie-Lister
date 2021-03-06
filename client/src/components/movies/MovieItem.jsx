import React from 'react'
import PropTypes from 'prop-types'
import { AuthConsumer } from '../contexts/AuthContext'
import { List, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const MovieItem = ({movie}) => {
  return (
    <List.Item>
      <AuthConsumer>
        { ({isAuth}) => (
          isAuth ? (
            <List.Content floated='right'>
              <Button as={Link} to={'/movie/' + movie.id + '/edit'}>Edit</Button>
              <Button as={Link} to={'/movie/' + movie.id + '/delete'}>Delete</Button>
            </List.Content>
          ) : (
            null
          ))}
      </AuthConsumer>
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
