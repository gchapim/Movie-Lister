import React from 'react'
import PropTypes from 'prop-types'
import { AuthConsumer } from '../contexts/AuthContext'
import { List, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const PersonListItem = ({person}) => {
  return (
    <List.Item>
      <AuthConsumer>
        { ({isAuth}) => (
          isAuth ? (
            <List.Content floated='right'>
              <Button as={Link} to={'/person/' + person.id + '/edit'}>Edit</Button>
              <Button as={Link} to={'/person/' + person.id + '/delete'}>Delete</Button>
            </List.Content>
          ) : (
            null
          ))}
      </AuthConsumer>
      <List.Content>
        <List.Header as={Link} to={'/person/' + person.id}>{person.full_name}</List.Header>
      </List.Content>
    </List.Item>
  );
}

PersonListItem.propTypes = {
  person: PropTypes.object.isRequired
}

export default PersonListItem;
