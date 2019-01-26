import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const PersonItem = (props) => {
  let person = props.person

  return (
    <List.Item>
      <List.Content>
        <List.Header as={Link} to={'/person/' + person.id}>{person.full_name}</List.Header>
        <List.Description>{props.title}</List.Description>
      </List.Content>
    </List.Item>
  );
}

PersonItem.propTypes = {
  person: PropTypes.object.isRequired,
  title: PropTypes.string
}

export default PersonItem;
