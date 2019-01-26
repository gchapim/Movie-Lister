import React, { Component } from 'react'
import { Container, Header, Icon, Divider } from 'semantic-ui-react'
import MoviesRequest from './requests/MoviesRequest'
import MovieList from './movies/MovieList'
import Loading from './support/Loading'

class HomeMovie extends Component {
  constructor(props) {
    super(props);

    this.state = { movies: null };
    this.movieHandler = this.movieHandler.bind(this);
  }

  movieHandler(movies) {
    this.setState({ movies: movies });
  }

  render() {
    let {movies} = this.state
    return (
      <div>
      {movies ? (
        <Container text>
          <Header as='h2' icon textAlign='center' color='purple'>
            <Icon name='unordered list' circular />
            <Header.Content>
              Movies
            </Header.Content>
          </Header>
          <Divider hidden section />
          {movies && movies.length ? (
            <MovieList movies={movies} />
          ) : (
            <Container textAlign='center'>No movies found.</Container>
          )}
        </Container>
      ) : (
        <div>
          <MoviesRequest handler={this.movieHandler} />
          <Loading />
        </div>
      )}
    </div>
   );
  }
}

export default HomeMovie;
