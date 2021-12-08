import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const ListItem = ({name, id, setListId}) => {

    return (
    <Card raised stackable className="list-card-item">
    <Card.Content style={{marginTop: "25%"}}>
        <Card.Header centered as={Link} to={`/lists/${id}`} onClick={()=> setListId(id)} style={{color:"thistle"}}>{name}</Card.Header>
    </Card.Content>
    </Card>
    )
}

export default ListItem
