import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import PersonItem from './PersonItem'

const PeopleList = (props) => {
  let items = props.people.map((person, i) => {
      return (
        <PersonItem person={person} title={props.title} key={i} />
      )
  });

  return (
    <List horizontal>
      {items}
    </List>
  )
}

PeopleList.propTypes = {
  people: PropTypes.array.isRequired,
  title: PropTypes.string
}

export default PeopleList;
