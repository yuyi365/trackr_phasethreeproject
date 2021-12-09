import { useEffect, useState } from 'react';
import { Button, Grid, GridColumn, Modal, Dropdown, Icon, Radio, Label } from 'semantic-ui-react';
import CreateItem from './CreateItem';
import ItemContainer from './ItemContainer';
import Search from './Search';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TableView from './TableView';

const List = ({listId, setListId}) => {
    const params = useParams();
    const [search, setSearch] = useState("");
    const [addItem, setAddItem] = useState(false);
    const [items, setItems]= useState([]);
    const [listName, setListName] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [deleteList, setDeleteList] = useState(false);
    const [tableView, setTableView] = useState(false)

    const handleDelete = () => {
        fetch(`http://localhost:9292/lists/${listId}`, {
            method: 'DELETE'
        })
    }

    let displayCategories = categories.map((category)=>{
        return {
            text: category.name,
            value: category.name,
        }
    })
    displayCategories.unshift({
        text: 'All',
        value: 'All',
    })

    useEffect(()=>{
        setListId(params.listId)
    },[params.listId, listId])

    const handleSearch = (text) => {
        setSearch(text);
    }

    useEffect(() => {
        listId && fetch(`http://localhost:9292/lists/${listId}/items`)
        .then((res) => res.json())
        .then((data) => setItems(data));
         listId && fetch(`http://localhost:9292/lists/${listId}`)
        .then((res) => res.json())
        .then((data) => setListName(data.name));
        
      }, [listId])

      useEffect(()=>{
        listId && fetch(`http://localhost:9292/lists/${listId}/categories`)
        .then((res) => res.json())
        .then(data => setCategories(data))
      }, [listId, items])
      
      const buttonStyle = {
        backgroundColor: "#efbd6c",
        color: "#0A2342",
        width: "250px",
        fontSize: "16px"
      }

    return (
    <div>
        
        <div className="list-page">
            <Header/>
        </div>
        
        <Grid container columns={2} stackable>
            <GridColumn style={{display:"flex"}}>
                <div className="items-list-div">
                    <h2 className="list-page-add" onClick={()=> setSelectedCategory('All')}>{listName}</h2>
                    <Icon className="delete-list" size="large" name="delete" onClick={() => setDeleteList(true)} style={{opacity: "0.5"}}/>
                </div>
            </GridColumn>
            <GridColumn textAlign="right" verticalAlign="middle">
                <div style={{marginRight:"15%"}}>
                
                    <Icon name="block layout" style={{paddingRight:"6%", paddingLeft:"50%", opacity:"0.75", color:"#0a2342"}}/>
                    
                    <Radio toggle onChange={()=> { setTableView(tableView => !tableView)}} style={{opacity:"0.75", color:"#0a2342"}}/>
                    
                    <Icon name="list ul" style={{paddingLeft:"3%", opacity:"0.75", color:"#0a2342"}}/>
                </div>
            </GridColumn>
        </Grid>

        <Grid className="list-page-search" container columns={2} stackable>
            <GridColumn>
                <Search handleSearch={handleSearch} search={search} />
            </GridColumn>
            <GridColumn>
                <Dropdown
                    style={{
                        outline:"2px solid #efbd6c",
                        height: "3rem",
                        color: "#0a2342",
                        width: "75%",
                        aligntItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        fontSize: "16px",
                    }}
                    placeholder='Filter by Category'
                    search
                    selection
                    options={displayCategories 
                    }
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.innerText)}
                />
            </GridColumn>
        </Grid>

        <Grid className="list-page-add" container columns={1} stackable> 
            <GridColumn>
                {!addItem && <Button onClick={() => setAddItem(addItem => !addItem)} style={buttonStyle}>Add Item</Button>}
                {addItem && 
                <Modal onClose={() => setAddItem(false)}
                onOpen={() => setAddItem(true)}
                open={addItem}>
                    <Modal.Header>Add Item</Modal.Header>
                    <Modal.Content>
                <CreateItem setAddItem={setAddItem} categories={categories} items={items} setItems={setItems} listId={listId} onList={true}/>
                    </Modal.Content>
                </Modal>
                }
            </GridColumn>
        </Grid>

            {tableView ? <TableView items={items} search={search} selectedCategory={selectedCategory} categories={categories} setItems={setItems}/> :<ItemContainer items={items} search={search} selectedCategory={selectedCategory} categories={categories} setItems={setItems}/>}

    <Modal
      basic
      onClose={() => setDeleteList(false)}
      onOpen={() => setDeleteList(true)}
      open={deleteList}
      size='small'
    >
      <Modal.Content>
       <h3 style={{marginLeft:"25%"}}>Are you sure you'd like to delete this list?</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button style={{marginLeft:"35%"}} color='white' floated="left" inverted onClick={() => setDeleteList(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button style={{marginRight:"35%"}} color='blue' floated="right" inverted onClick={handleDelete} as={Link} to="/">
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>

    </div>
    )
}

export default List
