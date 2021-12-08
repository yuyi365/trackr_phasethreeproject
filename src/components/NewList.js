import { useState } from 'react';
import { Button, Form, Modal, Message } from 'semantic-ui-react';
import CreateItem from './CreateItem';

const NewList = ({userId, lists, setLists, open, setOpen}) => {
    
    const [creating, setCreating] = useState('list')
    const [name, setName] = useState("");
    const [list, setList] = useState('')
    const [itemCreated, setItemCreated] = useState(false)
    const [noNameSubmit, setNoNameSubmit] = useState(false)

    const handleCancel = () => {
      setOpen(false)
      setCreating('list')
      setName('')
      setList('')
      setNoNameSubmit(false)
    }

    const handleNext = () => {
        if (name){setCreating('item')
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
        })} else {
           setNoNameSubmit(true)
        }
    }

    return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>{creating === 'list' ? 'Create A New List' : itemCreated ? 'Add Another Item' : 'Add Item'}</Modal.Header>
      <Modal.Content scrolling="true">
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
            {(creating === 'list' && noNameSubmit && !name) && <Message negative>
            <Message.Header>Please name your list</Message.Header>
          </Message>}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
        {creating === 'list' && 
        <Button
          style={{ backgroundColor:'#3aaed8' }}
          content="Create List"
          onClick={handleNext}
        />}
        {creating === 'item' && 
        <Button
          style={{ backgroundColor:'#3aaed8' }}
          content="Done"
          onClick={() => setOpen(false)}
        />}
      </Modal.Actions>
    </Modal>
    )
}

export default NewList
