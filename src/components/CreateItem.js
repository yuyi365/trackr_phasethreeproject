import { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

const CreateItem = ({setAddItem, categories, items, setItems, listId, onList, setItemCreated}) => {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [minQuantity, setMinQuantity] = useState(0);
    const [notes, setNotes] = useState("");
    const [image, setImage] = useState("");
    const [newCategory, setNewCategory] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault()
        onList ? setAddItem(false) : setItemCreated(true)
        
        let body = {
            name: name,
            category: category ? (category === 'Add new category' ? newCategory : category ): 'Other',
            list_id: listId,
            quantity: quantity,
            min_quantity: minQuantity,
            notes: notes,
            image: image
        }
        
        fetch('https://fathomless-sands-79733.herokuapp.com/items', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept": 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then((res) => res.json())
        .then((data) => {
            onList && setItems(items => [...items, data])
        })
        setName('')
        setCategory('')
        setQuantity(0)
        setMinQuantity(0)
        setNotes('')
        setImage('')
        setNewCategory('')

    }

    const mapCategories =  categories && categories.map((category) => {
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
            <Form.Dropdown
                label="Category"
                placeholder='Select Category'
                fluid
                selection
                required
                search
                value={category}
                options={mapCategories ? [{
                    text: 'Add new category',
                    value: 'Add new category',
                }, ...mapCategories] : [{
                    text: 'Add new category',
                    value: 'Add new category',
                }]}
                onChange={(e) => {
                    setCategory(e.target.innerText)
                }}
            />
          {category === 'Add new category' &&  <Form.Input
                fluid
                id='new-category-name'
                label='New Category Name'
                placeholder='cleaning supplies'
                required
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
            />}
        </Form.Group>
        <Form.Group widths='equal'>
            <Form.Field label='Quantity' control='input' type='number' required value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
            <Form.Field label='Minimum Quantity' control='input' type='number' value={minQuantity} onChange={(e) => setMinQuantity(e.target.value)}/>
        </Form.Group>
        <Form.Group widths='equal'>
            <Form.Field label='Notes' control='textarea' rows='3' value={notes} onChange={(e) => setNotes(e.target.value)}/>
        </Form.Group>
            <Button floated="right" style={{backgroundColor: "#efbd6c", color: "#0A2342"}} type='submit'>
                Add
            </Button>
        {onList && <Button onClick={()=> setAddItem(false)}>Cancel</Button>}
         
  </Form>
    )
}

export default CreateItem
