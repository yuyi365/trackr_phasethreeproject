import { Icon, Label, Menu, Table } from 'semantic-ui-react'

export default function TableView({items, search, selectedCategory, categories, setItems}) {
    
    // const mapItems = items.map((item) => {
    //     return <Table.Row>
    //     <Table.Cell>{item.name}</Table.Cell>
    //     <Table.Cell>{item.quantity}</Table.Cell>
    //     <Table.Cell>{item.min_quantity}</Table.Cell>
    //     <Table.Cell>{item.notes}</Table.Cell>
    //     </Table.Row>
    // }

    const selectedCategoryId = categories.filter(category => category.name === selectedCategory)[0] && categories.filter(category => category.name === selectedCategory)[0].id

    const filteredItems = selectedCategory === 'All' ? items.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase())
    }) : items.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase())
    }).filter(item => {
        return item.category_id === selectedCategoryId})
    
    return (

    <Table celled textAlign="center" stackable selectable verticalAlign="middle"
    style={{padding:"2% 3%", backgroundColor: "#3aaed8", color: "#0a2342"}}
    >
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell style={{backgroundColor: "#efbd6c", color: "#0a2342"}}>Item Name</Table.HeaderCell>
            <Table.HeaderCell style={{backgroundColor: "#efbd6c", color: "#0a2342"}}>Category</Table.HeaderCell>
            <Table.HeaderCell style={{backgroundColor: "#efbd6c", color: "#0a2342"}}>Quantity</Table.HeaderCell>
            <Table.HeaderCell style={{backgroundColor: "#efbd6c", color: "#0a2342"}}>Minimum Quantity</Table.HeaderCell>
            <Table.HeaderCell style={{backgroundColor: "#efbd6c", color: "#0a2342"}}>Notes</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

    <Table.Body>
      {filteredItems.map((item) => {
        return <Table.Row>
        <Table.Cell className="table-cell">{item.name}</Table.Cell>
        <Table.Cell className="table-cell">{categories.filter((category)=> category.id === item.category_id)[0].name}</Table.Cell>
        <Table.Cell className="table-cell">{item.quantity}</Table.Cell>
        <Table.Cell className="table-cell">{item.min_quantity}</Table.Cell>
        <Table.Cell className="table-cell">{item.notes}</Table.Cell>

        </Table.Row>
    })}
    </Table.Body>
  </Table>
        
        // <div>
        //     <table>
        //         <th>Item Name</th>
        //         <th>Quantity</th>
        //         <th>Minimum Quantity</th>
        //         <th>Notes</th>
               
        //         {items.map((item) => {
        //          return  <tr>
        //          <td>{item.name}</td>
        //          <td>{item.quantity}</td>
        //          <td>{item.min_quantity}</td>
        //          <td>{item.notes}</td>
        //      </tr>
        //         })}
        //     </table>
        // </div>
    )
}
