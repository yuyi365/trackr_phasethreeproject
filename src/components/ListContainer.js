import { Card } from 'semantic-ui-react'
import ListItem from './ListItem'

const ListContainer = ({setListId, lists}) => {

    return (
  
    <Card.Group centered stackable>

            {lists[0] && lists.map((list)=>{
                return <ListItem name={list.name} id ={list.id} setListId={setListId} key={list.id}/>
            })}

        <Card raised stackable className="list-card-item">
            <Card.Content style={{marginTop: "25%"}}>
                <Card.Header>+ Add New List</Card.Header>
            </Card.Content>
        </Card>
    </Card.Group>
        
    )
}

export default ListContainer
