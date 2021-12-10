import { Card } from 'semantic-ui-react'
import ListItem from './ListItem'

const ListContainer = ({setListId, lists, setOpen}) => {

    return (
  
    <Card.Group centered stackable>

            {lists[0] && lists.map((list)=>{
                return <ListItem name={list.name} id ={list.id} setListId={setListId} key={list.id}/>
            })}

        <Card raised stackable className="list-card-item" onClick={()=> setOpen(true)} style={{display: "flex"}}>
            <Card.Content style={{color:"#0A2342"}}>
                <Card.Header style={{color:"#0A2342", marginTop: "60%"}}>
                    + Add New List</Card.Header>
            </Card.Content>
        </Card>
    </Card.Group>
        
    )
}

export default ListContainer
