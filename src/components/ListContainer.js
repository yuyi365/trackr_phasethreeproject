import { Card } from 'semantic-ui-react'
import ListItem from './ListItem'

const ListContainer = ({setListId, lists}) => {

    return (
  
        <Card.Group centered stackable>

            {lists[0] && lists.map((list)=>{
                return <ListItem name={list.name} id ={list.id} setListId={setListId} key={list.id}/>
            })}
        </Card.Group>
    )
}

export default ListContainer
