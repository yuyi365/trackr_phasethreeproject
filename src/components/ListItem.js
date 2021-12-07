import React from 'react'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const ListItem = ({name, id, setListId}) => {
    return (
    <Card raised stackable className="card" id="cardthing">
    <Card.Content textAlign="center">
        <Card.Header as={Link} to={`/lists/${id}`} onClick={()=> setListId(id)}>{name}</Card.Header>
    </Card.Content>
    </Card>
    )
}

export default ListItem
