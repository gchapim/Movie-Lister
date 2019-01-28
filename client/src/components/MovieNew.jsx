import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Icon, Divider } from 'semantic-ui-react'
import MovieForm from './forms/MovieForm'

const MovieNew = () => {
  return (
    <Container text>
      <Header as='h2' icon textAlign='center' color='purple'>
        <Icon name='film' circular />
        <Header.Content>
          Movie Creating...
        </Header.Content>
      </Header>
      <Divider hidden section />
      <MovieForm />
    </Container>
  )
}

export default MovieNew;
