import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Icon, Divider, Button } from 'semantic-ui-react'
import { AuthConsumer } from './contexts/AuthContext'
import PeopleRequest from './requests/PeopleRequest'
import PersonList from './people/PersonList'
import Loading from './support/Loading'

class HomePerson extends Component {
  constructor(props) {
    super(props);

    this.state = { people: null };
    this.personHandler = this.personHandler.bind(this);
  }

  personHandler(people) {
    this.setState({ people: people });
  }

  render() {
    let {people} = this.state
    return (
      <div>
      {people ? (
        <Container text>
          <Header as='h2' icon textAlign='center' color='purple'>
            <Icon name='unordered list' circular />
            <Header.Content>
              People
            </Header.Content>
          </Header>
          <Divider hidden section />
          <div>
            <Button as={Link} to='/person/new'>Create</Button>
            <Button as={Link} to='/'>Manage Movies</Button>
          </div>
          {people && people.length ? (
            <PersonList people={people} />
          ) : (
            <Container textAlign='center'>No people found.</Container>
          )}
        </Container>
      ) : (
        <div>
          <PeopleRequest handler={this.personHandler} />
          <Loading />
        </div>
      )}
    </div>
   );
  }
}

export default HomePerson;
