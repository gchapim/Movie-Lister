import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import PersonListItem from './PersonListItem'

const PersonList = ({people}) => {
  let items = people.map((person, i) => {
      return (
        <PersonListItem person={person} key={i} />
      )
  });

  return (
    <List divided relaxed>
    {items}
    </List>
  );
}

PersonList.propTypes = {
  people: PropTypes.array.isRequired
}

export default PersonList;
