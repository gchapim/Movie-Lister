import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Icon, Divider } from 'semantic-ui-react'
import PersonRequest from './requests/PersonRequest'
import PersonForm from './forms/PersonForm'
import Loading from './support/Loading'

class PersonEdit extends Component {
  constructor(props) {
    super(props);

    this.state = { person: null }
    this.handler = this.handler.bind(this);
  }

  handler(person) {
    this.setState({ person: person })
  }

  render(){
    let {person} = this.state;
    return (
      <div>
      {person ? (
        <Container text>
          <Header as='h2' icon textAlign='center' color='purple'>
            <Icon name='film' circular />
            <Header.Content>
              Person Editing...
            </Header.Content>
          </Header>
          <Divider hidden section />
          {person && person.id ? (
            <PersonForm person={person} />
          ) : (
            <Container textAlign='center'>No people found.</Container>
          )}
        </Container>
      ) : (
        <div>
          <PersonRequest personId={this.props.match.params.id} handler={this.handler} />
          <Loading />
        </div>
      )}
      </div>
    )
  }
}

PersonEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
}

export default PersonEdit;
