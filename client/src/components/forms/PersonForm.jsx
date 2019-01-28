import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import MoviesFormList from './MoviesFormList'
import PersonSaveRequest from '../requests/personSaveRequest'
import MoviesRequest from '../requests/MoviesRequest'

class PersonForm extends Component {
  constructor(props) {
    super(props);

    var personForm = {
      first_name: null,
      last_name: null,
      movies_as_director: [],
      movies_as_producer: [],
      movies_as_actor: []
    }

    this.state = {
      state: null,
      errors: null,
      person: props.person || {},
      personForm: personForm,
      allMovies: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDirectorsChange = this.handleDirectorsChange.bind(this);
    this.handleCastingChange = this.handleCastingChange.bind(this);
    this.handleProducersChange = this.handleProducersChange.bind(this);
    this.setError = this.setError.bind(this);
    this.setSuccess = this.setSuccess.bind(this);
    this.handleMovies = this.handleMovies.bind(this);
  }

  setSuccess(person) {
    this.setState({ state: 'success', person: person });
  }

  setError(error) {
    this.setState({ state: 'error', error: error });
  }

  handleMovies(response) {
    this.setState({ allMovies: response });
  }

  handleSubmit(event) {
    event.preventDefault();

    var personForm = this.state.personForm;
    var elements = event.target.elements
    personForm.first_name = elements['first_name'].value;
    personForm.last_name = elements['last_name'].value;

    this.setState({ state: 'loading' });
    PersonSaveRequest.save(this.state.person.id, { 'person': personForm }, this.setSuccess, this.setError, this.context.token);
  }

  handleDirectorsChange(id, deleteValue) {
    deleteValue = deleteValue || false

    var person = this.state.personForm;
    person.movies_as_director = person.movies_as_director.map((movie) => {
      if(movie.id != id) {
        return movie
      }
    });
    person.movies_as_director.push({ 'id': id, _delete: deleteValue })
    this.setState({ personForm: person });
  }

  handleCastingChange(id, deleteValue) {
    deleteValue = deleteValue || false

    var person = this.state.personForm;
    person.movies_as_actor = person.movies_as_actor.map((movie) => {
      if(movie.id != id) {
        return movie
      }
    });
    person.movies_as_actor.push({ 'id': id, _delete: deleteValue })
    this.setState({ personForm: person });
  }
i
  handleProducersChange(id, deleteValue) {
    deleteValue = deleteValue || false

    var person = this.state.personForm;
    person.movies_as_producer = person.movies_as_producer.map((movie) => {
      if(movie.id != id) {
        return movie
      }
    });
    person.movies_as_producer.push({ 'id': id, _delete: deleteValue })
    this.setState({ personForm: person });
  }

  render() {
    let person = this.props.person || { movies_as_director: [], movies_as_actor: [], movies_as_producer: [] };

    return(
      <div>
        <Button as={Link} to={person.id ? '/person/' + person.id : '/'} animated>
          <Button.Content visible>Back</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow left' />
          </Button.Content>
        </Button>
        <Form className={this.state.state} onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input name='first_name' label="First name" placeholder='First name...' value={person.first_name} style={{width: '200px !important'}}/>
            <Form.Input name='last_name' label="last name" placeholder='last name...' value={person.last_name} style={{width: '200px !important'}}/>
          </Form.Group>

          <MoviesRequest handler={this.handleMovies} />
          <MoviesFormList label='Movies as Director' movies={person.movies_as_director} handler={this.handleDirectorsChange} allMovies={this.state.allMovies} />
          <MoviesFormList label='Movies as Actor' movies={person.movies_as_actor} handler={this.handleCastingChange} allMovies={this.state.allMovies}/>
          <MoviesFormList label='Movies as Producer' movies={person.movies_as_producer} handler={this.handleProducersChange} allMovies={this.state.allMovies} />
          <Form.Button onClick={this.submit}>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

PersonForm.propTypes = {
  person: PropTypes.object
}

PersonForm.contextType = AuthContext;

export default PersonForm;
