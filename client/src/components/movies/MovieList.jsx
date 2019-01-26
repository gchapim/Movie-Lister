import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import MovieItem from './MovieItem'

const MovieList = ({movies}) => {
  let items = movies.map((movie, i) => {
      return (
        <MovieItem movie={movie} key={i} />
      )
  });

  return (
    <List divided relaxed>
    {items}
    </List>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired
}

export default MovieList;
