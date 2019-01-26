import React from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Button, Icon } from 'semantic-ui-react'
import MoviePersonList from '../movies/MoviePersonList'

const Person = (props) => {
  let person = props.person;
  return(
    <div>
      <Container text>
        <Header as="h2">{person.full_name}</Header>
        <MoviePersonList movies={person.movies_as_director} title="Director" />
        <MoviePersonList movies={person.movies_as_actor} title="Actor" />
        <MoviePersonList movies={person.movies_as_producer} title="Producer" />
      </Container>
    </div>
  )
}

Person.propTypes = {
  person: PropTypes.object.isRequired
}

export default Person;
