import React, {useState} from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

const Item = ({name, quantity, minQuantity, notes, image, id, items, setItems}) => {
    const [editing, setEditing] = useState(false)
    const [updatedQuantity, setUpdatedQuantity] = useState(quantity)
    const handleEditClick = () => {
        setEditing(editing => !editing)
        if (editing){
            fetch(`http://localhost:9292/items/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    quantity: updatedQuantity
                })
            })
        }
    }
const handleDelete = () => {
    fetch(`http://localhost:9292/items/${id}`,{
        method: 'DELETE'
    }).then(()=> setItems(items.filter(item => item.id !== id)) )
    
}
return (
    <Card>
        <Image src={image} wrapped ui={false} />
    <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
            <span className='date'>Quantity: {editing ?<input value ={updatedQuantity} onChange={(e)=> {setUpdatedQuantity(e.target.value)}}/> : updatedQuantity}</span>
        </Card.Meta>
        <Card.Meta>
            <span className='date'>Minimum Quantity: {minQuantity}</span>
        </Card.Meta>
        <Card.Description>
            {notes}
        </Card.Description>
        </Card.Content>
      { editing && <Button onClick={handleDelete}>Delete Item</Button>}
        <Button onClick={handleEditClick}>{editing ? 'Save' : 'Edit Item'}</Button>
  </Card>
    )
}

export default Item
