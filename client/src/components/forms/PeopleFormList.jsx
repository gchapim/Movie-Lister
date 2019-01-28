import React from 'react'
import PropTypes from 'prop-types'
import { Header, Label, Icon, Dropdown, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const PeopleFormList = (props) => {
  const deleteItem = (event) => {
    var id = event.target.id.split('-')
    props.handler(id[id.length - 1], true);
  }

  const personOptions = () => {
    return props.allPeople.map((person, i) => {
      return { key: i, text: person.full_name, value: person.id }
    })
  }

  const addItem = (event, data) => {
    props.handler(data.value);
  }

  let items = props.people.map((person, i) => {
    let keyId = [props.label.toLowerCase(), person.id].join('-')
    return (
      <Label key={keyId}>
        {person.full_name}
        <Icon onClick={deleteItem} id={keyId} name='delete' />
      </Label>
    )
  });

  return (
    <div>
      <Header as="h4">{props.label}</Header>
      <Container text>
        <Header as='h5'>Add {props.label}</Header>
        { props.allPeople ? (
          <Dropdown placeholder={props.label} onChange={(e, data) => addItem(e, data)} search selection options={personOptions()} />
         ) : (
          <Dropdown loading text="Loading people..." />
         )}
      </Container>
      {items}
    </div>
  )
}

PeopleFormList.propTypes = {
  label: PropTypes.string.isRequired,
  people: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired,
  allPeople: PropTypes.array
}

export default PeopleFormList;
