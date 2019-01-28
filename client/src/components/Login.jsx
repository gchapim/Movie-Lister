import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Input, Form, Header, Icon, Divider } from 'semantic-ui-react'
import { AuthConsumer } from './contexts/AuthContext'

const Login = (props) => {
  const handleSubmit = (login, event) => {
    event.preventDefault();

    login(event.target.elements['token'].value)
  }

  return (
    <div>
      <AuthConsumer>
        { ({ login, isAuth }) => (
          isAuth ? (
            <Redirect to='/' />
          ) : (
            <Container text>
              <Header as='h2' icon textAlign='center' color='purple'>
                <Icon name='lock' circular />
                <Header.Content>
                  Login
                </Header.Content>
              </Header>
              <Divider hidden section />

              <Container text>
                <Header as="h2">Login</Header>
                <Form onSubmit={(e) => handleSubmit(login, e)} >
                  <Form.Input name='token' placeholder="Token" />
                  <Form.Button type="submit">Login!</Form.Button>
                </Form>
              </Container>
            </Container>
          )
        )
      }
      </AuthConsumer>
    </div>
  )
}

export default Login;
