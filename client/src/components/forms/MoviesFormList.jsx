import React from 'react'
import PropTypes from 'prop-types'
import { Header, Label, Icon, Dropdown, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const MoviesFormList = (props) => {
  const deleteItem = (event) => {
    var id = event.target.id.split('-')
    props.handler(id[id.length - 1], true);
  }

  const movieOptions = () => {
    return props.allMovies.map((movie, i) => {
      return { key: i, text: movie.title, value: movie.id }
    })
  }

  const addItem = (event, data) => {
    props.handler(data.value);
  }

  let items = props.movies.map((movie, i) => {
    let keyId = [props.label.toLowerCase().replace(new RegExp(' ', 'g'), '_'), movie.id].join('-')
    return (
      <Label key={keyId}>
        {movie.title}
        <Icon onClick={deleteItem} id={keyId} name='delete' />
      </Label>
    )
  });

  return (
    <div>
      <Header as="h4">{props.label}</Header>
      <Container text>
        <Header as='h5'>Add {props.label}</Header>
        { props.allMovies ? (
          <Dropdown placeholder={props.label} onChange={(e, data) => addItem(e, data)} search selection options={movieOptions()} />
         ) : (
          <Dropdown loading text="Loading movies..." />
         )}
      </Container>
      {items}
    </div>
  )
}

MoviesFormList.propTypes = {
  label: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired,
  allMovies: PropTypes.array
}

export default MoviesFormList;
