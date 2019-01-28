import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Icon, Divider, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PersonRequest from './requests/PersonRequest'
import Person from './people/Person'
import Loading from './support/Loading'
import { AuthConsumer } from './contexts/AuthContext'

class PersonInfo extends Component {
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
            <Icon name='user' circular />
            <Header.Content>
              Person info
            </Header.Content>
          </Header>
          <Divider hidden section />
          <AuthConsumer>
            { ({isAuth}) => (
              isAuth ? (
                <Button as={Link} to={ '/person/' + person.id + '/edit'} animated>
                  <Button.Content visible>Edit</Button.Content>
                  <Button.Content hidden>
                    <Icon name='edit outline' />
                  </Button.Content>
                </Button>
              ) : null
            )}
          </AuthConsumer>
          <Button as={Link} to='/' animated>
            <Button.Content visible>Movies</Button.Content>
            <Button.Content hidden>
              <Icon name='film' />
            </Button.Content>
          </Button>
          <Divider hidden section />
          {person && person.id ? (
            <Person person={person} />
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

PersonInfo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
}

export default PersonInfo;
