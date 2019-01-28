import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import PeopleFormList from './PeopleFormList'
import MovieSaveRequest from '../requests/movieSaveRequest'
import PeopleRequest from '../requests/PeopleRequest'

class MovieForm extends Component {
  constructor(props) {
    super(props);

    var movieForm = {
      title: null,
      directors: [],
      producers: [],
      casting: []
    }

    this.state = {
      state: null,
      errors: null,
      movie: props.movie || {},
      movieForm: movieForm,
      allPeople: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDirectorsChange = this.handleDirectorsChange.bind(this);
    this.handleCastingChange = this.handleCastingChange.bind(this);
    this.handleProducersChange = this.handleProducersChange.bind(this);
    this.setError = this.setError.bind(this);
    this.setSuccess = this.setSuccess.bind(this);
    this.handleReleaseYearChange = this.handleReleaseYearChange.bind(this);
    this.handlePeople = this.handlePeople.bind(this);
  }

  setSuccess(movie) {
    this.setState({ state: 'success', movie: movie });
  }

  setError(error) {
    this.setState({ state: 'error', error: error });
  }

  handlePeople(response) {
    this.setState({ allPeople: response });
  }

  handleReleaseYearChange(event, data) {
    var form = this.state.movieForm;
    form.release_year = data.value;
    this.setState({ movieForm: form });
  }

  handleSubmit(event) {
    event.preventDefault();

    var movieForm = this.state.movieForm;
    var elements = event.target.elements
    movieForm.title = elements['title'].value;

    this.setState({ state: 'loading' });
    MovieSaveRequest.save(this.state.movie.id, { 'movie': movieForm }, this.setSuccess, this.setError, this.context.token);
  }

  yearOptions() {
    let max = new Date().getFullYear();
    let min = 1800;
    let options = []

    for(var i = max; i >= min; i--){
      options.push({key: i, text: i, value: i})
    }
    return options;
  }

  handleDirectorsChange(id, deleteValue) {
    deleteValue = deleteValue || false

    var movie = this.state.movieForm;
    movie.directors = movie.directors.map((director) => {
      if(director.id != id) {
        return director
      }
    });
    movie.directors.push({ 'id': id, _delete: deleteValue })
    this.setState({ movieForm: movie });
  }

  handleCastingChange(id, deleteValue) {
    deleteValue = deleteValue || false

    var movie = this.state.movieForm;
    movie.casting = movie.casting.map((actor) => {
      if(actor.id != id) {
        return actor
      }
    });
    movie.casting.push({ 'id': id, _delete: deleteValue })
    this.setState({ movieForm: movie });
  }
i
  handleProducersChange(id, deleteValue) {
    deleteValue = deleteValue || false

    var movie = this.state.movieForm;
    movie.producers = movie.producers.map((producer) => {
      if(producer.id != id) {
        return producer
      }
    });
    movie.producers.push({ 'id': id, _delete: deleteValue })
    this.setState({ movieForm: movie });
  }

  render() {
    let movie = this.props.movie || { directors: [], casting: [], producers: [] };

    return(
      <div>
        <Button as={Link} to={movie.id ? '/movie/' + movie.id : '/'} animated>
          <Button.Content visible>Back</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow left' />
          </Button.Content>
        </Button>
        <Form className={this.state.state} onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input name='title' label="Title" placeholder='Title' value={movie.title} style={{width: '200px !important'}}/>
            <Form.Select fluid onChange={(e, data) => this.handleReleaseYearChange(e, data)} label="Release Year" options={this.yearOptions()} value={movie.release_year} />
          </Form.Group>

          <PeopleRequest handler={this.handlePeople} />
          <PeopleFormList label='Directors' people={movie.directors} handler={this.handleDirectorsChange} allPeople={this.state.allPeople} />
          <PeopleFormList label='Casting' people={movie.casting} handler={this.handleCastingChange} allPeople={this.state.allPeople}/>
          <PeopleFormList label='Producers' people={movie.producers} handler={this.handleProducersChange} allPeople={this.state.allPeople} />
          <Form.Button onClick={this.submit}>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

MovieForm.propTypes = {
  movie: PropTypes.object
}

MovieForm.contextType = AuthContext;

export default MovieForm;
