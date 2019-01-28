import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Icon, Divider } from 'semantic-ui-react'
import PersonForm from './forms/PersonForm'

const PersonNew = () => {
  return (
    <Container text>
      <Header as='h2' icon textAlign='center' color='purple'>
        <Icon name='film' circular />
        <Header.Content>
          Person Creating...
        </Header.Content>
      </Header>
      <Divider hidden section />
      <PersonForm />
    </Container>
  )
}

export default PersonNew;
