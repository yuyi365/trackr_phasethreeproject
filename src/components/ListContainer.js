import React from 'react'
import { Card } from 'semantic-ui-react'
import ListItem from './ListItem'
import { useState, useEffect } from 'react'

const ListContainer = ({setListId, userId}) => {

    const [lists, setLists] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9292/lists/user_id/${userId}`)
        .then((res) => res.json())
        .then((data) => setLists(data));
      }, [])

    return (
        <Card.Group>
            {lists[0] && lists.map((list)=>{
                return <ListItem name={list.name} id ={list.id} setListId={setListId}/>
            })}
        </Card.Group>
    )
}

export default ListContainer
