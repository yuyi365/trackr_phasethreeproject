import { useState } from 'react';
import { Button, Form, Modal, Icon } from 'semantic-ui-react';
import CreateItem from './CreateItem';

const NewList = ({userId, lists, setLists}) => {
    const [open, setOpen] = useState(false)
    const [creating, setCreating] = useState('list')
    const [name, setName] = useState("");
    const [list, setList] = useState('')
    const [itemCreated, setItemCreated] = useState(false)

    const handleNext = () => {
        setCreating('item')
        fetch('http://localhost:9292/lists', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept": 'application/json',
            },
            body: JSON.stringify({
                name: name,
                user_id: userId
            })
        }).then(res => res.json()).then(data => {
            setList(data)
            console.log(data)
            console.log(lists)
            setLists([...lists, data])
        })
    }

    return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon labelPosition='left'> 
        <Icon name="add" className='icon'/>Add New List</Button>}
    >
      <Modal.Header>{creating === 'list' ? 'Create A New List' : itemCreated ? 'Add Another Item' : 'Add Item'}</Modal.Header>
      <Modal.Content>
        {creating === 'item' && <CreateItem listId={list.id} setItemCreated={setItemCreated}/>}
        {creating === 'list' && <Form.Input
                fluid
                id='list-name'
                label='List Name'
                placeholder='Apartment 3B Supplies'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />}
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        {creating === 'list' && <Button
          content="Create List"
          labelPosition='right'
          icon='arrow right'
          onClick={handleNext}
          positive
        />}
        {creating === 'item' && <Button
          content="Done"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />}
      </Modal.Actions>
    </Modal>
    )
}

export default NewList
