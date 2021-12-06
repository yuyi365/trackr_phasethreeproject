import { useState } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';

const CreateItem = ({setAddItem, categories, items, setItems, listId}) => {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [minQuantity, setMinQuantity] = useState(0);
    const [notes, setNotes] = useState("");
    const [image, setImage] = useState("");

    function handleSubmit(e) {
        e.preventDefault()
        setAddItem(false)
        let body = {
            name: name,
            category: category,
            list_id: listId,
            quantity: quantity,
            min_quantity: minQuantity,
            notes: notes,
            image: image
        }
        console.log(body)
        
        fetch('http://localhost:9292/items', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept": 'application/json',
            },
            body: JSON.stringify({
                name: name,
                category: category,
                list_id: listId,
                quantity: quantity,
                min_quantity: minQuantity,
                notes: notes,
                image: image
            })
        })
        .then((res) => res.json())
        .then((data) => {
            setItems(items => [...items, data])
        })
    }

    const mapCategories = categories.map((category) => {
        return {
            text: category.name,
            value: category.name,
        }
    })

    return (
    <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
            <Form.Input
                fluid
                id='item-name'
                label='Item Name'
                placeholder='shoes, t-shirt, etc.'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Form.Input
                fluid
                id='item-image'
                label='Image'
                placeholder='image url'
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <Dropdown
                placeholder='Select Category'
                fluid
                selection
                required
                search
                value={category}
                options={mapCategories}
                onChange={(e) => {
                    setCategory(e.target.innerText)
                }}
            />
        </Form.Group>
        <Form.Group widths='equal'>
            <Form.Field label='Quantity' control='input' type='number' required value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
            <Form.Field label='Minimum Quantity' control='input' type='number' value={minQuantity} onChange={(e) => setMinQuantity(e.target.value)}/>
        </Form.Group>
        <Form.Group widths='equal'>
            <Form.Field label='Notes' control='textarea' rows='3' value={notes} onChange={(e) => setNotes(e.target.value)}/>
        </Form.Group>
        <Button type='submit'>Add</Button>
        <Button onClick={()=> setAddItem(false)}>Cancel</Button>
  </Form>
    )
}

export default CreateItem
