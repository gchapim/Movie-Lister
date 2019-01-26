import React from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PeopleList from '../people/PeopleList'

const Movie = ({movie}) => {
  return(
    <div>
      <Button as={Link} to='/' animated>
        <Button.Content visible>All Movies</Button.Content>
        <Button.Content hidden>
          <Icon name='arrow left' />
        </Button.Content>
      </Button>
      <Container text>
        <Header as="h2">{movie.title} ({movie.release_year})</Header>
        <PeopleList people={movie.directors} title="Director" />
        <PeopleList people={movie.casting} title="Actor" />
        <PeopleList people={movie.producers} title="Producer" />
      </Container>
    </div>
  )
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired
}

export default Movie;
