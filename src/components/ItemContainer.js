import React from 'react'
import { CardGroup } from 'semantic-ui-react'
import Item from './Item'

const ItemContainer = ({items, search, selectedCategory, categories, setItems}) => {
    const selectedCategoryId = categories.filter(category => category.name === selectedCategory)[0] && categories.filter(category => category.name === selectedCategory)[0].id
    
    const filteredItems = selectedCategory === 'All' ? items.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase())
    }) : items.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase())
    }).filter(item => {
        return item.category_id === selectedCategoryId})

    const itemsMap = filteredItems.map(item => 
    <Item
        name={item.name}
        quantity={item.quantity}
        minQuantity={item.min_quantity}
        notes={item.notes}
        image={item.image}
        id={item.id}
        items={items}
        setItems={setItems}
    />)
    return (

        <CardGroup>
            {itemsMap}
        </CardGroup>

    )
}

export default ItemContainer
