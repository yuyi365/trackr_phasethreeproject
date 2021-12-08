import { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import CreateItem from './CreateItem';
import ItemContainer from './ItemContainer';
import Search from './Search';
import Header from './Header';
import { useParams } from 'react-router-dom';

const List = ({listId, setListId}) => {

    const params = useParams();
    const [search, setSearch] = useState("");
    const [addItem, setAddItem] = useState(false);
    const [items, setItems]= useState([]);
    const [listName, setListName] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All')

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
        listId && fetch(`http://localhost:9292/lists/${listId}/categories`)
        .then((res) => res.json())
        .then(data => setCategories(data))
      }, [listId])

      const categoryOptions = categories.map(category => <option value ={category.name}>{category.name}</option>)
      categoryOptions.unshift(<option value={'All'}>All</option>)
      
    return (
    <div>
        <div className="header">
        <Header/>
        </div>
        <div className="list-page">
            <h2>
                {listName}
            </h2>
            
            <Search handleSearch={handleSearch} search={search} />
            {!addItem && <Button onClick={() => setAddItem(addItem => !addItem)}>Add Item</Button>}
            {addItem && <CreateItem setAddItem={setAddItem} categories={categories} items={items} setItems={setItems} listId={listId} onList={true}/>}
            <label> Filter By Category
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>{categoryOptions}</select>
            </label>
        
        </div>

            <ItemContainer items={items} search={search} selectedCategory={selectedCategory} categories={categories} setItems={setItems}/>
    </div>
    )
}

export default List