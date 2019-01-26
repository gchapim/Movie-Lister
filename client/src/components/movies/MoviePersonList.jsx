import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import MoviePersonItem from './MoviePersonItem'

const MoviePersonList = (props) => {
  let items = props.movies.map((movie, i) => {
      return (
        <MoviePersonItem movie={movie} title={props.title} key={i} />
      )
  });

  return (
    <List horizontal>
      {items}
    </List>
  )
}

MoviePersonList.propTypes = {
  movies: PropTypes.array.isRequired,
  title: PropTypes.string
}

export default MoviePersonList;
