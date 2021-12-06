import React from 'react'
import { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import CreateItem from './CreateItem';
import ItemContainer from './ItemContainer';
import Search from './Search'

const List = ({listId}) => {

    const [search, setSearch] = useState("");
    const [addItem, setAddItem] = useState(false);
    
    const handleSearch = (text) => {
        setSearch(text);
      }
    
    const [items, setItems]= useState([])
    const [listName, setListName] = useState('')
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    useEffect(() => {
        listId && fetch(`http://localhost:9292/lists/${listId}/items`)
        .then((res) => res.json())
        .then((data) => setItems(data));
         listId && fetch(`http://localhost:9292/lists/${listId}`)
        .then((res) => res.json())
        .then((data) => setListName(data.name));
        listId && fetch(`http://localhost:9292/lists/${listId}/categories`)
        .then((res) => res.json())
        .then(data => setCategories(data))
      }, [])

      const categoryOptions = categories.map(category => <option value ={category.name}>{category.name}</option>)
      categoryOptions.unshift(<option value={'All'}>All</option>)
      
    return (
        <div>
            <h2>
                {listName}
            </h2>
            <Search handleSearch={handleSearch} search={search} />
            {!addItem && <Button onClick={() => setAddItem(addItem => !addItem)}>Add Item</Button>}
            {addItem && <CreateItem setAddItem={setAddItem} categories={categories} items={items} setItems={setItems} listId={listId}/>}
            <label> Filter By Category
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>{categoryOptions}</select>
      </label>
            <ItemContainer items={items} search={search} selectedCategory={selectedCategory} categories={categories} setItems={setItems}/>
        </div>
    )
}

export default List
