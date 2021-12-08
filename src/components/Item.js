import React, {useState} from 'react';
import { Card, Image, Button, Form, Grid, CardGroup } from 'semantic-ui-react';

const Item = ({name, quantity, minQuantity, notes, image, id, items, setItems}) => {
    const [editing, setEditing] = useState(false)
    const [updatedQuantity, setUpdatedQuantity] = useState(quantity)
    const [updatedMinQuantity, setUpdatedMinQuantity] = useState(minQuantity)
    const [updatedNotes, setUpdatedNotes] = useState(notes)
    const [updatedName, setUpdatedName] = useState(name)


    const handleEditClick = () => {
        setEditing(editing => !editing)
        if (editing){
            fetch(`http://localhost:9292/items/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    quantity: updatedQuantity,
                    min_quantity: updatedMinQuantity,
                    name: updatedName,
                    notes: updatedNotes
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
    <div className="items-layout">
    <Card style={{height: "100%", maxWidth: "100%"}}>
        <Image src={image} wrapped ui={false} />
    <Card.Content>
        <Card.Header>{editing ? <input className="edit-input" value ={updatedName} onChange={(e)=> {setUpdatedName(e.target.value)}}/> : updatedName}</Card.Header>
        
        <Card.Meta>
            <span className='date'>Quantity: {editing ?<input className="edit-input" type="number" min="0" value ={updatedQuantity} onChange={(e)=> {setUpdatedQuantity(e.target.value)}}/> : updatedQuantity}</span>
        </Card.Meta>
        <Card.Meta>
            <span className='date'>Minimum Quantity: {editing ?<input className="edit-input" type="number" min="0" value ={updatedMinQuantity} onChange={(e)=> {setUpdatedMinQuantity(e.target.value)}}/> : updatedMinQuantity}</span>
        </Card.Meta>
        <Card.Description style={{overflow: "auto"}}>
        <span className='date'> Notes: {editing ?
            <textarea className="edit-input" type='textarea' rows="4" cols="30" value={updatedNotes} onChange={(e) => setUpdatedNotes(e.target.value)}/> : updatedNotes}</span>
        </Card.Description>
    
    </Card.Content>
      {editing && <Button onClick={handleDelete}>Delete Item</Button>}
        <Button onClick={handleEditClick}>{editing ? 'Save' : 'Edit Item'}</Button>
  </Card>
  </div>
    )
}

export default Item
