import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const ListItem = ({name, id, setListId}) => {

    const style = {
        color:"#0A2342",
    }

    return (
    <Card raised stackable className="list-card-item" as={Link} to={`/lists/${id}`} onClick={()=> setListId(id)} style={{display: "flex"}}>
        <Card.Content style={{color:"#0A2342", marginTop: "30%"}}>
            <Card.Header style={style}>{name}</Card.Header>
        </Card.Content>
    </Card>
    )
}

export default ListItem
