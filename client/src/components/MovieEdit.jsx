import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Icon, Divider } from 'semantic-ui-react'
import MovieRequest from './requests/MovieRequest'
import MovieForm from './forms/MovieForm'
import Loading from './support/Loading'

class MovieEdit extends Component {
  constructor(props) {
    super(props);

    this.state = { movie: null }
    this.handler = this.handler.bind(this);
  }

  handler(movie) {
    this.setState({ movie: movie })
  }

  render(){
    let {movie} = this.state;
    return (
      <div>
      {movie ? (
        <Container text>
          <Header as='h2' icon textAlign='center' color='purple'>
            <Icon name='film' circular />
            <Header.Content>
              Movie Editing...
            </Header.Content>
          </Header>
          <Divider hidden section />
          {movie && movie.id ? (
            <MovieForm movie={movie} />
          ) : (
            <Container textAlign='center'>No movies found.</Container>
          )}
        </Container>
      ) : (
        <div>
          <MovieRequest movieId={this.props.match.params.id} handler={this.handler} />
          <Loading />
        </div>
      )}
      </div>
    )
  }
}

MovieEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
}

export default MovieEdit;
