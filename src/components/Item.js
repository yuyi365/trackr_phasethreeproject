import React, {useState} from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

const Item = ({name, quantity, minQuantity, notes, image, id, items, setItems, categories, category_id }) => {
    const [editing, setEditing] = useState(false)
    const [updatedQuantity, setUpdatedQuantity] = useState(quantity)
    const [updatedMinQuantity, setUpdatedMinQuantity] = useState(minQuantity)
    const [updatedNotes, setUpdatedNotes] = useState(notes)
    const [updatedName, setUpdatedName] = useState(name)


    const handleEditClick = () => {
        setEditing(editing => !editing)
        if (editing){
            fetch(`https://fathomless-sands-79733.herokuapp.com/items/${id}`, {
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
    fetch(`https://fathomless-sands-79733.herokuapp.com/items/${id}`,{
        method: 'DELETE'
    }).then(()=> setItems(items.filter(item => item.id !== id)) )
    
}
return (
    <div className="items-layout">
    <Card style={{height: "100%", maxWidth: "100%", color:"#0A2342"}}>
        <Image src={image} wrapped ui={false} />
    <Card.Content>
        <Card.Header style={{color:"#0A2342"}}>{editing ? <input className="edit-input" value ={updatedName} onChange={(e)=> {setUpdatedName(e.target.value)}}/> : updatedName}</Card.Header>
        <Card.Meta>
            <span className='date'>Category: {categories.filter((category)=> category.id === category_id)[0] && categories.filter((category)=> category.id === category_id)[0].name}</span>
        </Card.Meta>
        
        <Card.Meta>
            <span className='date'>Quantity: {editing ?<input className="edit-input" type="number" min="0" value ={updatedQuantity} onChange={(e)=> {setUpdatedQuantity(e.target.value)}}/> : updatedQuantity}</span>
        </Card.Meta>
        <Card.Meta>
            <span className='date'>Minimum Quantity: {editing ?<input className="edit-input" type="number" min="0" value ={updatedMinQuantity} onChange={(e)=> {setUpdatedMinQuantity(e.target.value)}}/> : updatedMinQuantity}</span>
        </Card.Meta>
        <Card.Description style={{overflow: "auto", color:"#0A2342"}}>
        <span className='date'> Notes: {editing ?
            <textarea className="edit-input" type='textarea' rows="4" cols="30" value={updatedNotes} onChange={(e) => setUpdatedNotes(e.target.value)}/> : updatedNotes}</span>
        </Card.Description>
    
    </Card.Content>
      {editing && <Button style={{backgroundColor: "#F48367", color: "#0A2342"}} onClick={handleDelete}>Delete Item</Button>}
        <Button style={{backgroundColor: "#efbd6c", color: "#0A2342"}} onClick={handleEditClick}>{editing ? 'Save' : 'Edit Item'}</Button>
  </Card>
  </div>
    )
}

export default Item
